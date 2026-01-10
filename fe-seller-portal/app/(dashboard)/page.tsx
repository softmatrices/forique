import Link from "next/link";
import {
    TrendingUp,
    TrendingDown,
    Receipt,
    Box,
    Wallet,
    Award,
    ArrowRight,
    ChevronRight,
} from "lucide-react";

const stats = [
    {
        name: "Total Revenue",
        value: "₹2,45,890",
        change: "+12.5%",
        trend: "up",
        icon: Wallet,
        gradient: "from-emerald-500 to-teal-400",
        href: "/analytics/revenue",
    },
    {
        name: "Orders",
        value: "156",
        change: "+8.2%",
        trend: "up",
        icon: Receipt,
        gradient: "from-blue-500 to-cyan-400",
        href: "/analytics/orders",
    },
    {
        name: "Products Listed",
        value: "432",
        change: "+3.1%",
        trend: "up",
        icon: Box,
        gradient: "from-amber-500 to-orange-400",
        href: "/analytics/products",
    },
    {
        name: "Buy Box Win Rate",
        value: "68%",
        change: "-2.4%",
        trend: "down",
        icon: Award,
        gradient: "from-violet-500 to-purple-400",
        href: "/analytics/buybox",
    },
];

const recentOrders = [
    { id: "ORD-2026-001", customer: "Priya Sharma", amount: "₹2,499", status: "Pending", date: "Today, 2:30 PM" },
    { id: "ORD-2026-002", customer: "Rahul Verma", amount: "₹1,899", status: "Shipped", date: "Today, 11:15 AM" },
    { id: "ORD-2026-003", customer: "Anita Desai", amount: "₹4,299", status: "Delivered", date: "Yesterday" },
    { id: "ORD-2026-004", customer: "Vikram Singh", amount: "₹899", status: "Processing", date: "Yesterday" },
    { id: "ORD-2026-005", customer: "Meera Patel", amount: "₹3,199", status: "Delivered", date: "Jan 8, 2026" },
];

const statusColors: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-600 border-amber-200",
    Shipped: "bg-blue-50 text-blue-600 border-blue-200",
    Delivered: "bg-emerald-50 text-emerald-600 border-emerald-200",
    Processing: "bg-slate-50 text-slate-600 border-slate-200",
};

export default function DashboardPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
                    <p className="text-sm text-muted mt-1">
                        Welcome back! Here&apos;s what&apos;s happening with your store.
                    </p>
                </div>
                <Link href="/products/new" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-md shadow-primary/25">
                    Add Product
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Link>
            </div>

            {/* KPI Cards - Clickable */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className="group bg-white rounded-2xl p-5 border border-border hover-lift cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                                <stat.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                            </div>
                            <div className="flex items-center gap-2">
                                <div
                                    className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${stat.trend === "up"
                                            ? "text-emerald-600 bg-emerald-50"
                                            : "text-rose-600 bg-rose-50"
                                        }`}
                                >
                                    {stat.trend === "up" ? (
                                        <TrendingUp className="w-3 h-3" strokeWidth={2} />
                                    ) : (
                                        <TrendingDown className="w-3 h-3" strokeWidth={2} />
                                    )}
                                    {stat.change}
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted mt-1">{stat.name}</p>
                    </Link>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
                    <Link href="/orders" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
                        View all <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-surface-hover">
                                <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-6 py-3">Order ID</th>
                                <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-6 py-3">Customer</th>
                                <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-6 py-3">Amount</th>
                                <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-6 py-3">Status</th>
                                <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-6 py-3">Date</th>
                                <th className="text-left text-xs font-semibold text-muted uppercase tracking-wider px-6 py-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-surface-hover/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-semibold text-primary">{order.id}</td>
                                    <td className="px-6 py-4 text-sm text-foreground">{order.customer}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-foreground">{order.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold border ${statusColors[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <Link href={`/orders/${order.id}`} className="text-sm text-primary hover:underline">View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
