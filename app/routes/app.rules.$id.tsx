import { useState } from "react";
import { redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { Page, Layout, Card, FormLayout, TextField, Button, BlockStack, Banner, Text } from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";

export async function loader({ request, params }: { request: Request, params: any }) {
    await authenticate.admin(request);
    const rule = await prisma.giftRule.findUnique({
        where: { id: params.id }
    });

    if (!rule) {
        return redirect("/app");
    }

    return { rule };
}

export async function action({ request, params }: { request: Request, params: any }) {
    const { admin, session } = await authenticate.admin(request);
    const formData = await request.formData();

    const triggerAmount = parseFloat(formData.get("triggerAmount") as string);
    const giftVariantId = formData.get("giftVariantId") as string;
    const shop = session.shop;

    if (isNaN(triggerAmount) || !giftVariantId) {
        return json({ error: "Invalid input: Please provide a valid amount and variant ID." }, { status: 400 });
    }

    // Update DB
    const updatedRule = await prisma.giftRule.update({
        where: { id: params.id },
        data: {
            minCartValue: triggerAmount,
            giftVariantId,
        },
    });

    // Sync to Shop Metafield (Single Rule Mode)
    // Same logic as creation - update the config to match this rule
    try {
        const response = await admin.graphql(
            `#graphql
            query { shop { id } }`
        );
        const shopData = await response.json();
        const shopId = shopData.data.shop.id;

        const metafieldValue = JSON.stringify({
            triggerAmount: updatedRule.minCartValue,
            giftVariantId: updatedRule.giftVariantIds ? JSON.parse(updatedRule.giftVariantIds)[0] : null,
            isActive: true
        });

        const metaResponse = await admin.graphql(
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

        // Log errors if any
        const metaJson = await metaResponse.json();
        if (metaJson.data?.metafieldsSet?.userErrors?.length > 0) {
            console.error("Metafield sync errors:", metaJson.data.metafieldsSet.userErrors);
        }

    } catch (error) {
        console.error("Failed to sync metafield:", error);
    }

    return redirect("/app");
}

export default function EditRule() {
    const { rule } = useLoaderData<typeof loader>();
    const actionData: any = useActionData();
    const nav = useNavigation();
    const submit = useSubmit();
    const shopify = useAppBridge();

    const [triggerAmount, setTriggerAmount] = useState(rule.minCartValue.toString());
    const [giftVariantId, setGiftVariantId] = useState(rule.giftVariantIds ? JSON.parse(rule.giftVariantIds)[0] : "");
    const [giftTitle, setGiftTitle] = useState(""); // Title retrieval is complex without extra query, leaving blank or initial

    const isLoading = nav.state === "submitting";

    const handleSave = () => {
        submit({ triggerAmount, giftVariantId }, { method: "post" });
    };

    const handleBrowse = async () => {
        // @ts-ignore
        const selected = await shopify.resourcePicker({ type: 'product', multiple: false, action: 'select' });

        if (selected && selected.selection && selected.selection.length > 0) {
            const product = selected.selection[0];
            const variant = product.variants[0];
            setGiftVariantId(variant.id);
            setGiftTitle(`${product.title} - ${variant.title}`);
        } else if (selected && Array.isArray(selected) && selected.length > 0) {
            const product = selected[0];
            const variant = product.variants[0];
            setGiftVariantId(variant.id);
            setGiftTitle(`${product.title} - ${variant.title}`);
        }
    };

    return (
        <Page
            backAction={{ content: "Dashboard", url: "/app" }}
            title="Edit Gift Rule"
        >
            <TitleBar title="Edit Rule" />
            <Layout>
                <Layout.Section>
                    <Card>
                        <BlockStack gap="500">
                            {actionData?.error && (
                                <Banner tone="critical">
                                    <p>{actionData.error}</p>
                                </Banner>
                            )}
                            <FormLayout>
                                <TextField
                                    label="Minimum Spend Amount"
                                    type="number"
                                    value={triggerAmount}
                                    onChange={setTriggerAmount}
                                    autoComplete="off"
                                    prefix="$"
                                    helpText="The cart subtotal must be greater than this amount to trigger the gift."
                                />

                                <BlockStack gap="200">
                                    <TextField
                                        label="Selected Gift Variant ID"
                                        value={giftVariantId}
                                        onChange={setGiftVariantId}
                                        autoComplete="off"
                                        disabled
                                        helpText="Select a product below."
                                    />
                                    {giftTitle && <Text as="span" tone="subdued">Selected: {giftTitle}</Text>}

                                    <Button onClick={handleBrowse}>Browse Products</Button>
                                </BlockStack>

                                <Button loading={isLoading} onClick={handleSave} variant="primary" disabled={!giftVariantId}>
                                    Save Rule
                                </Button>
                            </FormLayout>
                        </BlockStack>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
