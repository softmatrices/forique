import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-12">
                <div className="container-custom max-w-3xl">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                    <h1 className="text-3xl font-serif text-foreground mb-8">Privacy Policy</h1>

                    <div className="prose prose-sm max-w-none text-muted">
                        <p className="text-foreground mb-6">Last updated: January 2024</p>

                        <section className="mb-8">
                            <h2 className="text-lg font-serif text-foreground mb-3">1. Information We Collect</h2>
                            <p>We collect information you provide directly, such as name, email, phone number, and shipping addresses when you create an account or make a purchase.</p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-lg font-serif text-foreground mb-3">2. How We Use Your Information</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Process and fulfill your orders</li>
                                <li>Send order confirmations and updates</li>
                                <li>Personalize your shopping experience</li>
                                <li>Improve our services and products</li>
                                <li>Communicate about promotions and offers (with consent)</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-lg font-serif text-foreground mb-3">3. Information Sharing</h2>
                            <p>We do not sell your personal information. We may share data with:</p>
                            <ul className="list-disc list-inside space-y-2 mt-2">
                                <li>Payment processors to complete transactions</li>
                                <li>Shipping partners to deliver orders</li>
                                <li>Analytics providers to improve our service</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-lg font-serif text-foreground mb-3">4. Data Security</h2>
                            <p>We implement industry-standard security measures to protect your information, including encryption and secure servers.</p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-lg font-serif text-foreground mb-3">5. Your Rights</h2>
                            <p>You have the right to access, correct, or delete your personal information. Contact us at privacy@forique.in for any requests.</p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-lg font-serif text-foreground mb-3">6. Cookies</h2>
                            <p>We use cookies to enhance your browsing experience and analyze site traffic. You can manage cookie preferences in your browser settings.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-serif text-foreground mb-3">7. Contact Us</h2>
                            <p>For questions about this Privacy Policy, contact us at:</p>
                            <p className="mt-2">Email: privacy@forique.in<br />Phone: +91 98765 43210</p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
