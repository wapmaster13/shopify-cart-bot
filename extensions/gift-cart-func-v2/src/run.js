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

    // 1. Verificare sigură a datelor din Metafield
    const metafieldValue = input.cartTransform?.metafield?.value;
    if (!metafieldValue) return NO_CHANGES;

    let rules = [];
    try {
        rules = JSON.parse(metafieldValue);
    } catch (e) {
        return NO_CHANGES;
    }

    if (!Array.isArray(rules) || rules.length === 0) return NO_CHANGES;

    const cartLines = input.cart.lines || [];
    if (cartLines.length === 0) return NO_CHANGES;

    // 2. Calcul subtotal manual (cel mai sigur mod)
    const subtotal = cartLines.reduce((acc, line) => {
        return acc + parseFloat(line.cost?.totalAmount?.amount ?? "0");
    }, 0);

    const currencyCode = cartLines[0]?.cost?.totalAmount?.currencyCode ?? "USD";

    // 3. Procesare reguli
    for (const rule of rules) {
        if (!rule.isActive) continue;

        let isMatch = false;

        // Verificare Prag de Valoare
        if (rule.triggerType === "CART_VALUE") {
            if (subtotal >= parseFloat(rule.minCartValue || "0")) {
                isMatch = true;
            }
        } 
        // Verificare Produse Specifice (Observă: NU mai folosim JSON.parse aici)
        else if (rule.triggerType === "PRODUCTS") {
            const triggerIds = rule.triggerProductIds || [];
            isMatch = cartLines.some(line => triggerIds.includes(line.merchandise.id));
        }

        if (isMatch) {
            const giftVariantId = rule.giftVariantIds?.[0];
            if (!giftVariantId) continue;

            // Verificăm dacă cadoul este deja în coș
            const isAlreadyPresent = cartLines.some(l => l.merchandise.id === giftVariantId);
            if (isAlreadyPresent && !rule.applyIfAlreadyInCart) continue;

            const targetLine = cartLines[0];
            return {
                operations: [{
                    expand: {
                        cartLineId: targetLine.id,
                        title: "Gift Reward Applied",
                        expandedCartItems: [
                            { merchandiseId: targetLine.merchandise.id, quantity: targetLine.quantity },
                            {
                                merchandiseId: giftVariantId,
                                quantity: 1,
                                price: { adjustment: { fixedPricePerUnit: { amount: "0.00", currencyCode } } }
                            }
                        ]
                    }
                }]
            };
        }
    }

    return NO_CHANGES;
}