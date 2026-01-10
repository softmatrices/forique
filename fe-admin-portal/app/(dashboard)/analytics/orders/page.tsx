"use client";

import Link from "next/link";
import { ArrowLeft, Receipt, Clock, Package, TrendingUp, Download } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const dailyOrders = [
    { date: "Jan 1", orders: 42 }, { date: "Jan 2", orders: 58 },
    { date: "Jan 3", orders: 51 }, { date: "Jan 4", orders: 72 },
    { date: "Jan 5", orders: 65 }, { date: "Jan 6", orders: 89 },
    { date: "Jan 7", orders: 78 }, { date: "Jan 8", orders: 102 },
    { date: "Jan 9", orders: 91 }, { date: "Jan 10", orders: 118 },
];

const ordersByStatus = [
    { name: "Delivered", value: 1180, color: "#10b981" },
    { name: "In Transit", value: 156, color: "#3b82f6" },
    { name: "Processing", value: 78, color: "#f59e0b" },
    { name: "RTO", value: 42, color: "#ef4444" },
];

export default function OrdersAnalyticsPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-surface-hover rounded-xl"><ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} /></Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Orders Analytics</h1>
                        <p className="text-sm text-muted mt-1">Platform-wide order insights</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Orders", value: "1,456", change: "+8.7%", icon: Receipt },
                    { label: "Avg Fulfillment", value: "2.1 days", change: "-0.3 days", icon: Clock },
                    { label: "Delivery Rate", value: "81.1%", change: "+1.2%", icon: Package },
                    { label: "RTO Rate", value: "2.9%", change: "-0.5%", icon: TrendingUp },
                ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-border">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-violet-50"><item.icon className="w-4 h-4 text-violet-600" strokeWidth={1.5} /></div>
                            <span className="text-sm text-muted">{item.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{item.value}</p>
                        <p className="text-xs text-emerald-600 mt-1">{item.change}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Daily Orders Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyOrders}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e8e4ef" />
                        <XAxis dataKey="date" stroke="#6b6580" fontSize={12} />
                        <YAxis stroke="#6b6580" fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="orders" stroke="#4a1d6e" strokeWidth={2} dot={{ fill: "#4a1d6e" }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Orders by Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={ordersByStatus} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e8e4ef" />
                        <XAxis type="number" stroke="#6b6580" fontSize={12} />
                        <YAxis dataKey="name" type="category" stroke="#6b6580" fontSize={12} width={80} />
                        <Tooltip />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {ordersByStatus.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
