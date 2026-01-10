"use client";

import Link from "next/link";
import { ArrowLeft, MessageSquare, Clock, User, AlertTriangle, Check, X } from "lucide-react";

const dispute = {
    id: "DSP-001",
    orderId: "ORD-2025-4521",
    status: "Open",
    priority: "High",
    type: "Product Quality",
    createdAt: "Jan 8, 2026, 10:30 AM",
    customer: { name: "Priya Sharma", email: "priya.s@email.com", phone: "+91 98765 43210" },
    seller: { name: "Jaipur Silvers", id: "SEL-001" },
    product: { name: "Kundan Jhumka Earrings", image: "/products/kundan-jhumka.png", price: 2499 },
    description: "The product received does not match the images shown on the website. The stones appear to be of lower quality and the finish is not as polished as expected.",
    messages: [
        { from: "customer", text: "The product quality is not as advertised.", time: "Jan 8, 10:30 AM" },
        { from: "system", text: "Dispute escalated to seller.", time: "Jan 8, 10:35 AM" },
        { from: "seller", text: "We apologize for the inconvenience. Can you share photos?", time: "Jan 8, 11:15 AM" },
        { from: "customer", text: "Please check attached images.", time: "Jan 8, 11:45 AM" },
    ],
};

export default function DisputeDetailPage() {
    return (
        <div className="max-w-4xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/disputes" className="p-2 hover:bg-surface-hover rounded-xl">
                        <ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-semibold text-foreground">{dispute.id}</h1>
                            <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs font-medium rounded-lg">{dispute.status}</span>
                            <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-lg">{dispute.priority}</span>
                        </div>
                        <p className="text-sm text-muted mt-1">{dispute.type} • Order {dispute.orderId}</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Description */}
                    <div className="bg-white rounded-xl border border-border p-5">
                        <h3 className="text-sm font-semibold text-foreground mb-3">Issue Description</h3>
                        <p className="text-sm text-muted leading-relaxed">{dispute.description}</p>
                    </div>

                    {/* Product */}
                    <div className="bg-white rounded-xl border border-border p-5">
                        <h3 className="text-sm font-semibold text-foreground mb-3">Product Details</h3>
                        <div className="flex items-center gap-4">
                            <img src={dispute.product.image} alt={dispute.product.name} className="w-16 h-16 rounded-lg object-cover bg-surface-hover" />
                            <div>
                                <p className="text-sm font-medium text-foreground">{dispute.product.name}</p>
                                <p className="text-sm text-primary font-semibold">₹{dispute.product.price.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="bg-white rounded-xl border border-border p-5">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Conversation</h3>
                        <div className="space-y-4">
                            {dispute.messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.from === "seller" ? "justify-end" : ""}`}>
                                    <div className={`max-w-[70%] p-3 rounded-xl ${msg.from === "customer" ? "bg-surface-hover" :
                                            msg.from === "seller" ? "bg-primary/10" :
                                                "bg-amber-50 text-center w-full max-w-full"
                                        }`}>
                                        {msg.from !== "system" && (
                                            <p className="text-xs text-muted capitalize mb-1">{msg.from}</p>
                                        )}
                                        <p className="text-sm text-foreground">{msg.text}</p>
                                        <p className="text-xs text-muted mt-1">{msg.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Parties */}
                    <div className="bg-white rounded-xl border border-border p-5">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Parties Involved</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-muted uppercase">Customer</p>
                                <p className="text-sm font-medium text-foreground mt-1">{dispute.customer.name}</p>
                                <p className="text-xs text-muted">{dispute.customer.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted uppercase">Seller</p>
                                <Link href={`/sellers/${dispute.seller.id}`} className="text-sm font-medium text-primary mt-1 block">{dispute.seller.name}</Link>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-xl border border-border p-5 space-y-3">
                        <button className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600">
                            <Check className="w-4 h-4" strokeWidth={2} />
                            Resolve in Customer Favor
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600">
                            <Check className="w-4 h-4" strokeWidth={2} />
                            Resolve in Seller Favor
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 py-3 border border-border rounded-xl font-medium hover:bg-surface-hover">
                            Request More Information
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
