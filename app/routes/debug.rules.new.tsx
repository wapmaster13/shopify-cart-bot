// app/routes/debug.rules.new.tsx
import { useState } from "react";
import { redirect } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { Page, Layout, Card, FormLayout, TextField, Button, BlockStack, Banner, Text } from "@shopify/polaris";
import prisma from "../db.server";

// NO Auth for debug route
export async function loader() {
    return null;
}

export async function action({ request }: { request: Request }) {
    const formData = await request.formData();

    const triggerAmount = parseFloat(formData.get("triggerAmount") as string);
    const giftVariantId = formData.get("giftVariantId") as string;

    // Hardcoded shop for debug
    const shop = "first-app-antigravity.myshopify.com";

    if (isNaN(triggerAmount) || !giftVariantId) {
        return Response.json({ error: "Invalid input: Please provide a valid amount and variant ID." }, { status: 400 });
    }

    // Save to DB
    await prisma.giftRule.create({
        data: {
            shop,
            triggerAmount,
            giftVariantId,
            isActive: true,
        },
    });

    return redirect("/debug/ui");
}

export default function DebugNewRule() {
    const actionData: any = useActionData();
    const nav = useNavigation();
    const submit = useSubmit();

    const [triggerAmount, setTriggerAmount] = useState("100.0");
    const [giftVariantId, setGiftVariantId] = useState("");

    const isLoading = nav.state === "submitting";

    const handleSave = () => {
        submit({ triggerAmount, giftVariantId }, { method: "post" });
    };

    return (
        <Page
            backAction={{ content: "Dashboard", url: "/debug/ui" }}
            title="Create New Gift Rule (Debug)"
        >
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
                                        helpText="Enter a Variant ID manually for debug (e.g. gid://shopify/ProductVariant/123...)"
                                    />
                                    <Button loading={isLoading} onClick={handleSave} variant="primary" disabled={!giftVariantId}>
                                        Save Rule
                                    </Button>
                                </BlockStack>
                            </FormLayout>
                        </BlockStack>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
