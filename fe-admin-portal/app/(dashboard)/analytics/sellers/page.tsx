"use client";

import Link from "next/link";
import { ArrowLeft, Users, TrendingUp, Star, AlertTriangle, Download } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const sellerGrowth = [
    { month: "Jul", active: 180, new: 15 }, { month: "Aug", active: 195, new: 18 },
    { month: "Sep", active: 205, new: 12 }, { month: "Oct", active: 218, new: 16 },
    { month: "Nov", active: 226, new: 14 }, { month: "Dec", active: 234, new: 12 },
];

const sellersByType = [
    { name: "Manufacturer", value: 95, color: "#4a1d6e" },
    { name: "Artisan", value: 72, color: "#6b3fa0" },
    { name: "Retailer", value: 67, color: "#10b981" },
];

const topSellers = [
    { name: "Fashion Gems India", gmv: "₹45.1L", orders: 342, rating: 4.9 },
    { name: "Royal Jewels Pvt Ltd", gmv: "₹32.8L", orders: 256, rating: 4.8 },
    { name: "Jaipur Silvers", gmv: "₹24.5L", orders: 189, rating: 4.7 },
    { name: "Heritage Ornaments", gmv: "₹18.2L", orders: 145, rating: 4.6 },
];

export default function SellersAnalyticsPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-surface-hover rounded-xl"><ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} /></Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Sellers Analytics</h1>
                        <p className="text-sm text-muted mt-1">Seller performance and growth metrics</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    { label: "Active Sellers", value: "234", change: "+12.4%", icon: Users },
                    { label: "New This Month", value: "12", change: "vs 8 last month", icon: TrendingUp },
                    { label: "Avg Rating", value: "4.6", change: "+0.2", icon: Star },
                    { label: "Suspended", value: "8", change: "-2", icon: AlertTriangle },
                ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-border">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-blue-50"><item.icon className="w-4 h-4 text-blue-600" strokeWidth={1.5} /></div>
                            <span className="text-sm text-muted">{item.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{item.value}</p>
                        <p className="text-xs text-emerald-600 mt-1">{item.change}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Seller Growth Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={sellerGrowth}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e8e4ef" />
                        <XAxis dataKey="month" stroke="#6b6580" fontSize={12} />
                        <YAxis stroke="#6b6580" fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="active" stroke="#4a1d6e" strokeWidth={2} name="Active Sellers" />
                        <Line type="monotone" dataKey="new" stroke="#10b981" strokeWidth={2} name="New Sellers" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Sellers by Type</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={sellersByType} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                                {sellersByType.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Top Performing Sellers</h3>
                    <div className="space-y-4">
                        {topSellers.map((s, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{s.name}</p>
                                        <p className="text-xs text-muted">{s.orders} orders • ⭐ {s.rating}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-foreground">{s.gmv}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
