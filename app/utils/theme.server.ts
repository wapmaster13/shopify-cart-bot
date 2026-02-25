import { authenticate } from "../shopify.server";

export async function checkAppEmbedStatus(admin: any) {
    try {
        // 1. Get the MAIN theme ID
        const themeQuery = await admin.graphql(`#graphql
      query {
        themes(first: 10, roles: [MAIN]) {
          nodes {
            id
          }
        }
      }
    `);
        const themeData = await themeQuery.json();
        const mainTheme = themeData.data?.themes?.nodes?.[0];

        if (!mainTheme) {
            console.warn("CartBot ThemeCheck: No main theme found.");
            return false;
        }

        const themeId = String(mainTheme.id).split('/').pop();

        // 2. Fetch settings_data.json for this theme
        const response = await admin.rest.get({
            path: `themes/${themeId}/assets.json`,
            query: { "asset[key]": "config/settings_data.json" }
        });

        if (!response.ok) {
            console.warn("CartBot ThemeCheck: Failed to fetch settings_data.json.", await response.text());
            return false;
        }

        const assetData = await response.json();
        const settingsValue = assetData.asset?.value;

        if (!settingsValue) return false;

        const settings = JSON.parse(settingsValue);

        // 3. Search for our app embed block (its key structure differs based on themes, 
        // but usually it's under current.blocks or similar. The block name is usually the extension ID/handle).
        // An easier approach is to search the JSON string for the block handle.
        // Our block handle is "cart-bot-theme-ext" or "cart_bot_embed" depending on what we named it in the UI.
        // Let's get the exact UID from shopify.extension.toml: "23b72d3c-0558-c17c-80a5-aed8a4b369eb3220dea9"
        // The format in settings_data.json is usually: `<app_id>/<extension_handle>`.

        // We will parse the 'blocks' object to find any block of type Shopify App Embed that belongs to us.
        // According to Shopify Docs: "type": "shopify://apps/<app_name>/blocks/<block_name>/<original_extension_id>"
        // Our block name is `cart_bot_embed`
        let isEnabled = false;
        if (settings.current && settings.current.blocks) {
            for (const key in settings.current.blocks) {
                const block = settings.current.blocks[key];

                if (block.type && typeof block.type === 'string' && block.type.includes("cart_bot_embed")) {
                    // If disabled is undefined or false, it's active
                    if (block.disabled === false || block.disabled === undefined) {
                        isEnabled = true;
                    }
                    break;
                }
            }
        }

        return isEnabled;
    } catch (error) {
        console.error("CartBot ThemeCheck Error:", error);
        return false;
    }
}
