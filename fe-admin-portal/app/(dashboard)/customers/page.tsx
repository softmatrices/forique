"use client";

import Link from "next/link";
import { Search, Filter, ChevronDown, UserCircle, Mail, Phone, MapPin, ShoppingCart } from "lucide-react";
import { useState, useMemo } from "react";

const customers = [
    { id: "CUS-001", name: "Priya Sharma", email: "priya.s@email.com", phone: "+91 98765 43210", city: "Mumbai", orders: 28, spent: 124500, lastOrder: "2 days ago", status: "Active" },
    { id: "CUS-002", name: "Rahul Verma", email: "rahul.v@email.com", phone: "+91 98765 43211", city: "Delhi", orders: 24, spent: 98200, lastOrder: "5 days ago", status: "Active" },
    { id: "CUS-003", name: "Anita Desai", email: "anita.d@email.com", phone: "+91 98765 43212", city: "Bangalore", orders: 21, spent: 87600, lastOrder: "1 week ago", status: "Active" },
    { id: "CUS-004", name: "Vikram Singh", email: "vikram.s@email.com", phone: "+91 98765 43213", city: "Hyderabad", orders: 19, spent: 76400, lastOrder: "3 days ago", status: "Active" },
    { id: "CUS-005", name: "Meera Patel", email: "meera.p@email.com", phone: "+91 98765 43214", city: "Chennai", orders: 15, spent: 54200, lastOrder: "2 weeks ago", status: "Inactive" },
    { id: "CUS-006", name: "Arjun Kumar", email: "arjun.k@email.com", phone: "+91 98765 43215", city: "Pune", orders: 12, spent: 42800, lastOrder: "1 month ago", status: "Inactive" },
    { id: "CUS-007", name: "Sneha Reddy", email: "sneha.r@email.com", phone: "+91 98765 43216", city: "Mumbai", orders: 8, spent: 32000, lastOrder: "3 weeks ago", status: "Active" },
    { id: "CUS-008", name: "Karan Malhotra", email: "karan.m@email.com", phone: "+91 98765 43217", city: "Delhi", orders: 5, spent: 18500, lastOrder: "1 month ago", status: "Inactive" },
];

const cityOptions = ["All", "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune"];
const statusOptions = ["All", "Active", "Inactive"];
const sortOptions = [
    { label: "Name A-Z", value: "name-asc" },
    { label: "Orders: Most", value: "orders-desc" },
    { label: "Orders: Least", value: "orders-asc" },
    { label: "Spent: High to Low", value: "spent-desc" },
    { label: "Spent: Low to High", value: "spent-asc" },
];

export default function CustomersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [cityFilter, setCityFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("spent-desc");

    const filteredCustomers = useMemo(() => {
        let result = [...customers];

        if (searchQuery) {
            result = result.filter(c =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.phone.includes(searchQuery)
            );
        }

        if (cityFilter !== "All") result = result.filter(c => c.city === cityFilter);
        if (statusFilter !== "All") result = result.filter(c => c.status === statusFilter);

        const [field, direction] = sortBy.split("-");
        result.sort((a, b) => {
            let comparison = 0;
            if (field === "name") comparison = a.name.localeCompare(b.name);
            else if (field === "orders") comparison = a.orders - b.orders;
            else if (field === "spent") comparison = a.spent - b.spent;
            return direction === "desc" ? -comparison : comparison;
        });

        return result;
    }, [searchQuery, cityFilter, statusFilter, sortBy]);

    const activeFilters = (cityFilter !== "All" ? 1 : 0) + (statusFilter !== "All" ? 1 : 0);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Customers</h1>
                    <p className="text-sm text-muted mt-1">{filteredCustomers.length} of {customers.length} customers</p>
                </div>
                <Link href="/analytics/customers" className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
                    View Analytics
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 border border-border">
                    <p className="text-sm text-muted">Total Customers</p>
                    <p className="text-2xl font-bold text-foreground">{customers.length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <p className="text-sm text-muted">Active (30d)</p>
                    <p className="text-2xl font-bold text-emerald-600">{customers.filter(c => c.status === "Active").length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <p className="text-sm text-muted">Total Revenue</p>
                    <p className="text-2xl font-bold text-foreground">₹{(customers.reduce((sum, c) => sum + c.spent, 0) / 100000).toFixed(1)}L</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <p className="text-sm text-muted">Avg LTV</p>
                    <p className="text-2xl font-bold text-foreground">₹{Math.round(customers.reduce((sum, c) => sum + c.spent, 0) / customers.length).toLocaleString()}</p>
                </div>
            </div>

            {/* Search, Filter, Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" strokeWidth={1.5} />
                    <input type="text" placeholder="Search by name, email, or phone..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10" />
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
                        <button onClick={() => { setCityFilter("All"); setStatusFilter("All"); }} className="text-xs text-primary">Clear all</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-muted mb-2">City</label>
                            <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="w-full px-3 py-2 bg-surface-hover border border-border rounded-lg text-sm">
                                {cityOptions.map(c => <option key={c}>{c}</option>)}
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

            {/* Customer List */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-surface-hover">
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Customer</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Contact</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">City</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Orders</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Total Spent</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-surface-hover/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                                            {customer.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{customer.name}</p>
                                            <p className="text-xs text-muted">{customer.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm text-foreground">{customer.email}</p>
                                    <p className="text-xs text-muted">{customer.phone}</p>
                                </td>
                                <td className="px-6 py-4 text-sm text-foreground">{customer.city}</td>
                                <td className="px-6 py-4 text-sm text-foreground">{customer.orders}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-foreground">₹{customer.spent.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${customer.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-500"
                                        }`}>
                                        {customer.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredCustomers.length === 0 && <div className="text-center py-12"><p className="text-muted">No customers found.</p></div>}
            </div>
        </div>
    );
}
