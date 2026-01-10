"use client";

import Link from "next/link";
import { Search, Filter, ChevronDown, Box, Check, Clock, AlertTriangle, Eye } from "lucide-react";
import { useState, useMemo } from "react";

const products = [
    { id: "PROD-001", name: "Kundan Jhumka Earrings", image: "/products/kundan-jhumka.png", seller: "Jaipur Silvers", price: 2499, status: "Active", category: "Earrings" },
    { id: "PROD-002", name: "Crystal Jhumkas", image: "/products/crystal-jhumkas.png", seller: "Heritage Ornaments", price: 1899, status: "Active", category: "Earrings" },
    { id: "PROD-003", name: "Celestial Necklace", image: "/products/celestial-necklace.png", seller: "Royal Jewels", price: 4599, status: "Pending", category: "Necklaces" },
    { id: "PROD-004", name: "Emerald Pendant", image: "/products/emerald-pendant.png", seller: "Silver Craft", price: 3299, status: "Active", category: "Pendants" },
    { id: "PROD-005", name: "Temple Bangles", image: "/products/temple-bangles.png", seller: "Jaipur Silvers", price: 2199, status: "Active", category: "Bangles" },
    { id: "PROD-006", name: "Pearl Ring", image: "/products/pearl-ring.png", seller: "Heritage Ornaments", price: 1599, status: "Flagged", category: "Rings" },
    { id: "PROD-007", name: "Rose Gold Bracelet", image: "/products/rose-gold-bracelet.png", seller: "Royal Jewels", price: 2899, status: "Pending", category: "Bracelets" },
    { id: "PROD-008", name: "Infinity Ring", image: "/products/infinity-ring.png", seller: "Silver Craft", price: 1299, status: "Active", category: "Rings" },
];

const sellerOptions = ["All", "Jaipur Silvers", "Heritage Ornaments", "Royal Jewels", "Silver Craft"];
const categoryOptions = ["All", "Earrings", "Necklaces", "Pendants", "Bangles", "Rings", "Bracelets"];
const statusOptions = ["All", "Active", "Pending", "Flagged"];
const sortOptions = [
    { label: "Name A-Z", value: "name-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Seller A-Z", value: "seller-asc" },
];

const statusStyles: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-600",
    Pending: "bg-amber-50 text-amber-600",
    Flagged: "bg-red-50 text-red-600",
};

const statusIcons: Record<string, React.ElementType> = {
    Active: Check,
    Pending: Clock,
    Flagged: AlertTriangle,
};

export default function CatalogPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [sellerFilter, setSellerFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("name-asc");

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.seller.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sellerFilter !== "All") result = result.filter(p => p.seller === sellerFilter);
        if (categoryFilter !== "All") result = result.filter(p => p.category === categoryFilter);
        if (statusFilter !== "All") result = result.filter(p => p.status === statusFilter);

        const [field, direction] = sortBy.split("-");
        result.sort((a, b) => {
            let comparison = 0;
            if (field === "name") comparison = a.name.localeCompare(b.name);
            else if (field === "price") comparison = a.price - b.price;
            else if (field === "seller") comparison = a.seller.localeCompare(b.seller);
            return direction === "desc" ? -comparison : comparison;
        });

        return result;
    }, [searchQuery, sellerFilter, categoryFilter, statusFilter, sortBy]);

    const activeFilters = (sellerFilter !== "All" ? 1 : 0) + (categoryFilter !== "All" ? 1 : 0) + (statusFilter !== "All" ? 1 : 0);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-semibold text-foreground">Catalog</h1>
                <p className="text-sm text-muted mt-1">{filteredProducts.length} of {products.length} products</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 text-muted mb-2"><Box className="w-4 h-4" strokeWidth={1.5} /><span className="text-sm">Total Products</span></div>
                    <p className="text-2xl font-bold text-foreground">{products.length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 text-muted mb-2"><Check className="w-4 h-4" strokeWidth={1.5} /><span className="text-sm">Active</span></div>
                    <p className="text-2xl font-bold text-emerald-600">{products.filter(p => p.status === "Active").length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 text-muted mb-2"><Clock className="w-4 h-4" strokeWidth={1.5} /><span className="text-sm">Pending</span></div>
                    <p className="text-2xl font-bold text-amber-600">{products.filter(p => p.status === "Pending").length}</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-2 text-muted mb-2"><AlertTriangle className="w-4 h-4" strokeWidth={1.5} /><span className="text-sm">Flagged</span></div>
                    <p className="text-2xl font-bold text-red-600">{products.filter(p => p.status === "Flagged").length}</p>
                </div>
            </div>

            {/* Search, Filter, Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" strokeWidth={1.5} />
                    <input type="text" placeholder="Search products or sellers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10" />
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
                        <button onClick={() => { setSellerFilter("All"); setCategoryFilter("All"); setStatusFilter("All"); }} className="text-xs text-primary">Clear all</button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs text-muted mb-2">Seller</label>
                            <select value={sellerFilter} onChange={(e) => setSellerFilter(e.target.value)} className="w-full px-3 py-2 bg-surface-hover border border-border rounded-lg text-sm">
                                {sellerOptions.map(s => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-muted mb-2">Category</label>
                            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full px-3 py-2 bg-surface-hover border border-border rounded-lg text-sm">
                                {categoryOptions.map(c => <option key={c}>{c}</option>)}
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

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => {
                    const StatusIcon = statusIcons[product.status];
                    return (
                        <div key={product.id} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative aspect-square bg-surface-hover">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                <span className={`absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${statusStyles[product.status]}`}>
                                    <StatusIcon className="w-3 h-3" strokeWidth={1.5} />
                                    {product.status}
                                </span>
                            </div>
                            <div className="p-3">
                                <p className="text-xs text-muted">{product.seller}</p>
                                <h3 className="text-sm font-medium text-foreground mt-1 line-clamp-1">{product.name}</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-base font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                                    <Link href={`/catalog/${product.id}/review`} className="p-1.5 text-primary hover:bg-primary/5 rounded-lg">
                                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredProducts.length === 0 && <div className="text-center py-12"><p className="text-muted">No products found.</p></div>}
        </div>
    );
}
