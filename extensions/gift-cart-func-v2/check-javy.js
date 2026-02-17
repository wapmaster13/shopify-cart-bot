const { execSync } = require('child_process');
const path = require('path');
const JAVY_EXE = path.join(__dirname, 'bin', 'javy.exe');

try {
    console.log('Checking Javy usage...');
    execSync(`"${JAVY_EXE}" --help`, { stdio: 'inherit' });
} catch (e) {
    // Ignore error, help usually exits with 0 but sometimes 1
}
