import React, { useState } from "react";
import {
    Page,
    Layout,
    Text,
    Button as PolarisButton,
    Badge as PolarisBadge,
    BlockStack,
    InlineStack,
    Banner,
} from "@shopify/polaris";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bot,
    Zap,
    CheckCircle2,
    PlayCircle,
    MoreHorizontal,
    Edit2,
    Trash2,
    Copy,
    Plus,
    Rocket,
    Crown,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { useSubmit, useNavigate } from "@remix-run/react";

// --- Types ---
interface GiftRule {
    id: string;
    name?: string;
    triggerType?: string;
    triggerAmount?: number;
    minCartValue?: number;
    minQuantity?: number;
    triggerProductIds?: string;
    giftVariantId?: string | null;
    giftVariantIds?: string;
    isActive: boolean;
    status?: string;
    createdAt: string;
}

interface DashboardRoutes {
    newRule: string;
    editRule: (id: string) => string;
}

interface DashboardUIProps {
    rules: GiftRule[];
    routes?: DashboardRoutes;
    isAppEmbedActive?: boolean;
    shop?: string;
    currentPlan?: string;
    onNewRule?: () => void;
}

// --- Styles (Soft Glass Aesthetic) ---
const glassStyle = {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.5)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.03)",
    borderRadius: "16px",
};

const cardHoverStyle = {
    y: -4,
    boxShadow: "0 12px 30px rgba(99, 102, 241, 0.15)",
    borderColor: "rgba(99, 102, 241, 0.4)",
};

// --- Components ---

const AnimatedHeader = ({ activeRoutes, isAppEmbedActive, onNewRule }: { activeRoutes: DashboardRoutes, isAppEmbedActive?: boolean, onNewRule?: () => void }) => {
    const navigate = useNavigate();
    return (
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <BlockStack gap="200">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <InlineStack gap="300" align="start" blockAlign="center">
                        <Text as="h1" variant="headingXl">
                            Good afternoon, Alex
                        </Text>
                        <motion.div
                            animate={
                                isAppEmbedActive
                                    ? { boxShadow: ["0 0 0 0px rgba(34, 197, 94, 0.4)", "0 0 0 4px rgba(34, 197, 94, 0)"] }
                                    : { opacity: [0.8, 1, 0.8] }
                            }
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                background: isAppEmbedActive ? "#22c55e" : "#ef4444",
                                color: "white",
                                padding: "4px 12px",
                                borderRadius: "20px",
                                fontSize: "0.75rem",
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px"
                            }}
                        >
                            <div style={{ width: 6, height: 6, background: "white", borderRadius: "50%" }} />
                            {isAppEmbedActive ? "LIVE" : "INACTIVE"}
                        </motion.div>
                    </InlineStack>
                </motion.div>
                <Text as="p" variant="bodyLg" tone="subdued">
                    Here's what's happening with your gift bots today.
                </Text>
            </BlockStack>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                    onClick={onNewRule ? onNewRule : () => navigate(activeRoutes.newRule)}
                    style={{
                        border: "none",
                        cursor: "pointer",
                        background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                        color: "white",
                        padding: "12px 24px",
                        borderRadius: "12px",
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
                        fontSize: "1rem"
                    }}
                >
                    <Plus size={20} />
                    Create Bot
                </button>
            </motion.div>
        </div>
    );
};

