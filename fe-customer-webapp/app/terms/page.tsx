import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-12">
                <div className="container-custom max-w-3xl">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                    <h1 className="text-3xl font-serif text-foreground mb-8">Terms of Service</h1>

                    <div className="prose prose-sm max-w-none text-muted">
                        <p className="text-foreground mb-6">Last updated: January 2024</p>

                        <section className="mb-8">
                            <h2 className="text-lg font-serif text-foreground mb-3">1. Acceptance of Terms</h2>
                            <p>By accessing or using Forique, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-lg font-serif text-foreground mb-3">2. Account Registration</h2>
                            <p>You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials.</p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-lg font-serif text-foreground mb-3">3. Orders and Payments</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>All prices are in Indian Rupees (INR)</li>
                                <li>We reserve the right to cancel orders due to pricing errors</li>
                                <li>Payment must be completed at checkout or on delivery (COD)</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-lg font-serif text-foreground mb-3">4. Shipping and Delivery</h2>
                            <p>Delivery times are estimates. We are not liable for delays caused by shipping carriers or unforeseen circumstances.</p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-lg font-serif text-foreground mb-3">5. Returns and Refunds</h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Items may be returned within 7 days of delivery</li>
                                <li>Products must be unworn and in original packaging</li>
                                <li>Refunds are processed within 5-7 business days</li>
                                <li>Customized items are non-returnable</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-lg font-serif text-foreground mb-3">6. Intellectual Property</h2>
                            <p>All content on Forique, including images, text, and logos, is our property and protected by copyright laws.</p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-lg font-serif text-foreground mb-3">7. Limitation of Liability</h2>
                            <p>Forique is not liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
                        </section>

                        <section>
                            <h2 className="text-lg font-serif text-foreground mb-3">8. Contact</h2>
                            <p>For questions about these Terms, contact us at legal@forique.in</p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
