import { Page, Layout, Card, Text, BlockStack, Button, EmptyState, Badge, IndexTable, useIndexResourceState } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useLoaderData, Link } from "@remix-run/react";
import prisma from "../db.server";
import { authenticate } from "../shopify.server";
import { ensureCartTransform } from "../utils/metafield.server";

export async function loader({ request }: { request: Request }) {
  const { admin } = await authenticate.admin(request);

  // Fetch rules from Prisma
  const rules = await prisma.giftRule.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // Ensure Function is Active
  await ensureCartTransform(admin);

  return { rules };
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

export default function Index() {
  const { rules } = useLoaderData<typeof loader>();

  return (
    <Page>
      <TitleBar title="GiftBot Dashboard">
        <button variant="primary" onClick={() => window.open("/app/bots/new", "_self")}>Create Rule</button>
      </TitleBar>
      {/* @ts-ignore */}
      <DashboardUI rules={rules} />
    </Page>
  );
}
