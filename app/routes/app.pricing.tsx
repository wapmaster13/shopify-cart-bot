import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { authenticate } from "../shopify.server";
import { Page, Layout, Card, Text, Spinner, BlockStack } from "@shopify/polaris";

export async function loader({ request }: LoaderFunctionArgs) {
    const { session } = await authenticate.admin(request);
    const shopBase = session.shop.split('.')[0];
    const clientId = process.env.SHOPIFY_API_KEY;
    const redirectUrl = `https://admin.shopify.com/store/${shopBase}/charges/${clientId}/pricing_plans`;
    
    return json({ redirectUrl });
}

export default function PricingRedirect() {
    const { redirectUrl } = useLoaderData<typeof loader>();

    useEffect(() => {
        if (redirectUrl) {
            // Shopify App Bridge hook will intercept window.open with _top if not strictly using the hook, 
            // but typical standard JS top-level redirect works great in the new App Bridge
            window.open(redirectUrl, "_top");
        }
    }, [redirectUrl]);

    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <Card padding="400">
                        <BlockStack gap="400" align="center" inlineAlign="center">
                            <Spinner size="large" />
                            <Text as="p" tone="subdued">
                                Redirecting you directly to Shopify Billing...
                            </Text>
                        </BlockStack>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
