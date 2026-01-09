"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Package, ArrowRight, Mail, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function OrderConfirmationPage() {
    const [orderId] = useState(`ORD-${Date.now().toString().slice(-8)}`);

    return (
        <>
            <Navbar />
            <main className="min-h-[70vh] flex items-center justify-center bg-background py-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-lg mx-auto px-4"
                >
                    {/* Success Animation */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Check className="w-12 h-12 text-green-600" />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h1 className="text-3xl font-serif text-foreground mb-2">
                            Order Confirmed!
                        </h1>
                        <p className="text-muted mb-6">
                            Thank you for shopping with Forique
                        </p>

                        <div className="card p-6 text-left mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-muted">Order ID</span>
                                <span className="font-mono font-medium">{orderId}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted">Estimated Delivery</span>
                                <span className="font-medium">
                                    {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </span>
                            </div>
                        </div>

                        <div className="bg-surface-muted p-4 rounded-xl mb-8 flex items-start gap-3">
                            <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-sm text-left text-muted">
                                We've sent a confirmation email with your order details and tracking information.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/account/orders" className="btn-secondary flex-1 justify-center">
                                <Package className="w-5 h-5 mr-2" />
                                Track Order
                            </Link>
                            <Link href="/category/all" className="btn-primary flex-1 justify-center">
                                Continue Shopping
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Confetti-like decoration */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-12 flex justify-center gap-4"
                    >
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    y: [0, -10, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                }}
                            >
                                <Sparkles className="w-6 h-6 text-accent" />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </main>
            <Footer />
        </>
    );
}
