"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Shield, Eye, Moon, Trash2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SettingsPage() {
    const [notifications, setNotifications] = useState({ orders: true, offers: true, newsletter: false });

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-12">
                <div className="container-custom max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link href="/account" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Account
                        </Link>
                        <h1 className="text-2xl font-serif text-foreground mb-8">Settings</h1>
                    </motion.div>

                    <div className="space-y-6">
                        {/* Notifications */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card p-6"
                        >
                            <h2 className="flex items-center gap-2 text-sm font-semibold mb-5">
                                <Bell className="w-4 h-4 text-primary" />
                                Notifications
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { key: "orders", label: "Order updates", desc: "Get notified about order status" },
                                    { key: "offers", label: "Offers & promotions", desc: "Exclusive deals and discounts" },
                                    { key: "newsletter", label: "Newsletter", desc: "Weekly style tips and trends" },
                                ].map((item) => (
                                    <label key={item.key} className="flex items-center justify-between cursor-pointer">
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{item.label}</p>
                                            <p className="text-xs text-muted">{item.desc}</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={notifications[item.key as keyof typeof notifications]}
                                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                                            className="w-5 h-5 rounded text-primary focus:ring-primary"
                                        />
                                    </label>
                                ))}
                            </div>
                        </motion.div>

                        {/* Privacy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="card p-6"
                        >
                            <h2 className="flex items-center gap-2 text-sm font-semibold mb-5">
                                <Shield className="w-4 h-4 text-primary" />
                                Privacy
                            </h2>
                            <div className="space-y-3">
                                <Link href="/privacy" className="flex items-center justify-between py-2 text-sm text-muted hover:text-foreground transition-colors">
                                    <span className="flex items-center gap-3"><Eye className="w-4 h-4" /> Privacy Policy</span>
                                </Link>
                                <Link href="/terms" className="flex items-center justify-between py-2 text-sm text-muted hover:text-foreground transition-colors">
                                    <span className="flex items-center gap-3"><Shield className="w-4 h-4" /> Terms of Service</span>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Danger Zone */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="card p-6 border-red-100"
                        >
                            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-600 mb-5">
                                <Trash2 className="w-4 h-4" />
                                Danger Zone
                            </h2>
                            <p className="text-sm text-muted mb-4">
                                Once you delete your account, there is no going back. Please be certain.
                            </p>
                            <button className="text-sm text-red-500 font-medium hover:underline">
                                Delete my account
                            </button>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
