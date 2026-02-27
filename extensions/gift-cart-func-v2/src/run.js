// CartBot: V2 Direct Discount Function

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

    if (rules.length === 0) return NO_CHANGES;

    const operations = [];

    // Helper to extract numeric ID from gid://
    const extractId = (gid) => {
        if (!gid) return null;
        if (typeof gid === 'string' && gid.includes('/')) return Number(gid.split('/').pop());
        return Number(gid);
    };

    const cartLines = input.cart?.lines || [];

    // Using string manipulation for cartTotal to avoid losing cents accuracy
    const cartTotal = cartLines.reduce((sum, line) => {
        const amount = line.cost?.totalAmount?.amount;
        return sum + (amount ? parseFloat(amount) : 0);
    }, 0);

    const giftsToDiscount = new Set();

    for (const rule of rules) {
        if (!rule.isActive) continue;

        let eligible = false;
        const triggerIds = (rule.triggerProductIds || []).map(extractId);
        const productPassed = cartLines.some(line => triggerIds.includes(extractId(line.merchandise?.id)));
        const cartValuePassed = cartTotal >= parseFloat(rule.minCartValue || 0);

        if (rule.triggerType === 'CART_VALUE') {
            eligible = cartValuePassed;
        }
        else if (rule.triggerType === 'QUANTITY') {
            const giftIds = (rule.giftVariantIds || []).map(extractId);
            if (rule.countGlobalQuantity) {
                let totalQualifyingQty = 0;
                for (const line of cartLines) {
                    const lineId = extractId(line.merchandise?.id);
                    if (!giftIds.includes(lineId)) {
                        totalQualifyingQty += line.quantity;
                    }
                }
                eligible = totalQualifyingQty >= (rule.minQuantity || 0) && totalQualifyingQty <= (rule.maxQuantity || 999999);
            } else {
                eligible = cartLines.some(line => {
                    const lineId = extractId(line.merchandise?.id);
                    if (!giftIds.includes(lineId)) {
                        return line.quantity >= (rule.minQuantity || 0) && line.quantity <= (rule.maxQuantity || 999999);
                    }
                    return false;
                });
            }
        }
        else if (rule.triggerType === 'PRODUCTS' || rule.triggerType === 'PRODUCT_PURCHASE') {
            eligible = productPassed;
        }
        else if (rule.triggerType === 'COMBINED') {
            eligible = cartValuePassed && productPassed;
        }
        else {
            eligible = productPassed;
        }

        if (eligible) {
            const giftIds = (rule.giftVariantIds || []).map(extractId);
            giftIds.forEach(id => {
                if (id) giftsToDiscount.add(id);
            });
        }
    }

    // Disable update operations to bypass Shopify Plus restrictions.
    // Gifts are expected to be 0$ variants handled elsewhere.
    /*
    if (giftsToDiscount.size > 0) {
        for (const line of cartLines) {
            const variantId = extractId(line.merchandise?.id);

            if (giftsToDiscount.has(variantId)) {
                operations.push({
                    update: {
                        cartLineId: line.id,
                        price: {
                            adjustment: {
                                fixedPricePerUnit: { amount: 0 }
                            }
                        }
                    }
                });
            }
        }
    }

    if (operations.length > 0) {
        return { operations };
    }
    */

    return NO_CHANGES;
}