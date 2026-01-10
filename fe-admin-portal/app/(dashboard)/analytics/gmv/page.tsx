"use client";

import Link from "next/link";
import { ArrowLeft, Wallet, TrendingUp, Users, Download, Info } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const dailyGMV = [
    { date: "Jan 1", gmv: 125000 }, { date: "Jan 2", gmv: 182000 },
    { date: "Jan 3", gmv: 158000 }, { date: "Jan 4", gmv: 221000 },
    { date: "Jan 5", gmv: 195000 }, { date: "Jan 6", gmv: 283000 },
    { date: "Jan 7", gmv: 245000 }, { date: "Jan 8", gmv: 312000 },
];

const monthlyGMV = [
    { month: "Jul", gmv: 2800000 }, { month: "Aug", gmv: 3100000 },
    { month: "Sep", gmv: 3450000 }, { month: "Oct", gmv: 3890000 },
    { month: "Nov", gmv: 4250000 }, { month: "Dec", gmv: 4520000 },
];

const gmvBySeller = [
    { name: "Top 10%", value: 65, color: "#e11d48" },
    { name: "Next 20%", value: 20, color: "#fb7185" },
    { name: "Rest", value: 15, color: "#fda4af" },
];

const kpiInfo = {
    gmv: "Total value of all merchandise sold through the platform, before deductions for returns or refunds.",
    aov: "Average Order Value is calculated as Total GMV divided by Total Orders.",
    sellers: "Number of sellers who contributed at least one sale in the selected period.",
    commission: "Total platform earnings from seller commissions based on the configured rates.",
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

export default function GMVAnalyticsPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-surface-hover rounded-xl">
                        <ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">GMV Analytics</h1>
                        <p className="text-sm text-muted mt-1">Platform gross merchandise value insights</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">
                    <Download className="w-4 h-4" strokeWidth={1.5} />Export
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total GMV", value: "₹45.2L", change: "+18.3%", icon: Wallet, info: kpiInfo.gmv },
                    { label: "Average Order Value", value: "₹3,102", change: "+5.2%", icon: TrendingUp, info: kpiInfo.aov },
                    { label: "Contributing Sellers", value: "218", change: "+15", icon: Users, info: kpiInfo.sellers },
                    { label: "Commission Earned", value: "₹6.78L", change: "+22%", icon: Wallet, info: kpiInfo.commission },
                ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-border">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-emerald-50">
                                    <item.icon className="w-4 h-4 text-emerald-600" strokeWidth={1.5} />
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
                    <h3 className="text-lg font-semibold text-foreground">Daily GMV Trend</h3>
                    <InfoTooltip text="Daily gross merchandise value showing sales volume patterns. Useful for identifying peak days and trends." />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={dailyGMV}>
                        <defs>
                            <linearGradient id="colorGmv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                        <XAxis dataKey="date" stroke="#737373" fontSize={12} />
                        <YAxis stroke="#737373" fontSize={12} />
                        <Tooltip />
                        <Area type="monotone" dataKey="gmv" stroke="#e11d48" strokeWidth={2} fill="url(#colorGmv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-foreground">Monthly GMV</h3>
                        <InfoTooltip text="Month-over-month GMV comparison helps track growth trajectory." />
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={monthlyGMV}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                            <XAxis dataKey="month" stroke="#737373" fontSize={12} />
                            <YAxis stroke="#737373" fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="gmv" fill="#e11d48" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-foreground">GMV Distribution</h3>
                        <InfoTooltip text="Shows how GMV is distributed across seller tiers. High concentration in top 10% is typical for marketplaces." />
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={gmvBySeller} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value">
                                {gmvBySeller.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-4">
                        {gmvBySeller.map((s, i) => (
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
