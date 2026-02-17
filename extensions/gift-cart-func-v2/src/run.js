// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
    const NO_CHANGES = { operations: [] };

    // 1. Preluăm regulile din Metafield
    const rulesData = input.cartTransform?.metafield?.value;
    if (!rulesData) return NO_CHANGES;

    let rules;
    try {
        rules = JSON.parse(rulesData);
    } catch (e) {
        return NO_CHANGES;
    }

    if (!rules || !Array.isArray(rules)) return NO_CHANGES;

    // Sortăm regulile după prioritate (cele mai mici numere primele)
    rules.sort((a, b) => (a.priority || 0) - (b.priority || 0));

    const cartLines = input.cart.lines;

    // 2. Calculăm subtotalul coșului
    const subtotalAmount = cartLines.reduce((acc, line) => {
        return acc + parseFloat(line.cost?.totalAmount?.amount ?? "0");
    }, 0);

    const currencyCode = cartLines.find(l => l.cost?.totalAmount?.currencyCode)?.cost?.totalAmount?.currencyCode ?? "USD";

    // 3. Verificăm regulile
    for (const rule of rules) {
        // Notă: regulile sunt deja filtrate ca fiind active în metafield.server.ts
        let isMatch = false;

        if (rule.triggerType === "CART_VALUE") {
            if (subtotalAmount >= parseFloat(rule.minCartValue || "0")) {
                isMatch = true;
            }
        } 
        else if (rule.triggerType === "PRODUCTS") {
            const triggerProductIds = rule.triggerProductIds || []; // NU mai parsăm aici
            isMatch = cartLines.some(line => triggerProductIds.includes(line.merchandise.id));
        }
        else if (rule.triggerType === "COMBINED") {
            const hasValue = subtotalAmount >= parseFloat(rule.minCartValue || "0");
            const triggerProductIds = rule.triggerProductIds || [];
            const hasProduct = cartLines.some(line => triggerProductIds.includes(line.merchandise.id));
            isMatch = hasValue && hasProduct;
        }

        if (isMatch) {
            const giftVariantIds = rule.giftVariantIds || [];
            if (giftVariantIds.length === 0) continue;

            const giftVariantId = giftVariantIds[0];

            // Verificăm dacă cadoul este deja în coș
            const alreadyPresent = cartLines.some(line => line.merchandise.id === giftVariantId);
            if (alreadyPresent && !rule.applyIfAlreadyInCart) continue;

            // Alegem prima linie ca ancoră pentru Bundle
            const targetLine = cartLines[0];
            if (!targetLine) return NO_CHANGES;

            return {
                operations: [
                    {
                        expand: {
                            cartLineId: targetLine.id,
                            title: "Gift Reward Applied",
                            expandedCartItems: [
                                {
                                    merchandiseId: targetLine.merchandise.id,
                                    quantity: targetLine.quantity,
                                },
                                {
                                    merchandiseId: giftVariantId,
                                    quantity: 1,
                                    price: {
                                        adjustment: {
                                            fixedPricePerUnit: {
                                                amount: "0.00",
                                                currencyCode: currencyCode
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            };
        }
    }

    return NO_CHANGES;
}