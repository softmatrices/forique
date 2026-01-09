"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowLeft, Search, HelpCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const faqs = [
    {
        category: "Orders & Shipping",
        questions: [
            { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available at checkout for an additional fee." },
            { q: "Can I track my order?", a: "Yes! Once your order ships, you'll receive a tracking link via email and SMS." },
            { q: "Do you ship internationally?", a: "Currently, we only ship within India. International shipping coming soon." },
        ],
    },
    {
        category: "Returns & Refunds",
        questions: [
            { q: "What is your return policy?", a: "We offer 7-day hassle-free returns. Items must be unworn and in original packaging." },
            { q: "How do I initiate a return?", a: "Go to My Orders, select the item, and click 'Return'. Our team will arrange pickup." },
            { q: "When will I receive my refund?", a: "Refunds are processed within 5-7 business days after we receive the returned item." },
        ],
    },
    {
        category: "Products & Sizing",
        questions: [
            { q: "Are your products authentic?", a: "100% authentic. We only partner with verified brands and artisans." },
            { q: "How do I find my bangle or ring size?", a: "Use our Size Guide tool for detailed measurements and comparison charts." },
            { q: "What metals do you offer?", a: "We offer Gold, Rose Gold, Silver, Kundan, and various other metals and alloys." },
        ],
    },
    {
        category: "Payments",
        questions: [
            { q: "What payment methods do you accept?", a: "UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery." },
            { q: "Is my payment information secure?", a: "Absolutely. We use industry-standard encryption for all transactions." },
            { q: "Do you offer EMI options?", a: "Yes, EMI is available on orders above ₹3,000 for select cards." },
        ],
    },
];

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        setOpenItems((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const filteredFaqs = faqs.map((cat) => ({
        ...cat,
        questions: cat.questions.filter(
            (q) =>
                q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    })).filter(cat => cat.questions.length > 0);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-12">
                <div className="container-custom max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
                            Help Center
                        </h1>
                        <p className="text-muted">Find answers to commonly asked questions</p>
                    </motion.div>

                    {/* Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative mb-10"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search questions..."
                            className="w-full py-3.5 pl-11 pr-4 rounded-full border border-border bg-surface focus:border-primary focus:outline-none transition-colors"
                        />
                    </motion.div>

                    {/* FAQ List */}
                    <div className="space-y-8">
                        {filteredFaqs.map((category, catIndex) => (
                            <motion.div
                                key={category.category}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + catIndex * 0.05 }}
                            >
                                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
                                    {category.category}
                                </h2>
                                <div className="card overflow-hidden divide-y divide-border">
                                    {category.questions.map((item, i) => {
                                        const id = `${category.category}-${i}`;
                                        const isOpen = openItems.includes(id);
                                        return (
                                            <div key={id}>
                                                <button
                                                    onClick={() => toggleItem(id)}
                                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-muted transition-colors"
                                                >
                                                    <span className="font-medium text-foreground pr-4">{item.q}</span>
                                                    <ChevronDown className={`w-4 h-4 text-muted shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                                </button>
                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <p className="px-5 pb-5 text-sm text-muted leading-relaxed">
                                                                {item.a}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Still need help */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <HelpCircle className="w-8 h-8 mx-auto text-muted mb-3" />
                        <p className="text-muted mb-4">Still have questions?</p>
                        <Link href="/contact" className="btn-primary">
                            Contact Support
                        </Link>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
