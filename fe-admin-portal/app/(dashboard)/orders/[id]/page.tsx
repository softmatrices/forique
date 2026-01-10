"use client";

import Link from "next/link";
import { ArrowLeft, Package, Truck, User, Phone, MapPin, Store } from "lucide-react";

const order = {
    id: "ORD-2026-001",
    date: "Jan 10, 2026",
    status: "Processing",
    payment: "Prepaid (UPI)",
    customer: { name: "Priya Sharma", phone: "+91 98765 43210", address: "123, MG Road, Andheri West, Mumbai - 400058" },
    seller: { name: "Jaipur Silvers", id: "SEL-001" },
    items: [
        { name: "Kundan Jhumka Earrings", image: "/products/kundan-jhumka.png", qty: 1, price: 2499 },
        { name: "Temple Bangles", image: "/products/temple-bangles.png", qty: 2, price: 2199 },
    ],
    subtotal: 6897,
    shipping: 0,
    commission: 1034,
    sellerPayout: 5863,
};

export default function AdminOrderDetailPage() {
    return (
        <div className="max-w-4xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/orders" className="p-2 hover:bg-surface-hover rounded-xl">
                        <ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">{order.id}</h1>
                        <p className="text-sm text-muted mt-1">{order.date}</p>
                    </div>
                </div>
                <span className="px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg">{order.status}</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Items */}
                    <div className="bg-white rounded-2xl border border-border p-6">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Order Items</h3>
                        <div className="space-y-4">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-surface-hover" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">{item.name}</p>
                                        <p className="text-xs text-muted">Qty: {item.qty}</p>
                                    </div>
                                    <p className="text-sm font-semibold text-foreground">₹{(item.price * item.qty).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-border mt-4 pt-4 space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-muted">Subtotal</span><span>₹{order.subtotal.toLocaleString()}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-muted">Shipping</span><span className="text-emerald-600">Free</span></div>
                            <div className="flex justify-between text-sm"><span className="text-muted">Platform Commission (15%)</span><span className="text-primary">₹{order.commission.toLocaleString()}</span></div>
                            <div className="flex justify-between text-sm font-semibold pt-2 border-t border-border"><span>Seller Payout</span><span>₹{order.sellerPayout.toLocaleString()}</span></div>
                        </div>
                    </div>

                    {/* Customer */}
                    <div className="bg-white rounded-2xl border border-border p-6">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Customer Details</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3"><User className="w-4 h-4 text-muted" strokeWidth={1.5} /><span className="text-sm text-foreground">{order.customer.name}</span></div>
                            <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-muted" strokeWidth={1.5} /><span className="text-sm text-foreground">{order.customer.phone}</span></div>
                            <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-muted mt-0.5" strokeWidth={1.5} /><span className="text-sm text-foreground">{order.customer.address}</span></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Seller */}
                    <div className="bg-white rounded-2xl border border-border p-6">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Seller</h3>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Store className="w-5 h-5 text-primary" strokeWidth={1.5} />
                            </div>
                            <div>
                                <Link href={`/sellers/${order.seller.id}`} className="text-sm font-medium text-primary">{order.seller.name}</Link>
                                <p className="text-xs text-muted">{order.seller.id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="bg-white rounded-2xl border border-border p-6">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Payment</h3>
                        <p className="text-sm text-foreground">{order.payment}</p>
                        <p className="text-2xl font-bold text-foreground mt-2">₹{order.subtotal.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
