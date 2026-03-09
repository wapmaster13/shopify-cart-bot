import { json } from "@remix-run/node";
import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        { title: "Privacy Policy | GiftCart: Gift with purchase" },
        { name: "description", content: "Privacy Policy for the GiftCart Shopify App" },
    ];
};

export const loader = async () => {
    return json({});
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm px-8 py-10 sm:px-12 sm:py-14">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="mt-4 text-lg text-gray-500 font-medium">
                        GiftCart: Gift with purchase
                    </p>
                    <p className="mt-2 text-md text-gray-400">
                        Effective Date: March 5, 2026
                    </p>
                </div>

                <div className="prose prose-blue prose-lg text-gray-700 mx-auto space-y-8">
                    <p className="lead text-xl text-gray-600">
                        This Privacy Policy describes how GiftCart: Gift with purchase (the "App", "we", "us", or "our") collects, uses, protects, and shares information when you install or use the App in connection with your Shopify-supported store.
                    </p>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">1. Information We Collect</h2>
                        <p className="mb-4">
                            When you install and use the App, we collect certain information from you (the "Merchant") and process limited information regarding your customers (the "Buyers").
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">A. Information We Collect from Merchants:</h3>
                        <p className="mb-3">Upon installation, we automatically collect the following information from your Shopify account via Shopify’s APIs:</p>
                        <ul className="list-disc pl-5 space-y-2 mb-6">
                            <li><strong>Store Information:</strong> Your shop domain (myshopify.com URL and custom domains), store name, store email address, currency, and timezone.</li>
                            <li><strong>Merchant Account Data:</strong> Information necessary to authenticate you and manage your subscription, managed entirely through Shopify's Billing API.</li>
                            <li><strong>Usage Data:</strong> Logs of your interactions with the App's dashboard (e.g., rules created, bots activated) to help us troubleshoot and improve our service.</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">B. Information We Collect from Buyers:</h3>
                        <p className="mb-3">To provide the "gift with purchase" functionality (such as BOGO rules and cart value evaluations) on your storefront, our App interacts dynamically with your Buyers' active shopping carts. We process:</p>
                        <ul className="list-disc pl-5 space-y-2 mb-6">
                            <li><strong>Cart Data:</strong> Product IDs, Variant IDs, quantities, subtotals, and total cart value.</li>
                            <li>
                                <strong className="text-red-600">Strict Limitations:</strong> We <strong>DO NOT</strong> collect, process, or store sensitive Personally Identifiable Information (PII) from your Buyers.
                                We do not access customer names, physical addresses, email addresses, phone numbers, passwords, or payment details.
                                The App operates strictly on anonymized cart state data.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">2. How We Use Your Information</h2>
                        <p className="mb-3">We use the collected data strictly for the following operational and administrative purposes:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>To Provide the Service:</strong> To evaluate real-time cart conditions against your configured rules and seamlessly trigger automated offers and gifts.</li>
                            <li><strong>For Customer Support:</strong> To troubleshoot technical issues, respond to your inquiries, and provide tailored assistance based on your store's configuration.</li>
                            <li><strong>For Analytics and Improvement:</strong> To monitor App performance, detect bugs, and enhance the user interface and functionality of the App.</li>
                            <li><strong>To Communicate:</strong> To send you critical transactional updates, policy changes, or important notices regarding your use of the App.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">3. Sharing Your Information</h2>
                        <p className="mb-3">We respect your privacy. We do not sell, rent, or trade your personal information. We may share your information only in the following limited circumstances:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>With Shopify:</strong> To authenticate your installation, validate billing, and synchronize your App settings with your Shopify admin.</li>
                            <li><strong>With Service Providers:</strong> We use trusted third-party cloud hosting providers (e.g., secure database and server infrastructure) to operate the App. These providers are contractually obligated to protect your data and use it solely to provide the underlying infrastructure.</li>
                            <li><strong>For Legal Compliance:</strong> We may disclose your information if required to do so by law, or in response to a valid request by public authorities (e.g., a court or government agency).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">4. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
                            All data transmitted between your Shopify store, our App, and our secure databases is encrypted using SSL/TLS protocols.
                            However, please note that no method of transmission over the internet or electronic storage is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">5. Data Retention and Deletion</h2>
                        <p className="mb-3">
                            We retain your Store Information and App configuration rules only for as long as the App is actively installed on your Shopify store.
                        </p>
                        <p>
                            If you choose to uninstall the App, your configuration data and store details will be permanently purged from our active databases within 48 hours,
                            in accordance with our data retention policy and Shopify's guidelines.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">6. Your Rights and GDPR/CCPA Compliance</h2>
                        <p className="mb-6">
                            If you are a resident of the European Economic Area (EEA) or California, you have specific rights regarding your personal data,
                            including the right to access, correct, update, or request deletion of your data.
                        </p>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Shopify Mandatory Privacy Webhooks:</h3>
                        <p className="mb-3">We fully comply with Shopify’s data protection requirements and mandatory privacy webhooks:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Customers Data Request (<code>customers/data_request</code>):</strong> Because we do not store identifiable buyer data, we have no personal buyer data to provide. Webhooks received will be acknowledged with a standard compliance response.</li>
                            <li><strong>Customers Redact (<code>customers/redact</code>):</strong> We do not store identifiable buyer data. Webhooks received will be immediately acknowledged.</li>
                            <li><strong>Shop Redact (<code>shop/redact</code>):</strong> Upon receiving a request to delete a shop's data (triggered 48 hours after App uninstallation), we will permanently erase your store’s information and configuration rules from our database.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">7. International Data Transfers</h2>
                        <p>
                            Our App's infrastructure is hosted on secure cloud servers. Your information may be transferred to, and maintained on,
                            computers located outside of your state, province, or country where the data protection laws may differ.
                            By using the App, you consent to this transfer, ensuring that we apply appropriate safeguards to protect your data internationally.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2 mb-4">8. Changes to This Privacy Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
                            We will notify you of any material changes by updating the "Effective Date" at the top of this policy and, if necessary, via email or an in-app notification.
                        </p>
                    </section>

                    <section className="bg-blue-50 p-6 rounded-lg mt-8 border border-blue-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
                        <p className="mb-2">
                            If you have any questions, concerns, or requests regarding this Privacy Policy or our data processing practices, please contact our Data Protection Officer / Support Team at:
                        </p>
                        <p className="text-lg font-medium">
                            <span className="text-gray-600 mr-2">Email:</span>
                            <a href="mailto:contact@giftcart-bot.com" className="text-blue-600 hover:text-blue-800 hover:underline">
                                contact@giftcart-bot.com
                            </a>
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
