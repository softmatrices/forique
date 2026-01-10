"use client";

import Link from "next/link";
import { ArrowLeft, UserCircle, TrendingUp, ShoppingCart, Star, Heart, Download } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const customerGrowth = [
    { month: "Jul", customers: 8200, new: 850 },
    { month: "Aug", customers: 9100, new: 920 },
    { month: "Sep", customers: 9800, new: 780 },
    { month: "Oct", customers: 10600, new: 890 },
    { month: "Nov", customers: 11500, new: 1020 },
    { month: "Dec", customers: 12400, new: 1150 },
];

const customersByCity = [
    { city: "Mumbai", count: 3200 },
    { city: "Delhi", count: 2800 },
    { city: "Bangalore", count: 2100 },
    { city: "Hyderabad", count: 1500 },
    { city: "Chennai", count: 1200 },
    { city: "Others", count: 1600 },
];

const customerSegments = [
    { name: "Active (30d)", value: 8200, color: "#e11d48" },
    { name: "Returning", value: 3100, color: "#fb7185" },
    { name: "New", value: 1100, color: "#fda4af" },
];

const topCustomers = [
    { name: "Priya Sharma", orders: 28, spent: "₹1,24,500", city: "Mumbai" },
    { name: "Rahul Verma", orders: 24, spent: "₹98,200", city: "Delhi" },
    { name: "Anita Desai", orders: 21, spent: "₹87,600", city: "Bangalore" },
    { name: "Vikram Singh", orders: 19, spent: "₹76,400", city: "Hyderabad" },
];

export default function CustomersAnalyticsPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-surface-hover rounded-xl">
                        <ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Customer Analytics</h1>
                        <p className="text-sm text-muted mt-1">Customer insights and engagement metrics</p>
                    </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium">
                    <Download className="w-4 h-4" strokeWidth={1.5} />Export
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Customers", value: "12.4K", change: "+24.5%", icon: UserCircle },
                    { label: "Active Users (30d)", value: "8,200", change: "+18%", icon: TrendingUp },
                    { label: "Avg Orders/Customer", value: "2.8", change: "+0.4", icon: ShoppingCart },
                    { label: "Wishlist Items", value: "45.2K", change: "+32%", icon: Heart },
                ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-border">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-rose-50">
                                <item.icon className="w-4 h-4 text-rose-600" strokeWidth={1.5} />
                            </div>
                            <span className="text-sm text-muted">{item.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{item.value}</p>
                        <p className="text-xs text-emerald-600 mt-1">{item.change}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Customer Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={customerGrowth}>
                        <defs>
                            <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                        <XAxis dataKey="month" stroke="#737373" fontSize={12} />
                        <YAxis stroke="#737373" fontSize={12} />
                        <Tooltip />
                        <Area type="monotone" dataKey="customers" stroke="#e11d48" strokeWidth={2} fill="url(#colorCustomers)" name="Total Customers" />
                        <Line type="monotone" dataKey="new" stroke="#10b981" strokeWidth={2} name="New Customers" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Customers by City</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={customersByCity} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                            <XAxis type="number" stroke="#737373" fontSize={12} />
                            <YAxis dataKey="city" type="category" stroke="#737373" fontSize={12} width={80} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#e11d48" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Customer Segments</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={customerSegments} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                                {customerSegments.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-4">
                        {customerSegments.map((s, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                                <span className="text-xs text-muted">{s.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Top Customers</h3>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left text-xs font-semibold text-muted uppercase py-3">Customer</th>
                            <th className="text-right text-xs font-semibold text-muted uppercase py-3">Orders</th>
                            <th className="text-right text-xs font-semibold text-muted uppercase py-3">Total Spent</th>
                            <th className="text-right text-xs font-semibold text-muted uppercase py-3">City</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {topCustomers.map((c, i) => (
                            <tr key={i} className="hover:bg-surface-hover">
                                <td className="py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                                            {c.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-sm font-medium text-foreground">{c.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 text-sm text-muted text-right">{c.orders}</td>
                                <td className="py-4 text-sm font-semibold text-foreground text-right">{c.spent}</td>
                                <td className="py-4 text-sm text-muted text-right">{c.city}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
