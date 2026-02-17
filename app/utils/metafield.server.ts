import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function syncGiftRules(admin: any, shop: string) {
    try {
        // 1. Fetch Active Rules
        const rules = await prisma.giftRule.findMany({
            where: { isActive: true, shop },
            orderBy: { priority: 'asc' }
        });

        // 2. Map to Minimal JSON for WASM
        const rulesData = rules.map(r => ({
            id: r.id,
            name: r.name,
            triggerType: r.triggerType,
            minCartValue: r.minCartValue,
            minQuantity: r.minQuantity,
            triggerProductIds: r.triggerProductIds ? JSON.parse(r.triggerProductIds) : [],
            giftVariantIds: r.giftVariantIds ? JSON.parse(r.giftVariantIds) : [],
            replaceTriggerItems: r.replaceTriggerItems,
            applyIfAlreadyInCart: r.applyIfAlreadyInCart,
            requireConsent: r.requireConsent,
            ajaxOnly: r.ajaxOnly,
            reverseLogic: r.reverseLogic
        }));

        console.log(`Syncing ${rulesData.length} rules to metafield cart_bot.rules_data`);

        // 3. Save to Metafield
        // We use the "cart_bot" namespace and "rules_data" key as requested
        const response = await admin.graphql(
            `#graphql
            mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
                metafieldsSet(metafields: $metafields) {
                    userErrors { field message }
                    metafields { id }
                }
            }`,
            {
                variables: {
                    metafields: [
                        {
                            ownerId: (await getShopId(admin)),
                            namespace: "cart_bot",
                            key: "rules_data",
                            type: "json",
                            value: JSON.stringify(rulesData)
                        }
                    ]
                }
            }
        );

        const json = await response.json();
        if (json.data?.metafieldsSet?.userErrors?.length > 0) {
            console.error("Metafield Sync Error:", json.data.metafieldsSet.userErrors);
        }

    } catch (e) {
        console.error("Sync Gift Rules Exception:", e);
    }
}

async function getShopId(admin: any) {
    const response = await admin.graphql(`{ shop { id } }`);
    const data = await response.json();
    return data.data.shop.id;
}

export async function ensureCartTransform(admin: any) {
    // 1. Check if function is active
    // We query cartTransforms to see if any exist
    const query = await admin.graphql(
        `#graphql
        query {
            cartTransforms(first: 1) {
                nodes {
                    id
                    functionId
                }
            }
        }`
    );
    const data = await query.json();
    const existing = data.data?.cartTransforms?.nodes;

    if (existing && existing.length > 0) {
        console.log("Cart Transform already active:", existing[0].id);
        return;
    }

    console.log("Activating Cart Transform function...");

    // 2. Activate Function if missing
    // We need the function ID. Usually this is provided by environment or we can query 'shopifyFunctions'
    // But specific cartTransformCreate requires the function ID.
    // For this environment, we might need to find the specific function by title/app?

    // Let's try to find our function first
    const functionsQuery = await admin.graphql(
        `#graphql
        query {
            shopifyFunctions(first: 10) {
                nodes {
                    id
                    title
                    apiType
                }
            }
        }`
    );
    const functionsData = await functionsQuery.json();
    const myFunc = functionsData.data?.shopifyFunctions?.nodes.find((f: any) => f.apiType === "cart_transform");

    if (!myFunc) {
        console.error("No Cart Transform function found in app.");
        return;
    }

    // 3. Create Cart Transform
    const create = await admin.graphql(
        `#graphql
        mutation CartTransformCreate($functionId: String!) {
            cartTransformCreate(functionId: $functionId) {
                cartTransform { id }
                userErrors { field message }
            }
        }`,
        {
            variables: { functionId: myFunc.id }
        }
    );

    const createJson = await create.json();
    console.log("Cart Transform Activated:", createJson);
}
