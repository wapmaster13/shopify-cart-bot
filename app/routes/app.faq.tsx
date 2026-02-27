import { useState } from "react";
import { Page, Text, Icon } from "@shopify/polaris";
import { ChevronDownIcon, ChevronUpIcon } from "@shopify/polaris-icons";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, MessageCircleQuestion } from "lucide-react";

const faqs = [
    {
        question: "How do I activate the bots on my storefront?",
        answer: "You must first enable the \"CartBot Embed\" in your Shopify Theme Editor. A banner on your Dashboard will guide you there if it's inactive. Once enabled, any 'Active' bot will begin functioning immediately."
    },
    {
        question: "What happens if a gift product goes out of stock?",
        answer: "The app automatically detects 0 inventory. The bot will be visually tagged as \"Out of Stock\" in your dashboard and will pause adding that specific gift to the cart until you restock the item."
    },
    {
        question: "Is the gift automatically added, or does the customer choose?",
        answer: "You have full control over this behavior! By default, gifts are auto-added. However, inside the Bot Editor, you can check \"Require Consent popup\" to present the customer with an elegant modal asking if they'd like the gift."
    },
    {
        question: "Can I offer multiple distinct gifts?",
        answer: "Yes! You can either select multiple variants inside a single bot, or create multiple bots with different priority sequences."
    },
    {
        question: "How does the bot respond if a customer removes items and drops below the required cart value?",
        answer: "CartBot automatically monitors cart updates. If the cart conditions are no longer met (due to removals or quantity changes), the free gift is securely and automatically removed."
    }
];

// --- Visual Styles (Glassmorphism) ---
const backgroundStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    backgroundImage: "radial-gradient(at 0% 0%, hsla(253,16%,7%,0.05) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,0.05) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,0.05) 0, transparent 50%)",
    paddingTop: "24px"
};

const glassContainer = {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
    overflow: "hidden",
    padding: "24px",
    marginBottom: "16px"
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            variants={sectionVariants}
            style={{
                ...glassContainer,
                padding: "20px 24px",
                cursor: "pointer",
                transition: "all 0.3s ease"
            }}
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ y: -2, boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.09)" }}
            whileTap={{ scale: 0.99 }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                        padding: "8px", borderRadius: "10px",
                        background: isOpen ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)" : "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)",
                        color: isOpen ? "white" : "#0369a1",
                        transition: "all 0.3s ease"
                    }}>
                        <HelpCircle size={20} />
                    </div>
                    <Text as="h3" variant="headingMd" fontWeight={isOpen ? "bold" : "regular"}>
                        {question}
                    </Text>
                </div>
                <div style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    color: "#64748b"
                }}>
                    <ChevronDownIcon style={{ width: 24, height: 24 }} />
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden", paddingLeft: "44px" }}
                    >
                        <Text as="p" variant="bodyLg" tone="subdued">
                            {answer}
                        </Text>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function FAQ() {
    return (
        <div style={backgroundStyle}>
            <Page>
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "100px" }}
                >
                    {/* Header Header */}
                    <motion.div variants={sectionVariants} style={{ textAlign: "center", marginBottom: "40px" }}>
                        <div style={{
                            display: "inline-flex", padding: "12px", borderRadius: "20px",
                            background: "rgba(99, 102, 241, 0.1)", color: "#4f46e5", marginBottom: "16px"
                        }}>
                            <MessageCircleQuestion size={32} />
                        </div>
                        <Text as="h1" variant="heading3xl">Frequently Asked Questions</Text>
                        <div style={{ marginTop: "12px" }}>
                            <Text as="p" variant="bodyLg" tone="subdued">
                                Everything you need to know about setting up and running your CartBot effectively.
                            </Text>
                        </div>
                    </motion.div>

                    {/* FAQ Items */}
                    <div>
                        {faqs.map((faq, index) => (
                            <FaqItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>

                    {/* Support Contact */}
                    <motion.div
                        variants={sectionVariants}
                        style={{ ...glassContainer, marginTop: "24px", textAlign: "center", background: "rgba(255,255,255,0.9)" }}
                    >
                        <Text as="h3" variant="headingMd">Still have questions?</Text>
                        <div style={{ marginTop: "8px" }}>
                            <Text as="p" tone="subdued">We're here to help you grow your store.</Text>
                        </div>
                        <div style={{ marginTop: "16px" }}>
                            <a href="mailto:support@antigravity.ro" style={{
                                display: "inline-block", padding: "10px 20px", background: "#0f172a", color: "white",
                                borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem"
                            }}>
                                Contact Support
                            </a>
                        </div>
                    </motion.div>

                </motion.div>
            </Page>
        </div>
    );
}
