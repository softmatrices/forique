"use client";

import Link from "next/link";
import { ArrowLeft, Wallet, TrendingUp, Calendar, Download, Info } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const dailyRevenue = [
    { date: "Jan 1", revenue: 12500 }, { date: "Jan 2", revenue: 18200 },
    { date: "Jan 3", revenue: 15800 }, { date: "Jan 4", revenue: 22100 },
    { date: "Jan 5", revenue: 19500 }, { date: "Jan 6", revenue: 28300 },
    { date: "Jan 7", revenue: 24500 }, { date: "Jan 8", revenue: 31200 },
];

const monthlyRevenue = [
    { month: "Jul", revenue: 145000 }, { month: "Aug", revenue: 162000 },
    { month: "Sep", revenue: 178000 }, { month: "Oct", revenue: 195000 },
    { month: "Nov", revenue: 221000 }, { month: "Dec", revenue: 245890 },
];

const revenueByCategory = [
    { name: "Earrings", value: 82500, color: "#e11d48" },
    { name: "Necklaces", value: 65200, color: "#fb7185" },
    { name: "Bangles", value: 48900, color: "#10b981" },
    { name: "Rings", value: 32400, color: "#f59e0b" },
];

const kpiInfo = {
    revenue: "Total revenue from all sales after discounts, before any deductions.",
    aov: "Average Order Value = Total Revenue / Number of Orders.",
    peak: "Highest single-day revenue in the selected period.",
    growth: "Percentage increase compared to the previous period.",
};

function InfoTooltip({ text }: { text: string }) {
    const [show, setShow] = useState(false);
    return (
        <div className="relative inline-block">
            <button onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className="p-1 text-muted hover:text-foreground">
                <Info className="w-4 h-4" strokeWidth={1.5} />
            </button>
            {show && (
                <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-white text-xs rounded-lg w-48 shadow-lg">
                    {text}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-foreground" />
                </div>
            )}
        </div>
    );
}

export default function RevenueAnalyticsPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-surface-hover rounded-xl">
                        <ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Revenue Analytics</h1>
                        <p className="text-sm text-muted mt-1">Detailed revenue insights and trends</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">
                    <Download className="w-4 h-4" strokeWidth={1.5} />Export
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Revenue", value: "₹2,45,890", change: "+12.5%", icon: Wallet, info: kpiInfo.revenue },
                    { label: "Average Order Value", value: "₹1,576", change: "+4.2%", icon: TrendingUp, info: kpiInfo.aov },
                    { label: "Highest Day", value: "₹35,600", change: "Jan 10", icon: Calendar, info: kpiInfo.peak },
                    { label: "Revenue Growth", value: "18.3%", change: "vs last month", icon: TrendingUp, info: kpiInfo.growth },
                ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-border">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <item.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                                </div>
                                <span className="text-sm text-muted">{item.label}</span>
                            </div>
                            <InfoTooltip text={item.info} />
                        </div>
                        <p className="text-2xl font-bold text-foreground">{item.value}</p>
                        <p className="text-xs text-emerald-600 mt-1">{item.change}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Daily Revenue Trend</h3>
                    <InfoTooltip text="Daily revenue pattern helps identify peak sales days and weekly trends." />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={dailyRevenue}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                        <XAxis dataKey="date" stroke="#737373" fontSize={12} />
                        <YAxis stroke="#737373" fontSize={12} />
                        <Tooltip />
                        <Area type="monotone" dataKey="revenue" stroke="#e11d48" strokeWidth={2} fill="url(#colorRevenue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-foreground">Monthly Revenue</h3>
                        <InfoTooltip text="Track month-over-month revenue growth." />
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={monthlyRevenue}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                            <XAxis dataKey="month" stroke="#737373" fontSize={12} />
                            <YAxis stroke="#737373" fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#e11d48" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-foreground">Revenue by Category</h3>
                        <InfoTooltip text="Which product categories drive the most revenue." />
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={revenueByCategory} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                                {revenueByCategory.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-4">
                        {revenueByCategory.map((s, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                                <span className="text-xs text-muted">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
