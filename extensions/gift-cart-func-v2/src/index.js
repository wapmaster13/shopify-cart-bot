import { run } from "./run";

// Standard Javy I/O implementation for Shopify Functions
function readStdin() {
    const bufferSize = 1024;
    const buffer = new Uint8Array(bufferSize);
    const input = [];

    while (true) {
        let bytesRead = 0;
        try {
            bytesRead = Javy.IO.readSync(0, buffer);
        } catch (e) {
            break; // EOF
        }

        if (bytesRead === 0) {
            break;
        }
        for (let i = 0; i < bytesRead; i++) {
            input.push(buffer[i]);
        }
    }

    try {
        return new TextDecoder().decode(new Uint8Array(input));
    } catch (e) {
        return String.fromCharCode.apply(null, input);
    }
}

function writeStdout(data) {
    const buffer = new TextEncoder().encode(data);
    Javy.IO.writeSync(1, buffer);
}

function writeStderr(data) {
    const buffer = new TextEncoder().encode(data + "\n");
    Javy.IO.writeSync(2, buffer);
}

// Main execution
try {
    const inputString = readStdin();
    const input = JSON.parse(inputString);
    const result = run(input);
    const outputString = JSON.stringify(result);
    writeStdout(outputString);
} catch (e) {
    writeStderr("Error: " + e.message);
    // writeStderr(e.stack);
    // Return empty operations on error to avoid crash
    writeStdout(JSON.stringify({ operations: [] }));
}
