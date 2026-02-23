import { json } from "@remix-run/node";
import prisma from "../db.server";
import { unauthenticated } from "../shopify.server";
import { syncGiftRules } from "../utils/metafield.server";

// CORS Headers
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function action({ request }: { request: Request }) {
    if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
        return json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });
    }

    try {
        const body = await request.json();
        const { shop, ruleId } = body;

        if (!shop || !ruleId) {
            return json({ error: "Missing required fields" }, { status: 400, headers: corsHeaders });
        }

        const { admin } = await unauthenticated.admin(shop);

        // 1. Double check the rule in DB to prevent abuse
        const rule = await prisma.giftRule.findUnique({
            where: { id: ruleId, shop }
        });

        if (!rule) {
            return json({ error: "Rule not found" }, { status: 404, headers: corsHeaders });
        }

        // 2. Determine if truly expired
        const now = new Date();
        if (rule.endDate && rule.endDate < now && rule.isActive) {
            console.log(`[Storefront Lazy Webhook] Auto-expiring bot ${ruleId} for ${shop}`);

            await prisma.giftRule.update({
                where: { id: ruleId },
                data: { status: "EXPIRED", isActive: false }
            });

            await syncGiftRules(admin, shop);

            return json({ success: true, expired: true }, { headers: corsHeaders });
        }

        return json({ success: true, expired: false }, { headers: corsHeaders });
    } catch (e) {
        console.error("CartBot Lazy Expire Error:", e);
        return json({ error: "Failed to process expiration" }, { status: 500, headers: corsHeaders });
    }
}
