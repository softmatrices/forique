"use client";

import Link from "next/link";
import { Search, Plus, Filter, Heart, MoreHorizontal, SortAsc, X, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";

const products = [
    { id: "PRD-001", name: "Kundan Jhumka Earrings", image: "/products/kundan-jhumka.png", price: 2499, mrp: 3999, stock: 45, status: "Active", category: "Earrings" },
    { id: "PRD-002", name: "Crystal Jhumkas", image: "/products/crystal-jhumkas.png", price: 1899, mrp: 2999, stock: 32, status: "Active", category: "Earrings" },
    { id: "PRD-003", name: "Celestial Necklace", image: "/products/celestial-necklace.png", price: 4599, mrp: 6999, stock: 18, status: "Active", category: "Necklaces" },
    { id: "PRD-004", name: "Emerald Pendant", image: "/products/emerald-pendant.png", price: 3299, mrp: 4999, stock: 24, status: "Active", category: "Pendants" },
    { id: "PRD-005", name: "Temple Bangles", image: "/products/temple-bangles.png", price: 2199, mrp: 3499, stock: 56, status: "Active", category: "Bangles" },
    { id: "PRD-006", name: "Pearl Ring", image: "/products/pearl-ring.png", price: 1599, mrp: 2499, stock: 38, status: "Active", category: "Rings" },
    { id: "PRD-007", name: "Rose Gold Bracelet", image: "/products/rose-gold-bracelet.png", price: 2899, mrp: 4299, stock: 0, status: "Out of Stock", category: "Bracelets" },
    { id: "PRD-008", name: "Infinity Ring", image: "/products/infinity-ring.png", price: 1299, mrp: 1999, stock: 5, status: "Low Stock", category: "Rings" },
];

const categories = ["All", "Earrings", "Necklaces", "Pendants", "Bangles", "Rings", "Bracelets"];
const statuses = ["All", "Active", "Low Stock", "Out of Stock"];
const sortOptions = [
    { label: "Name A-Z", value: "name-asc" },
    { label: "Name Z-A", value: "name-desc" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Stock: Low to High", value: "stock-asc" },
    { label: "Stock: High to Low", value: "stock-desc" },
];

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("name-asc");

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search
        if (searchQuery) {
            result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // Category filter
        if (categoryFilter !== "All") {
            result = result.filter(p => p.category === categoryFilter);
        }

        // Status filter
        if (statusFilter !== "All") {
            result = result.filter(p => p.status === statusFilter);
        }

        // Sort
        const [field, direction] = sortBy.split("-");
        result.sort((a, b) => {
            let comparison = 0;
            if (field === "name") comparison = a.name.localeCompare(b.name);
            else if (field === "price") comparison = a.price - b.price;
            else if (field === "stock") comparison = a.stock - b.stock;
            return direction === "desc" ? -comparison : comparison;
        });

        return result;
    }, [searchQuery, categoryFilter, statusFilter, sortBy]);

    const activeFilters = (categoryFilter !== "All" ? 1 : 0) + (statusFilter !== "All" ? 1 : 0);

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Products</h1>
                    <p className="text-sm text-muted mt-1">{filteredProducts.length} of {products.length} products</p>
                </div>
                <Link href="/products/new" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors">
                    <Plus className="w-4 h-4" strokeWidth={1.5} />
                    Add Product
                </Link>
            </div>

            {/* Search, Filter, Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 relative w-full sm:w-auto">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" strokeWidth={1.5} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-colors ${activeFilters > 0 ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-surface-hover"
                            }`}
                    >
                        <Filter className="w-4 h-4" strokeWidth={1.5} />
                        Filters {activeFilters > 0 && `(${activeFilters})`}
                    </button>
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none pl-3 pr-8 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 cursor-pointer"
                        >
                            {sortOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" strokeWidth={1.5} />
                    </div>
                </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="bg-white rounded-xl border border-border p-4 animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-foreground">Filters</span>
                        <button onClick={() => { setCategoryFilter("All"); setStatusFilter("All"); }} className="text-xs text-primary">Clear all</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-muted mb-2">Category</label>
                            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full px-3 py-2 bg-surface-hover border border-border rounded-lg text-sm">
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-muted mb-2">Status</label>
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-3 py-2 bg-surface-hover border border-border rounded-lg text-sm">
                                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <Link key={product.id} href={`/products/${product.id}`} className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative aspect-square bg-surface-hover">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <Heart className="w-4 h-4 text-muted" strokeWidth={1.5} />
                            </button>
                            {product.status !== "Active" && (
                                <div className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded ${product.status === "Out of Stock" ? "bg-red-500 text-white" : "bg-amber-500 text-white"
                                    }`}>
                                    {product.status}
                                </div>
                            )}
                            {product.status === "Active" && (
                                <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs font-medium rounded">
                                    {Math.round((1 - product.price / product.mrp) * 100)}% OFF
                                </div>
                            )}
                        </div>
                        <div className="p-3">
                            <p className="text-xs text-muted">{product.category}</p>
                            <h3 className="text-sm font-medium text-foreground mt-1 line-clamp-1">{product.name}</h3>
                            <div className="flex items-baseline gap-2 mt-2">
                                <span className="text-base font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                                <span className="text-xs text-muted line-through">₹{product.mrp.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-muted">{product.stock} in stock</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted">No products found matching your criteria.</p>
                    <button onClick={() => { setSearchQuery(""); setCategoryFilter("All"); setStatusFilter("All"); }} className="text-primary text-sm mt-2">Clear filters</button>
                </div>
            )}
        </div>
    );
}
