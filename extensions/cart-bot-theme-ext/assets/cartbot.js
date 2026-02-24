(function () {
    'use strict';

    // --- 1. Singleton Guard & Setup ---
    if (window.CartBotLoaded) return;
    window.CartBotLoaded = true;

    // Debug Indicator
    const debugIndicator = document.createElement('div');
    debugIndicator.id = 'cart-bot-initialized';
    debugIndicator.style.display = 'none';
    document.body.appendChild(debugIndicator);

    console.log("CartBot: Brain Loaded 🧠 v9.1 (Static CDN + Metafields)");

    const CONFIG = {
        debounceTime: 800, // Sync delay (wait for WASM)
        bucketDelay: 500,  // Token bucket refill delay
        bucketSize: 10,
        sections: ['cart-drawer', 'cart-icon-bubble', 'main-cart-items', 'cart-notification-button']
    };

    const STATE = {
        tokens: CONFIG.bucketSize,
        lastRefill: Date.now(),
        timeout: null,
        isSyncing: false,
        itemCount: 0
    };

    // --- Helper: Token Bucket ---
    function consumeToken() {
        const now = Date.now();
        const elapsedTime = now - STATE.lastRefill;
        if (elapsedTime > CONFIG.bucketDelay) {
            const tokensToAdd = Math.floor(elapsedTime / CONFIG.bucketDelay);
            STATE.tokens = Math.min(CONFIG.bucketSize, STATE.tokens + tokensToAdd);
            STATE.lastRefill = now;
        }

        if (STATE.tokens > 0) {
            STATE.tokens -= 1;
            return true;
        }
        return false;
    }

    // --- Helper: Universal Refresh Strategy ("Kitchen Sink") ---
    async function refreshCartUI(data, forceOpen = false) {
        console.log("🔴 CartBot: refreshCartUI called | forceOpen:", forceOpen);
        const debug = new URLSearchParams(window.location.search).has('cartbot_debug') || true;
        if (debug) console.log("CartBot: 🚿 Executing Kitchen Sink Refresh...");

        try {
            // 1. Native Dawn / Shopify Standard Web Components
            const cartDrawer = document.querySelector('cart-drawer');
            if (cartDrawer && typeof cartDrawer.renderContents === 'function') {
                if (debug) console.log("CartBot: [Native] cart-drawer.renderContents");
                cartDrawer.renderContents({ sections: data });
            }

            const cartNotification = document.querySelector('cart-notification');
            if (cartNotification && typeof cartNotification.renderContents === 'function') {
                cartNotification.renderContents({ sections: data });
            }

            // 2. Global Theme Objects (Legacy & Modern)
            if (window.SLIDECART_UPDATE) { if (debug) console.log("CartBot: [Global] SLIDECART_UPDATE"); window.SLIDECART_UPDATE(); }
            if (window.theme?.ajaxCart?.update) { if (debug) console.log("CartBot: [Global] theme.ajaxCart.update"); window.theme.ajaxCart.update(); }
            if (window.theme?.Cart?.updateCart) { window.theme.Cart.updateCart(); }
            if (window.theme?.MiniCart?.update) { window.theme.MiniCart.update(); }
            if (window.theme?.miniCart?.updateElements) { window.theme.miniCart.updateElements(); }
            if (window.theme?.updateCartSummaries) { window.theme.updateCartSummaries(); }
            if (window.ajaxCart?.load) { window.ajaxCart.load(); }
            if (window.CartJS?.getCart) { window.CartJS.getCart(); }
            if (window.cart?.getCart) { window.cart.getCart(); }
            if (window.refreshCart) { window.refreshCart(); }
            if (window.upcartRefreshCart) { window.upcartRefreshCart(); }
            if (window.updateCartDrawer) { window.updateCartDrawer(); }

            // 3. Third-Party Apps
            if (window.liquidAjaxCart?.update) { window.liquidAjaxCart.update(); }
            if (window.liquidAjaxCart?.cartRequestUpdate) { window.liquidAjaxCart.cartRequestUpdate(); }
            if (forceOpen && window.SLIDECART_OPEN) { setTimeout(() => window.SLIDECART_OPEN(), 500); }
            if (window.Rebuy?.Cart?.fetchShopifyCart) { window.Rebuy.Cart.fetchShopifyCart(); }
            if (window.HsCartDrawer?.updateSlideCart) { window.HsCartDrawer.updateSlideCart(); }

            // 4. Frameworks (Alpine.js)
            if (window.Alpine) {
                if (debug) console.log("CartBot: [Framework] Alpine.js detected");
                try { window.Alpine.store("main").fetchCart(); } catch (e) { }
                try { window.Alpine.store("xMiniCart").reLoad(); } catch (e) { }
            }

            // 5. DOM Events (The "Spray and Pray")
            const eventNames = [
                'cart:refresh',
                'cart:update',
                'cart:updated',
                'cart:build',
                'theme:cart:reload',
                'theme:cartchanged',
                'update_cart',
                'obsidian:upsell:refresh',
                'shapes:modalcart:afteradditem'
            ];

            eventNames.forEach(evt => {
                document.dispatchEvent(new CustomEvent(evt, { bubbles: true, detail: { open: forceOpen, cart: data } }));
                document.documentElement.dispatchEvent(new CustomEvent(evt, { bubbles: true, detail: { open: forceOpen, cart: data } }));
            });

            if (window.pubsub) {
                // We need full cart object for pubsub usually
                const cartRes = await fetch(window.Shopify.routes.root + 'cart.js');
                const cart = await cartRes.json();
                window.pubsub.publish('cart-update', { cart });
                if (debug) console.log("CartBot: [PubSub] Published cart-update");
            }

            // 6. Custom Elements (Dawn/theme-specific)
            const customCartElements = document.querySelectorAll('cart-items, cart-drawer-items, cart-note');
            customCartElements.forEach(el => {
                if (typeof el.onCartUpdate === 'function') {
                    if (debug) console.log("CartBot: [CustomElement] Calling onCartUpdate() on", el.tagName);
                    el.onCartUpdate();
                }
            });

            // 7. Manual DOM Fallback (Our surgical swap)
            Object.keys(data).forEach(sectionId => {
                const html = data[sectionId];
                if (!html) return;

                const selectors = [
                    '#' + sectionId,
                    '.' + sectionId,
                    '[id^="' + sectionId + '"]',
                    '.drawer__contents',
                    '.cart-drawer__items'
                ];

                let target = null;
                let matchedSelector = null;
                for (const s of selectors) {
                    if ((s.includes('drawer') || s.includes('items')) && sectionId !== 'cart-drawer' && sectionId !== 'main-cart-items') continue;
                    target = document.querySelector(s);
                    if (target) { matchedSelector = s; break; }
                }

                if (target) {
                    if (debug) console.log("CartBot: [DOM] Swapping", matchedSelector);
                    const div = document.createElement('div');
                    div.innerHTML = html;
                    let newEl = div.querySelector(matchedSelector) || div.querySelector('#' + sectionId) || div.firstElementChild;
                    if (newEl) target.innerHTML = newEl.innerHTML;
                    else target.innerHTML = html;
                }
            });

        } catch (e) {
            console.error("CartBot: Refresh error", e);
        }
    }


    // --- 2. Notification System ---
    function showGiftToaster(rule) {
        if (rule && rule.notificationEnabled === false) return;

        const bgColor = rule?.notificationBgColor || '#1a1a1a';
        const textColor = rule?.notificationTextColor || '#ffffff';
        const text = rule?.notificationText || 'Free gift added to your order!';
        const icon = rule?.consentIcon || '🎁';

        let toaster = document.getElementById('cart-bot-toaster');
        if (!toaster) {
            toaster = document.createElement('div');
            toaster.id = 'cart-bot-toaster';
            Object.assign(toaster.style, {
                position: 'fixed', bottom: '20px', right: '20px', zIndex: '2147483647',
                backgroundColor: bgColor, color: textColor, padding: '12px 24px',
                borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transform: 'translateY(150%)', transition: 'transform 0.4s ease-out',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px'
            });
            toaster.innerHTML = `<span>${icon}</span> <span>${text}</span>`;
            document.body.appendChild(toaster);
        } else {
            toaster.style.backgroundColor = bgColor;
            toaster.style.color = textColor;
            toaster.innerHTML = `<span>${icon}</span> <span>${text}</span>`;
        }
        requestAnimationFrame(() => toaster.style.transform = 'translateY(0)');
        setTimeout(() => { toaster.style.transform = 'translateY(150%)'; }, 4000);
    }

    // --- 2.2 Consent System ---
    function showConsentPopup(rule, giftText, onAccept, onDecline) {
        console.log("CartBot: 🛡️ showConsentPopup called.");

        let overlay = document.getElementById('cart-bot-consent-overlay');
        if (overlay) return; // Already showing

        overlay = document.createElement('div');
        overlay.id = 'cart-bot-consent-overlay';
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: '2147483646',
            display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)'
        });

        const modal = document.createElement('div');

        const title = rule?.consentTitle || "You unlocked a Free Gift!";
        const content = rule?.consentContent || giftText || "Would you like to add a free promotional item to your cart?";
        const acceptText = rule?.consentAcceptText || "Yes, add gift";
        const declineText = rule?.consentDeclineText || "No, thanks";
        const bgColor = rule?.consentBgColor || "#ffffff";
        const textColor = rule?.consentTextColor || "#1a1a1a";
        const acceptBgColor = rule?.consentAcceptBgColor || "#000000";
        const acceptTextColor = rule?.consentAcceptTextColor || "#ffffff";
        const declineBgColor = rule?.consentDeclineBgColor || "transparent";
        const declineTextColor = rule?.consentDeclineTextColor || "#000000";
        const titleColor = rule?.consentTitleColor || textColor;
        const consentIcon = rule?.consentIcon || "🎁";

        Object.assign(modal.style, {
            backgroundColor: bgColor, padding: '24px', borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)', maxWidth: '400px', width: '90%',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            textAlign: 'center', color: textColor
        });

        modal.innerHTML = `
            <div style="font-size: 40px; margin-bottom: 12px;">${consentIcon}</div>
            <h3 style="margin: 0 0 12px; font-size: 18px; font-weight: 600; color: ${titleColor};">${title}</h3>
            <p style="margin: 0 0 24px; font-size: 14px; opacity: 0.9;">${content}</p>
            <div style="display: flex; gap: 12px; justify-content: center;">
                <button id="cartbot-btn-decline" style="padding: 10px 20px; border: ${declineBgColor === 'transparent' ? `1px solid ${textColor}40` : 'none'}; background: ${declineBgColor}; color: ${declineTextColor}; border-radius: 6px; cursor: pointer; font-weight: 500; transition: all 0.2s;">${declineText}</button>
                <button id="cartbot-btn-accept" style="padding: 10px 20px; border: none; background: ${acceptBgColor}; color: ${acceptTextColor}; border-radius: 6px; cursor: pointer; font-weight: 500; transition: opacity 0.2s;">${acceptText}</button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        document.getElementById('cartbot-btn-decline').addEventListener('click', () => {
            overlay.remove();
            if (onDecline) onDecline();
        });

        document.getElementById('cartbot-btn-accept').addEventListener('click', () => {
            overlay.remove();
            if (onAccept) onAccept();
        });
    }

    // --- 2.5 Logic: Manage Gifts (Client Side) ---
    async function manageGifts(cart) {
        const rules = window.CartBotRules || [];
        const debug = new URLSearchParams(window.location.search).has('cartbot_debug');
        let changesMade = false;

        if (debug) console.log("CartBot: 🎁 Managing Gifts...", rules);

        const extractId = (id) => typeof id === 'string' && id.includes('gid://') ? Number(id.split('/').pop()) : Number(id);

        const cartTotal = cart.total_price / 100;

        const targetGifts = new Set();
        let requiresConsent = false;
        let consentRule = null;

        for (const rule of rules) {
            let eligible = false;

            // Check Cart Value
            const cartValuePassed = cartTotal >= parseFloat(rule.minCartValue || 0);

            // Check Product Purchase
            const triggerIds = rule.triggerProductIds || [];
            const productPassed = triggerIds.some(tid => {
                const numId = extractId(tid);
                return cart.items.some(i => i.product_id === numId || i.variant_id === numId || i.id === numId);
            });

            if (rule.triggerType === 'CART_VALUE') eligible = cartValuePassed;
            else if (rule.triggerType === 'PRODUCT_PURCHASE') eligible = productPassed;
            else if (rule.triggerType === 'COMBINED') eligible = cartValuePassed && productPassed;

            if (eligible) {
                const rawGifts = rule.giftVariantIds || (rule.giftVariants ? rule.giftVariants.map(v => v.id) : []);
                for (const rawG of rawGifts) {
                    if (!rawG) continue;
                    targetGifts.add(extractId(rawG));
                }
                if (rule.requireConsent) {
                    requiresConsent = true;
                    if (!consentRule) consentRule = rule;
                }
            }
        }

        const itemsToAdd = [];
        const itemsToRemoveKeys = {};

        // 1. Find which items to remove
        cart.items.forEach(item => {
            const isGift = item.properties && item.properties['_FreeGift'];
            const itemVid = item.variant_id || item.id;

            if (isGift && !targetGifts.has(itemVid)) {
                itemsToRemoveKeys[item.key] = 0; // Set quantity to 0 to remove
            }
        });

        // 2. Find which items to add
        targetGifts.forEach(giftVid => {
            const isInCart = cart.items.some(i => (i.variant_id || i.id) === giftVid);
            if (!isInCart) {
                itemsToAdd.push(giftVid);
            }
        });

        if (Object.keys(itemsToRemoveKeys).length > 0) {
            if (debug) console.log("CartBot: Removing Ineligible Gifts", itemsToRemoveKeys);
            try {
                await fetch(window.Shopify.routes.root + 'cart/update.js', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ updates: itemsToRemoveKeys })
                });
                changesMade = true;
            } catch (e) { console.error("CartBot: Remove Gift Error", e); }
        }

        if (itemsToAdd.length > 0) {
            console.log("CartBot: Items to Add evaluated:", itemsToAdd, "Requires Consent:", requiresConsent);

            if (requiresConsent) {
                console.log("CartBot: Consent is required. Attempting to show popup.");
                showConsentPopup(consentRule, "Would you like to add an eligible free gift to your order?", async () => {
                    try {
                        const addItems = itemsToAdd.map(id => ({ id: id, quantity: 1, properties: { '_FreeGift': 'true' } }));
                        await fetch(window.Shopify.routes.root + 'cart/add.js', {
                            method: 'POST', headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ items: addItems })
                        });
                        triggerSync(true); // Manually trigger since we handle result here
                    } catch (e) { console.error("CartBot: Add Gift Error", e); }
                }, () => {
                    console.log("CartBot: User declined consent from manageGifts popup.");
                });
            } else {
                if (debug) console.log(`CartBot: Consent not required. Adding Missing Gifts`, itemsToAdd);
                try {
                    const addItems = itemsToAdd.map(id => ({
                        id: id,
                        quantity: 1,
                        properties: { '_FreeGift': 'true' }
                    }));
                    await fetch(window.Shopify.routes.root + 'cart/add.js', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ items: addItems })
                    });
                    changesMade = true;
                } catch (e) { console.error("CartBot: Add Gift Error", e); }
            }
        }

        return changesMade;
    }

    // --- 3. Main Sync Logic ---
    async function syncCartUI(force = false, forceOpen = false) {
        console.log("🔴 CartBot: syncCartUI called | force:", force, "| forceOpen:", forceOpen);
        if (STATE.isSyncing && !force) return;
        if (!consumeToken() && !force) return;

        STATE.isSyncing = true;
        const debug = new URLSearchParams(window.location.search).has('cartbot_debug');

        try {
            if (debug) console.log("CartBot: Starting Sync...");

            // 1. Fetch Data
            const sectionsParam = CONFIG.sections.join(',');
            const [cartRes, uiRes] = await Promise.all([
                fetch(window.Shopify.routes.root + 'cart.js').then(r => r.json()),
                fetch(window.Shopify.routes.root + 'cart?sections=' + sectionsParam).then(r => r.json())
            ]);

            STATE.itemCount = cartRes.item_count;

            // 2. Manage Gifts (Client Side Logic)
            const giftsChanged = await manageGifts(cartRes);
            if (giftsChanged) {
                if (debug) console.log("CartBot: Gifts updated, recursing sync...");
                STATE.isSyncing = false; // Reset lock
                return syncCartUI(true, forceOpen); // Force recurse to update UI with new items
            }

            // 3. Update UI (Kitchen Sink)
            // Only force a UI update if we actively modified gifts (force === true) 
            // or if an interceptor explicitly requested it (forceOpen === true).
            // This prevents the cart drawer from popping open on every page load.
            if (force || forceOpen) {
                await refreshCartUI(uiRes, forceOpen);
            }

            // --- GIFT DETECTION (Toast) ---
            const hasGift = cartRes.items.some(item => item.final_price === 0 || (item.properties && item.properties['_FreeGift']));
            if (hasGift && !window.CartBotGiftShown) {
                const rule = window.CartBotRules && window.CartBotRules.length > 0 ? window.CartBotRules[0] : null;
                showGiftToaster(rule);
                window.CartBotGiftShown = true;
            }

        } catch (e) {
            console.error("CartBot: Sync failed", e);
        } finally {
            STATE.isSyncing = false;
        }
    }

    function triggerSync(forceOpen = false) {
        console.log("🔴 CartBot: triggerSync called | forceOpen:", forceOpen);
        if (STATE.timeout) clearTimeout(STATE.timeout);
        STATE.timeout = setTimeout(() => syncCartUI(false, forceOpen), CONFIG.debounceTime);
    }

    // --- 5. Aggressive Interceptors (Monkey-Patching) ---

    // --- 5. Aggressive Interceptors (Post-Add) ---

    window._cartBotAddingGift = false;

    async function injectGiftAsync(addedIds) {
        if (window._cartBotAddingGift) return;

        const rules = window.CartBotRules || [];
        if (rules.length === 0) return;

        const extractId = (id) => typeof id === 'string' && id.includes('gid://') ? Number(id.split('/').pop()) : Number(id);

        window._cartBotAddingGift = true;
        try {
            // 1. Fetch Latest Cart State
            const cartRes = await fetch(window.Shopify.routes.root + 'cart.js');
            const cart = await cartRes.json();
            const cartTotal = cart.total_price / 100;

            const targetGifts = new Set();
            const allowedGifts = new Set();
            let requiresConsent = false;
            let giftVariantIdsToAdd = [];
            let consentRule = null;

            console.log("CartBot: injectGiftAsync evaluating rules...", rules);

            // 2. Evaluate Rules Dynamically
            for (const rule of rules) {
                let eligible = false;

                // Matching Logic
                // Check Cart Value
                const cartValuePassed = cartTotal >= parseFloat(rule.minCartValue || 0);

                // Check Product Purchase
                const triggerIds = rule.triggerProductIds || [];
                const productPassed = triggerIds.some(tid => {
                    const numId = extractId(tid);
                    return cart.items.some(i => i.product_id === numId || i.variant_id === numId || i.id === numId);
                });

                if (rule.triggerType === 'CART_VALUE') eligible = cartValuePassed;
                else if (rule.triggerType === 'PRODUCT_PURCHASE' || rule.triggerType === 'PRODUCTS') eligible = productPassed;
                else if (rule.triggerType === 'COMBINED') eligible = cartValuePassed && productPassed;
                else if (rule.triggerType === 'QUANTITY') {
                    if (rule.countGlobalQuantity) {
                        let totalQualifyingQty = 0;
                        cart.items.forEach(item => {
                            const isGift = item.properties && item.properties['_FreeGift'];
                            if (!isGift) {
                                totalQualifyingQty += item.quantity;
                            }
                        });
                        eligible = totalQualifyingQty >= (rule.minQuantity || 0) && totalQualifyingQty <= (rule.maxQuantity || 999999);
                    } else {
                        eligible = cart.items.some(item => {
                            const isGift = item.properties && item.properties['_FreeGift'];
                            if (!isGift) {
                                return item.quantity >= (rule.minQuantity || 0) && item.quantity <= (rule.maxQuantity || 999999);
                            }
                            return false;
                        });
                    }
                } else {
                    eligible = true;
                }

                if (eligible) {
                    const rawGifts = rule.giftVariantIds || (rule.giftVariants ? rule.giftVariants.map(v => v.id) : []);
                    for (const rawG of rawGifts) {
                        if (!rawG) continue;
                        const potentialGiftId = extractId(rawG);

                        // Check for Existing Gift
                        const alreadyHasGift = cart.items.some(item => (item.variant_id === potentialGiftId || item.id === potentialGiftId) && item.properties && item.properties['_FreeGift']);

                        // Check if user manually added it
                        const manuallyAdded = cart.items.some(item => (item.variant_id === potentialGiftId || item.id === potentialGiftId) && (!item.properties || !item.properties['_FreeGift']));

                        if (alreadyHasGift) {
                            continue;
                        }

                        if (manuallyAdded && !rule.applyIfAlreadyInCart) {
                            console.log(`CartBot: Skipping gift injection of ${potentialGiftId} because user already added it manually and applyIfAlreadyInCart is disabled.`);
                            continue;
                        }

                        if (!giftVariantIdsToAdd.includes(potentialGiftId)) {
                            giftVariantIdsToAdd.push(potentialGiftId);
                        }
                    }

                    if (rule.requireConsent) {
                        requiresConsent = true;
                        if (!consentRule) consentRule = rule;
                    }
                    break;
                }
            }

            // 5. Execute Secondary Request
            if (giftVariantIdsToAdd.length > 0) {
                console.log("CartBot: Intercepted theme add! Sending secondary request for gifts...", giftVariantIdsToAdd);

                let anySuccess = false;

                if (requiresConsent) {
                    console.log("CartBot: Consent is required. Trying to pop up.");
                    showConsentPopup(consentRule, "Would you like to add an eligible free gift to your order?", async () => {
                        for (const potentialGiftId of giftVariantIdsToAdd) {
                            try {
                                const res = await fetch(window.Shopify.routes.root + 'cart/add.js', {
                                    method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                                    body: JSON.stringify({ items: [{ id: potentialGiftId, quantity: 1, properties: { '_FreeGift': 'true' } }] })
                                });
                                if (res.ok) anySuccess = true;
                            } catch (err) { }
                        }
                        if (anySuccess) setTimeout(() => triggerSync(true), 100);
                    });
                } else {
                    console.log(`CartBot: Adding gifts silently because Consent is not required.`);
                    for (const potentialGiftId of giftVariantIdsToAdd) {
                        try {
                            const res = await fetch(window.Shopify.routes.root + 'cart/add.js', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                                body: JSON.stringify({
                                    items: [{
                                        id: potentialGiftId,
                                        quantity: 1,
                                        properties: { '_FreeGift': 'true' }
                                    }]
                                })
                            });

                            if (res.ok) {
                                anySuccess = true;
                                console.log(`CartBot: Successfully added gift: ${potentialGiftId}`);
                            } else {
                                console.warn(`CartBot: Failed to add gift ${potentialGiftId}. It might be out of stock or rejected by Shopify.`, await res.text());
                            }
                        } catch (err) {
                            console.error(`CartBot: Network error adding gift ${potentialGiftId}`, err);
                        }
                    }

                    if (anySuccess) {
                        setTimeout(() => triggerSync(true), 100);
                    }
                }
            }
        } catch (e) {
            console.error("CartBot: Failed to process async gift injection", e);
        } finally {
            setTimeout(() => { window._cartBotAddingGift = false; }, 1000);
        }
    }

    window._cartBotValidating = false;

    async function validateCartStateAsync() {
        if (window._cartBotValidating) return;
        window._cartBotValidating = true;
        try {
            const cartRes = await fetch(window.Shopify.routes.root + 'cart.js');
            const cart = await cartRes.json();

            const regularItems = cart.items.filter(item => !item.properties || !item.properties['_FreeGift']);
            const giftItems = cart.items.filter(item => item.properties && item.properties['_FreeGift']);

            if (giftItems.length === 0) return;

            // Scenario A: No regular items left, but gifts remain
            if (regularItems.length === 0 && giftItems.length > 0) {
                console.log("CartBot: Only gifts left. Clearing cart...");
                const res = await fetch(window.Shopify.routes.root + 'cart/clear.js', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
                });
                if (res.ok) {
                    window._cartBotValidating = false;
                    window.location.reload();
                    return;
                }
            }

            // Scenario B: Standard Validation
            if (regularItems.length > 0 && giftItems.length > 0) {
                const cartTotalWithoutGifts = regularItems.reduce((total, item) => total + item.final_line_price, 0) / 100;
                const rules = window.CartBotRules || [];
                const extractId = (id) => typeof id === 'string' && id.includes('gid://') ? Number(id.split('/').pop()) : Number(id);

                let giftsToRemove = [];

                for (const giftItem of giftItems) {
                    let isValid = false;

                    for (const rule of rules) {
                        const rawGifts = rule.giftVariantIds || (rule.giftVariants ? rule.giftVariants.map(v => v.id) : []);
                        const ruleGiftIds = rawGifts.map(extractId);

                        if (!ruleGiftIds.includes(giftItem.variant_id) && !ruleGiftIds.includes(giftItem.id)) continue;

                        let isMatch = false;
                        if (rule.triggerType === 'CART_VALUE') {
                            isMatch = cartTotalWithoutGifts >= parseFloat(rule.minCartValue || 0);
                        }
                        else if (rule.triggerType === 'QUANTITY') {
                            if (rule.countGlobalQuantity) {
                                let totalQualifyingQty = 0;
                                regularItems.forEach(item => {
                                    totalQualifyingQty += item.quantity;
                                });
                                isMatch = totalQualifyingQty >= (rule.minQuantity || 0) && totalQualifyingQty <= (rule.maxQuantity || 999999);
                            } else {
                                isMatch = regularItems.some(item => item.quantity >= (rule.minQuantity || 0) && item.quantity <= (rule.maxQuantity || 999999));
                            }
                        }
                        else if (rule.triggerType === 'PRODUCT_PURCHASE' || rule.triggerType === 'COMBINED') {
                            const triggerIds = (rule.triggerProductIds || []).map(extractId);
                            const cartMatch = triggerIds.some(tid => cart.items.some(i => (i.product_id === tid || i.variant_id === tid || i.id === tid) && (!i.properties || !i.properties['_FreeGift'])));

                            if (rule.triggerType === 'COMBINED') {
                                isMatch = cartMatch && (cartTotalWithoutGifts >= parseFloat(rule.minCartValue || 0));
                            } else {
                                isMatch = cartMatch;
                            }
                        } else {
                            isMatch = true;
                        }

                        if (isMatch) {
                            isValid = true;
                            break;
                        }
                    }

                    if (!isValid) {
                        giftsToRemove.push(giftItem.key);
                    }
                }

                if (giftsToRemove.length > 0) {
                    console.log("CartBot: Rules no longer met! Removing unqualified gifts...", giftsToRemove);

                    for (let key of giftsToRemove) {
                        const res = await fetch(window.Shopify.routes.root + 'cart/change.js', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                            body: JSON.stringify({ id: key, quantity: 0 })
                        });
                        if (res.ok) {
                            console.log("CartBot: Successfully removed unqualified gift.");
                            setTimeout(() => triggerSync(true), 150);
                        }
                    }
                }
            }
        } catch (e) {
            console.error("CartBot: Failed to validate cart state", e);
        } finally {
            setTimeout(() => { window._cartBotValidating = false; }, 1000);
        }
    }

    function extractIdsFromPayload(body) {
        let addedIds = [];
        try {
            if (body instanceof FormData) {
                const id = body.get('id');
                if (id) addedIds.push(Number(id));
                let i = 0;
                while (body.get('items[' + i + '][id]')) {
                    addedIds.push(Number(body.get('items[' + i + '][id]')));
                    i++;
                }
            } else if (typeof body === 'string') {
                if (body.includes('=') && !body.startsWith('{')) {
                    const params = new URLSearchParams(body);
                    const id = params.get('id');
                    if (id) addedIds.push(Number(id));
                } else {
                    let parsed = JSON.parse(body);
                    let items = parsed.items ? parsed.items : [parsed];
                    addedIds = items.map(i => Number(i.id || i.variant_id)).filter(id => id);
                }
            }
        } catch (e) { }
        return addedIds;
    }

    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
        let url = args[0] && (typeof args[0] === 'string' ? args[0] : args[0].url);
        let isCartAdd = url && url.includes('/cart/add');
        let init = args[1];
        let addedIds = (isCartAdd && init && init.body) ? extractIdsFromPayload(init.body) : [];

        if (isCartAdd && !window._cartBotAddingGift) {
            try {
                const response = await originalFetch.apply(this, args);
                if (response.ok) {
                    await injectGiftAsync(addedIds);
                }
                return response;
            } catch (e) {
                return originalFetch.apply(this, args);
            }
        }

        const fetchPromise = originalFetch.apply(this, args);

        if (url && (url.includes('/cart/update') || url.includes('/cart/change') || url.includes('/cart/clear'))) {
            fetchPromise.then(async (response) => {
                if (response.ok) {
                    setTimeout(() => triggerSync(false), 100);
                    if (!window._cartBotAddingGift && !window._cartBotValidating) {
                        setTimeout(() => validateCartStateAsync(), 300);
                    }
                }
            });
        }
        return fetchPromise;
    };

    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        this._cartbotUrl = url;
        return originalOpen.call(this, method, url, ...rest);
    };

    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function (body) {
        let isCartAdd = this._cartbotUrl && this._cartbotUrl.includes('/cart/add');
        let addedIds = isCartAdd ? extractIdsFromPayload(body) : [];

        this.addEventListener('load', function () {
            if (this.responseURL && this.status >= 200 && this.status < 300) {
                if (this.responseURL.includes('/cart/add') && !window._cartBotAddingGift) {
                    injectGiftAsync(addedIds);
                } else if (this.responseURL.includes('/cart/update') || this.responseURL.includes('/cart/change') || this.responseURL.includes('/cart/clear')) {
                    setTimeout(() => triggerSync(false), 100);
                    if (!window._cartBotAddingGift && !window._cartBotValidating) {
                        setTimeout(() => validateCartStateAsync(), 300);
                    }
                }
            }
        });
        return originalSend.call(this, body);
    };

    // Init Check
    triggerSync();

})();
