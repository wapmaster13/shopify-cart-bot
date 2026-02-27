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
        debounceTime: 200, // Sync delay (wait for WASM)
        bucketDelay: 200,  // Token bucket refill delay
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
    async function universalCartRefresh(data = null, forceOpen = false) {
        console.log("🔴 CartBot: universalCartRefresh called | forceOpen:", forceOpen);
        const debug = new URLSearchParams(window.location.search).has('cartbot_debug') || true;

        // --- 1. PREMIUM THEME SUPPORT (The Hydration Fix for Horizon, etc.) ---
        let premiumRefreshSuccess = false;
        try {
            const cartEl = document.querySelector('[data-section-id]');
            if (cartEl) {
                const sectionId = cartEl.getAttribute('data-section-id');
                const res = await fetch(window.Shopify.routes.root + '?sections=' + sectionId);
                const sectionData = await res.json();

                if (sectionData[sectionId]) {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = sectionData[sectionId];

                    // 1. Identify the inner cart items container (NEVER the outer drawer wrapper)
                    const validSelectors = 'cart-items-component, cart-items, cart-drawer-items, [data-ajax-cart-section]';
                    // Find the active element, strictly ensuring it is NOT inside a <template>
                    const oldCartItems = Array.from(document.querySelectorAll(validSelectors)).find(el => !el.closest('template'));

                    if (oldCartItems) {
                        // 2. PRECISION MATCHING: Find the exact same tagName in the new HTML, ignoring templates
                        const tagName = oldCartItems.tagName.toLowerCase(); // e.g., 'cart-items-component'
                        const newCartItems = Array.from(tempDiv.querySelectorAll(tagName)).find(el => !el.closest('template'));

                        if (newCartItems && oldCartItems) {
                            // Because we target the inner component, the outer <dialog open> is UNTOUCHED.
                            // The drawer will NOT close!
                            oldCartItems.innerHTML = newCartItems.innerHTML;

                            // 3. Hydration Fix (Re-inject scripts)
                            const scripts = oldCartItems.querySelectorAll('script');
                            scripts.forEach(oldScript => {
                                const newScript = document.createElement('script');
                                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                                oldScript.parentNode.replaceChild(newScript, oldScript);
                            });

                            // 4. Update Bubble Count
                            const oldBubble = document.querySelector('cart-count, .cart-count-bubble, .cart-bubble__text-count');
                            const newBubble = tempDiv.querySelector('cart-count, .cart-count-bubble, .cart-bubble__text-count');
                            if (oldBubble && newBubble) oldBubble.innerHTML = newBubble.innerHTML;

                            premiumRefreshSuccess = true;
                            if (debug) console.log("CartBot: Hydration DOM swap successful with precision matching.");
                        }
                    }
                }
            }
        } catch (e) {
            if (debug) console.log("CartBot: Premium section fetch failed, falling back to standard events.", e);
        }

        // --- 2. DAWN & STANDARD THEME PRESERVATION (The Kitchen Sink) ---
        // 1. Native Dawn / Shopify Standard Web Components
        if (!premiumRefreshSuccess) {
            // Self-healing fetch for Dawn if data wasn't provided
            if (!data) {
                try {
                    const sectionsParam = CONFIG.sections.join(',');
                    const res = await fetch(window.Shopify.routes.root + 'cart?sections=' + sectionsParam);
                    data = await res.json();
                } catch (e) { }
            }

            if (data) {
                try {
                    const cartDrawer = document.querySelector('cart-drawer');
                    if (cartDrawer && typeof cartDrawer.renderContents === 'function') {
                        cartDrawer.renderContents({ sections: data });
                    }
                } catch (e) { if (debug) console.error(e); }

                try {
                    const cartNotification = document.querySelector('cart-notification');
                    if (cartNotification && typeof cartNotification.renderContents === 'function') {
                        cartNotification.renderContents({ sections: data });
                    }
                } catch (e) { if (debug) console.error(e); }
            }
        }

        try {
            const loessCartItems = document.querySelector('loess-cart-items');
            if (loessCartItems && typeof loessCartItems.update === 'function') {
                loessCartItems.update();
            }
        } catch (e) { if (debug) console.error(e); }

        try {
            const cartDrawerItems = document.querySelector('cart-drawer-items');
            if (cartDrawerItems && typeof cartDrawerItems.onCartUpdate === 'function') {
                cartDrawerItems.onCartUpdate();
            }
        } catch (e) { if (debug) console.error(e); }

        // 2. Global Theme Objects (Legacy & Modern)
        try { if (window.theme && typeof window.theme.ajaxCart?.update === 'function') window.theme.ajaxCart.update(); } catch (e) { }
        try { if (window.theme && typeof window.theme.Cart?.updateCart === 'function') window.theme.Cart.updateCart(); } catch (e) { }
        try { if (window.CartJS && typeof window.CartJS.getCart === 'function') window.CartJS.getCart(); } catch (e) { }
        try { if (window.cart && typeof window.cart.getCart === 'function') window.cart.getCart(); } catch (e) { }
        try { if (window.ajaxCart && typeof window.ajaxCart.load === 'function') window.ajaxCart.load(); } catch (e) { }
        try { if (window.theme && typeof window.theme.MiniCart?.update === 'function') window.theme.MiniCart.update(); } catch (e) { }
        try { if (typeof window.SLIDECART_UPDATE === 'function') window.SLIDECART_UPDATE(); } catch (e) { }
        try { if (window.liquidAjaxCart && typeof window.liquidAjaxCart.update === 'function') window.liquidAjaxCart.update(); } catch (e) { }
        try { if (typeof window.refreshCart === 'function') window.refreshCart(); } catch (e) { }
        try { if (typeof window.upcartRefreshCart === 'function') window.upcartRefreshCart(); } catch (e) { }
        try { if (window.Alpine) { window.Alpine.store('main').fetchCart(); window.Alpine.store('xMiniCart').reLoad(); } } catch (e) { }
        try { if (window.theme && typeof window.theme.updateCartSummaries === 'function') window.theme.updateCartSummaries(); } catch (e) { }
        try { if (window.Rebuy && window.Rebuy.Cart && typeof window.Rebuy.Cart.fetchShopifyCart === 'function') window.Rebuy.Cart.fetchShopifyCart(); } catch (e) { }
        try { if (window.HsCartDrawer && typeof window.HsCartDrawer.updateSlideCart === 'function') window.HsCartDrawer.updateSlideCart(); } catch (e) { }

        // 3. Specific Dispatch Events
        const detailObj = { open: forceOpen, cart: data };
        try { document.dispatchEvent(new CustomEvent('cart:refresh', { bubbles: true, detail: detailObj })); } catch (e) { }
        try { document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', { bubbles: true, detail: detailObj })); } catch (e) { }
        try { document.dispatchEvent(new CustomEvent('cart:build', { bubbles: true, detail: detailObj })); } catch (e) { }
        try { document.dispatchEvent(new CustomEvent('cart:updated', { bubbles: true, detail: detailObj })); } catch (e) { }
        try { window.dispatchEvent(new Event('cart:updated')); } catch (e) { }
        try { document.dispatchEvent(new Event('theme:cartchanged')); } catch (e) { }
        try { window.dispatchEvent(new Event('update_cart')); } catch (e) { }
        try { document.dispatchEvent(new CustomEvent('theme:cart:reload', { bubbles: true, detail: detailObj })); } catch (e) { }
        try { document.dispatchEvent(new CustomEvent('dispatch:cart-drawer:refresh', { bubbles: true, detail: detailObj })); } catch (e) { }
        try { document.body.dispatchEvent(new CustomEvent('shapes:modalcart:afteradditem', { bubbles: true, detail: detailObj })); } catch (e) { }
        try { document.dispatchEvent(new CustomEvent('obsidian:upsell:refresh', { bubbles: true, detail: detailObj })); } catch (e) { }

        try {
            if (window.pubsub) {
                fetch(window.Shopify.routes.root + 'cart.js').then(res => res.json()).then(cart => {
                    window.pubsub.publish('cart-update', { cart });
                });
            }
        } catch (e) { }

        // 4. Custom Elements (Fallback for Dawn/theme-specific)
        if (!premiumRefreshSuccess) {
            try {
                const customCartElements = document.querySelectorAll('cart-items, cart-drawer-items, cart-note');
                customCartElements.forEach(el => {
                    if (typeof el.onCartUpdate === 'function') el.onCartUpdate();
                });
            } catch (e) { }
        }

        // 5. Manual DOM Swap Fallback (Last resort UI painting)
        if (data && !premiumRefreshSuccess) {
            Object.keys(data).forEach(sectionId => {
                try {
                    const html = data[sectionId];
                    if (!html) return;
                    const selectors = ['#' + sectionId, '.' + sectionId, '[id^="' + sectionId + '"]', '.drawer__contents', '.cart-drawer__items'];
                    let target = null;
                    let matchedSelector = null;
                    for (const s of selectors) {
                        if ((s.includes('drawer') || s.includes('items')) && sectionId !== 'cart-drawer' && sectionId !== 'main-cart-items') continue;
                        target = document.querySelector(s);
                        if (target) { matchedSelector = s; break; }
                    }
                    if (target) {
                        const div = document.createElement('div');
                        div.innerHTML = html;
                        let newEl = div.querySelector(matchedSelector) || div.querySelector('#' + sectionId) || div.firstElementChild;
                        if (newEl) target.innerHTML = newEl.innerHTML;
                        else target.innerHTML = html;
                    }
                } catch (e) { }
            });
        }

        // --- 3. THE SAFETY NET ---
        setTimeout(async () => {
            try {
                const finalCartRes = await fetch(window.Shopify.routes.root + 'cart.js');
                const finalCart = await finalCartRes.json();

                const hasGiftData = finalCart.items.some(item => item.properties && item.properties['_FreeGift']);
                if (hasGiftData) {
                    const giftItem = finalCart.items.find(item => item.properties && item.properties['_FreeGift']);
                    const bodyText = document.body.innerText || "";
                    if (!bodyText.includes(giftItem.product_title)) {
                        console.warn("CartBot: Safety net triggered! Missing gift in UI. Attempting another refresh cycle instead of reloading...");
                        // Try one more AJAX refresh instead of a hard reload
                        universalCartRefresh(null, true);
                    }
                }
            } catch (err) { }
        }, 2000);
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

            // Check Product Purchase & Quantities
            const triggerIds = rule.triggerProductIds || [];
            let matchingProductQty = 0;

            const productPassed = triggerIds.some(tid => {
                const numId = extractId(tid);
                return cart.items.some(i => i.product_id === numId || i.variant_id === numId || i.id === numId);
            });

            cart.items.forEach(i => {
                const isTrigger = triggerIds.some(tid => {
                    const numId = extractId(tid);
                    return i.product_id === numId || i.variant_id === numId || i.id === numId;
                });
                // Free gifts themselves shouldn't normally count towards the trigger quantities if avoid recursive, 
                // but CartBot logic depends on item mapping. We exclude generated free gifts.
                if (!i.properties || !i.properties['_FreeGift']) {
                    if (triggerIds.length === 0 || isTrigger) {
                        matchingProductQty += i.quantity;
                    }
                }
            });

            const totalQty = rule.countGlobalQuantity ? cart.items.filter(i => !i.properties || !i.properties['_FreeGift']).reduce((acc, obj) => acc + obj.quantity, 0) : matchingProductQty;
            const quantityPassed = totalQty >= parseInt(rule.minQuantity || 0) && totalQty <= parseInt(rule.maxQuantity || 999999);

            if (rule.triggerType === 'CART_VALUE') eligible = cartValuePassed;
            else if (rule.triggerType === 'PRODUCTS' || rule.triggerType === 'PRODUCT_PURCHASE') eligible = productPassed;
            else if (rule.triggerType === 'QUANTITY') eligible = quantityPassed;
            else if (rule.triggerType === 'COMBINED') eligible = cartValuePassed && productPassed && quantityPassed;

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
                universalCartRefresh(null, false);
            } catch (e) { console.error("CartBot: Remove Gift Error", e); }
        }

        if (itemsToAdd.length > 0) {
            console.log("CartBot: Items to Add evaluated:", itemsToAdd, "Requires Consent:", requiresConsent);

            if (requiresConsent) {
                console.log("CartBot: Consent is required. Attempting to show popup.");
                showConsentPopup(consentRule, "Would you like to add an eligible free gift to your order?", async () => {
                    try {
                        const addItems = itemsToAdd.map(id => ({ id: id, quantity: 1, properties: { '_FreeGift': 'true' } }));
                        const res = await fetch(window.Shopify.routes.root + 'cart/add.js', {
                            method: 'POST', headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ items: addItems })
                        });
                        if (res.ok) {
                            universalCartRefresh(null, true);
                            triggerSync(true);
                        } else {
                            console.warn("CartBot: Failed to add gift via consent popup", await res.text());
                        }
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
                    const res = await fetch(window.Shopify.routes.root + 'cart/add.js', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ items: addItems })
                    });
                    if (res.ok) {
                        changesMade = true;
                        universalCartRefresh(null, true);
                    } else {
                        console.warn("CartBot: Failed to add gift. Might be out of stock.", await res.text());
                    }
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
                await universalCartRefresh(uiRes, forceOpen);
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

    window._cartBotProcessing = false;

    async function evaluateCartStateAsync(isAdd = false, addedIds = []) {
        if (window._cartBotProcessing) return;
        window._cartBotProcessing = true;

        try {
            const rules = window.CartBotRules || [];
            if (rules.length === 0) return;

            const cartRes = await fetch(window.Shopify.routes.root + 'cart.js');
            const cart = await cartRes.json();

            const extractId = (id) => typeof id === 'string' && id.includes('gid://') ? Number(id.split('/').pop()) : Number(id);
            const cartTotal = cart.total_price / 100;
            const targetGifts = new Set();
            let requiresConsent = false;
            let consentRule = null;

            // 1. Evaluate Rules
            for (const rule of rules) {
                let eligible = false;
                const cartValuePassed = cartTotal >= parseFloat(rule.minCartValue || 0);
                const triggerIds = rule.triggerProductIds || [];
                let matchingProductQty = 0;

                const productPassed = triggerIds.some(tid => {
                    const numId = extractId(tid);
                    return cart.items.some(i => i.product_id === numId || i.variant_id === numId || i.id === numId);
                });

                cart.items.forEach(i => {
                    const isTrigger = triggerIds.some(tid => {
                        const numId = extractId(tid);
                        return i.product_id === numId || i.variant_id === numId || i.id === numId;
                    });
                    if (!i.properties || !i.properties['_FreeGift']) {
                        if (triggerIds.length === 0 || isTrigger) {
                            matchingProductQty += i.quantity;
                        }
                    }
                });

                const totalQty = rule.countGlobalQuantity ? cart.items.filter(i => !i.properties || !i.properties['_FreeGift']).reduce((acc, obj) => acc + obj.quantity, 0) : matchingProductQty;
                const quantityPassed = totalQty >= parseInt(rule.minQuantity || 0) && totalQty <= parseInt(rule.maxQuantity || 999999);

                if (rule.triggerType === 'CART_VALUE') eligible = cartValuePassed;
                else if (rule.triggerType === 'PRODUCTS' || rule.triggerType === 'PRODUCT_PURCHASE') eligible = productPassed;
                else if (rule.triggerType === 'QUANTITY') eligible = quantityPassed;
                else if (rule.triggerType === 'COMBINED') eligible = cartValuePassed && productPassed && quantityPassed;
                else eligible = true; // Fallback for simple "Always active"

                if (eligible) {
                    const rawGifts = rule.giftVariantIds || (rule.giftVariants ? rule.giftVariants.map(v => v.id) : []);
                    for (const rawG of rawGifts) {
                        if (!rawG) continue;
                        const potentialGiftId = extractId(rawG);

                        // Check if user manually added it
                        const manuallyAdded = cart.items.some(item => (item.variant_id === potentialGiftId || item.id === potentialGiftId) && (!item.properties || !item.properties['_FreeGift']));

                        if (manuallyAdded && !rule.applyIfAlreadyInCart) {
                            console.log(`CartBot: Skipping gift injection of ${potentialGiftId} because user already added it manually and applyIfAlreadyInCart is disabled.`);
                            continue;
                        }

                        targetGifts.add(potentialGiftId);
                    }
                    if (rule.requireConsent) {
                        requiresConsent = true;
                        if (!consentRule) consentRule = rule;
                    }
                }
            }

            const itemsToAdd = [];
            const itemsToRemoveKeys = {};

            // 2. Find which items to remove
            cart.items.forEach(item => {
                const isGift = item.properties && item.properties['_FreeGift'];
                const itemVid = item.variant_id || item.id;

                if (isGift && !targetGifts.has(itemVid)) {
                    itemsToRemoveKeys[item.key] = 0; // Set quantity to 0 to remove
                }
            });

            // 3. Find which items to add
            targetGifts.forEach(giftVid => {
                const isInCart = cart.items.some(i => (i.variant_id || i.id) === giftVid && i.properties && i.properties['_FreeGift']);
                if (!isInCart) {
                    itemsToAdd.push(giftVid);
                }
            });

            // Check if cart is only gifts now
            const regularItems = cart.items.filter(item => !item.properties || !item.properties['_FreeGift']);
            const giftItems = cart.items.filter(item => item.properties && item.properties['_FreeGift']);

            if (regularItems.length === 0 && giftItems.length > 0 && !isAdd) {
                console.log("CartBot: Only gifts left. Clearing cart...");
                const res = await fetch(window.Shopify.routes.root + 'cart/clear.js', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
                });
                if (res.ok) {
                    universalCartRefresh(null, false);
                    return;
                }
            }

            let anySuccess = false;

            if (Object.keys(itemsToRemoveKeys).length > 0) {
                console.log("CartBot: Removing Ineligible Gifts", itemsToRemoveKeys);
                try {
                    const res = await fetch(window.Shopify.routes.root + 'cart/update.js', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ updates: itemsToRemoveKeys })
                    });
                    if (res.ok) anySuccess = true;
                } catch (e) { console.error("CartBot: Remove Gift Error", e); }
            }

            if (itemsToAdd.length > 0) {
                if (requiresConsent) {
                    // Create a promise to wait for consent popup
                    await new Promise((resolve) => {
                        showConsentPopup(consentRule, "Would you like to add an eligible free gift to your order?", async () => {
                            try {
                                const addItems = itemsToAdd.map(id => ({ id: id, quantity: 1, properties: { '_FreeGift': 'true' } }));
                                const res = await fetch(window.Shopify.routes.root + 'cart/add.js', {
                                    method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                                    body: JSON.stringify({ items: addItems })
                                });
                                if (res.ok) anySuccess = true;
                            } catch (e) { console.error("CartBot: Add Gift Error", e); }
                            resolve();
                        }, () => {
                            console.log("CartBot: User declined consent.");
                            resolve();
                        });
                    });
                } else {
                    console.log(`CartBot: Adding Missing Gifts silently`, itemsToAdd);
                    try {
                        const addItems = itemsToAdd.map(id => ({ id: id, quantity: 1, properties: { '_FreeGift': 'true' } }));
                        const res = await fetch(window.Shopify.routes.root + 'cart/add.js', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                            body: JSON.stringify({ items: addItems })
                        });
                        if (res.ok) anySuccess = true;
                    } catch (e) { console.error("CartBot: Add Gift Error", e); }
                }
            }

            if (anySuccess) {
                universalCartRefresh(null, true);
            }

        } catch (e) {
            console.error("CartBot: Failed to evaluate cart state", e);
        } finally {
            setTimeout(() => { window._cartBotProcessing = false; }, 100);
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

        if (isCartAdd && !window._cartBotProcessing) {
            try {
                const response = await originalFetch.apply(this, args);
                if (response.ok) {
                    await evaluateCartStateAsync(true, addedIds);
                }
                return response;
            } catch (e) {
                return originalFetch.apply(this, args);
            }
        }

        const fetchPromise = originalFetch.apply(this, args);

        if (url && (url.includes('/cart/update') || url.includes('/cart/change') || url.includes('/cart/clear'))) {
            return fetchPromise.then(async (response) => {
                if (response.ok) {
                    if (!window._cartBotProcessing) {
                        await evaluateCartStateAsync(false, []);
                    }
                }
                return response;
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

        this.addEventListener('load', async function () {
            if (this.responseURL && this.status >= 200 && this.status < 300) {
                if (this.responseURL.includes('/cart/add') && !window._cartBotProcessing) {
                    await evaluateCartStateAsync(true, addedIds);
                } else if ((this.responseURL.includes('/cart/update') || this.responseURL.includes('/cart/change') || this.responseURL.includes('/cart/clear'))) {
                    if (!window._cartBotProcessing) {
                        await evaluateCartStateAsync(false, []);
                    }
                }
            }
        });
        return originalSend.call(this, body);
    };

    // Init Check
    triggerSync();

})();
