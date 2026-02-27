import { Page, Layout, Card, Text, BlockStack, Button, EmptyState, Badge, IndexTable, useIndexResourceState } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useLoaderData, Link } from "@remix-run/react";
import prisma from "../db.server";
import { authenticate, MONTHLY_PRO_PLAN, MONTHLY_ULTIMATE_PLAN } from "../shopify.server";
import { ensureCartTransform, syncGiftRules } from "../utils/metafield.server";
import { checkAppEmbedStatus } from "../utils/theme.server";

export async function loader({ request }: { request: Request }) {
  const { admin, session, billing } = await authenticate.admin(request);

  // 1. Auto-expire bots that have passed their End Date
  const now = new Date();
  const expiredBots = await prisma.giftRule.updateMany({
    where: {
      shop: session.shop,
      status: "ACTIVE",
      endDate: { lt: now }
    },
    data: {
      status: "EXPIRED",
      isActive: false
    }
  });

  if (expiredBots.count > 0) {
    console.log(`Auto-expired ${expiredBots.count} bots for ${session.shop}`);
    await syncGiftRules(admin, session.shop);
  }

  // 2. Fetch rules to display
  const rules = await prisma.giftRule.findMany({
    where: { shop: session.shop },
    orderBy: { createdAt: 'desc' }
  });

  // Check App Embed Status
  const isAppEmbedActive = await checkAppEmbedStatus(admin);
  const shop = session.shop;

  // Fetch shop currency
  let currencyCode = "USD";
  try {
    const response = await admin.graphql(
      `#graphql
          query { shop { currencyCode } }`
    );
    const shopData = await response.json();
    currencyCode = shopData?.data?.shop?.currencyCode || "USD";
  } catch (e) {
    console.error("Failed to fetch shop currency:", e);
  }

  // Check billing
  const billingCheck = await billing.check({
    plans: [MONTHLY_PRO_PLAN, MONTHLY_ULTIMATE_PLAN],
    isTest: true,
  });

  let currentPlan = "FREE";
  if (billingCheck.hasActivePayment) {
    const activeSubscriptions = billingCheck.appSubscriptions || [];
    if (activeSubscriptions.some((sub: any) => sub.name === MONTHLY_ULTIMATE_PLAN)) {
      currentPlan = "ULTIMATE";
    } else if (activeSubscriptions.some((sub: any) => sub.name === MONTHLY_PRO_PLAN)) {
      currentPlan = "PRO";
    }
  }

  return { rules, isAppEmbedActive, shop, currentPlan, currencyCode };
}

import { useSubmit } from "@remix-run/react";
import { InlineStack } from "@shopify/polaris";
import { EditIcon, DeleteIcon } from "@shopify/polaris-icons";

export async function action({ request }: { request: Request }) {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    const id = formData.get("id") as string;

    // Check if it was active before deleting to sync metafields
    const rule = await prisma.giftRule.findUnique({ where: { id } });

    await prisma.giftRule.delete({ where: { id } });

    // If we deleted the active rule, we should clear the shop config
    if (rule?.isActive) {
      const response = await admin.graphql(
        `#graphql
            query { shop { id } }`
      );
      const shopData = await response.json();
      const shopId = shopData.data.shop.id;

      // Disable the config in metafield
      const metafieldValue = JSON.stringify({ isActive: false });

      await admin.graphql(
        `#graphql
            mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
                metafieldsSet(metafields: $metafields) {
                    userErrors { field message }
                }
            }`,
        {
          variables: {
            metafields: [
              {
                ownerId: shopId,
                namespace: "gift_bot",
                key: "config",
                type: "json",
                value: metafieldValue,
              },
            ],
          },
        },
      );
    }

    return { status: "deleted" };
  }
  return null;
}

import { DashboardUI } from "../components/DashboardUI";
// Adăugăm useNavigate de la Remix
import { useNavigate } from "@remix-run/react";

export default function Index() {
  const { rules, isAppEmbedActive, shop, currentPlan, currencyCode } = useLoaderData<typeof loader>();
  const navigate = useNavigate(); // Inițializăm router-ul Remix

  const handleCreateRule = () => {
    navigate("/app/bots/new");
  };

  return (
    <Page>
      <TitleBar title="GiftBot Dashboard">
        {/* Folosim navigate() în loc de window.open pentru a păstra totul ca un SPA (Single Page App) */}
        <button variant="primary" onClick={handleCreateRule}>
          Create Rule
        </button>
      </TitleBar>

      {/* Transmitem rutele corecte către interfața Dashboard-ului */}
      <DashboardUI
        rules={rules}
        isAppEmbedActive={isAppEmbedActive}
        shop={shop}
        currentPlan={currentPlan}
        currencyCode={currencyCode}
        onNewRule={handleCreateRule}
        routes={{
          newRule: "/app/bots/new",
          editRule: (id: string) => `/app/bots/${id}`
        }}
      />
    </Page>
  );
}
