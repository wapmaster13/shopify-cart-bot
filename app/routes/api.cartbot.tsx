
export function loader() {
    const scriptContent = `
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

  console.log("CartBot: Brain Loaded 🧠 v7.1 (Client-Side Logic)");

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
    // Refill tokens based on time passed
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
    console.log("🔴 CartBot API: refreshCartUI called | forceOpen:", forceOpen);
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
        if (window.SLIDECART_UPDATE) { if(debug) console.log("CartBot: [Global] SLIDECART_UPDATE"); window.SLIDECART_UPDATE(); }
        if (window.theme?.ajaxCart?.update) { if(debug) console.log("CartBot: [Global] theme.ajaxCart.update"); window.theme.ajaxCart.update(); }
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
            if(debug) console.log("CartBot: [Framework] Alpine.js detected");
            try { window.Alpine.store("main").fetchCart(); } catch(e){}
            try { window.Alpine.store("xMiniCart").reLoad(); } catch(e){}
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
             if(debug) console.log("CartBot: [PubSub] Published cart-update");
        }

        // 6. Custom Elements (Dawn/theme-specific)
        // The user's cart.js uses 'cart-items' and 'cart-drawer-items' which listen to 'cart-update' or have .onCartUpdate()
        const customCartElements = document.querySelectorAll('cart-items, cart-drawer-items, cart-note');
        customCartElements.forEach(el => {
            if (typeof el.onCartUpdate === 'function') {
                if(debug) console.log("CartBot: [CustomElement] Calling onCartUpdate() on", el.tagName);
                el.onCartUpdate();
            }
        });

        // 7. Manual DOM Fallback (Our surgical swap)
        // Only if we haven't found a "smart" way, or just do it anyway to be safe?
        // Let's do it anyway for the requested sections, as it's harmless if IDs match.
        Object.keys(data).forEach(sectionId => {
            const html = data[sectionId];
            if (!html) return;
            
            const selectors = [
                \`#\${sectionId}\`, 
                \`.\${sectionId}\`, 
                \`[id^="\${sectionId}"]\`,
                \`.drawer__contents\`, 
                \`.cart-drawer__items\`
            ];
            
            let target = null;
            let matchedSelector = null;
            for (const s of selectors) {
               // Avoid blindly replacing generic classes on wrong elements
               if ((s.includes('drawer') || s.includes('items')) && sectionId !== 'cart-drawer' && sectionId !== 'main-cart-items') continue;
               target = document.querySelector(s);
               if (target) { matchedSelector = s; break; }
            }

            if (target) {
               // Special handling for Dawn's cart-items to prevent breaking listeners
               if (target.tagName === 'CART-ITEMS' || target.closest('cart-items')) {
                   // If we replace innerHTML of cart-items, we might kill the subscriptions. 
                   // Better to let onCartUpdate handle it if possible.
                   // But if onCartUpdate didn't work (e.g. no method), we swap.
                   if(debug) console.log("CartBot: [DOM] Swapping content inside custom element", matchedSelector);
               }
               
               if(debug) console.log("CartBot: [DOM] Swapping", matchedSelector);
               const div = document.createElement('div');
               div.innerHTML = html;
               let newEl = div.querySelector(matchedSelector) || div.querySelector(\`#\${sectionId}\`) || div.firstElementChild;
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
         toaster.innerHTML = \`<span>\${icon}</span> <span>\${text}</span>\`;
         document.body.appendChild(toaster);
     } else {
         toaster.style.backgroundColor = bgColor;
         toaster.style.color = textColor;
         toaster.innerHTML = \`<span>\${icon}</span> <span>\${text}</span>\`;
     }
     requestAnimationFrame(() => toaster.style.transform = 'translateY(0)');
     setTimeout(() => { toaster.style.transform = 'translateY(150%)'; }, 4000);
  }

  // --- 2.5 Logic: Manage Gifts (Client Side) ---
  async function manageGifts(cart) {
      const rules = window.CartBotRules || [];
      const debug = new URLSearchParams(window.location.search).has('cartbot_debug');
      let changesMade = false;
      
      if(debug) console.log("CartBot: 🎁 Managing Gifts...", rules);

      // Collect current cart items (simple variant IDs/Product IDs)
      const cartVariantIds = new Set(cart.items.map(i => i.variant_id || i.id));
      const cartProductIds = new Set(cart.items.map(i => i.product_id));
      const cartTotal = cart.total_price / 100; 

      const extractId = (id) => typeof id === 'string' && id.includes('gid://') ? Number(id.split('/').pop()) : Number(id);

      for (const rule of rules) {
          let eligible = false;
          
          // Check Cart Value
          const cartValuePassed = cartTotal >= parseFloat(rule.minCartValue || 0);

          // Check Product Purchase & Quantities
          const triggerIds = rule.triggerProductIds || [];
          let matchingProductQty = 0;

          const productPassed = triggerIds.some(tid => {
              const numId = extractId(tid);
              return cartProductIds.has(Number(numId)) || cartVariantIds.has(Number(numId));
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

          if (eligible) {
              const giftId = rule.giftVariantIds?.[0]; // First gift
              if (giftId && !cartVariantIds.has(Number(giftId))) {
                  if(debug) console.log("CartBot: Adding Missing Gift", giftId);
                  try {
                      const res = await fetch(window.Shopify.routes.root + 'cart/add.js', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                              items: [{
                                  id: Number(giftId),
                                  quantity: 1,
                                  properties: { '_FreeGift': 'true' }
                              }]
                          })
                      });
                      if (res.ok) {
                          changesMade = true;
                      } else {
                          console.warn("CartBot: Failed to add gift. Might be out of stock.", await res.text());
                      }
                  } catch(e) { console.error("CartBot: Add Gift Error", e); }
              }
          } 
          // REMOVAL LOGIC can trigger loops if not careful, skip for now unless strictly needed.
      }
      return changesMade;
  }

  // --- 3. Main Sync Logic ---
  async function syncCartUI(force = false, forceOpen = false) {
    console.log("🔴 CartBot API: syncCartUI called | force:", force, "| forceOpen:", forceOpen);
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
          if(debug) console.log("CartBot: Gifts updated, recursing sync...");
          STATE.isSyncing = false; // Reset lock
          return syncCartUI(true, forceOpen); // Force recurse to update UI with new items
      }

      // 3. Update UI (Kitchen Sink)
      // Only refresh if we actively changed gifts or were asked to pop it open
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
    console.log("🔴 CartBot API: triggerSync called | forceOpen:", forceOpen);
    if (STATE.timeout) clearTimeout(STATE.timeout);
    STATE.timeout = setTimeout(() => syncCartUI(false, forceOpen), CONFIG.debounceTime);
  }

  // --- 4. Instant Logic: Spy & Match ---
  function checkRulesAndTrigger(addedId = null) {
      // Just trigger sync, let syncCartUI handle logic
      triggerSync(false); 
  }

  // --- 5. Aggressive Interceptors (Monkey-Patching) ---
  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    const url = args[0] && (typeof args[0] === 'string' ? args[0] : args[0].url);
    const fetchPromise = originalFetch.apply(this, args);
    if (url && (url.includes('/cart/add') || url.includes('/cart/update') || url.includes('/cart/change'))) {
        fetchPromise.then(async (response) => {
            if (response.ok) {
                // Wait slightly for Shopify to process, then sync
                setTimeout(() => triggerSync(url.includes('/cart/add')), 50);
            }
        });
    }
    return fetchPromise;
  };

  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) {
    this.addEventListener('load', function () {
      if (this.responseURL && (this.responseURL.includes('/cart/add') || this.responseURL.includes('/cart/update') || this.responseURL.includes('/cart/change'))) {
         setTimeout(() => triggerSync(this.responseURL.includes('/cart/add')), 50);
      }
    });
    originalSend.call(this, body);
  };

  // Init Check
  triggerSync();

})();
`;

    return new Response(scriptContent, {
        headers: {
            "Content-Type": "application/javascript",
            "Cache-Control": "public, max-age=3600",
            "Access-Control-Allow-Origin": "*",
        },
    });
}
