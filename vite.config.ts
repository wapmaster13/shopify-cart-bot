import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

console.log("--- VITE CONFIG ENV ---");
console.log("SHOPIFY_APP_URL:", process.env.SHOPIFY_APP_URL);
console.log("POTENTIAL URLS:");
Object.keys(process.env).forEach(key => {
    if (key.includes("URL") || key.includes("SHOPIFY")) {
        console.log(`${key}: ${process.env[key]}`);
    }
});
console.log("-----------------------");

export default defineConfig({
    plugins: [
        remix({
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
                v3_lazyRouteDiscovery: true,
                v3_singleFetch: true,
            },
        }),
        tsconfigPaths(),
    ],
    server: {
        port: Number(process.env.PORT || 3000),
        allowedHosts: true,
        hmr: process.env.SHOPIFY_APP_URL
            ? {
                protocol: "wss",
                host: new URL(process.env.SHOPIFY_APP_URL).hostname,
                clientPort: 443,
            }
            : {
                protocol: "ws",
                host: "localhost",
            },
    },
});
