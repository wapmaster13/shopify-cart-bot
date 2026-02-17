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

    // 1. Preluare date din metafield
    const rulesData = input.cartTransform?.metafield?.value;
    if (!rulesData) return NO_CHANGES;

    let rules;
    try {
        rules = JSON.parse(rulesData);
    } catch (e) {
        return NO_CHANGES;
    }

    if (!rules || !Array.isArray(rules)) return NO_CHANGES;

    // Sortăm după prioritate
    rules.sort((a, b) => (a.priority || 0) - (b.priority || 0));

    // 2. Calculăm subtotalul manual
    const cartLines = input.cart.lines;
    const subtotalAmount = cartLines.reduce((acc, line) => {
        return acc + parseFloat(line.cost?.totalAmount?.amount ?? "0");
    }, 0);

    const currencyCode = cartLines.find(l => l.cost?.totalAmount?.currencyCode)?.cost?.totalAmount?.currencyCode ?? "USD";

    // 3. Verificăm regulile
    for (const rule of rules) {
        let isMatch = false;

        if (rule.triggerType === "CART_VALUE") {
            if (subtotalAmount >= parseFloat(rule.minCartValue || "0")) {
                isMatch = true;
            }
        } 
        else if (rule.triggerType === "PRODUCTS") {
            const triggerIds = rule.triggerProductIds || []; // NU parsăm, este deja array
            isMatch = cartLines.some(line => triggerIds.includes(line.merchandise.id));
        } 
        else if (rule.triggerType === "COMBINED") {
            const hasValue = subtotalAmount >= parseFloat(rule.minCartValue || "0");
            const triggerIds = rule.triggerProductIds || [];
            const hasProduct = cartLines.some(line => triggerIds.includes(line.merchandise.id));
            isMatch = hasValue && hasProduct;
        }

        if (isMatch) {
            const giftIds = rule.giftVariantIds || [];
            if (giftIds.length === 0) continue;

            const giftId = giftIds[0];

            // Verificăm dacă cadoul e deja în coș
            const alreadyInCart = cartLines.some(line => line.merchandise.id === giftId);
            if (alreadyInCart && !rule.applyIfAlreadyInCart) continue;

            const targetLine = cartLines[0];
            if (!targetLine) return NO_CHANGES;

            // Returnăm operația de expandare
            return {
                operations: [
                    {
                        expand: {
                            cartLineId: targetLine.id,
                            title: "Cart Bundle",
                            expandedCartItems: [
                                {
                                    merchandiseId: targetLine.merchandise.id,
                                    quantity: targetLine.quantity,
                                },
                                {
                                    merchandiseId: giftId,
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