"use client";

import Link from "next/link";
import { ArrowLeft, Box, Check, Clock, AlertTriangle, Download } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const catalogByCategory = [
    { category: "Earrings", count: 2850 }, { category: "Necklaces", count: 2100 },
    { category: "Bangles", count: 1800 }, { category: "Rings", count: 1200 },
    { category: "Hair Accessories", count: 982 },
];

const catalogStatus = [
    { name: "Active", value: 8650, color: "#10b981" },
    { name: "Pending Approval", value: 134, color: "#f59e0b" },
    { name: "Inactive", value: 148, color: "#6b6580" },
];

export default function CatalogAnalyticsPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-surface-hover rounded-xl"><ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} /></Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Catalog Analytics</h1>
                        <p className="text-sm text-muted mt-1">Product catalog health and metrics</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Products", value: "8,932", change: "+5.2%", icon: Box },
                    { label: "Active Listings", value: "8,650", change: "96.8%", icon: Check },
                    { label: "Pending Approval", value: "134", change: "Review needed", icon: Clock },
                    { label: "Quality Issues", value: "23", change: "Flagged", icon: AlertTriangle },
                ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-border">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-amber-50"><item.icon className="w-4 h-4 text-amber-600" strokeWidth={1.5} /></div>
                            <span className="text-sm text-muted">{item.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{item.value}</p>
                        <p className="text-xs text-muted mt-1">{item.change}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Products by Category</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={catalogByCategory}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e8e4ef" />
                            <XAxis dataKey="category" stroke="#6b6580" fontSize={11} />
                            <YAxis stroke="#6b6580" fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#4a1d6e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Catalog Status</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={catalogStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                                {catalogStatus.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
