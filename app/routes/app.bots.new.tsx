import { useState, useCallback, useEffect } from "react";
import { json, redirect } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
    Page, Layout, Card, Text, BlockStack, InlineStack, TextField,
    Select, Button, Box, Divider, Badge, Banner, Checkbox,
    DatePicker, Popover, Icon, Tooltip
} from "@shopify/polaris";
import { CalendarIcon, LockIcon } from "@shopify/polaris-icons";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import { syncGiftRules } from "../utils/metafield.server";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bot, Zap, Gift, ShieldCheck, Cpu,
    Calendar, Lock, ArrowRight, Plus, X,
    ShoppingCart, Package, Archive, Layers,
    AlertCircle, CheckCircle2, RotateCcw, MonitorPlay
} from "lucide-react";
import { useAppBridge } from "@shopify/app-bridge-react";

// --- Loaders & Actions ---

export async function loader({ request }: { request: Request }) {
    await authenticate.admin(request);
    return null;
}

export async function action({ request }: { request: Request }) {
    const { admin, session } = await authenticate.admin(request);
    const shop = session.shop;
    const formData = await request.formData();

    // Parse Fields (Mirroring Schema)
    const name = formData.get("name") as string;
    const status = formData.get("status") as string;
    const priority = parseInt(formData.get("priority") as string || "0");

    // Triggers
    const triggerType = formData.get("triggerType") as string;
    const triggerProductIds = formData.get("triggerProductIds") as string; // JSON
    const replaceTriggerItems = formData.get("replaceTriggerItems") === "on";
    const minCartValue = parseFloat(formData.get("minCartValue") as string || "0");
    const minQuantity = parseInt(formData.get("minQuantity") as string || "0");
    const maxQuantity = parseInt(formData.get("maxQuantity") as string || "999999");

    // Actions
    const giftVariantIds = formData.get("giftVariantIds") as string; // JSON
    const applyIfAlreadyInCart = formData.get("applyIfAlreadyInCart") === "on";

    // Logic
    const requireConsent = formData.get("requireConsent") === "on";
    const oncePerSession = formData.get("oncePerSession") === "on";
    const reverseLogic = formData.get("reverseLogic") === "on";
    const ajaxOnly = formData.get("ajaxOnly") === "on";
    const applyForEachCondition = formData.get("applyForEachCondition") === "on";

    // Scheduling
    const startDateRaw = formData.get("startDate") as string;
    const endDateRaw = formData.get("endDate") as string;
    const startDate = startDateRaw ? new Date(startDateRaw) : null;
    const endDate = endDateRaw ? new Date(endDateRaw) : null;

    if (!name) return json({ error: "Bot name is required" }, { status: 400 });

    // Validate Trigger Products
    if (triggerType === "PRODUCTS" || triggerType === "COMBINED") {
        const productIds = JSON.parse(triggerProductIds || "[]");
        if (productIds.length === 0) {
            return json({ error: "At least one trigger product is required." }, { status: 400 });
        }
    }

    try {
        const rule = await prisma.giftRule.create({
            data: {
                shop,
                name,
                status,
                priority,
                triggerType,
                triggerProductIds,
                minCartValue,
                minQuantity,
                maxQuantity,
                replaceTriggerItems,
                giftVariantId: "", // Legacy
                giftVariantIds,
                applyIfAlreadyInCart,
                requireConsent,
                oncePerSession,
                reverseLogic,
                ajaxOnly,
                applyForEachCondition,
                startDate,
                endDate,
                isActive: status === "ACTIVE"
            }
        });

        // Sync Metafields
        await syncGiftRules(admin, shop);

        return redirect("/app");
    } catch (e) {
        console.error("Create Bot Error:", e);
        return json({ error: "Failed to create bot. Check server logs." }, { status: 500 });
    }
}

// --- Visual Styles (2026 Glassmorphism) ---

const glassContainer = {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
    overflow: "hidden"
};

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// --- Components ---

const GlassCard = ({ children, padding = "24px" }: { children: React.ReactNode, padding?: string }) => (
    <motion.div variants={sectionVariants} style={{ ...glassContainer, padding }}>
        {children}
    </motion.div>
);

const SectionHeader = ({ icon: Icon, title, description }: any) => (
    <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
            padding: "10px", borderRadius: "10px",
            background: "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)",
            color: "#0369a1"
        }}>
            <Icon size={20} />
        </div>
        <div>
            <Text as="h3" variant="headingMd">{title}</Text>
            <Text as="p" tone="subdued">{description}</Text>
        </div>
    </div>
);

