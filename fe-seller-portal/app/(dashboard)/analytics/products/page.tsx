"use client";

import Link from "next/link";
import { ArrowLeft, Box, TrendingUp, Eye, ShoppingCart, Download } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const productsByCategory = [
    { category: "Earrings", count: 145, views: 12500, sales: 89 },
    { category: "Necklaces", count: 98, views: 8900, sales: 56 },
    { category: "Bangles", count: 87, views: 6700, sales: 42 },
    { category: "Rings", count: 62, views: 5200, sales: 31 },
    { category: "Hair Accessories", count: 40, views: 3100, sales: 18 },
];

const productStatus = [
    { name: "Active", value: 398, color: "#10b981" },
    { name: "Pending Approval", value: 24, color: "#f59e0b" },
    { name: "Out of Stock", value: 10, color: "#ef4444" },
];

const topProducts = [
    { name: "Kundan Jhumka Earrings", views: 2450, sales: 89, conversion: 3.6 },
    { name: "Temple Gold Necklace", views: 1890, sales: 67, conversion: 3.5 },
    { name: "Oxidized Silver Bangles", views: 1670, sales: 54, conversion: 3.2 },
    { name: "Pearl Drop Maang Tikka", views: 1420, sales: 43, conversion: 3.0 },
];

export default function ProductsAnalyticsPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-surface-hover rounded-xl"><ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} /></Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Products Analytics</h1>
                        <p className="text-sm text-muted mt-1">Product performance and catalog health</p>
                    </div>
                </div>
                <Link href="/products/new" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">
                    Add Product
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Products", value: "432", change: "+3.1%", icon: Box },
                    { label: "Total Views", value: "36.4K", change: "+15%", icon: Eye },
                    { label: "Total Sales", value: "236", change: "+8%", icon: ShoppingCart },
                    { label: "Avg Conversion", value: "3.2%", change: "+0.4%", icon: TrendingUp },
                ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-border">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-amber-50"><item.icon className="w-4 h-4 text-amber-600" strokeWidth={1.5} /></div>
                            <span className="text-sm text-muted">{item.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{item.value}</p>
                        <p className="text-xs text-emerald-600 mt-1">{item.change}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Products by Category</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={productsByCategory} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#e8e4ef" />
                            <XAxis type="number" stroke="#6b6580" fontSize={12} />
                            <YAxis dataKey="category" type="category" stroke="#6b6580" fontSize={12} width={100} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#4a1d6e" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Product Status</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={productStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                                {productStatus.map((entry, index) => (<Cell key={index} fill={entry.color} />))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Top Performing Products</h3>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left text-xs font-semibold text-muted uppercase py-3">Product</th>
                            <th className="text-right text-xs font-semibold text-muted uppercase py-3">Views</th>
                            <th className="text-right text-xs font-semibold text-muted uppercase py-3">Sales</th>
                            <th className="text-right text-xs font-semibold text-muted uppercase py-3">Conversion</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {topProducts.map((p, i) => (
                            <tr key={i} className="hover:bg-surface-hover">
                                <td className="py-4 text-sm font-medium text-foreground">{p.name}</td>
                                <td className="py-4 text-sm text-muted text-right">{p.views.toLocaleString()}</td>
                                <td className="py-4 text-sm text-foreground text-right font-medium">{p.sales}</td>
                                <td className="py-4 text-sm text-emerald-600 text-right">{p.conversion}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
