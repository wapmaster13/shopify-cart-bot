import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function syncGiftRules(admin: any, shop: string) {
    try {
        // 1. Găsim ID-ul activ al robotului (CartTransform)
        const ctQuery = await admin.graphql(`#graphql
            query { cartTransforms(first: 1) { nodes { id } } }
        `);
        const ctData = await ctQuery.json();
        const transformId = ctData.data?.cartTransforms?.nodes[0]?.id;

        if (!transformId) {
            console.error("❌ Nu am găsit niciun robot activ pentru a salva regulile.");
            return;
        }

        // 2. Preluăm regulile active
        const rules = await prisma.giftRule.findMany({
            where: { isActive: true, shop },
            orderBy: { priority: 'asc' }
        });

        // 3. Mapăm datele curat pentru robot
        const rulesData = rules.map(r => ({
            id: r.id,
            triggerType: r.triggerType,
            minCartValue: r.minCartValue,
            // Trimitem array-uri direct, NU string-uri
            triggerProductIds: r.triggerProductIds ? JSON.parse(r.triggerProductIds) : [],
            giftVariantIds: r.giftVariantIds ? JSON.parse(r.giftVariantIds) : [],
            applyIfAlreadyInCart: r.applyIfAlreadyInCart,
            notificationEnabled: r.notificationEnabled ?? true,
            notificationText: r.notificationText || "Free gift added to your order!",
            notificationBgColor: r.notificationBgColor || "#1a1a1a",
            notificationTextColor: r.notificationTextColor || "#ffffff",
            startDate: r.startDate ? new Date(r.startDate).getTime() : null,
            endDate: r.endDate ? new Date(r.endDate).getTime() : null,
            isActive: true
        }));

        console.log(`✅ Sincronizăm regulile pe ID-ul robotului: ${transformId}`);

        // 4. Salvăm Metafield-ul pe recordul robotului
        const response = await admin.graphql(
            `#graphql
            mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
                metafieldsSet(metafields: $metafields) {
                    userErrors { field message }
                }
            }`,
            {
                variables: {
                    metafields: [{
                        ownerId: transformId,
                        namespace: "cart_bot",
                        key: "rules_data",
                        type: "json",
                        value: JSON.stringify(rulesData)
                    }]
                }
            }
        );

        const resJson = await response.json();
        if (resJson.data?.metafieldsSet?.userErrors?.length > 0) {
            console.error("❌ Eroare Sincronizare Transform:", resJson.data.metafieldsSet.userErrors);
        }

        // 5. Salvam Metafield-ul si pe recordul Shop (PENTRU FRONTEND)
        try {
            const shopQuery = await admin.graphql(`{ shop { id } }`);
            const shopDataResp = await shopQuery.json();
            const shopId = shopDataResp.data?.shop?.id;

            if (shopId) {
                const shopMetaResponse = await admin.graphql(
                    `#graphql
                    mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
                        metafieldsSet(metafields: $metafields) {
                            userErrors { field message }
                        }
                    }`,
                    {
                        variables: {
                            metafields: [
                                {
                                    ownerId: shopId,
                                    namespace: "cartbot",
                                    key: "rules",
                                    type: "json",
                                    value: JSON.stringify(rulesData)
                                },
                                {
                                    ownerId: shopId,
                                    namespace: "cartbot",
                                    key: "last_updated",
                                    type: "number_integer",
                                    value: Math.floor(Date.now() / 1000).toString()
                                }
                            ]
                        }
                    }
                );

                const shopMetaJson = await shopMetaResponse.json();
                if (shopMetaJson.data?.metafieldsSet?.userErrors?.length > 0) {
                    console.error("❌ Eroare Sincronizare Shop:", shopMetaJson.data.metafieldsSet.userErrors);
                } else {
                    console.log(`✅ Reguli sincronizate pe Frontend (Shop): ${shopId}`);
                }
            }
        } catch (shopErr) {
            console.error("❌ Excepție Sincronizare Shop Frontend:", shopErr);
        }
    } catch (e) {
        console.error("❌ Excepție Sincronizare:", e);
    }
}

// Păstrează getShopId și ensureCartTransform neschimbate mai jos

async function getShopId(admin: any) {
    const response = await admin.graphql(`{ shop { id } }`);
    const data = await response.json();
    return data.data.shop.id;
}

export async function ensureCartTransform(admin: any) {
    const query = await admin.graphql(`{ cartTransforms(first: 1) { nodes { id } } }`);
    const data = await query.json();
    if (data.data?.cartTransforms?.nodes?.length > 0) return;

    const functionsQuery = await admin.graphql(`{ shopifyFunctions(first: 10) { nodes { id apiType } } }`);
    const functionsData = await functionsQuery.json();
    const myFunc = functionsData.data?.shopifyFunctions?.nodes.find((f: any) => f.apiType === "cart_transform");

    if (myFunc) {
        await admin.graphql(`#graphql
            mutation ctCreate($fId: String!) {
                cartTransformCreate(functionId: $fId) { cartTransform { id } }
            }`, { variables: { fId: myFunc.id } }
        );
    }
}