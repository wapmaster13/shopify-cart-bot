// app/routes/debug.rules.$id.tsx
import { useState } from "react";
import { redirect } from "@remix-run/node";
import { useLoaderData, useActionData, useNavigation, useSubmit } from "@remix-run/react";
import { Page, Layout, Card, FormLayout, TextField, Button, BlockStack, Banner } from "@shopify/polaris";
import prisma from "../db.server";

export async function loader({ params }: { params: any }) {
    const rule = await prisma.giftRule.findUnique({
        where: { id: params.id }
    });

    if (!rule) {
        return redirect("/debug/ui");
    }

    return { rule };
}

export async function action({ request, params }: { request: Request, params: any }) {
    const formData = await request.formData();

    const triggerAmount = parseFloat(formData.get("triggerAmount") as string);
    const giftVariantId = formData.get("giftVariantId") as string;

    if (isNaN(triggerAmount) || !giftVariantId) {
        return Response.json({ error: "Invalid input." }, { status: 400 });
    }

    await prisma.giftRule.update({
        where: { id: params.id },
        data: {
            triggerAmount,
            giftVariantId,
        },
    });

    return redirect("/debug/ui");
}

export default function DebugEditRule() {
    const { rule } = useLoaderData<typeof loader>();
    const actionData: any = useActionData();
    const nav = useNavigation();
    const submit = useSubmit();

    const [triggerAmount, setTriggerAmount] = useState(rule.triggerAmount.toString());
    const [giftVariantId, setGiftVariantId] = useState(rule.giftVariantId);

    const isLoading = nav.state === "submitting";

    const handleSave = () => {
        submit({ triggerAmount, giftVariantId }, { method: "post" });
    };

    return (
        <Page
            backAction={{ content: "Dashboard", url: "/debug/ui" }}
            title="Edit Gift Rule (Debug)"
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
                                />

                                <BlockStack gap="200">
                                    <TextField
                                        label="Selected Gift Variant ID"
                                        value={giftVariantId}
                                        onChange={setGiftVariantId}
                                        autoComplete="off"
                                    />
                                    <Button loading={isLoading} onClick={handleSave} variant="primary" disabled={!giftVariantId}>
                                        Save Changes
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
