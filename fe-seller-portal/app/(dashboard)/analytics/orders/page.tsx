"use client";

import Link from "next/link";
import { ArrowLeft, Receipt, TrendingUp, Clock, Package, Download } from "lucide-react";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const dailyOrders = [
    { date: "Jan 1", orders: 8, delivered: 6, rto: 1 },
    { date: "Jan 2", orders: 12, delivered: 10, rto: 1 },
    { date: "Jan 3", orders: 10, delivered: 8, rto: 2 },
    { date: "Jan 4", orders: 15, delivered: 13, rto: 1 },
    { date: "Jan 5", orders: 13, delivered: 11, rto: 1 },
    { date: "Jan 6", orders: 18, delivered: 16, rto: 1 },
    { date: "Jan 7", orders: 16, delivered: 14, rto: 2 },
    { date: "Jan 8", orders: 21, delivered: 18, rto: 2 },
    { date: "Jan 9", orders: 19, delivered: 17, rto: 1 },
    { date: "Jan 10", orders: 24, delivered: 21, rto: 2 },
];

const ordersByStatus = [
    { name: "Delivered", value: 134, color: "#10b981" },
    { name: "In Transit", value: 12, color: "#3b82f6" },
    { name: "Processing", value: 6, color: "#f59e0b" },
    { name: "RTO", value: 4, color: "#ef4444" },
];

const hourlyDistribution = [
    { hour: "6AM", orders: 2 }, { hour: "9AM", orders: 8 }, { hour: "12PM", orders: 15 },
    { hour: "3PM", orders: 12 }, { hour: "6PM", orders: 18 }, { hour: "9PM", orders: 22 }, { hour: "12AM", orders: 5 },
];

export default function OrdersAnalyticsPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-surface-hover rounded-xl"><ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} /></Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Orders Analytics</h1>
                        <p className="text-sm text-muted mt-1">Order trends and fulfillment metrics</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">
                    <Download className="w-4 h-4" strokeWidth={1.5} />Export
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Orders", value: "156", change: "+8.2%", icon: Receipt },
                    { label: "Avg Fulfillment Time", value: "2.4 days", change: "-12%", icon: Clock },
                    { label: "Delivery Rate", value: "85.9%", change: "+2.1%", icon: Package },
                    { label: "RTO Rate", value: "2.6%", change: "-0.8%", icon: TrendingUp },
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
                <h3 className="text-lg font-semibold text-foreground mb-4">Daily Orders Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyOrders}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e8e4ef" />
                        <XAxis dataKey="date" stroke="#6b6580" fontSize={12} />
                        <YAxis stroke="#6b6580" fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="orders" stroke="#4a1d6e" strokeWidth={2} dot={{ fill: "#4a1d6e" }} />
                        <Line type="monotone" dataKey="delivered" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Orders by Status</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={ordersByStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                                {ordersByStatus.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Peak Order Hours</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={hourlyDistribution}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e8e4ef" />
                            <XAxis dataKey="hour" stroke="#6b6580" fontSize={12} />
                            <YAxis stroke="#6b6580" fontSize={12} />
                            <Tooltip />
                            <Bar dataKey="orders" fill="#6b3fa0" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
