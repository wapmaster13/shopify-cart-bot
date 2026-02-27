import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData, useSubmit, useNavigate, Form, useActionData, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Page, Layout, Text, Button, InlineStack, Badge, Box } from "@shopify/polaris";
import { CheckCircle2, Zap, Star, ShieldCheck } from "lucide-react";
import { authenticate, MONTHLY_PRO_PLAN, MONTHLY_ULTIMATE_PLAN } from "../shopify.server";
import { motion } from "framer-motion";

export async function loader({ request }: LoaderFunctionArgs) {
    const { billing } = await authenticate.admin(request);

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

    return { currentPlan };
}

export async function action({ request }: ActionFunctionArgs) {
    const { billing, session } = await authenticate.admin(request);
    const formData = await request.formData();
    const plan = formData.get("plan") as string;

    if (plan === "FREE") {
        const billingCheck = await billing.check({
            plans: [MONTHLY_PRO_PLAN, MONTHLY_ULTIMATE_PLAN],
            isTest: true,
        });

        if (billingCheck.hasActivePayment && billingCheck.appSubscriptions?.[0]) {
            await billing.cancel({
                subscriptionId: billingCheck.appSubscriptions[0].id,
                isTest: true,
                prorate: true
            });
        }
        return redirect("/app");
    }

    const planName = plan === "ULTIMATE" ? MONTHLY_ULTIMATE_PLAN : MONTHLY_PRO_PLAN;

    try {
        await billing.require({
            plans: [planName],
            isTest: true,
            onFailure: async () => billing.request({
                plan: planName,
                isTest: true,
                returnUrl: `https://admin.shopify.com/store/${session.shop.split('.')[0]}/apps/${process.env.SHOPIFY_API_KEY}/app/pricing`,
            }),
        });
    } catch (error) {
        if (error instanceof Response && error.status === 401) {
            const redirectUrl = error.headers.get("X-Shopify-API-Request-Failure-Reauthorize-Url");
            if (redirectUrl) {
                return { redirectUrl };
            }
        }
        throw error;
    }

    return null;
}

const PlanFeature = ({ text }: { text: string }) => (
    <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
        <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
        <Text as="span" variant="bodyMd">{text}</Text>
    </div>
);

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const glassMorphStyle = (isPro = false) => ({
    background: isPro ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: isPro ? "2px solid #6366f1" : "1px solid rgba(255, 255, 255, 0.4)",
    borderRadius: "24px",
    boxShadow: isPro ? "0 25px 50px -12px rgba(99, 102, 241, 0.25)" : "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
    padding: "32px",
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
    position: "relative" as const,
    overflow: "hidden" as const,
    transform: isPro ? "scale(1.02)" : "scale(1)",
    zIndex: isPro ? 10 : 1
});

