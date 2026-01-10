"use client";

import Link from "next/link";
import { ArrowLeft, Star, Package, Receipt, TrendingUp, Ban, Mail, Phone, MapPin, Calendar } from "lucide-react";

const seller = {
    id: "SEL-001",
    name: "Jaipur Silvers",
    email: "contact@jaipursilvers.com",
    phone: "+91 98765 43210",
    address: "123, Jewellery Lane, Jaipur, Rajasthan - 302001",
    joinDate: "Mar 15, 2024",
    status: "Active",
    type: "Manufacturer",
    rating: 4.8,
    reviews: 342,
    stats: {
        products: 145,
        orders: 1234,
        gmv: "₹12.4L",
        rating: 4.8,
    },
    recentOrders: [
        { id: "ORD-001", date: "Jan 10", amount: "₹4,599", status: "Delivered" },
        { id: "ORD-002", date: "Jan 9", amount: "₹2,899", status: "Shipped" },
        { id: "ORD-003", date: "Jan 8", amount: "₹6,199", status: "Delivered" },
    ],
};

export default function SellerDetailPage() {
    return (
        <div className="max-w-4xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/sellers" className="p-2 hover:bg-surface-hover rounded-xl">
                        <ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-semibold text-foreground">{seller.name}</h1>
                            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-lg">{seller.status}</span>
                        </div>
                        <p className="text-sm text-muted mt-1">{seller.id} • {seller.type}</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50">
                    <Ban className="w-4 h-4" strokeWidth={1.5} />
                    Suspend Seller
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: "Products", value: seller.stats.products, icon: Package },
                    { label: "Orders", value: seller.stats.orders, icon: Receipt },
                    { label: "GMV", value: seller.stats.gmv, icon: TrendingUp },
                    { label: "Rating", value: seller.stats.rating, icon: Star },
                ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-5 border border-border text-center">
                        <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" strokeWidth={1.5} />
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Contact Info */}
                <div className="bg-white rounded-xl border border-border p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Contact Information</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <Mail className="w-4 h-4 text-muted" strokeWidth={1.5} />
                            <span className="text-foreground">{seller.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Phone className="w-4 h-4 text-muted" strokeWidth={1.5} />
                            <span className="text-foreground">{seller.phone}</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm">
                            <MapPin className="w-4 h-4 text-muted mt-0.5" strokeWidth={1.5} />
                            <span className="text-foreground">{seller.address}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Calendar className="w-4 h-4 text-muted" strokeWidth={1.5} />
                            <span className="text-foreground">Joined {seller.joinDate}</span>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl border border-border p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Recent Orders</h3>
                    <div className="space-y-3">
                        {seller.recentOrders.map((order, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-foreground">{order.id}</p>
                                    <p className="text-xs text-muted">{order.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-foreground">{order.amount}</p>
                                    <p className="text-xs text-emerald-600">{order.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
