const { execSync } = require('child_process');
const fs = require('fs');

if (!fs.existsSync('dist')) fs.mkdirSync('dist');

console.log('📦 Bundling with index.js for Debug logs...');
try {
    // Esbuild unește index.js cu run.js pentru a permite log-uri
    execSync('npx esbuild src/index.js --bundle --minify --format=esm --outfile=dist/run.bundle.js', { stdio: 'inherit' });
} catch (e) {
    console.error('❌ Bundle failed');
    process.exit(1);
}

console.log('🚀 Compiling WASM...');
try {
    execSync('npx javy compile dist/run.bundle.js -o dist/function.wasm -d', { stdio: 'inherit', shell: true });
    console.log('✅ WASM ready!');
} catch (e) {
    console.error('❌ Javy failed');
    process.exit(1);
}