export default function PricingPage() {
    const { currentPlan } = useLoaderData<typeof loader>();
    const actionData = useActionData<any>();
    const submit = useSubmit();
    const navigate = useNavigate();
    const nav = useNavigation();

    // Persistent loading state for slow top-level redirects
    const [redirectingPlan, setRedirectingPlan] = useState<string | null>(null);

    // Workaround for Remix dropping redirect headers on errors
    useEffect(() => {
        if (actionData?.redirectUrl) {
            window.open(actionData.redirectUrl, "_top");
        } else if (nav.state === "idle" && redirectingPlan) {
            // If the redirect somehow didn't happen (like a successful downgrade dropping us here without top-level redirect),
            // reset the visual state. Though downgrades should ideally refresh too, but we'll safeguard it.
            if (!actionData?.redirectUrl && currentPlan !== redirectingPlan) {
                // Keep it loading while we wait for any page refresh or data revalidation
                // Alternatively, reset it if it was a plain fast action
                setRedirectingPlan(null);
            }
        }
    }, [actionData, nav.state]);

    const handleUpgrade = (plan: string) => {
        setRedirectingPlan(plan);
        submit({ plan }, { method: "post" });
    };

    return (
        <Page
            title="Choose your plan"
            backAction={{ content: 'Dashboard', onAction: () => navigate('/app') }}
            fullWidth
        >
            <div style={{
                position: "fixed",
                top: 0, left: 0, right: 0, bottom: 0,
                background: "radial-gradient(circle at top right, #e0e7ff 0%, transparent 40%), radial-gradient(circle at bottom left, #fce7f3 0%, transparent 40%)",
                zIndex: -1,
                pointerEvents: "none"
            }} />

            <div style={{ maxWidth: "1100px", margin: "0 auto", paddingBottom: "120px", paddingTop: "40px" }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", marginBottom: "60px" }}
                >
                    <div style={{ display: "inline-block", padding: "8px 16px", background: "white", borderRadius: "100px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", marginBottom: "20px" }}>
                        <InlineStack gap="200" align="center" blockAlign="center">
                            <Zap size={16} color="#6366f1" />
                            <Text as="span" variant="bodySm" fontWeight="bold">Supercharge Your Sales</Text>
                        </InlineStack>
                    </div>
                    <Text as="h1" variant="heading2xl">Simple pricing, powerful results.</Text>
                    <div style={{ marginTop: "16px", color: "#64748b", maxWidth: "600px", margin: "16px auto 0", fontSize: "1.1rem", lineHeight: 1.5 }}>
                        Upgrade to unlock unlimited bots, advanced scheduling triggers, and full customization to maximize your conversion rate.
                    </div>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "24px",
                        alignItems: "stretch",
                        padding: "0 20px"
                    }}
                >
                    {/* FREE PLAN */}
                    <motion.div variants={cardVariants}>
                        <div style={glassMorphStyle(false)}>
                            <div style={{ flex: 1 }}>
                                <Text as="h2" variant="headingLg" tone="subdued">FREE</Text>
                                <div style={{ display: "flex", alignItems: "baseline", gap: "4px", margin: "16px 0 24px" }}>
                                    <Text as="h1" variant="heading2xl">$0</Text>
                                    <Text as="span" tone="subdued">/mo</Text>
                                </div>
                                <div style={{ color: "#64748b", marginBottom: "32px", fontSize: "0.95rem", lineHeight: 1.5 }}>
                                    Perfect for testing the waters and offering a single gift.
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                                    <PlanFeature text="Limit: 1 Active Bot" />
                                    <PlanFeature text="Basic Triggers (Products & Cart Value)" />
                                    <PlanFeature text="Standard Popups (No customization)" />
                                </div>
                            </div>

                            <Form method="post" action="/app/pricing" onSubmit={() => setRedirectingPlan("FREE")}>
                                <input type="hidden" name="plan" value="FREE" />
                                <Button
                                    size="large"
                                    fullWidth
                                    submit
                                    loading={redirectingPlan === "FREE" || (nav.state === "submitting" && nav.formData?.get("plan") === "FREE")}
                                    disabled={currentPlan === "FREE" || redirectingPlan !== null || nav.state === "submitting"}
                                    tone={currentPlan !== "FREE" ? "critical" : undefined}
                                >
                                    {redirectingPlan === "FREE" || (nav.state === "submitting" && nav.formData?.get("plan") === "FREE") ? "Processing..." : currentPlan === "FREE" ? "Current Plan" : "Downgrade"}
                                </Button>
                            </Form>
                        </div>
                    </motion.div>

                    {/* PRO PLAN */}
                    <motion.div variants={cardVariants} style={{ position: "relative" }}>
                        <div style={glassMorphStyle(true)}>
                            <div style={{
                                position: "absolute", top: 0, left: 0, right: 0, height: "6px",
                                background: "linear-gradient(90deg, #818cf8, #c084fc)"
                            }} />
                            <div style={{
                                position: "absolute", top: 16, right: 16,
                                background: "#fef08a", color: "#854d0e", padding: "4px 12px", borderRadius: "100px",
                                fontSize: "0.75rem", fontWeight: "bold",
                                display: "flex", alignItems: "center", gap: "4px"
                            }}>
                                <Star size={12} fill="currentColor" /> MOST POPULAR
                            </div>

                            <div style={{ flex: 1, marginTop: "12px" }}>
                                <Text as="h2" variant="headingLg">PRO</Text>
                                <div style={{ display: "flex", alignItems: "baseline", gap: "4px", margin: "16px 0 24px" }}>
                                    <Text as="h1" variant="heading2xl">$19.99</Text>
                                    <Text as="span" tone="subdued">/mo</Text>
                                </div>
                                <div style={{ color: "#475569", marginBottom: "32px", fontSize: "0.95rem", lineHeight: 1.5 }}>
                                    Unlock all growth tools and maximize your conversion rate.
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                                    <PlanFeature text="Unlimited Active Bots" />
                                    <PlanFeature text="Advanced Triggers (Max Qty & Combined Logic)" />
                                    <PlanFeature text="Bot Scheduling (Start & End Dates)" />
                                    <PlanFeature text="Full Customization (Colors, Fonts, Texts)" />
                                </div>
                            </div>

                            <Form method="post" action="/app/pricing" onSubmit={() => setRedirectingPlan("PRO")}>
                                <input type="hidden" name="plan" value="PRO" />
                                <Button
                                    size="large"
                                    fullWidth
                                    submit
                                    loading={redirectingPlan === "PRO" || (nav.state === "submitting" && nav.formData?.get("plan") === "PRO")}
                                    variant={currentPlan === "PRO" ? "secondary" : "primary"}
                                    disabled={currentPlan === "PRO" || redirectingPlan !== null || nav.state === "submitting"}
                                >
                                    {redirectingPlan === "PRO" || (nav.state === "submitting" && nav.formData?.get("plan") === "PRO") ? "Redirecting..." : currentPlan === "PRO" ? "Current Plan" : "Upgrade to PRO"}
                                </Button>
                            </Form>
                        </div>
                    </motion.div>

                    {/* ULTIMATE PLAN */}
                    <motion.div variants={cardVariants}>
                        <div style={glassMorphStyle(false)}>
                            <div style={{ flex: 1 }}>
                                <Text as="h2" variant="headingLg" tone="subdued">ULTIMATE</Text>
                                <div style={{ display: "flex", alignItems: "baseline", gap: "4px", margin: "16px 0 24px" }}>
                                    <Text as="h1" variant="heading2xl">$49.99</Text>
                                    <Text as="span" tone="subdued">/mo</Text>
                                </div>
                                <div style={{ color: "#64748b", marginBottom: "32px", fontSize: "0.95rem", lineHeight: 1.5 }}>
                                    For enterprise stores needing priority white-glove support.
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                                    <PlanFeature text="Everything in PRO" />
                                    <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                                        <ShieldCheck size={18} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                                        <Text as="span" variant="bodyMd">Priority 24/7 Support</Text>
                                    </div>
                                    <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                                        <ShieldCheck size={18} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                                        <Text as="span" variant="bodyMd">Dedicated Account Manager</Text>
                                    </div>
                                </div>
                            </div>

                            <Form method="post" action="/app/pricing" onSubmit={() => setRedirectingPlan("ULTIMATE")}>
                                <input type="hidden" name="plan" value="ULTIMATE" />
                                <Button
                                    size="large"
                                    fullWidth
                                    submit
                                    loading={redirectingPlan === "ULTIMATE" || (nav.state === "submitting" && nav.formData?.get("plan") === "ULTIMATE")}
                                    disabled={currentPlan === "ULTIMATE" || redirectingPlan !== null || nav.state === "submitting"}
                                >
                                    {redirectingPlan === "ULTIMATE" || (nav.state === "submitting" && nav.formData?.get("plan") === "ULTIMATE") ? "Redirecting..." : currentPlan === "ULTIMATE" ? "Current Plan" : "Upgrade to Ultimate"}
                                </Button>
                            </Form>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </Page>
    );
}
