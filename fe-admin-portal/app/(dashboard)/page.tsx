import Link from "next/link";
import {
    TrendingUp,
    Users,
    Box,
    Receipt,
    Wallet,
    CircleAlert,
    UserCheck,
    UserCircle,
    ArrowRight,
    ChevronRight,
} from "lucide-react";

const stats = [
    {
        name: "Total GMV",
        value: "₹45.2L",
        change: "+18.3%",
        icon: Wallet,
        gradient: "from-emerald-500 to-teal-400",
        href: "/analytics/gmv",
    },
    {
        name: "Active Sellers",
        value: "234",
        change: "+12.4%",
        icon: Users,
        gradient: "from-blue-500 to-cyan-400",
        href: "/analytics/sellers",
    },
    {
        name: "Customers",
        value: "12.4K",
        change: "+24.5%",
        icon: UserCircle,
        gradient: "from-rose-500 to-pink-400",
        href: "/analytics/customers",
    },
    {
        name: "Total Orders",
        value: "1,456",
        change: "+8.7%",
        icon: Receipt,
        gradient: "from-violet-500 to-purple-400",
        href: "/analytics/orders",
    },
];

const metrics = [
    { name: "Order Defect Rate", value: "0.8%", target: "< 1%", status: "success" },
    { name: "RTO Rate", value: "12.3%", target: "< 15%", status: "success" },
    { name: "Pending Applications", value: "23", target: "< 10", status: "warning" },
    { name: "Open Disputes", value: "7", target: "< 5", status: "danger" },
];

const pendingProducts = [
    { id: "PROD-001", name: "Kundan Jhumka Earrings", seller: "Jaipur Silvers", submitted: "2h ago" },
    { id: "PROD-002", name: "Temple Necklace Set", seller: "Heritage Ornaments", submitted: "4h ago" },
    { id: "PROD-003", name: "Oxidized Silver Bangles", seller: "Silver Craft", submitted: "6h ago" },
];

const recentApplications = [
    { id: "APP-001", name: "Royal Jewels Pvt Ltd", type: "Manufacturer", date: "Today" },
    { id: "APP-002", name: "Silver Craft Studio", type: "Artisan", date: "Today" },
];

const statusColors: Record<string, string> = {
    success: "text-emerald-600 bg-emerald-50",
    warning: "text-amber-600 bg-amber-50",
    danger: "text-rose-600 bg-rose-50",
};

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted mt-1">Platform overview and key metrics</p>
            </div>

            {/* KPI Cards - Clickable */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
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
                                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                    <TrendingUp className="w-3 h-3" strokeWidth={2} />
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

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Health Metrics */}
                <div className="bg-white rounded-2xl border border-border">
                    <div className="px-6 py-4 border-b border-border">
                        <h2 className="text-lg font-semibold text-foreground">Platform Health</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        {metrics.map((metric) => (
                            <div key={metric.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2.5 h-2.5 rounded-full ${metric.status === "success" ? "bg-emerald-500" :
                                            metric.status === "warning" ? "bg-amber-500" : "bg-rose-500"
                                        }`} />
                                    <span className="text-sm text-foreground">{metric.name}</span>
                                </div>
                                <span className={`text-sm font-semibold px-2 py-0.5 rounded-lg ${statusColors[metric.status]}`}>
                                    {metric.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pending Product Approvals */}
                <div className="bg-white rounded-2xl border border-border">
                    <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-foreground">Pending Approvals</h2>
                        <Link href="/catalog?status=pending" className="text-sm font-medium text-primary">View All</Link>
                    </div>
                    <div className="divide-y divide-border">
                        {pendingProducts.map((product) => (
                            <div key={product.id} className="px-6 py-4 flex items-center justify-between hover:bg-surface-hover transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                                        <Box className="w-5 h-5 text-amber-600" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground truncate max-w-[150px]">{product.name}</p>
                                        <p className="text-xs text-muted">{product.seller} • {product.submitted}</p>
                                    </div>
                                </div>
                                <Link href={`/catalog/${product.id}/review`} className="text-sm font-medium text-primary">Review</Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pending Applications */}
                <div className="bg-white rounded-2xl border border-border">
                    <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-foreground">Seller Applications</h2>
                        <Link href="/applications" className="text-sm font-medium text-primary">View All</Link>
                    </div>
                    <div className="divide-y divide-border">
                        {recentApplications.map((app) => (
                            <div key={app.id} className="px-6 py-4 flex items-center justify-between hover:bg-surface-hover transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
                                        <UserCheck className="w-5 h-5 text-white" strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{app.name}</p>
                                        <p className="text-xs text-muted">{app.type} • {app.date}</p>
                                    </div>
                                </div>
                                <Link href={`/applications/${app.id}`} className="text-sm font-medium text-primary">Review</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Alert */}
            <div className="bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 rounded-2xl p-5 flex items-start gap-4">
                <div className="p-2 bg-rose-100 rounded-xl">
                    <CircleAlert className="w-5 h-5 text-rose-600" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Attention Required</p>
                    <p className="text-sm text-muted mt-0.5">
                        7 disputes pending. 3 open &gt; 48 hours.
                    </p>
                </div>
                <Link href="/disputes" className="text-sm font-medium text-rose-600 hover:underline flex items-center gap-1">
                    View <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </Link>
            </div>
        </div>
    );
}
