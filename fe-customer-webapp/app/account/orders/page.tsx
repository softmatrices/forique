"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Package, ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockOrders } from "@/lib/mockData";

export default function OrdersPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-8">
                <div className="container-custom max-w-3xl">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/account" className="p-2 hover:bg-surface-muted rounded-lg transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-serif text-foreground">My Orders</h1>
                    </div>

                    {mockOrders.length > 0 ? (
                        <div className="space-y-4">
                            {mockOrders.map((order, index) => (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link href={`/account/orders/${order.id}`} className="card block p-6 hover:shadow-soft transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <p className="font-mono font-semibold text-foreground">{order.id}</p>
                                                <p className="text-sm text-muted">
                                                    {new Date(order.date).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                            <span className={`badge ${order.status === "Delivered"
                                                ? "bg-green-100 text-green-700"
                                                : order.status === "Shipped"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-amber-100 text-amber-700"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                                            {order.items.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="w-16 h-16 shrink-0 bg-surface-muted rounded-lg overflow-hidden relative"
                                                >
                                                    <Image
                                                        src={item.image || "/products/product-1.png"}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-muted">{order.items.length} items</p>
                                                <p className="font-semibold text-primary">₹{order.total.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-sm text-primary">
                                                View Details
                                                <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <Package className="w-16 h-16 mx-auto text-muted mb-4" />
                            <h2 className="text-xl font-serif text-foreground mb-2">No orders yet</h2>
                            <p className="text-muted mb-6">Start shopping to see your orders here</p>
                            <Link href="/category/all" className="btn-primary">
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </main >
            <Footer />
        </>
    );
}
