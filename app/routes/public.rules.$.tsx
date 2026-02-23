import { LoaderFunctionArgs } from "@remix-run/node";
import prisma from "../db.server";
import shopify from "../shopify.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const shop = params["*"];

    // Determine the absolute server origin to tell the storefront JS where to ping back
    const url = new URL(request.url);
    const serverUrl = `${url.protocol}//${url.host}`;

    if (!shop) {
        return new Response("console.error('CartBot: Shop domain missing');", {
            headers: { "Content-Type": "application/javascript" },
        });
    }

    // Fetch active rules from Prisma
    const activeRules = await prisma.giftRule.findMany({
        where: {
            shop: shop,
            isActive: true,
            status: "ACTIVE",
        },
        orderBy: { priority: "asc" },
    });

    // Authenticate with offline session to use Admin API
    let session = undefined;
    try {
        const sessions = await shopify.sessionStorage.findSessionsByShop(shop);
        session = sessions.find(s => s.isOnline === false);
    } catch (e) {
        console.error("CartBot: Failed to load offline session", e);
    }

    // Collect all relevant IDs (Trigger + Gift)
    let allVariantIds = new Set<string>();
    let allProductIds = new Set<string>();

    activeRules.forEach((r: any) => {
        const triggers = r.triggerProductIds ? JSON.parse(r.triggerProductIds) : [];
        const gifts = r.giftVariantIds ? JSON.parse(r.giftVariantIds) : [];

        triggers.forEach((id: any) => {
            // Check if ID looks like a product ID or variant ID (usually just use it as is for query)
            // Assuming simplified "triggerProductIds" stores product IDs (gid://shopify/Product/...) or numeric
            // If strictly numeric, we might need to guess the prefix.
            // For now, let's treat them as potential Product IDs.
            if (String(id).match(/^\d+$/)) allProductIds.add(String(id));
        });

        // Gifts are usually variants
        gifts.forEach((id: any) => {
            if (String(id).match(/^\d+$/)) allVariantIds.add(String(id));
        });
    });

    // --- GraphQL Query for Rich Data ---
    // We will query nodes by ID to get details.
    // Note: We need GIDs. 
    function toProductGid(id: string) { return `gid://shopify/Product/${id}`; }
    function toVariantGid(id: string) { return `gid://shopify/ProductVariant/${id}`; }

    const productGids = Array.from(allProductIds).map(toProductGid);
    const variantGids = Array.from(allVariantIds).map(toVariantGid);
    const nodesToFetch = [...productGids, ...variantGids];

    let enrichedData: Record<string, any> = {};

    if (session && nodesToFetch.length > 0) {
        try {
            // @ts-ignore - shopify.clients is valid but types might be tricky with the remix adapter
            const client = new shopify.clients.Graphql({ session });
            const response = await client.request(`
                query ($ids: [ID!]!) {
                    nodes(ids: $ids) {
                        ... on Product {
                            id
                            title
                            handle
                            featuredImage { url altText }
                            variants(first: 10) { nodes { id title price } }
                        }
                        ... on ProductVariant {
                            id
                            title
                            price
                            product { id title handle featuredImage { url } }
                        }
                    }
                }
            `, { variables: { ids: nodesToFetch } });

            if (response.data && response.data.nodes) {
                response.data.nodes.forEach((node: any) => {
                    if (!node) return;
                    // Normalize ID (remove GID prefix for JS comparison)
                    const simpleId = node.id.split('/').pop();
                    enrichedData[simpleId] = node;
                });
            }
        } catch (e) {
            console.error("CartBot: GraphQL fetch failed", e);
        }
    }

    // Map to a rich format for the frontend
    const clientRules = activeRules.map((rule) => {
        const triggerIds = rule.triggerProductIds ? JSON.parse(rule.triggerProductIds) : [];
        const giftIds = rule.giftVariantIds ? JSON.parse(rule.giftVariantIds) : [];

        // Hydrate Triggers
        const hydratedTriggers = triggerIds.map((id: any) => {
            const data = enrichedData[String(id)];
            return data ? { ...data, simpleId: id } : { id };
        });

        // Hydrate Gifts
        const hydratedGifts = giftIds.map((id: any) => {
            const data = enrichedData[String(id)];
            return data ? { ...data, simpleId: id } : { id };
        });

        return {
            id: rule.id,
            triggerType: rule.triggerType,
            triggerProducts: hydratedTriggers,
            minCartValue: rule.minCartValue,
            minQuantity: rule.minQuantity,
            maxQuantity: rule.maxQuantity,
            countGlobalQuantity: rule.countGlobalQuantity,
            giftVariants: hydratedGifts,
            // Legacy/Simple IDs for quick checks
            triggerProductIds: triggerIds,
            giftVariantIds: giftIds,
            applyIfAlreadyInCart: rule.applyIfAlreadyInCart,
            // Notifications
            notificationEnabled: rule.notificationEnabled,
            notificationText: rule.notificationText,
            notificationBgColor: rule.notificationBgColor,
            notificationTextColor: rule.notificationTextColor,
            // Scheduling
            startDate: rule.startDate ? new Date(rule.startDate).getTime() : null,
            endDate: rule.endDate ? new Date(rule.endDate).getTime() : null,
        };
    });


    const jsContent = `
    (function() {
      if (window.CartBotRules) return;
      
      const shop = "${shop}";
      const serverUrl = "${serverUrl}";
      const rawRules = ${JSON.stringify(clientRules)};
      const validRules = [];
      const now = Date.now();

      rawRules.forEach(rule => {
          if (rule.endDate && now > rule.endDate) {
              // Lazy-Cleanup: Immediately tell backend to kill expired bot
              if (!window.CartBotExpireSent) {
                  window.CartBotExpireSent = true;
                  fetch(serverUrl + '/api/cartbot/expire', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ shop: shop, ruleId: rule.id })
                  }).then(res => res.json()).then(data => {
                      if (data.expired) {
                          console.log("CartBot: Stale bot wiped from network.");
                          // Optional: force a cart refresh if we suspect the cart has stale discounts
                          if (window.CartBotRefreshUI) window.CartBotRefreshUI();
                      }
                  }).catch(console.error);
              }
          } else {
              validRules.push(rule);
          }
      });

      window.CartBotShop = shop;
      window.CartBotServerUrl = serverUrl;
      window.CartBotRules = validRules;
      console.log("CartBot: Rules Loaded 🚀", window.CartBotRules);
    })();
  `;

    return new Response(jsContent, {
        headers: {
            "Content-Type": "application/javascript",
            "Cache-Control": "public, max-age=31536000",
            ...corsHeaders
        },
    });
}

// --- CORS Headers ---
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "ngrok-skip-browser-warning, Content-Type, Accept",
};

// --- Preflight Handler ---
export const action = async ({ request }: { request: Request }) => {
    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: corsHeaders,
        });
    }
    return new Response("Method Not Allowed", { status: 405 });
};
