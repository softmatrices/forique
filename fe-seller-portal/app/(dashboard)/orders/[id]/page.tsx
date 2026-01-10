"use client";

import Link from "next/link";
import { ArrowLeft, Package, Truck, Clock, MapPin, User, Phone } from "lucide-react";

const order = {
    id: "ORD-2026-001",
    date: "Jan 10, 2026, 2:30 PM",
    status: "Processing",
    customer: { name: "Priya Sharma", phone: "+91 98765 43210", address: "123, MG Road, Andheri West, Mumbai - 400058" },
    items: [
        { name: "Kundan Jhumka Earrings", image: "/products/kundan-jhumka.png", qty: 1, price: 2499 },
        { name: "Temple Bangles", image: "/products/temple-bangles.png", qty: 2, price: 2199 },
    ],
    subtotal: 6897,
    shipping: 0,
    total: 6897,
    payment: "Prepaid (UPI)",
    timeline: [
        { status: "Order Placed", date: "Jan 10, 2:30 PM", done: true },
        { status: "Confirmed", date: "Jan 10, 2:35 PM", done: true },
        { status: "Processing", date: "Jan 10, 3:00 PM", done: true },
        { status: "Shipped", date: "", done: false },
        { status: "Delivered", date: "", done: false },
    ],
};

export default function OrderDetailPage() {
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
                            <div className="flex justify-between text-sm"><span className="text-muted">Subtotal</span><span className="text-foreground">₹{order.subtotal.toLocaleString()}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-muted">Shipping</span><span className="text-emerald-600">Free</span></div>
                            <div className="flex justify-between text-sm font-semibold"><span className="text-foreground">Total</span><span className="text-foreground">₹{order.total.toLocaleString()}</span></div>
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

                {/* Timeline & Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-border p-6">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Order Timeline</h3>
                        <div className="space-y-4">
                            {order.timeline.map((step, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className={`w-3 h-3 rounded-full mt-1.5 ${step.done ? "bg-emerald-500" : "bg-border"}`} />
                                    <div>
                                        <p className={`text-sm ${step.done ? "text-foreground font-medium" : "text-muted"}`}>{step.status}</p>
                                        {step.date && <p className="text-xs text-muted">{step.date}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-medium">
                            <Truck className="w-4 h-4" strokeWidth={1.5} />
                            Mark as Shipped
                        </button>
                        <button className="w-full py-3 border border-border rounded-xl font-medium hover:bg-surface-hover">
                            Print Invoice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
