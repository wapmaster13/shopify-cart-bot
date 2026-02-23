import React, { useState } from "react";
import {
    Page,
    Layout,
    Text,
    Button as PolarisButton,
    Badge as PolarisBadge,
    BlockStack,
    InlineStack,
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

const AnimatedHeader = ({ activeRoutes }: { activeRoutes: DashboardRoutes }) => {
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
                            animate={{ boxShadow: ["0 0 0 0px rgba(34, 197, 94, 0.4)", "0 0 0 4px rgba(34, 197, 94, 0)"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                background: "#22c55e",
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
                            LIVE
                        </motion.div>
                    </InlineStack>
                </motion.div>
                <Text as="p" variant="bodyLg" tone="subdued">
                    Here's what's happening with your gift bots today.
                </Text>
            </BlockStack>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                    onClick={() => navigate(activeRoutes.newRule)}
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

const PlanCard = () => {
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
                        <Crown size={12} fill="gold" stroke="none" />
                        PRO
                    </div>
                </InlineStack>
                <InlineStack align="start" gap="200" blockAlign="baseline">
                    <Text as="h2" variant="heading2xl">24</Text>
                    <Text as="span" tone="subdued">/ 50 active bots</Text>
                </InlineStack>
                <motion.button
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
                    Upgrade Limit
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

const MasteryHub = () => {
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
                                    { icon: CheckCircle2, text: "Create your first spending rule", done: true },
                                    { icon: PlayCircle, text: "Test checkout behavior", done: false },
                                    { icon: Rocket, text: "Publish to live store", done: false }
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

export function DashboardUI({ rules, routes }: DashboardUIProps) {
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
                <AnimatedHeader activeRoutes={activeRoutes} />

                <Layout>
                    <Layout.Section>
                        <div style={{ display: "grid", gridTemplateColumns: "60% 40%", gap: "20px", marginBottom: "40px" }}>
                            <FeatureCard />
                            <PlanCard />
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
                                        <PolarisButton onClick={() => navigate(activeRoutes.newRule)}>Launch your first bot</PolarisButton>
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
                        <MasteryHub />
                    </Layout.Section>
                </Layout>
            </div>
        </Page>
    );
}
