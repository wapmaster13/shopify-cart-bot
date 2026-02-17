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
    const NO_CHANGES = {
        operations: [],
    };

    // 1. Get configuration
    const rulesData = input.cartTransform?.metafield?.value;
    if (!rulesData) return NO_CHANGES;

    /** @type {Array<any>} */
    const rules = JSON.parse(rulesData);
    if (!rules || rules.length === 0) return NO_CHANGES;

    rules.sort((a, b) => (a.priority || 0) - (b.priority || 0));

    // 2. Calculate Subtotal From Line Costs
    const cartLines = input.cart.lines;

    const subtotalAmount = cartLines.reduce((acc, line) => {
        // totalAmount is already quantity * unit_price (usually)
        // or we can just trust totalAmount.amount
        return acc + parseFloat(line.cost?.totalAmount?.amount ?? "0");
    }, 0);

    // Grab currency from the first item that has it, or default to USD
    const currencyCode = cartLines.find(l => l.cost?.totalAmount?.currencyCode)?.cost?.totalAmount?.currencyCode ?? "USD";

    // 3. Match Rules
    for (const rule of rules) {
        if (!rule.isActive) continue;

        let isMatch = false;

        // Trigger: CART_VALUE
        if (rule.triggerType === "CART_VALUE") {
            if (subtotalAmount >= parseFloat(rule.minCartValue || "0")) {
                isMatch = true;
            }
        }
        // Trigger: PRODUCTS
        else if (rule.triggerType === "PRODUCTS") {
            const triggerProductIds = JSON.parse(rule.triggerProductIds || "[]");
            const hasTriggerProduct = cartLines.some(line =>
                line.merchandise.id && triggerProductIds.includes(line.merchandise.id)
            );
            if (hasTriggerProduct) {
                isMatch = true;
            }
        }
        // Trigger: COMBINED
        else if (rule.triggerType === "COMBINED") {
            const hasValue = subtotalAmount >= parseFloat(rule.minCartValue || "0");
            const triggerProductIds = JSON.parse(rule.triggerProductIds || "[]");
            const hasProduct = cartLines.some(line =>
                line.merchandise.id && triggerProductIds.includes(line.merchandise.id)
            );
            if (hasValue && hasProduct) {
                isMatch = true;
            }
        }

        if (isMatch) {
            const giftVariantIds = JSON.parse(rule.giftVariantIds || "[]");
            if (giftVariantIds.length === 0) continue;

            const giftVariantId = giftVariantIds[0];

            // Check if gift is already in cart
            const existingGiftLine = cartLines.find(line => line.merchandise.id === giftVariantId);
            if (existingGiftLine && !rule.applyIfAlreadyInCart) {
                continue;
            }

            const targetLine = cartLines[0];
            if (!targetLine) return NO_CHANGES;

            return {
                operations: [
                    {
                        expand: {
                            cartLineId: targetLine.id,
                            title: targetLine.merchandise.title || "Cart Bundle",
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
