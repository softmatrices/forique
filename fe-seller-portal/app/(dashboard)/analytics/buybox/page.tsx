"use client";

import Link from "next/link";
import { ArrowLeft, Award, TrendingUp, Target, Zap } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const buyboxTrend = [
    { date: "Dec 1", winRate: 72 }, { date: "Dec 5", winRate: 70 },
    { date: "Dec 10", winRate: 68 }, { date: "Dec 15", winRate: 71 },
    { date: "Dec 20", winRate: 65 }, { date: "Dec 25", winRate: 63 },
    { date: "Dec 30", winRate: 66 }, { date: "Jan 5", winRate: 68 },
    { date: "Jan 10", winRate: 68 },
];

const competitorComparison = [
    { metric: "Price Competitiveness", you: 78, avg: 65 },
    { metric: "Delivery Speed", you: 85, avg: 72 },
    { metric: "Seller Rating", you: 92, avg: 80 },
    { metric: "Stock Availability", you: 88, avg: 75 },
];

const buyboxByCategory = [
    { category: "Earrings", winRate: 75 },
    { category: "Necklaces", winRate: 62 },
    { category: "Bangles", winRate: 71 },
    { category: "Rings", winRate: 58 },
];

export default function BuyBoxAnalyticsPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-surface-hover rounded-xl">
                        <ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Buy Box Analytics</h1>
                        <p className="text-sm text-muted mt-1">Your competitive position and win rate</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    { label: "Current Win Rate", value: "68%", change: "-2.4%", icon: Award, negative: true },
                    { label: "Products with Buy Box", value: "294", change: "+12", icon: Target },
                    { label: "Avg Price Position", value: "#2.3", change: "vs 4 sellers", icon: TrendingUp },
                    { label: "Buy Box Eligibility", value: "98%", change: "+1%", icon: Zap },
                ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-border">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-violet-50">
                                <item.icon className="w-4 h-4 text-violet-600" strokeWidth={1.5} />
                            </div>
                            <span className="text-sm text-muted">{item.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{item.value}</p>
                        <p className={`text-xs mt-1 ${item.negative ? 'text-rose-600' : 'text-emerald-600'}`}>{item.change}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Buy Box Win Rate Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={buyboxTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e8e4ef" />
                        <XAxis dataKey="date" stroke="#6b6580" fontSize={12} />
                        <YAxis stroke="#6b6580" fontSize={12} domain={[50, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="winRate" stroke="#4a1d6e" strokeWidth={2} dot={{ fill: "#4a1d6e", r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Competitive Comparison</h3>
                    <div className="space-y-4">
                        {competitorComparison.map((c, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-foreground">{c.metric}</span>
                                    <span className="text-primary font-medium">You: {c.you}%</span>
                                </div>
                                <div className="flex-1 bg-surface-hover rounded-full h-2">
                                    <div className="h-full bg-primary rounded-full" style={{ width: `${c.you}%` }} />
                                </div>
                                <p className="text-xs text-muted mt-1">Market avg: {c.avg}%</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Win Rate by Category</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={buyboxByCategory}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e8e4ef" />
                            <XAxis dataKey="category" stroke="#6b6580" fontSize={12} />
                            <YAxis stroke="#6b6580" fontSize={12} domain={[0, 100]} />
                            <Tooltip />
                            <Bar dataKey="winRate" fill="#6b3fa0" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
