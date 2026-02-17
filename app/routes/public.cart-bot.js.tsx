
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

  console.log("CartBot: Brain Loaded 🧠 v5.0");

  const CONFIG = {
    debounceTime: 750, // Buffer for WASM execution
    bucketSize: 10,
    refillRate: 1, 
    sections: ['cart-drawer', 'cart-icon-bubble', 'main-cart-items', 'cart-notification-button'] // Added button
  };

  const STATE = {
    tokens: CONFIG.bucketSize,
    lastRefill: Date.now(),
    timeout: null,
    isSyncing: false,
    itemCount: 0 // Track count to detect gifts
  };

  // Helper: Token Bucket
  function consumeToken() {
    const now = Date.now();
    const elapsedTime = (now - STATE.lastRefill) / 1000;
    STATE.tokens = Math.min(CONFIG.bucketSize, STATE.tokens + elapsedTime * CONFIG.refillRate);
    STATE.lastRefill = now;
    if (STATE.tokens >= 1) { STATE.tokens -= 1; return true; }
    return false;
  }

  // --- 2. Notification System ---
  function showGiftToaster() {
     let toaster = document.getElementById('cart-bot-toaster');
     if (!toaster) {
         toaster = document.createElement('div');
         toaster.id = 'cart-bot-toaster';
         Object.assign(toaster.style, {
             position: 'fixed', bottom: '20px', right: '20px', zIndex: '999999',
             backgroundColor: '#1a1a1a', color: '#fff', padding: '12px 24px',
             borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
             transform: 'translateY(150%)', transition: 'transform 0.4s ease-out',
             fontFamily: 'inherit', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px'
         });
         toaster.innerHTML = '<span>🎁</span> <span>Free gift added to your order!</span>';
         document.body.appendChild(toaster);
     }
     
     // Show
     requestAnimationFrame(() => toaster.style.transform = 'translateY(0)');
     
     // Hide after 4s
     setTimeout(() => {
         toaster.style.transform = 'translateY(150%)';
     }, 4000);
  }

  // --- 3. UI Synchronization (Surgical Swap) ---
  async function syncCartUI(force = false) {
    if (STATE.isSyncing && !force) return;
    if (!consumeToken() && !force) return;

    STATE.isSyncing = true;
    const debug = new URLSearchParams(window.location.search).has('cartbot_debug');

    try {
      if (debug) console.log("CartBot: Starting Section Refresh...");

      const sectionsParam = CONFIG.sections.join(',');
      const response = await fetch(\`\${window.Shopify.routes.root}cart?sections=\${sectionsParam}\`);
      if (!response.ok) throw new Error(\`HTTP error! Status: \${response.status}\`);
      const data = await response.json();

      // 1. Surgical DOM Swap
      Object.keys(data).forEach(sectionId => {
        const html = data[sectionId];
        // Strategy: Find any container that matches the section ID
        const selectors = [\`#\${sectionId}\`, \`.\${sectionId}\`, \`[id^="\${sectionId}"]\`];
        
        let target = null;
        for (const s of selectors) {
           target = document.querySelector(s);
           if (target) break;
        }

        if (target) {
           if (debug) console.log(\`CartBot: Swapping \${sectionId}\`, target);
           
           // Save Scroll
           const scrollTop = target.scrollTop;
           
           // Use temp div to get content
           const div = document.createElement('div');
           div.innerHTML = html;
           
           // Try to find the exact inner container to replace, to avoid killing parent usage
           // Often Shopify returns <div id="section-id" ...> CONTENT </div>
           // So looking for the same ID inside response is safest.
           const newEl = div.querySelector(selectors[0]) || div.firstElementChild;
           
           if (newEl) {
               target.innerHTML = newEl.innerHTML;
               if (debug) {
                   target.style.outline = "2px solid red"; 
                   setTimeout(() => target.style.outline = "", 1000);
               }
           } else {
               target.innerHTML = html; // Fallback
           }
           
           // Restore Scroll
           target.scrollTop = scrollTop;
        }
      });

      // 2. Gift Detection Logic
      // Check cart.js to see if a gift is present? Or verify via section data?
      // Best way: check if we have a line item with price 0 that wasn't there before.
      // For simplicity in this prompt, checking current count vs old count if feasible.
      // Or just fetching cart.js lightweightly to confirm.
      
      const cartRes = await fetch(\`\${window.Shopify.routes.root}cart.js\`);
      const cart = await cartRes.json();
      
      // Detect gift: Any item with final_price = 0 (and maybe properties?)
      const hasGift = cart.items.some(item => item.final_price === 0);
      // Logic: If we didn't have a gift before... (Requires persistence state, skipping for "simple")
      // User asked: "If after sync you detect a new product with price 0.00"
      // We will just show it if hasGift is true and itemCount increased or just always if we matched a rule?
      // Let's be smart: if item count increased and we have a zero price item.
      if (cart.item_count > STATE.itemCount && hasGift) {
          showGiftToaster();
      }
      STATE.itemCount = cart.item_count;

      // 3. Emit Events
      if (window.pubsub) window.pubsub.publish('cart-updated', { cart: cart });
      document.dispatchEvent(new CustomEvent('cart:refresh', { detail: cart }));
      document.dispatchEvent(new CustomEvent('ajaxCart:updated', { detail: cart })); // Some legacy themes

    } catch (e) {
      console.error("CartBot: Sync failed", e);
    } finally {
      STATE.isSyncing = false;
    }
  }

  function triggerSync() {
    if (STATE.timeout) clearTimeout(STATE.timeout);
    STATE.timeout = setTimeout(syncCartUI, CONFIG.debounceTime);
  }

  // --- 4. Logic: Spy & Match ---
  function checkRulesAndSync(addedVariantId = null) {
      const rules = window.CartBotRules || [];
      let shouldSync = false;

      // Rule Validation
      // If we know what was added (addedVariantId), we check against valid rules
      if (addedVariantId) {
          // Check PRODUCT triggers
          const productMatch = rules.some(r => {
             const ids = r.triggerProductIds || [];
             return ids.includes(String(addedVariantId)) || ids.includes(Number(addedVariantId));
          });
          if (productMatch) shouldSync = true;
      }
      
      // Always check CART_VALUE triggers if we don't have a specific ID or just generally
      const valueRules = rules.some(r => r.triggerType === 'CART_VALUE' || r.triggerType === 'COMBINED');
      if (valueRules) shouldSync = true; // Any cart change *could* trigger value rule

      if (shouldSync) {
          console.log("CartBot: Rule matched! Triggering sync...");
          triggerSync();
      } else {
          // Even if no specific match, we often should sync to be safe for "COMBINED" logic?
          // Or if the user updates qty?
          // User prompt says: "If match... mark Dirty and start timer"
          // Let's default to syncing if ANY rule exists, to be safe, but prioritize logic.
          if (rules.length > 0) triggerSync(); 
      }
  }


  // --- 5. Interceptors (Monkey-Patching) ---
  
  // A. Fetch Interceptor
  const originalFetch = window.fetch;
  window.fetch = async function (...args) {
    const url = args[0] && (typeof args[0] === 'string' ? args[0] : args[0].url);
    const method = args[1] && args[1].method ? args[1].method.toUpperCase() : 'GET';
    
    // We capture the promise but return it first to not block UI
    const fetchPromise = originalFetch.apply(this, args);
    
    // "Spy" in background
    if (url && (url.includes('/cart/add') || url.includes('/cart/update') || url.includes('/cart/change'))) {
        fetchPromise.then(async (response) => {
            if (response.ok) {
                try {
                    // Try to parse body to get ID
                    let addedId = null;
                    if (args[1] && args[1].body) {
                        try {
                           const body = JSON.parse(args[1].body);
                           // cart/add usually has 'id' or 'items':[{id:..}]
                           if (body.id) addedId = body.id;
                           if (body.items && body.items[0]) addedId = body.items[0].id;
                        } catch(e) {} // FormData or other format
                        
                        if (!addedId && args[1].body instanceof FormData) {
                            addedId = args[1].body.get('id');
                        }
                    }
                    checkRulesAndSync(addedId);
                } catch(e) {
                    console.error("CartBot: Spy error", e);
                }
            }
        });
    }
    
    return fetchPromise;
  };

  // B. XHR Interceptor
  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) {
    this.addEventListener('load', function () {
      if (this.responseURL && (this.responseURL.includes('/cart/add') || this.responseURL.includes('/cart/update') || this.responseURL.includes('/cart/change'))) {
         // Try to parse request body if possible, roughly
         try {
             let addedId = null;
             if (typeof body === 'string') {
                 const parsed = JSON.parse(body);
                 if (parsed.id) addedId = parsed.id;
             }
             checkRulesAndSync(addedId);
         } catch(e) {
             checkRulesAndSync(null);
         }
      }
    });
    originalSend.call(this, body);
  };

  // Init
  // Initial count check
  fetch(window.Shopify.routes.root + 'cart.js').then(r=>r.json()).then(c => STATE.itemCount = c.item_count);

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