const RadioCard = ({ selected, id, icon: Icon, label, onClick }: any) => (
    <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={() => onClick(id)}
        style={{
            padding: "16px",
            borderRadius: "12px",
            border: selected ? "2px solid #6366f1" : "1px solid #cbd5e1",
            background: selected ? "rgba(99, 102, 241, 0.05)" : "white",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s"
        }}
    >
        <Icon size={24} color={selected ? "#6366f1" : "#64748b"} />
        <Text as="span" fontWeight={selected ? "bold" : "regular"} variant="bodySm">{label}</Text>
    </motion.div>
);

const LogicSwitch = ({ icon: Icon, label, description, checked, onChange, color = "#6366f1" }: any) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div style={{ padding: "8px", borderRadius: "8px", background: `${color}20` }}>
                <Icon size={18} color={color} />
            </div>
            <div>
                <Text as="h3" variant="bodyMd" fontWeight="semibold">{label}</Text>
                {description && <Text as="p" variant="bodySm" tone="subdued">{description}</Text>}
            </div>
        </div>
        <Checkbox label="" checked={checked} onChange={onChange} />
    </div>
);

// --- Main Page Component ---

export default function BotArchitect() {
    const nav = useNavigation();
    const submit = useSubmit();
    const actionData = useActionData<{ error?: string }>();
    const shopify = useAppBridge();
    const isSubmitting = nav.state === "submitting";

    // --- State ---

    // 1. Identity
    const [name, setName] = useState("");
    const [status, setStatus] = useState("ACTIVE");
    const [priority, setPriority] = useState("0");
    const [isScheduled, setIsScheduled] = useState(false);
    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10)); // Simple YYYY-MM-DD
    const [endDate, setEndDate] = useState("");

    // 2. Triggers
    const [triggerType, setTriggerType] = useState("PRODUCTS");
    const [triggerProducts, setTriggerProducts] = useState<any[]>([]);
    const [minCartValue, setMinCartValue] = useState("0");
    const [minQuantity, setMinQuantity] = useState("0");
    const [maxQuantity, setMaxQuantity] = useState("999999");
    const [replaceTriggerItems, setReplaceTriggerItems] = useState(false);

    // 3. Actions
    const [giftProducts, setGiftProducts] = useState<any[]>([]);
    const [applyIfAlreadyInCart, setApplyIfAlreadyInCart] = useState(false);

    // 4. Compliance
    const [requireConsent, setRequireConsent] = useState(false);

    // 5. Logic
    const [oncePerSession, setOncePerSession] = useState(false);
    const [reverseLogic, setReverseLogic] = useState(true);
    const [ajaxOnly, setAjaxOnly] = useState(true);
    const [applyForEachCondition, setApplyForEachCondition] = useState(false);

    // --- Handlers ---

    const handleResourcePicker = async (type: 'trigger' | 'gift') => {
        // @ts-ignore
        const selected = await shopify.resourcePicker({ type: 'product', multiple: true, action: 'select' });

        if (selected) {
            const items = Array.isArray(selected) ? selected : selected.selection;
            // Flatten variants
            const variants = items.flatMap((p: any) => p.variants.map((v: any) => ({
                id: v.id,
                title: v.title === 'Default Title' ? p.title : `${p.title} - ${v.title}`,
                image: p.images?.[0]?.originalSrc
            })));

            if (type === 'trigger') setTriggerProducts([...triggerProducts, ...variants]);
            else setGiftProducts([...giftProducts, ...variants]);
        }
    };

    const handleSave = () => {
        const fd = new FormData();
        fd.append("name", name);
        fd.append("status", status);
        fd.append("priority", priority);

        if (isScheduled) {
            fd.append("startDate", startDate);
            fd.append("endDate", endDate);
        }

        fd.append("triggerType", triggerType);
        fd.append("triggerProductIds", JSON.stringify(triggerProducts.map(p => p.id)));
        if (replaceTriggerItems) fd.append("replaceTriggerItems", "on");
        fd.append("minCartValue", minCartValue);
        fd.append("minQuantity", minQuantity);
        fd.append("maxQuantity", maxQuantity);

        fd.append("giftVariantIds", JSON.stringify(giftProducts.map(p => p.id)));
        if (applyIfAlreadyInCart) fd.append("applyIfAlreadyInCart", "on");

        if (requireConsent) fd.append("requireConsent", "on");

        // Logic
        if (oncePerSession) fd.append("oncePerSession", "on");
        if (reverseLogic) fd.append("reverseLogic", "on");
        if (ajaxOnly) fd.append("ajaxOnly", "on");
        if (applyForEachCondition) fd.append("applyForEachCondition", "on");

        submit(fd, { method: "post" });
    };

    return (
        <Page backAction={{ content: "Dashboard", url: "/app" }} title="Bot Architect">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "120px" }}
            >
                {/* Header */}
                <motion.div variants={sectionVariants} style={{ marginBottom: "30px", textAlign: "center" }}>
                    <Text as="h1" variant="heading2xl">Design Your Automation</Text>
                    <Text as="p" tone="subdued">Configure triggers, actions, and advanced logic.</Text>
                </motion.div>

                {actionData?.error && (
                    <motion.div variants={sectionVariants} style={{ marginBottom: 20 }}>
                        <Banner tone="critical"><p>{actionData.error}</p></Banner>
                    </motion.div>
                )}

                <BlockStack gap="600">

                    {/* SECTION 1: IDENTITY */}
                    <GlassCard>
                        <SectionHeader icon={Bot} title="Bot Identity" description="Basic configuration and scheduling." />
                        <BlockStack gap="400">
                            <TextField
                                label="Bot Name"
                                value={name}
                                onChange={setName}
                                placeholder="Auto add to cart bot"
                                autoComplete="off"
                            />
                            <InlineStack align="space-between" gap="400">
                                <Box flex="1">
                                    <Select
                                        label="Status"
                                        options={[{ label: "Active", value: "ACTIVE" }, { label: "Paused", value: "PAUSED" }]}
                                        value={status}
                                        onChange={setStatus}
                                    />
                                </Box>
                                <Box flex="1">
                                    <TextField
                                        label="Priority Sequence"
                                        type="number"
                                        value={priority}
                                        onChange={setPriority}
                                        autoComplete="off"
                                        helpText="Lower numbers run first"
                                    />
                                </Box>
                            </InlineStack>
                            <Divider />
                            <InlineStack align="space-between" blockAlign="center">
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <Icon source={CalendarIcon} tone="base" />
                                    <Text as="span" variant="bodyMd">Schedule Bot</Text>
                                    <Badge tone="success">PRO</Badge>
                                </div>
                                <Checkbox label="Enable Schedule" checked={isScheduled} onChange={setIsScheduled} />
                            </InlineStack>
                            <AnimatePresence>
                                {isScheduled && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                                        <InlineStack gap="400">
                                            <div style={{ flex: 1 }}><TextField type="date" label="Start Date" value={startDate} onChange={setStartDate} autoComplete="off" /></div>
                                            <div style={{ flex: 1 }}><TextField type="date" label="End Date" value={endDate} onChange={setEndDate} autoComplete="off" /></div>
                                        </InlineStack>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </BlockStack>
                    </GlassCard>

                    {/* SECTION 2: TRIGGERS */}
                    <GlassCard>
                        <SectionHeader icon={Zap} title="Smart Triggers" description="Define the 'When' of your automation." />
                        <BlockStack gap="400">
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" }}>
                                {[{ id: "PRODUCTS", icon: Package, label: "Products" }, { id: "CART_VALUE", icon: ShoppingCart, label: "Cart Value" }, { id: "QUANTITY", icon: Layers, label: "Min/Max Qty" }, { id: "COMBINED", icon: Cpu, label: "Combined" }].map(t => (
                                    <RadioCard key={t.id} {...t} selected={triggerType === t.id} onClick={setTriggerType} />
                                ))}
                            </div>

                            <div style={{ padding: "20px", background: "#f8fafc", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
                                <AnimatePresence mode="wait">
                                    {(triggerType === "PRODUCTS" || triggerType === "COMBINED") && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <BlockStack gap="300">
                                                <InlineStack align="space-between">
                                                    <Text as="h3" variant="headingSm">Trigger Products</Text>
                                                    <Button variant="plain" onClick={() => handleResourcePicker('trigger')}>Edit Selection</Button>
                                                </InlineStack>
                                                {triggerProducts.length > 0 ? (
                                                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                                        {triggerProducts.map((p, i) => (
                                                            <Badge key={i} tone="info">{p.title}</Badge>
                                                        ))}
                                                    </div>
                                                ) : <Text as="p" tone="subdued">No products selected.</Text>}
                                                <Checkbox
                                                    label="Replace these products with the gift (Swap Logic)"
                                                    checked={replaceTriggerItems}
                                                    onChange={setReplaceTriggerItems}
                                                />
                                            </BlockStack>
                                            <div style={{ height: 20 }} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {(triggerType === "CART_VALUE" || triggerType === "COMBINED") && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <TextField
                                                label="Cart Subtotal Threshold"
                                                prefix="$"
                                                type="number"
                                                value={minCartValue}
                                                onChange={setMinCartValue}
                                                autoComplete="off"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {(triggerType === "QUANTITY" || triggerType === "COMBINED") && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <InlineStack gap="400">
                                                <TextField label="Min Quantity" type="number" value={minQuantity} onChange={setMinQuantity} autoComplete="off" />
                                                <TextField label="Max Quantity" type="number" value={maxQuantity} onChange={setMaxQuantity} autoComplete="off" />
                                            </InlineStack>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </BlockStack>
                    </GlassCard>

                    {/* SECTION 3: ACTIONS */}
                    <GlassCard>
                        <SectionHeader icon={Gift} title="Automation Action" description="Define the 'Then' of your automation." />
                        <BlockStack gap="400">
                            <div style={{ display: "flex", gap: "16px", alignItems: "center", padding: "16px", background: "#f0fdf4", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
                                <div style={{ flex: 1 }}>
                                    <Text as="h3" variant="headingSm">Gift Products</Text>
                                    <Text as="p" tone="subdued">{giftProducts.length} items selected</Text>
                                </div>
                                <Button onClick={() => handleResourcePicker('gift')}>Select Gifts</Button>
                            </div>
                            {giftProducts.length > 0 && (
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {giftProducts.map((p, i) => <Badge key={i} tone="success">{p.title}</Badge>)}
                                </div>
                            )}
                            <Checkbox
                                label="Apply this bot even if these products are already in the cart"
                                checked={applyIfAlreadyInCart}
                                onChange={setApplyIfAlreadyInCart}
                            />
                        </BlockStack>
                    </GlassCard>

                    {/* SECTION 4: COMPLIANCE */}
                    <GlassCard>
                        <SectionHeader icon={ShieldCheck} title="Compliance & Consent" description="Manage GDPR and user consent." />
                        <BlockStack gap="400">
                            <LogicSwitch
                                icon={AlertCircle}
                                color="#d97706"
                                label="Show popup before adding items"
                                description="Required for GDPR compliance in some regions."
                                checked={requireConsent}
                                onChange={() => setRequireConsent(!requireConsent)}
                            />

                            <AnimatePresence>
                                {requireConsent && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <div style={{ padding: "16px", background: "#fffbeb", borderRadius: "8px", fontSize: "0.9rem", color: "#92400e" }}>
                                            <strong>Legal Note:</strong> As per Shopify requirements, you must obtain buyer consent before adding non-essential items that increase cart value.
                                        </div>

                                        <div style={{ marginTop: "20px", position: "relative", height: "150px", background: "#e2e8f0", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <div style={{ position: "absolute", top: 10, left: 10, fontSize: "0.8rem", color: "#64748b" }}>Live Preview</div>

                                            {/* Mock Modal */}
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                style={{
                                                    background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)",
                                                    padding: "20px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                                                    width: "300px", textAlign: "center"
                                                }}
                                            >
                                                <Text as="h3" variant="headingSm">Special Offer! 🎉</Text>
                                                <Text as="p" variant="bodySm">We have a gift for you. Add to order?</Text>
                                                <div style={{ display: "flex", gap: "10px", marginTop: "10px", justifyContent: "center" }}>
                                                    <div style={{ padding: "6px 12px", background: "black", color: "white", borderRadius: "6px", fontSize: "0.8rem" }}>Yes, please</div>
                                                    <div style={{ padding: "6px 12px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "0.8rem" }}>No thanks</div>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </BlockStack>
                    </GlassCard>

                    {/* SECTION 5: ADVANCED INTELLIGENCE */}
                    <GlassCard>
                        <SectionHeader icon={Cpu} title="Advanced Intelligence" description="Fine-tune how the 'Brain' executes." />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                            <LogicSwitch
                                icon={MonitorPlay}
                                label="Once per session"
                                description="Use local storage to track execution."
                                checked={oncePerSession}
                                onChange={setOncePerSession}
                            />
                            <LogicSwitch
                                icon={Layers}
                                label="Apply for each"
                                description="Add multiple gifts for multiple triggers."
                                checked={applyForEachCondition}
                                onChange={setApplyForEachCondition}
                            />
                            <LogicSwitch
                                icon={RotateCcw}
                                color="#ef4444"
                                label="Reverse Logic"
                                description="Remove gift if conditions fail."
                                checked={reverseLogic}
                                onChange={setReverseLogic}
                            />
                            <LogicSwitch
                                icon={Zap}
                                label="Ajax Only"
                                description="Listen to fetch events only."
                                checked={ajaxOnly}
                                onChange={setAjaxOnly}
                            />
                        </div>
                    </GlassCard>

                </BlockStack>

                {/* Footer Actions */}
                <div style={{
                    position: "fixed", bottom: 0, left: 0, right: 0,
                    padding: "20px", background: "white", borderTop: "1px solid #e2e8f0",
                    display: "flex", justifyContent: "flex-end", gap: "16px", zIndex: 100
                }}>
                    <Button size="large" onClick={() => window.history.back()}>Cancel</Button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        disabled={isSubmitting}
                        style={{
                            background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                            color: "white",
                            border: "none",
                            padding: "12px 30px",
                            borderRadius: "10px",
                            fontSize: "1rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
                            opacity: isSubmitting ? 0.7 : 1
                        }}
                    >
                        {isSubmitting ? "Launching..." : "Launch Bot"}
                    </motion.button>
                </div>

            </motion.div>
        </Page>
    );
}