const FeatureCard = () => {
    return (
        <motion.div
            style={{
                ...glassStyle,
                padding: "24px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240,249,255,0.6))"
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
        >
            <BlockStack gap="400">
                <InlineStack align="space-between">
                    <div style={{ padding: 10, background: "rgba(99, 102, 241, 0.1)", borderRadius: 12 }}>
                        <Zap size={24} color="#6366f1" />
                    </div>
                    <PolarisBadge tone="info">New</PolarisBadge>
                </InlineStack>
                <BlockStack gap="200">
                    <Text as="h3" variant="headingMd">Smart Triggers</Text>
                    <Text as="p" tone="subdued">Boost conversion by 15% with AI-predicted thresholds.</Text>
                </BlockStack>
                <div style={{ height: 6, width: "100%", background: "#e2e8f0", borderRadius: 4, overflow: 'hidden' }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        style={{ height: "100%", background: "#6366f1", borderRadius: 4 }}
                    />
                </div>
                <Text as="span" variant="bodySm" tone="subdued">70% Setup Complete</Text>
            </BlockStack>
        </motion.div>
    )
}

const PlanCard = ({ plan = "FREE", activeBotsCount }: { plan?: string, activeBotsCount: number }) => {
    const navigate = useNavigate();
    const isFree = plan === "FREE";
    const isPro = plan === "PRO";
    const isUltimate = plan === "ULTIMATE";
    const limit = isFree ? 1 : "∞";

    return (
        <motion.div
            style={{ ...glassStyle, padding: "24px" }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <BlockStack gap="400">
                <InlineStack align="space-between">
                    <Text as="h3" variant="headingMd">Your Plan</Text>
                    <div style={{
                        background: "black", color: "white", padding: "4px 10px",
                        borderRadius: 8, fontSize: "0.75rem", fontWeight: "bold",
                        display: "flex", alignItems: "center", gap: 6
                    }}>
                        <Crown size={12} fill={isUltimate ? "purple" : isPro ? "gold" : "gray"} stroke="none" />
                        {plan}
                    </div>
                </InlineStack>
                <InlineStack align="start" gap="200" blockAlign="baseline">
                    <Text as="h2" variant="heading2xl">{activeBotsCount}</Text>
                    <Text as="span" tone="subdued">/ {limit} active bots</Text>
                </InlineStack>
                <motion.button
                    onClick={() => navigate("/app/pricing")}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(255,215,0, 0.3)" }}
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "10px",
                        background: "white",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px"
                    }}
                >
                    <Rocket size={16} />
                    {isUltimate ? "Manage Subscription" : "Upgrade Limit"}
                </motion.button>
            </BlockStack>
        </motion.div>
    )
}

const BotCard = ({ rule, onDelete, onEdit }: { rule: GiftRule, onDelete: (id: string) => void, onEdit: () => void }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={cardHoverStyle}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            style={{
                ...glassStyle,
                marginBottom: "16px",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden" // Keep content inside border radius
            }}
            onClick={onEdit}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                    padding: 12, borderRadius: 12,
                    background: rule.isActive ? "rgba(34, 197, 94, 0.1)" : "rgba(148, 163, 184, 0.1)",
                    color: rule.isActive ? "#16a34a" : "#64748b"
                }}>
                    <Bot size={24} />
                </div>
                <div>
                    <Text as="h3" variant="headingSm">{rule.name || "Untitled Bot"}</Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                        {rule.triggerType === "CART_VALUE" ? `Spend over $${rule.minCartValue || rule.triggerAmount || 0}` :
                            rule.triggerType === "QUANTITY" ? `Buy ${rule.minQuantity}+ items` :
                                rule.triggerType === "PRODUCTS" ? "Product Trigger" :
                                    rule.triggerType === "COMBINED" ? "Combined Logic" :
                                        `Spend over $${rule.triggerAmount || 0}`}
                    </Text>
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                {/* Status Pill */}
                <div style={{
                    padding: "6px 12px", borderRadius: 20,
                    background: rule.status === "EXPIRED" ? "rgba(239, 68, 68, 0.1)" : rule.isActive ? "rgba(34, 197, 94, 0.1)" : "rgba(241, 245, 249, 1)",
                    color: rule.status === "EXPIRED" ? "#b91c1c" : rule.isActive ? "#15803d" : "#64748b",
                    fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 6
                }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor" }} />
                    {rule.status === "EXPIRED" ? "Expired" : rule.isActive ? "Active" : "Inactive"}
                </div>

                {/* Actions */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            style={{ display: "flex", gap: "8px" }}
                        >
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
                                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                            >
                                <Edit2 size={18} color="#64748b" />
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
                                onClick={(e) => { e.stopPropagation(); onDelete(rule.id); }}
                            >
                                <Trash2 size={18} color="#ef4444" />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

const MasteryHub = ({ isAppEmbedActive, hasBots, hasActiveBots, shop }: { isAppEmbedActive?: boolean, hasBots: boolean, hasActiveBots: boolean, shop?: string }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <motion.div
            style={{ ...glassStyle, marginTop: "40px", overflow: "hidden" }}
        >
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    padding: "24px", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    background: "rgba(255,255,255,0.4)"
                }}
            >
                <div>
                    <Text as="h2" variant="headingMd">Mastery Hub</Text>
                    <Text as="p" tone="subdued">Become a gifting pro in 3 steps.</Text>
                </div>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        style={{ overflow: "hidden" }}
                    >
                        <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                            {/* Steps */}
                            <BlockStack gap="400">
                                {[
                                    { icon: CheckCircle2, text: "Enable the app embed block", done: !!isAppEmbedActive },
                                    { icon: PlayCircle, text: "Create your first Bot", done: hasBots },
                                    { icon: Rocket, text: "Publish to live store", done: hasActiveBots && !!isAppEmbedActive }
                                ].map((step, i) => {
                                    const Icon = step.icon;
                                    return (
                                        <motion.div
                                            key={i}
                                            whileHover={{ x: 5 }}
                                            style={{ display: "flex", gap: "12px", alignItems: "center", padding: "12px", background: "white", borderRadius: "12px" }}
                                        >
                                            <Icon size={20} color={step.done ? "#22c55e" : "#94a3b8"} />
                                            <Text as="span" variant="bodyMd" tone={step.done ? "subdued" : "base"}>
                                                <span style={{ textDecoration: step.done ? "line-through" : "none" }}>{step.text}</span>
                                            </Text>
                                        </motion.div>
                                    )
                                })}
                                {!isAppEmbedActive && shop && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => window.open(`https://${shop}/admin/themes/current/editor?context=apps&appExt=23b72d3c-0558-c17c-80a5-aed8a4b369eb3220dea9`, "_blank")}
                                        style={{
                                            padding: "10px 16px", background: "black", color: "white", border: "none",
                                            borderRadius: "8px", fontWeight: "bold", cursor: "pointer", width: "fit-content", marginTop: "10px"
                                        }}
                                    >
                                        Open Theme Editor
                                    </motion.button>
                                )}
                            </BlockStack>

                            {/* Video Placeholder */}
                            <div style={{
                                background: "#1e293b", borderRadius: "16px",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                position: "relative", overflow: "hidden"
                            }}>
                                <div style={{
                                    position: "absolute", inset: 0,
                                    background: "linear-gradient(45deg, rgba(99,102,241,0.2), transparent)"
                                }} />
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    style={{
                                        width: 60, height: 60, borderRadius: "50%",
                                        background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer"
                                    }}
                                >
                                    <PlayCircle size={32} color="white" fill="rgba(255,255,255,0.2)" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export function DashboardUI({ rules, routes, isAppEmbedActive, shop, currentPlan = "FREE", onNewRule }: DashboardUIProps) {
    const submit = useSubmit();
    const navigate = useNavigate();

    const defaultRoutes: DashboardRoutes = {
        newRule: "/app/bots/new",
        editRule: (id: string) => `/app/bots/${id}`
    };

    const activeRoutes = routes || defaultRoutes;

    const handleDelete = (id: string) => {
        submit({ intent: "delete", id }, { method: "post" });
    };

    return (
        <Page fullWidth>
            <div style={{ maxWidth: "1100px", margin: "0 auto", paddingBottom: "100px" }}>
                <AnimatedHeader activeRoutes={activeRoutes} isAppEmbedActive={isAppEmbedActive} onNewRule={onNewRule} />

                {isAppEmbedActive === false && (
                    <div style={{ marginBottom: "24px" }}>
                        <Banner
                            title="⚠️ Your CartBot is not yet live on your store!"
                            tone="critical"
                        >
                            <Text as="p">
                                To start offering free gifts, you must enable the App Embed in your theme settings. This takes 10 seconds and requires no coding.
                            </Text>
                            <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
                                {shop && (
                                    <PolarisButton
                                        variant="primary"
                                        onClick={() => window.open(`https://${shop}/admin/themes/current/editor?context=apps&activateAppId=23b72d3c-0558-c17c-80a5-aed8a4b369eb3220dea9/cart_bot_embed`, "_blank")}
                                    >
                                        Activate App Embed
                                    </PolarisButton>
                                )}
                                <PolarisButton onClick={() => window.location.reload()}>
                                    Verify Activation
                                </PolarisButton>
                            </div>
                        </Banner>
                    </div>
                )}

                <div style={{ position: "relative" }}>
                    <div style={{
                        filter: isAppEmbedActive === false ? "blur(8px)" : "none",
                        pointerEvents: isAppEmbedActive === false ? "none" : "auto",
                        opacity: isAppEmbedActive === false ? 0.6 : 1,
                        transition: "filter 0.3s ease, opacity 0.3s ease"
                    }}>
                        <Layout>
                            <Layout.Section>
                                <div style={{ display: "grid", gridTemplateColumns: "60% 40%", gap: "20px", marginBottom: "40px" }}>
                                    <FeatureCard />
                                    <PlanCard plan={currentPlan} activeBotsCount={rules.filter(r => r.isActive).length} />
                                </div>
                            </Layout.Section>

                            <Layout.Section>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                    <InlineStack align="space-between" blockAlign="center">
                                        <Text as="h2" variant="headingLg">Your Bots</Text>
                                        <motion.button
                                            whileHover={{ scale: 1.05, background: "rgba(0,0,0,0.05)" }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{
                                                background: "transparent", border: "1px solid #cbd5e1", borderRadius: "8px",
                                                padding: "6px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px",
                                                fontSize: "0.85rem", fontWeight: 600, color: "#475569"
                                            }}
                                        >
                                            <MoreHorizontal size={16} />
                                            Filter
                                        </motion.button>
                                    </InlineStack>
                                </motion.div>

                                <div style={{ marginTop: "20px" }}>
                                    <AnimatePresence>
                                        {rules.length === 0 ? (
                                            <motion.div
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                style={{ ...glassStyle, padding: "60px", textAlign: "center" }}
                                            >
                                                <Bot size={48} color="#cbd5e1" style={{ margin: "0 auto 20px" }} />
                                                <Text as="h3" variant="headingMd" tone="subdued">No bots active yet</Text>
                                                <div style={{ marginTop: "20px" }}>
                                                    <PolarisButton variant="primary" onClick={onNewRule ? onNewRule : () => navigate(activeRoutes.newRule)}>Launch your first bot</PolarisButton>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            rules.map((rule) => (
                                                <BotCard
                                                    key={rule.id}
                                                    rule={rule}
                                                    onDelete={handleDelete}
                                                    onEdit={() => navigate(activeRoutes.editRule(rule.id))}
                                                />
                                            ))
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Layout.Section>

                            <Layout.Section>
                                <MasteryHub
                                    isAppEmbedActive={isAppEmbedActive}
                                    hasBots={rules.length > 0}
                                    hasActiveBots={rules.some(r => r.isActive)}
                                    shop={shop}
                                />
                            </Layout.Section>
                        </Layout>
                    </div>

                    {isAppEmbedActive === false && (
                        <div style={{
                            position: "absolute",
                            top: "10%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "100%",
                            maxWidth: "480px",
                            zIndex: 10,
                        }}>
                            <motion.div
                                style={{
                                    ...glassStyle,
                                    background: "rgba(255, 255, 255, 0.95)",
                                    padding: "32px",
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)"
                                }}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <BlockStack gap="400">
                                    <div style={{ textAlign: "center", marginBottom: "8px" }}>
                                        <div style={{ background: "rgba(239, 68, 68, 0.1)", width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                                            <Rocket size={24} color="#ef4444" />
                                        </div>
                                        <Text as="h2" variant="headingLg">Complete Setup</Text>
                                        <Text as="p" tone="subdued">Finish these 2 steps to activate CartBot.</Text>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: "16px", background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                                        <div style={{ display: "flex", gap: "12px", alignItems: "center", opacity: rules.length > 0 ? 0.6 : 1 }}>
                                            {rules.length > 0 ? <CheckCircle2 size={24} color="#22c55e" /> : <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #cbd5e1", marginLeft: 2 }} />}
                                            <Text as="span" variant="bodyMd" fontWeight="bold" tone={rules.length > 0 ? "subdued" : "base"} textDecorationLine={rules.length > 0 ? "line-through" : undefined}>Step 1: Create your first rule</Text>
                                        </div>
                                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                                            <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #3b82f6", marginLeft: 2, position: "relative" }}>
                                                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 10, height: 10, borderRadius: "50%", background: "#3b82f6" }} />
                                            </div>
                                            <Text as="span" variant="bodyMd" fontWeight="bold">Step 2: Enable App Embed</Text>
                                        </div>
                                    </div>

                                    {shop && (
                                        <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                                            <button
                                                onClick={() => window.open(`https://${shop}/admin/themes/current/editor?context=apps&activateAppId=23b72d3c-0558-c17c-80a5-aed8a4b369eb3220dea9/cart_bot_embed`, "_blank")}
                                                style={{
                                                    width: "100%", padding: "14px", background: "black", color: "white",
                                                    border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer",
                                                    fontSize: "1rem"
                                                }}
                                            >
                                                Open Theme Editor
                                            </button>
                                            <button
                                                onClick={() => window.location.reload()}
                                                style={{
                                                    width: "100%", padding: "12px", background: "transparent", color: "#64748b",
                                                    border: "1px solid #cbd5e1", borderRadius: "8px", fontWeight: "bold", cursor: "pointer",
                                                    fontSize: "0.9rem"
                                                }}
                                            >
                                                I've enabled it, refresh status
                                            </button>
                                        </div>
                                    )}
                                </BlockStack>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </Page>
    );
}
