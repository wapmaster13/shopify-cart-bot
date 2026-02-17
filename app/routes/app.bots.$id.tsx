import { useState, useCallback, useEffect } from "react";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
    AlertCircle, CheckCircle2, RotateCcw, MonitorPlay, Trash2
} from "lucide-react";
import { useAppBridge } from "@shopify/app-bridge-react";

// --- Loaders & Actions ---

export async function loader({ request, params }: { request: Request, params: { id: string } }) {
    await authenticate.admin(request);

    const rule = await prisma.giftRule.findUnique({
        where: { id: params.id }
    });

    if (!rule) {
        throw new Response("Bot not found", { status: 404 });
    }

    return { rule };
}

export async function action({ request, params }: { request: Request, params: any }) {
    const { admin, session } = await authenticate.admin(request);
    const shop = session.shop;
    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "delete") {
        await prisma.giftRule.delete({ where: { id: params.id } });
        await syncGiftRules(admin, session.shop);
        return redirect("/app");
    }

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

    if (!name) return Response.json({ error: "Bot name is required" }, { status: 400 });

    // Validate Trigger Products
    if (triggerType === "PRODUCTS" || triggerType === "COMBINED") {
        const productIds = JSON.parse(triggerProductIds || "[]");
        if (productIds.length === 0) {
            return Response.json({ error: "At least one trigger product is required." }, { status: 400 });
        }
    }

    try {
        const rule = await prisma.giftRule.update({
            where: { id: params.id },
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

        await syncGiftRules(admin, shop);
        return redirect("/app");
    } catch (e) {
        console.error("Update Bot Error:", e);
        return Response.json({ error: "Failed to update bot. Check server logs." }, { status: 500 });
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

export default function BotArchitectEdit() {
    const { rule } = useLoaderData<typeof loader>();
    const nav = useNavigation();
    const submit = useSubmit();
    const actionData = useActionData<{ error?: string }>();
    const shopify = useAppBridge();
    const isSubmitting = nav.state === "submitting";

    // --- State Initialization with Rule Data ---

    // 1. Identity
    const [name, setName] = useState(rule.name);
    const [status, setStatus] = useState(rule.status || "ACTIVE");
    const [priority, setPriority] = useState(String(rule.priority || 0));
    const [isScheduled, setIsScheduled] = useState(!!rule.startDate);
    const [startDate, setStartDate] = useState(rule.startDate ? new Date(rule.startDate).toISOString().slice(0, 10) : "");
    const [endDate, setEndDate] = useState(rule.endDate ? new Date(rule.endDate).toISOString().slice(0, 10) : "");

    // 2. Triggers
    const [triggerType, setTriggerType] = useState(rule.triggerType || "PRODUCTS");
    const [triggerProducts, setTriggerProducts] = useState<any[]>([]);
    // Effect to hydration trigger products would need resource fetching, 
    // but for now we just store IDs. To show "Chips", strictly we need product details.
    // In a real app we'd fetch these details. For now, we mimic presence if IDs exist.
    // Or we rely on the IDs being passed back and forth.
    // Let's assume we parse IDs and show a "N products selected" state if we can't fetch names easily without a specialized loader.
    // Or we can assume the user will re-select if they want to change.
    // Better: use a placeholder or check if we can fetch logic.
    // For simplicity in this step: Initialize empty array but if IDs exist, show a pill saying "Product Selection Hidden (Click to Edit)"
    // Actually, ResourcePicker can be pre-loaded with selection if we have full objects.
    // We only have IDs. 
    const [triggerProductIds, setTriggerProductIds] = useState(JSON.parse(rule.triggerProductIds || "[]"));

    const [minCartValue, setMinCartValue] = useState(String(rule.minCartValue || 0));
    const [minQuantity, setMinQuantity] = useState(String(rule.minQuantity || 0));
    const [maxQuantity, setMaxQuantity] = useState(String(rule.maxQuantity || 999999));
    const [replaceTriggerItems, setReplaceTriggerItems] = useState(rule.replaceTriggerItems || false);

    // 3. Actions
    const [giftProductIds, setGiftProductIds] = useState(JSON.parse(rule.giftVariantIds || "[]"));
    const [applyIfAlreadyInCart, setApplyIfAlreadyInCart] = useState(rule.applyIfAlreadyInCart || false);

    // 4. Compliance
    const [requireConsent, setRequireConsent] = useState(rule.requireConsent || false);

    // 5. Logic
    const [oncePerSession, setOncePerSession] = useState(rule.oncePerSession || false);
    const [reverseLogic, setReverseLogic] = useState(rule.reverseLogic ?? true);
    const [ajaxOnly, setAjaxOnly] = useState(rule.ajaxOnly ?? true);
    const [applyForEachCondition, setApplyForEachCondition] = useState(rule.applyForEachCondition || false);

    // --- Handlers ---

    const handleResourcePicker = async (type: 'trigger' | 'gift') => {
        // @ts-ignore
        const currentSelection = type === 'trigger' ?
            triggerProductIds.map((id: string) => ({ variants: [{ id }] })) :
            giftProductIds.map((id: string) => ({ variants: [{ id }] }));

        const selected = await shopify.resourcePicker({
            type: 'product',
            multiple: true,
            action: 'select',
            selection: {
                ids: type === 'trigger' ? triggerProductIds.map((id: string) => ({ id })) : giftProductIds.map((id: string) => ({ id }))
                // Note: Resource Picker 'selection' needs careful format (usually array of resources). 
                // Passing just IDs often works or implies previous selection.
                // For now, if we can't perfectly pre-fill, it defaults to empty picker.
            }
        });

        if (selected) {
            const items = Array.isArray(selected) ? selected : selected.selection;

            // We need to store both full objects for display (if we had them) and IDs for save
            // Since we don't have full objects on load, we rely on the picker to give them to us now.

            const variants = items.flatMap((p: any) => p.variants.map((v: any) => ({
                id: v.id,
                title: v.title === 'Default Title' ? p.title : `${p.title} - ${v.title}`,
                image: p.images?.[0]?.originalSrc
            })));

            if (type === 'trigger') {
                setTriggerProducts(variants); // For display
                setTriggerProductIds(variants.map((v: any) => v.id)); // For save
            } else {
                // setGiftProducts(variants); 
                setGiftProductIds(variants.map((v: any) => v.id));
            }
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
        fd.append("triggerProductIds", JSON.stringify(triggerProductIds));
        if (replaceTriggerItems) fd.append("replaceTriggerItems", "on");
        fd.append("minCartValue", minCartValue);
        fd.append("minQuantity", minQuantity);
        fd.append("maxQuantity", maxQuantity);

        fd.append("giftVariantIds", JSON.stringify(giftProductIds));
        if (applyIfAlreadyInCart) fd.append("applyIfAlreadyInCart", "on");

        if (requireConsent) fd.append("requireConsent", "on");

        // Logic
        if (oncePerSession) fd.append("oncePerSession", "on");
        if (reverseLogic) fd.append("reverseLogic", "on");
        if (ajaxOnly) fd.append("ajaxOnly", "on");
        if (applyForEachCondition) fd.append("applyForEachCondition", "on");

        submit(fd, { method: "post" });
    };

    const handleDelete = () => {
        shopify.modal.show("delete-modal");
    }

    return (
        <Page backAction={{ content: "Dashboard", url: "/app" }} title="Edit Bot">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "120px" }}
            >
                {/* Header */}
                <motion.div variants={sectionVariants} style={{ marginBottom: "30px", textAlign: "center" }}>
                    <Text as="h1" variant="heading2xl">Edit Automation</Text>
                    <Text as="p" tone="subdued">Refine your bot's behavior and logic.</Text>
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
                                autoComplete="off"
                            />
                            <InlineStack align="space-between" gap="400">
                                <Box>
                                    <div style={{ flex: 1 }}>
                                        <Select
                                            label="Status"
                                            options={[{ label: "Active", value: "ACTIVE" }, { label: "Paused", value: "PAUSED" }]}
                                            value={status}
                                            onChange={setStatus}
                                        />
                                    </div>
                                </Box>
                                <Box>
                                    <div style={{ flex: 1 }}>
                                        <TextField
                                            label="Priority Sequence"
                                            type="number"
                                            value={priority}
                                            onChange={setPriority}
                                            autoComplete="off"
                                            helpText="Lower numbers run first"
                                        />
                                    </div>
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

                                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                                    {triggerProducts.length > 0 ? triggerProducts.map((p, i) => (
                                                        <Badge key={i} tone="info">{p.title}</Badge>
                                                    )) : (
                                                        triggerProductIds.length > 0 ?
                                                            <Badge tone="info">{`${triggerProductIds.length} Products Selected (Hidden)`}</Badge> :
                                                            <Text as="p" tone="subdued">No products selected.</Text>
                                                    )}
                                                </div>

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
                                    <Text as="p" tone="subdued">{giftProductIds.length} items configured</Text>
                                </div>
                                <Button onClick={() => handleResourcePicker('gift')}>Select Gifts</Button>
                            </div>
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
                    display: "flex", justifyContent: "space-between", gap: "16px", zIndex: 100
                }}>
                    <Button tone="critical" onClick={() => submit({ intent: 'delete' }, { method: "post" })}>Delete Bot</Button>

                    <div style={{ display: "flex", gap: "10px" }}>
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
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </motion.button>
                    </div>
                </div>

            </motion.div >
        </Page >
    );
}
