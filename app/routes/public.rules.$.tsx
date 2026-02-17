import { LoaderFunctionArgs } from "@remix-run/node";
import prisma from "../db.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
    const shop = params["*"];

    if (!shop) {
        return new Response("console.error('CartBot: Shop domain missing');", {
            headers: { "Content-Type": "application/javascript" },
        });
    }

    // Fetch active rules from Prisma
    const rules = await prisma.giftRule.findMany({
        where: {
            shop: shop,
            isActive: true,
            status: "ACTIVE",
        },
        orderBy: { priority: "asc" },
    });

    // Map to a lightweight format for the frontend
    const clientRules = rules.map((rule) => ({
        id: rule.id,
        triggerType: rule.triggerType,
        triggerProductIds: rule.triggerProductIds ? JSON.parse(rule.triggerProductIds) : [],
        minCartValue: rule.minCartValue,
        giftVariantIds: rule.giftVariantIds ? JSON.parse(rule.giftVariantIds) : [],
        applyIfAlreadyInCart: rule.applyIfAlreadyInCart,
    }));

    const jsContent = `
    (function() {
      if (window.CartBotRules) return;
      window.CartBotShop = "${shop}";
      window.CartBotRules = ${JSON.stringify(clientRules)};
      console.log("CartBot: Rules Loaded", window.CartBotRules.length);
    })();
  `;

    return new Response(jsContent, {
        headers: {
            "Content-Type": "application/javascript",
            "Cache-Control": "public, max-age=60", // Short cache for dynamic updates (or 3600 for prod)
            "Access-Control-Allow-Origin": "*",
        },
    });
}
