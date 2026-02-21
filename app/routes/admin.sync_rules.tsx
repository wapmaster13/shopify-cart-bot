
import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const { session, admin } = await authenticate.admin(request);
    const shop = session.shop;

    try {
        // 1. Fetch Rules from DB
        const activeRules = await prisma.giftRule.findMany({
            where: {
                shop: shop,
                isActive: true, // Only sync active rules
                status: "ACTIVE"
            },
            orderBy: { priority: "asc" },
        });

        console.log(`Syncing ${activeRules.length} rules for ${shop}...`);

        // 2. Format Rules for Client (Simulate Rich Data if possible, or just IDs for now)
        // To keep it fast, we will just pass the IDs and raw config. 
        // The Client JS can handle simple rule logic. 
        // *Enhancement*: We could fetch product details here via Admin API, but let's start with raw data to get it working.

        const clientRules = activeRules.map((rule) => ({
            id: rule.id,
            triggerType: rule.triggerType,
            minCartValue: rule.minCartValue,
            triggerProductIds: rule.triggerProductIds ? JSON.parse(rule.triggerProductIds) : [],
            giftVariantIds: rule.giftVariantIds ? JSON.parse(rule.giftVariantIds) : [],
            applyIfAlreadyInCart: rule.applyIfAlreadyInCart,
        }));

        // 3. Save to Metafield
        const metafieldResponse = await admin.graphql(
            `#graphql
      mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
            key
            namespace
            value
          }
          userErrors {
            field
            message
          }
        }
      }`,
            {
                variables: {
                    metafields: [
                        {
                            namespace: "cartbot",
                            key: "rules",
                            type: "json",
                            value: JSON.stringify(clientRules),
                            ownerId: `gid://shopify/Shop/${session.id}`, // We need the Shop ID, but usually ownerId can be omitted for Shop context or inferred? 
                            // Actually, for Shop metafields, we don't need ownerId if using the right context, but `metafieldsSet` usually ensures it.
                            // Let's rely on standard 'shop' context if possible, but the ownerId might be tricky without a query first.
                            // Alternative: Use REST API to set shop metafield, or query Shop ID first.
                        }
                    ]
                },
            }
        );

        // Fallback: If ownerId is issue, query shop first
        // Check if the above mutation likely failed due to ownerId? 
        // Let's query Shop ID First to be safe.

        const shopData = await admin.graphql(`#graphql
      query {
        shop {
          id
        }
      }
    `);
        const shopJson = await shopData.json();
        const shopId = shopJson.data.shop.id;

        const finalResponse = await admin.graphql(
            `#graphql
      mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            key
            value
          }
          userErrors {
            field
            message
          }
        }
      }`,
            {
                variables: {
                    metafields: [
                        {
                            namespace: "cartbot",
                            key: "rules",
                            type: "json",
                            value: JSON.stringify(clientRules),
                            ownerId: shopId
                        }
                    ]
                }
            }
        );

        const result = await finalResponse.json();

        return new Response(JSON.stringify({
            status: "success",
            rules: clientRules,
            metafield_result: result
        }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("Sync Error:", error);
        return new Response(JSON.stringify({ status: "error", message: String(error) }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
