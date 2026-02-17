// @ts-check

export function run(input) {
    const NO_CHANGES = { operations: [] };
    const metafieldValue = input.cartTransform?.metafield?.value;
    if (!metafieldValue) return NO_CHANGES;

    const rules = JSON.parse(metafieldValue);
    const cartLines = input.cart.lines || [];
    if (cartLines.length === 0) return NO_CHANGES;

    const subtotal = cartLines.reduce((acc, line) => acc + parseFloat(line.cost.totalAmount.amount), 0);

    for (const rule of rules) {
        // Verificăm dacă regula este activă și dacă pragul de bani a fost atins
        if (!rule.isActive || subtotal < parseFloat(rule.minCartValue || "0")) continue;

        const giftId = rule.giftVariantIds?.[0];
        // Nu adăugăm dacă nu avem ID de cadou sau dacă acesta e deja în coș
        if (!giftId || cartLines.some(l => l.merchandise.id === giftId)) continue;

        const targetLine = cartLines[0];
        const unitPrice = (parseFloat(targetLine.cost.totalAmount.amount) / targetLine.quantity).toFixed(2);
        const currencyCode = targetLine.cost.totalAmount.currencyCode;

        return {
            operations: [{
                expand: {
                    cartLineId: targetLine.id,
                    title: `${targetLine.merchandise.product.title} + FREE GIFT`,
                    expandedCartItems: [
                        { 
                            merchandiseId: targetLine.merchandise.id, 
                            quantity: targetLine.quantity, 
                            price: { adjustment: { fixedPricePerUnit: { amount: unitPrice } } } 
                        },
                        { 
                            merchandiseId: giftId, 
                            quantity: 1, 
                            price: { adjustment: { fixedPricePerUnit: { amount: "0.00" } } } 
                        }
                    ]
                }
            }]
        };
    }
    return NO_CHANGES;
}