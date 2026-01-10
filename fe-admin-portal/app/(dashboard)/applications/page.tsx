"use client";

import Link from "next/link";
import { Search, Filter, ChevronDown, UserCheck, Clock, Check, XCircle } from "lucide-react";
import { useState, useMemo } from "react";

const applications = [
    { id: "APP-001", name: "Royal Jewels Pvt Ltd", email: "contact@royaljewels.com", type: "Manufacturer", status: "Pending", submitted: "Jan 8, 2026" },
    { id: "APP-002", name: "Silver Craft Studio", email: "hello@silvercraft.in", type: "Artisan", status: "Pending", submitted: "Jan 8, 2026" },
    { id: "APP-003", name: "Gold Palace", email: "info@goldpalace.com", type: "Manufacturer", status: "Under Review", submitted: "Jan 7, 2026" },
    { id: "APP-004", name: "Ethnic Jewels", email: "contact@ethnicjewels.com", type: "Artisan", status: "Approved", submitted: "Jan 5, 2026" },
    { id: "APP-005", name: "Diamond Hub", email: "sales@diamondhub.in", type: "Retailer", status: "Rejected", submitted: "Jan 4, 2026" },
    { id: "APP-006", name: "Traditional Arts", email: "contact@traditionalarts.com", type: "Retailer", status: "Approved", submitted: "Jan 3, 2026" },
];

const typeOptions = ["All", "Manufacturer", "Artisan", "Retailer"];
const statusOptions = ["All", "Pending", "Under Review", "Approved", "Rejected"];
const sortOptions = [
    { label: "Newest First", value: "date-desc" },
    { label: "Oldest First", value: "date-asc" },
    { label: "Name A-Z", value: "name-asc" },
];

const statusStyles: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-600",
    "Under Review": "bg-blue-50 text-blue-600",
    Approved: "bg-emerald-50 text-emerald-600",
    Rejected: "bg-red-50 text-red-600",
};

const statusIcons: Record<string, React.ElementType> = {
    Pending: Clock, "Under Review": UserCheck, Approved: Check, Rejected: XCircle,
};

export default function ApplicationsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [typeFilter, setTypeFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("date-desc");

    const filteredApplications = useMemo(() => {
        let result = [...applications];
        if (searchQuery) result = result.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.email.toLowerCase().includes(searchQuery.toLowerCase()));
        if (typeFilter !== "All") result = result.filter(a => a.type === typeFilter);
        if (statusFilter !== "All") result = result.filter(a => a.status === statusFilter);
        const [field, direction] = sortBy.split("-");
        result.sort((a, b) => {
            const cmp = field === "name" ? a.name.localeCompare(b.name) : new Date(a.submitted).getTime() - new Date(b.submitted).getTime();
            return direction === "desc" ? -cmp : cmp;
        });
        return result;
    }, [searchQuery, typeFilter, statusFilter, sortBy]);

    const activeFilters = (typeFilter !== "All" ? 1 : 0) + (statusFilter !== "All" ? 1 : 0);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-semibold text-foreground">Applications</h1>
                <p className="text-sm text-muted mt-1">{filteredApplications.length} of {applications.length} applications</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 text-muted mb-2"><Clock className="w-4 h-4" strokeWidth={1.5} /><span className="text-sm">Pending</span></div>
                    <p className="text-2xl font-bold text-amber-600">{applications.filter(a => a.status === "Pending").length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 text-muted mb-2"><UserCheck className="w-4 h-4" strokeWidth={1.5} /><span className="text-sm">Under Review</span></div>
                    <p className="text-2xl font-bold text-blue-600">{applications.filter(a => a.status === "Under Review").length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 text-muted mb-2"><Check className="w-4 h-4" strokeWidth={1.5} /><span className="text-sm">Approved</span></div>
                    <p className="text-2xl font-bold text-emerald-600">{applications.filter(a => a.status === "Approved").length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 text-muted mb-2"><XCircle className="w-4 h-4" strokeWidth={1.5} /><span className="text-sm">Rejected</span></div>
                    <p className="text-2xl font-bold text-red-600">{applications.filter(a => a.status === "Rejected").length}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" strokeWidth={1.5} />
                    <input type="text" placeholder="Search applications..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10" />
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
                        <button onClick={() => { setTypeFilter("All"); setStatusFilter("All"); }} className="text-xs text-primary">Clear all</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-surface-hover">
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Applicant</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Type</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Submitted</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Status</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredApplications.map((app) => {
                            const StatusIcon = statusIcons[app.status];
                            return (
                                <tr key={app.id} className="hover:bg-surface-hover/50">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-medium text-foreground">{app.name}</p>
                                        <p className="text-xs text-muted">{app.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-foreground">{app.type}</td>
                                    <td className="px-6 py-4 text-sm text-muted">{app.submitted}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${statusStyles[app.status]}`}>
                                            <StatusIcon className="w-3.5 h-3.5" strokeWidth={1.5} />{app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/applications/${app.id}`} className="text-sm text-primary font-medium">Review</Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {filteredApplications.length === 0 && <div className="text-center py-12"><p className="text-muted">No applications found.</p></div>}
            </div>
        </div>
    );
}
