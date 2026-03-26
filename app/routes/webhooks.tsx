import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate, unauthenticated } from "../shopify.server";
import db from "../db.server";
import { getShopPlan } from "../utils/billing.server";

/**
 * Unified Webhook Handler
 * 
 * Handles ALL Shopify webhook topics including:
 * - APP_UNINSTALLED: Cleans up sessions when app is uninstalled
 * - CUSTOMERS_DATA_REQUEST: GDPR — customer data request (we store no PII)
 * - CUSTOMERS_REDACT: GDPR — customer data deletion (we store no PII)
 * - SHOP_REDACT: GDPR — full shop data deletion (deletes all GiftRules + Sessions)
 * 
 * Security: HMAC signature is verified automatically by authenticate.webhook().
 * No manual API key handling needed.
 */
export const action = async ({ request }: ActionFunctionArgs) => {
    const { topic, shop, session } = await authenticate.webhook(request);

    console.log(`[Webhook] Received ${topic} for ${shop}`);

    switch (topic) {
        case "APP_UNINSTALLED":
            // Webhook requests can trigger multiple times and after an app has already been uninstalled.
            // If this webhook already ran, the session may have been deleted previously.
            if (session) {
                await db.session.deleteMany({ where: { shop } });
            }
            break;

        case "CUSTOMERS_DATA_REQUEST":
            // CartBot does NOT store any customer-specific PII.
            // We only store session tokens and gift rules keyed by shop domain.
            console.log(`[GDPR] Customer data request — no customer PII stored by CartBot.`);
            break;

        case "CUSTOMERS_REDACT":
            // CartBot does NOT store any customer-specific PII — nothing to delete.
            console.log(`[GDPR] Customer redact — no customer PII stored by CartBot.`);
            break;

        case "SHOP_REDACT":
            // CRITICAL: Delete ALL data associated with this shop.
            // Triggered 48 hours after merchant uninstalls the app.
            console.log(`[GDPR] Shop redact — deleting ALL data for ${shop}...`);
            try {
                const deletedRules = await db.giftRule.deleteMany({ where: { shop } });
                console.log(`[GDPR] Deleted ${deletedRules.count} GiftRule(s) for ${shop}`);

                const deletedSessions = await db.session.deleteMany({ where: { shop } });
                console.log(`[GDPR] Deleted ${deletedSessions.count} Session(s) for ${shop}`);

                console.log(`[GDPR] Shop redact complete for ${shop}`);
            } catch (error) {
                console.error(`[GDPR] Failed to redact data for ${shop}:`, error);
            }
            break;

        case "APP_SUBSCRIPTIONS_UPDATE":
            console.log(`[Billing] Received subscription update for ${shop}`);
            try {
                // Determine the new plan utilizing the offline session token
                const { admin } = await unauthenticated.admin(shop);
                const currentPlan = await getShopPlan(admin);
                
                if (currentPlan === "FREE") {
                    console.log(`[Downgrade] Shop ${shop} is now on FREE plan. Enforcing limits...`);
                    // Fetch all active bots
                    const activeBots = await db.giftRule.findMany({ 
                         where: { shop, isActive: true }, 
                         orderBy: { createdAt: "desc" } 
                    });
                    
                    if (activeBots.length > 1) {
                        // Keep the most recently created active bot (index 0), disable the rest
                        const botsToDisable = activeBots.slice(1).map(b => b.id);
                        await db.giftRule.updateMany({
                            where: { id: { in: botsToDisable } },
                            data: { isActive: false }
                        });
                        console.log(`[Downgrade] Automatically disabled ${botsToDisable.length} excess bots for ${shop}`);
                    }
                }
            } catch (error) {
                console.error(`[Billing] Failed to process subscription downgrade limits for ${shop}:`, error);
            }
            break;

        default:
            throw new Response("Unhandled webhook topic", { status: 404 });
    }

    return new Response();
};
