"use client";

import Link from "next/link";
import { Search, Filter, ChevronDown, Users, Star } from "lucide-react";
import { useState, useMemo } from "react";

const sellers = [
    { id: "SEL-001", name: "Jaipur Silvers", email: "contact@jaipursilvers.com", type: "Manufacturer", products: 145, orders: 1234, gmv: 1240000, rating: 4.8, status: "Active" },
    { id: "SEL-002", name: "Heritage Ornaments", email: "info@heritageornaments.com", type: "Artisan", products: 98, orders: 876, gmv: 870000, rating: 4.6, status: "Active" },
    { id: "SEL-003", name: "Royal Jewels Pvt Ltd", email: "sales@royaljewels.com", type: "Manufacturer", products: 210, orders: 2341, gmv: 2450000, rating: 4.9, status: "Active" },
    { id: "SEL-004", name: "Silver Craft Studio", email: "hello@silvercraft.in", type: "Artisan", products: 67, orders: 543, gmv: 540000, rating: 4.5, status: "Active" },
    { id: "SEL-005", name: "Traditional Arts", email: "contact@traditionalarts.com", type: "Retailer", products: 45, orders: 234, gmv: 230000, rating: 4.2, status: "Suspended" },
    { id: "SEL-006", name: "Gold Palace", email: "info@goldpalace.com", type: "Manufacturer", products: 180, orders: 1890, gmv: 1890000, rating: 4.7, status: "Active" },
    { id: "SEL-007", name: "Ethnic Jewels", email: "contact@ethnicjewels.com", type: "Artisan", products: 55, orders: 432, gmv: 430000, rating: 4.4, status: "Active" },
    { id: "SEL-008", name: "Diamond Hub", email: "sales@diamondhub.in", type: "Retailer", products: 78, orders: 567, gmv: 560000, rating: 3.9, status: "Under Review" },
];

const typeOptions = ["All", "Manufacturer", "Artisan", "Retailer"];
const statusOptions = ["All", "Active", "Suspended", "Under Review"];
const sortOptions = [
    { label: "Name A-Z", value: "name-asc" },
    { label: "Name Z-A", value: "name-desc" },
    { label: "GMV: High to Low", value: "gmv-desc" },
    { label: "GMV: Low to High", value: "gmv-asc" },
    { label: "Rating: High to Low", value: "rating-desc" },
    { label: "Products: Most", value: "products-desc" },
];

export default function SellersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [typeFilter, setTypeFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("gmv-desc");

    const filteredSellers = useMemo(() => {
        let result = [...sellers];

        if (searchQuery) {
            result = result.filter(s =>
                s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                s.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (typeFilter !== "All") result = result.filter(s => s.type === typeFilter);
        if (statusFilter !== "All") result = result.filter(s => s.status === statusFilter);

        const [field, direction] = sortBy.split("-");
        result.sort((a, b) => {
            let comparison = 0;
            if (field === "name") comparison = a.name.localeCompare(b.name);
            else if (field === "gmv") comparison = a.gmv - b.gmv;
            else if (field === "rating") comparison = a.rating - b.rating;
            else if (field === "products") comparison = a.products - b.products;
            return direction === "desc" ? -comparison : comparison;
        });

        return result;
    }, [searchQuery, typeFilter, statusFilter, sortBy]);

    const formatGMV = (value: number) => value >= 100000 ? `₹${(value / 100000).toFixed(1)}L` : `₹${(value / 1000).toFixed(0)}K`;
    const activeFilters = (typeFilter !== "All" ? 1 : 0) + (statusFilter !== "All" ? 1 : 0);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-semibold text-foreground">Sellers</h1>
                <p className="text-sm text-muted mt-1">{filteredSellers.length} of {sellers.length} sellers</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 border border-border">
                    <p className="text-sm text-muted">Total Sellers</p>
                    <p className="text-2xl font-bold text-foreground">{sellers.length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <p className="text-sm text-muted">Active</p>
                    <p className="text-2xl font-bold text-emerald-600">{sellers.filter(s => s.status === "Active").length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <p className="text-sm text-muted">Total GMV</p>
                    <p className="text-2xl font-bold text-foreground">{formatGMV(sellers.reduce((sum, s) => sum + s.gmv, 0))}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <p className="text-sm text-muted">Avg Rating</p>
                    <p className="text-2xl font-bold text-foreground">{(sellers.reduce((sum, s) => sum + s.rating, 0) / sellers.length).toFixed(1)}</p>
                </div>
            </div>

            {/* Search, Filter, Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" strokeWidth={1.5} />
                    <input type="text" placeholder="Search sellers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10" />
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

            {/* Sellers Table */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-surface-hover">
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Seller</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Type</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Products</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">GMV</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Rating</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Status</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredSellers.map((seller) => (
                            <tr key={seller.id} className="hover:bg-surface-hover/50">
                                <td className="px-6 py-4">
                                    <Link href={`/sellers/${seller.id}`} className="block">
                                        <p className="text-sm font-medium text-foreground hover:text-primary">{seller.name}</p>
                                        <p className="text-xs text-muted">{seller.email}</p>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-sm text-foreground">{seller.type}</td>
                                <td className="px-6 py-4 text-sm text-foreground">{seller.products}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-foreground">{formatGMV(seller.gmv)}</td>
                                <td className="px-6 py-4">
                                    <span className="flex items-center gap-1 text-sm">
                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        {seller.rating}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${seller.status === "Active" ? "bg-emerald-50 text-emerald-600" :
                                            seller.status === "Suspended" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                                        }`}>
                                        {seller.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/sellers/${seller.id}`} className="text-sm text-primary font-medium">View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredSellers.length === 0 && <div className="text-center py-12"><p className="text-muted">No sellers found.</p></div>}
            </div>
        </div>
    );
}
