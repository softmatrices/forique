"use client";

import Link from "next/link";
import { Search, Filter, ChevronDown, Eye, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";
import { useState, useMemo } from "react";

const orders = [
    { id: "ORD-2026-001", date: "Jan 10, 2026", customer: "Priya Sharma", seller: "Jaipur Silvers", items: 2, total: 6897, status: "Processing", payment: "Prepaid" },
    { id: "ORD-2026-002", date: "Jan 10, 2026", customer: "Rahul Verma", seller: "Heritage Ornaments", items: 1, total: 2499, status: "Shipped", payment: "Prepaid" },
    { id: "ORD-2026-003", date: "Jan 9, 2026", customer: "Anita Desai", seller: "Royal Jewels", items: 3, total: 8750, status: "Delivered", payment: "COD" },
    { id: "ORD-2026-004", date: "Jan 9, 2026", customer: "Vikram Singh", seller: "Silver Craft", items: 1, total: 1599, status: "Pending", payment: "Prepaid" },
    { id: "ORD-2026-005", date: "Jan 8, 2026", customer: "Meera Patel", seller: "Jaipur Silvers", items: 2, total: 4599, status: "Delivered", payment: "Prepaid" },
    { id: "ORD-2026-006", date: "Jan 8, 2026", customer: "Arjun Kumar", seller: "Heritage Ornaments", items: 1, total: 2199, status: "Cancelled", payment: "COD" },
];

const sellerOptions = ["All", "Jaipur Silvers", "Heritage Ornaments", "Royal Jewels", "Silver Craft"];
const statusOptions = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
const paymentOptions = ["All", "Prepaid", "COD"];
const sortOptions = [
    { label: "Newest First", value: "date-desc" },
    { label: "Oldest First", value: "date-asc" },
    { label: "Amount: High", value: "total-desc" },
    { label: "Amount: Low", value: "total-asc" },
];

const statusIcons: Record<string, React.ElementType> = {
    Pending: Clock, Processing: Package, Shipped: Truck, Delivered: CheckCircle, Cancelled: XCircle,
};

const statusColors: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-600", Processing: "bg-blue-50 text-blue-600",
    Shipped: "bg-violet-50 text-violet-600", Delivered: "bg-emerald-50 text-emerald-600",
    Cancelled: "bg-red-50 text-red-600",
};

export default function AdminOrdersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [sellerFilter, setSellerFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [paymentFilter, setPaymentFilter] = useState("All");
    const [sortBy, setSortBy] = useState("date-desc");

    const filteredOrders = useMemo(() => {
        let result = [...orders];
        if (searchQuery) result = result.filter(o => o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer.toLowerCase().includes(searchQuery.toLowerCase()));
        if (sellerFilter !== "All") result = result.filter(o => o.seller === sellerFilter);
        if (statusFilter !== "All") result = result.filter(o => o.status === statusFilter);
        if (paymentFilter !== "All") result = result.filter(o => o.payment === paymentFilter);
        const [field, direction] = sortBy.split("-");
        result.sort((a, b) => {
            const cmp = field === "date" ? new Date(a.date).getTime() - new Date(b.date).getTime() : a.total - b.total;
            return direction === "desc" ? -cmp : cmp;
        });
        return result;
    }, [searchQuery, sellerFilter, statusFilter, paymentFilter, sortBy]);

    const activeFilters = (sellerFilter !== "All" ? 1 : 0) + (statusFilter !== "All" ? 1 : 0) + (paymentFilter !== "All" ? 1 : 0);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-semibold text-foreground">Orders</h1>
                <p className="text-sm text-muted mt-1">{filteredOrders.length} of {orders.length} orders</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" strokeWidth={1.5} />
                    <input type="text" placeholder="Search orders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10" />
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium ${activeFilters > 0 ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-surface-hover"}`}>
                        <Filter className="w-4 h-4" strokeWidth={1.5} />
                        Filters {activeFilters > 0 && `(${activeFilters})`}
                    </button>
                    <div className="relative">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-border rounded-xl text-sm cursor-pointer">
                            {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" strokeWidth={1.5} />
                    </div>
                </div>
            </div>

            {showFilters && (
                <div className="bg-white rounded-xl border border-border p-4 animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium">Filters</span>
                        <button onClick={() => { setSellerFilter("All"); setStatusFilter("All"); setPaymentFilter("All"); }} className="text-xs text-primary">Clear all</button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs text-muted mb-2">Seller</label>
                            <select value={sellerFilter} onChange={(e) => setSellerFilter(e.target.value)} className="w-full px-3 py-2 bg-surface-hover border border-border rounded-lg text-sm">
                                {sellerOptions.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-muted mb-2">Status</label>
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-3 py-2 bg-surface-hover border border-border rounded-lg text-sm">
                                {statusOptions.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-muted mb-2">Payment</label>
                            <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="w-full px-3 py-2 bg-surface-hover border border-border rounded-lg text-sm">
                                {paymentOptions.map(p => <option key={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-surface-hover">
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Order</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Customer</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Seller</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Total</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Status</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredOrders.map((order) => {
                            const StatusIcon = statusIcons[order.status];
                            return (
                                <tr key={order.id} className="hover:bg-surface-hover/50">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-foreground">{order.id}</p>
                                        <p className="text-xs text-muted">{order.date}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-foreground">{order.customer}</td>
                                    <td className="px-6 py-4 text-sm text-foreground">{order.seller}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-foreground">₹{order.total.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColors[order.status]}`}>
                                            <StatusIcon className="w-3.5 h-3.5" strokeWidth={1.5} />{order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/orders/${order.id}`} className="text-sm text-primary font-medium flex items-center gap-1">
                                            <Eye className="w-4 h-4" strokeWidth={1.5} />View
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {filteredOrders.length === 0 && <div className="text-center py-12"><p className="text-muted">No orders found.</p></div>}
            </div>
        </div>
    );
}
