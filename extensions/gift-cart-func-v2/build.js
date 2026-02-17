const { execSync } = require('child_process');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const https = require('https');

// Use v0.6.0
const JAVY_TAG = 'v0.6.0';
const GITHUB_API_URL = `https://api.github.com/repos/bytecodealliance/javy/releases/tags/${JAVY_TAG}`;
const BIN_DIR = path.join(__dirname, 'bin');
const JAVY_EXE = path.join(BIN_DIR, 'javy.exe');

async function downloadJavy() {
    if (fs.existsSync(JAVY_EXE)) {
        console.log('Javy binary already exists.');
        return;
    }

    if (!fs.existsSync(BIN_DIR)) {
        fs.mkdirSync(BIN_DIR);
    }

    console.log(`Fetching release info for Javy ${JAVY_TAG}...`);
    const releaseData = await new Promise((resolve, reject) => {
        https.get(GITHUB_API_URL, { headers: { 'User-Agent': 'Node.js Build Script' } }, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to fetch release info: ${res.statusCode}`));
                return;
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        }).on('error', reject);
    });

    // Look for windows asset
    const asset = releaseData.assets.find(a => a.name.includes('windows') && a.name.endsWith('.gz'));
    if (!asset) {
        throw new Error('Could not find Windows asset in release.');
    }

    console.log(`Downloading Javy from ${asset.browser_download_url}...`);
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(path.join(BIN_DIR, 'javy.exe.gz'));

        const request = (url) => {
            https.get(url, { headers: { 'User-Agent': 'Node.js Build Script' } }, (response) => {
                if (response.statusCode === 301 || response.statusCode === 302) {
                    console.log('Follow redirect', response.headers.location);
                    request(response.headers.location);
                    return;
                }

                if (response.statusCode !== 200) {
                    reject(new Error(`Failed to download Javy: ${response.statusCode}`));
                    return;
                }

                response.pipe(file);
                file.on('finish', () => {
                    file.close(() => {
                        try {
                            console.log('Decompressing Javy...');
                            const gzipBuffer = fs.readFileSync(path.join(BIN_DIR, 'javy.exe.gz'));
                            const unzipped = zlib.gunzipSync(gzipBuffer);
                            fs.writeFileSync(JAVY_EXE, unzipped);
                            fs.unlinkSync(path.join(BIN_DIR, 'javy.exe.gz'));
                            resolve();
                        } catch (err) {
                            reject(err);
                        }
                    });
                });
            }).on('error', (err) => {
                fs.unlink(path.join(BIN_DIR, 'javy.exe.gz'), () => { });
                reject(err);
            });
        };
        request(asset.browser_download_url);
    });
}

(async () => {
    try {
        console.log('Building function...');

        // Ensure dist exists
        if (!fs.existsSync('dist')) {
            fs.mkdirSync('dist');
        }

        // 0. Download Javy if missing
        await downloadJavy();

        // 1. Bundle and Minify with esbuild (Bundle the SHIM: src/index.js)
        console.log('Bundling src/index.js with esbuild...');
        // platform=neutral or browser is better for Javy than node?
        // But we need standard JS behavior.
        // --format=esm? Javy v0.3.0 expects NO imports/exports if parsing as script.
        // We use iife to wrap everything into a single script verification.
        execSync('npx esbuild src/index.js --bundle --minify --format=cjs --outfile=dist/run.bundle.js', { stdio: 'inherit' });

        // 2. Compile with Javy
        console.log('Compiling with Javy...');
        try {
            // Correct syntax: javy compile [OPTIONS] <input>
            // Use -d for dynamic linking to reduce size (expects provider on host)
            execSync(`"${JAVY_EXE}" compile -d -o dist/function.wasm dist/run.bundle.js`, { stdio: 'inherit' });
        } catch (err) {
            console.error('Javy compilation failed.');
            throw err;
        }

        // 3. Optimize with wasm-opt (essential for size reduction with v0.6.0+)
        console.log('Optimizing with wasm-opt...');
        try {
            // Install wasm-opt wrapper if needed, or use npx
            // -Oz optimizes for size aggressively
            execSync('npx -y wasm-opt -Oz dist/function.wasm -o dist/function.opt.wasm', { stdio: 'inherit' });
            // Replace original with optimized
            fs.copyFileSync('dist/function.opt.wasm', 'dist/function.wasm');
            fs.unlinkSync('dist/function.opt.wasm');
        } catch (e) {
            console.warn('wasm-opt failed or not available, skipping optimization. Error:', e.message);
        }

        // 4. Compress with Gzip
        console.log('Compressing with Gzip...');
        const wasmPath = path.join(__dirname, 'dist', 'function.wasm');
        const wasm = fs.readFileSync(wasmPath);
        console.log(`Original WASM size: ${wasm.length} bytes`);

        const gzipped = zlib.gzipSync(wasm, { level: 9 });
        const gzPath = path.join(__dirname, 'dist', 'function.wasm.gz');
        fs.writeFileSync(gzPath, gzipped);
        console.log(`Gzipped WASM size: ${gzipped.length} bytes`);

    } catch (e) {
        console.error('Build failed:', e.message);
        process.exit(1);
    }
})();
