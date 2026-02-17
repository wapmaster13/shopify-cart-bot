import { useLoaderData } from "@remix-run/react";
import { AppProvider, Page } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import prisma from "../db.server";
import { DashboardUI } from "../components/DashboardUI";

export async function loader() {
    const rules = await prisma.giftRule.findMany({
        orderBy: { createdAt: "desc" },
    });
    return { rules };
}

export default function DebugUI() {
    const { rules } = useLoaderData<typeof loader>();

    return (
        // @ts-ignore - isEmbeddedApp prop might be missing in some types but needed for standalone
        <AppProvider i18n={enTranslations} isEmbeddedApp={false}>
            <link
                rel="stylesheet"
                href="https://unpkg.com/@shopify/polaris@13.0.0/build/esm/styles.css"
            />
            <style>
                {`
                    .Polaris-IndexTable__LoadingPanel { display: none !important; }
                `}
            </style>
            <Page fullWidth>
                {/* @ts-ignore */}
                <DashboardUI
                    rules={rules}
                    routes={{
                        newRule: "/debug/rules/new",
                        editRule: (id) => `/debug/rules/${id}`
                    }}
                />
            </Page>
        </AppProvider>
    );
}
