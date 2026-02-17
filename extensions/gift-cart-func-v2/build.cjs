const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 1. Asigurăm existența folderului dist
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

console.log('📦 Bundling robot logic with esbuild...');
try {
    // Unim src/index.js (I/O) cu src/run.js (Logica)
    execSync('npx esbuild src/index.js --bundle --minify --format=esm --outfile=dist/run.bundle.js', { stdio: 'inherit' });
} catch (e) {
    console.error('❌ Esbuild failed');
    process.exit(1);
}

console.log('🚀 Compiling WASM (Dynamic)...');
try {
    // Compilăm fișierul rezultat (bundle) în WASM
    execSync('npx javy compile dist/run.bundle.js -o dist/function.wasm -d', { stdio: 'inherit', shell: true });
    
    const wasmStats = fs.statSync('dist/function.wasm');
    console.log(`✅ WASM created successfully: ${wasmStats.size} bytes`);
} catch (e) {
    console.error('❌ Javy compilation failed');
    process.exit(1);
}

console.log('✨ Build complete!');