"use client";

import Link from "next/link";
import { Search, Filter, ChevronDown, AlertTriangle, Clock, Check, MessageSquare } from "lucide-react";
import { useState, useMemo } from "react";

const disputes = [
    { id: "DSP-001", orderId: "ORD-4521", customer: "Priya Sharma", seller: "Jaipur Silvers", type: "Product Quality", status: "Open", priority: "High", created: "Jan 8, 2026" },
    { id: "DSP-002", orderId: "ORD-4489", customer: "Rahul Verma", seller: "Heritage Ornaments", type: "Delayed Delivery", status: "Open", priority: "Medium", created: "Jan 7, 2026" },
    { id: "DSP-003", orderId: "ORD-4456", customer: "Anita Desai", seller: "Royal Jewels", type: "Wrong Product", status: "In Progress", priority: "High", created: "Jan 6, 2026" },
    { id: "DSP-004", orderId: "ORD-4412", customer: "Vikram Singh", seller: "Silver Craft", type: "Refund Issue", status: "Resolved", priority: "Low", created: "Jan 5, 2026" },
    { id: "DSP-005", orderId: "ORD-4398", customer: "Meera Patel", seller: "Jaipur Silvers", type: "Product Damage", status: "Resolved", priority: "Medium", created: "Jan 4, 2026" },
];

const typeOptions = ["All", "Product Quality", "Delayed Delivery", "Wrong Product", "Refund Issue", "Product Damage"];
const statusOptions = ["All", "Open", "In Progress", "Resolved"];
const priorityOptions = ["All", "High", "Medium", "Low"];
const sortOptions = [
    { label: "Newest First", value: "date-desc" },
    { label: "Oldest First", value: "date-asc" },
    { label: "Priority: High First", value: "priority-desc" },
];

const statusStyles: Record<string, string> = { Open: "bg-amber-50 text-amber-600", "In Progress": "bg-blue-50 text-blue-600", Resolved: "bg-emerald-50 text-emerald-600" };
const priorityStyles: Record<string, string> = { High: "text-red-600", Medium: "text-amber-600", Low: "text-muted" };
const priorityOrder: Record<string, number> = { High: 3, Medium: 2, Low: 1 };

export default function DisputesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [typeFilter, setTypeFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [sortBy, setSortBy] = useState("date-desc");

    const filteredDisputes = useMemo(() => {
        let result = [...disputes];
        if (searchQuery) result = result.filter(d => d.id.toLowerCase().includes(searchQuery.toLowerCase()) || d.customer.toLowerCase().includes(searchQuery.toLowerCase()) || d.seller.toLowerCase().includes(searchQuery.toLowerCase()));
        if (typeFilter !== "All") result = result.filter(d => d.type === typeFilter);
        if (statusFilter !== "All") result = result.filter(d => d.status === statusFilter);
        if (priorityFilter !== "All") result = result.filter(d => d.priority === priorityFilter);
        const [field, direction] = sortBy.split("-");
        result.sort((a, b) => {
            const cmp = field === "date" ? new Date(a.created).getTime() - new Date(b.created).getTime() : priorityOrder[a.priority] - priorityOrder[b.priority];
            return direction === "desc" ? -cmp : cmp;
        });
        return result;
    }, [searchQuery, typeFilter, statusFilter, priorityFilter, sortBy]);

    const activeFilters = (typeFilter !== "All" ? 1 : 0) + (statusFilter !== "All" ? 1 : 0) + (priorityFilter !== "All" ? 1 : 0);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-semibold text-foreground">Disputes</h1>
                <p className="text-sm text-muted mt-1">{filteredDisputes.length} of {disputes.length} disputes</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 text-muted mb-2"><AlertTriangle className="w-4 h-4" strokeWidth={1.5} /><span className="text-sm">Open</span></div>
                    <p className="text-2xl font-bold text-amber-600">{disputes.filter(d => d.status === "Open").length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 text-muted mb-2"><Clock className="w-4 h-4" strokeWidth={1.5} /><span className="text-sm">High Priority</span></div>
                    <p className="text-2xl font-bold text-red-600">{disputes.filter(d => d.priority === "High").length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 text-muted mb-2"><MessageSquare className="w-4 h-4" strokeWidth={1.5} /><span className="text-sm">In Progress</span></div>
                    <p className="text-2xl font-bold text-blue-600">{disputes.filter(d => d.status === "In Progress").length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 text-muted mb-2"><Check className="w-4 h-4" strokeWidth={1.5} /><span className="text-sm">Resolved</span></div>
                    <p className="text-2xl font-bold text-emerald-600">{disputes.filter(d => d.status === "Resolved").length}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" strokeWidth={1.5} />
                    <input type="text" placeholder="Search disputes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10" />
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
                        <button onClick={() => { setTypeFilter("All"); setStatusFilter("All"); setPriorityFilter("All"); }} className="text-xs text-primary">Clear all</button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs text-muted mb-2">Type</label>
                            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full px-3 py-2 bg-surface-hover border border-border rounded-lg text-sm">
                                {typeOptions.map(t => <option key={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-muted mb-2">Status</label>
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-3 py-2 bg-surface-hover border border-border rounded-lg text-sm">
                                {statusOptions.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-muted mb-2">Priority</label>
                            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="w-full px-3 py-2 bg-surface-hover border border-border rounded-lg text-sm">
                                {priorityOptions.map(p => <option key={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-surface-hover">
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Dispute</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Customer</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Seller</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Type</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Priority</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Status</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredDisputes.map((dispute) => (
                            <tr key={dispute.id} className="hover:bg-surface-hover/50">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-foreground">{dispute.id}</p>
                                    <p className="text-xs text-muted">{dispute.created}</p>
                                </td>
                                <td className="px-6 py-4 text-sm text-foreground">{dispute.customer}</td>
                                <td className="px-6 py-4 text-sm text-foreground">{dispute.seller}</td>
                                <td className="px-6 py-4 text-sm text-foreground">{dispute.type}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-sm font-medium ${priorityStyles[dispute.priority]}`}>{dispute.priority}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${statusStyles[dispute.status]}`}>{dispute.status}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/disputes/${dispute.id}`} className="text-sm text-primary font-medium">View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredDisputes.length === 0 && <div className="text-center py-12"><p className="text-muted">No disputes found.</p></div>}
            </div>
        </div>
    );
}
