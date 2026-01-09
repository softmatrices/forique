"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Wallet, ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockUser } from "@/lib/mockData";

const transactions = [
    { id: 1, type: "credit", amount: 299, description: "Refund for Order #ORD-12345", date: "2024-01-05" },
    { id: 2, type: "debit", amount: 150, description: "Used in Order #ORD-12346", date: "2024-01-08" },
    { id: 3, type: "credit", amount: 500, description: "Promotional credit", date: "2024-01-02" },
];

export default function WalletPage() {
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
                        <h1 className="text-2xl font-serif text-foreground mb-8">Wallet</h1>
                    </motion.div>

                    {/* Balance Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="card p-8 bg-gradient-to-br from-primary to-primary-light text-white mb-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <span className="text-sm opacity-80">Available Balance</span>
                        </div>
                        <p className="text-4xl font-serif font-medium">₹{mockUser.refundWallet.toLocaleString()}</p>
                        <p className="text-sm opacity-70 mt-2">Use at checkout for discounts</p>
                    </motion.div>

                    {/* Transactions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Transaction History</h2>
                        <div className="card overflow-hidden">
                            {transactions.length > 0 ? (
                                transactions.map((tx, i) => (
                                    <div
                                        key={tx.id}
                                        className={`flex items-center gap-4 p-5 ${i !== transactions.length - 1 ? "border-b border-border" : ""}`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "credit" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                                            }`}>
                                            {tx.type === "credit" ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-foreground">{tx.description}</p>
                                            <p className="text-xs text-muted flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(tx.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                            </p>
                                        </div>
                                        <span className={`font-medium ${tx.type === "credit" ? "text-green-600" : "text-red-500"}`}>
                                            {tx.type === "credit" ? "+" : "-"}₹{tx.amount}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-muted">
                                    <Wallet className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    No transactions yet
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
