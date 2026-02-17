// @ts-check

export function run(input) {
    const NO_CHANGES = { operations: [] };

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

    // Calculăm subtotalul
    const subtotal = cartLines.reduce((acc, line) => {
        return acc + parseFloat(line.cost?.totalAmount?.amount ?? "0");
    }, 0);

    // DEBUG: Trimitem un mesaj la stderr (va apărea în log-urile JSON)
    // console.error(`Subtotal detected: ${subtotal}`);

    for (const rule of rules) {
        if (!rule.isActive) continue;

        let isMatch = false;
        if (rule.triggerType === "CART_VALUE" && subtotal >= parseFloat(rule.minCartValue || "0")) {
            isMatch = true;
        }

        if (isMatch) {
            const giftVariantId = rule.giftVariantIds?.[0];
            if (!giftVariantId) continue;

            if (cartLines.some(l => l.merchandise.id === giftVariantId) && !rule.applyIfAlreadyInCart) continue;

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
                                price: { 
                                    adjustment: { 
                                        fixedPricePerUnit: { 
                                            amount: "0.00" // FIX: Am șters currencyCode!
                                        } 
                                    } 
                                }
                            }
                        ]
                    }
                }]
            };
        }
    }

    return NO_CHANGES;
}