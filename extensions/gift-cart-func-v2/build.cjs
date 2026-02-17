const { execSync } = require('child_process');
const fs = require('fs');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

console.log('Copying JS...');
try {
    // Avoid esbuild, just copy
    fs.copyFileSync('src/run.js', 'dist/run.js');
    // Check size of JS
    const jsStats = fs.statSync('dist/run.js');
    console.log(`JS Size: ${jsStats.size} bytes`);
} catch (e) {
    console.error('copy failed');
    process.exit(1);
}

console.log('Compiling WASM (Dynamic, No Bundle)...');
try {
    // Dynamic linking with -d
    // Use javy (latest installed)
    execSync('npx javy compile dist/run.js -o dist/function.wasm -d', { stdio: 'inherit', shell: true });

    const wasmStats = fs.statSync('dist/function.wasm');
    console.log(`WASM Size (Dynamic): ${wasmStats.size} bytes`);

} catch (e) {
    console.error('javy failed');
    process.exit(1);
}
console.log('Build complete.');
