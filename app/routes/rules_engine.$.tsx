import { LoaderFunctionArgs } from "@remix-run/node";
import prisma from "../db.server";
import shopify from "../shopify.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const shop = params["*"];

    if (!shop) {
        return new Response("console.error('CartBot: Shop domain missing');", {
            headers: { "Content-Type": "application/javascript" },
        });
    }

    try {
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
            if (shopify.sessionStorage && shopify.sessionStorage.findSessionsByShop) {
                const sessions = await shopify.sessionStorage.findSessionsByShop(shop);
                session = sessions.find(s => s.isOnline === false);
            }
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
                if (String(id).match(/^\d+$/)) allProductIds.add(String(id));
            });

            gifts.forEach((id: any) => {
                if (String(id).match(/^\d+$/)) allVariantIds.add(String(id));
            });
        });

        // --- GraphQL Query for Rich Data ---
        function toProductGid(id: string) { return `gid://shopify/Product/${id}`; }
        function toVariantGid(id: string) { return `gid://shopify/ProductVariant/${id}`; }

        const productGids = Array.from(allProductIds).map(toProductGid);
        const variantGids = Array.from(allVariantIds).map(toVariantGid);
        const nodesToFetch = [...productGids, ...variantGids];

        let enrichedData: Record<string, any> = {};

        if (session && nodesToFetch.length > 0) {
            try {
                // @ts-ignore
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
                        const simpleId = node.id.split('/').pop();
                        enrichedData[simpleId] = node;
                    });
                }
            } catch (e) {
                console.error("CartBot: GraphQL fetch failed", e);
            }
        }

        // Map to a rich format
        const clientRules = activeRules.map((rule) => {
            const triggerIds = rule.triggerProductIds ? JSON.parse(rule.triggerProductIds) : [];
            const giftIds = rule.giftVariantIds ? JSON.parse(rule.giftVariantIds) : [];

            const hydratedTriggers = triggerIds.map((id: any) => {
                const data = enrichedData[String(id)];
                return data ? { ...data, simpleId: id } : { id };
            });

            const hydratedGifts = giftIds.map((id: any) => {
                const data = enrichedData[String(id)];
                return data ? { ...data, simpleId: id } : { id };
            });

            return {
                id: rule.id,
                triggerType: rule.triggerType,
                triggerProducts: hydratedTriggers,
                minCartValue: rule.minCartValue,
                giftVariants: hydratedGifts,
                triggerProductIds: triggerIds,
                giftVariantIds: giftIds,
                applyIfAlreadyInCart: rule.applyIfAlreadyInCart,
            };
        });

        const jsContent = `
        (function() {
          if (window.CartBotRules) return;
          window.CartBotShop = "${shop}";
          window.CartBotRules = ${JSON.stringify(clientRules)};
          console.log("CartBot: Rules Loaded 🚀 (Rich Data)", window.CartBotRules);
        })();
      `;

        return new Response(jsContent, {
            headers: {
                "Content-Type": "application/javascript",
                "Cache-Control": "public, max-age=60",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (error) {
        // Fallback in case of server error
        console.error("CartBot: Loader Crash", error);
        return new Response(`console.error("CartBot: Rules failed to load", ${JSON.stringify(String(error))}); window.CartBotRules = [];`, {
            headers: { "Content-Type": "application/javascript" },
        });
    }
}
