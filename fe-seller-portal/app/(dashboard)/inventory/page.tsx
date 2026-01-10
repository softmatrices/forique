"use client";

import { Search, Filter, ChevronDown, AlertTriangle, CheckCircle, Package } from "lucide-react";
import { useState, useMemo } from "react";

const inventory = [
    { id: "INV-001", name: "Kundan Jhumka Earrings", sku: "KJE-001", image: "/products/kundan-jhumka.png", stock: 45, reorderLevel: 10, status: "In Stock", category: "Earrings" },
    { id: "INV-002", name: "Crystal Jhumkas", sku: "CJ-002", image: "/products/crystal-jhumkas.png", stock: 32, reorderLevel: 15, status: "In Stock", category: "Earrings" },
    { id: "INV-003", name: "Celestial Necklace", sku: "CN-003", image: "/products/celestial-necklace.png", stock: 8, reorderLevel: 10, status: "Low Stock", category: "Necklaces" },
    { id: "INV-004", name: "Emerald Pendant", sku: "EP-004", image: "/products/emerald-pendant.png", stock: 24, reorderLevel: 10, status: "In Stock", category: "Pendants" },
    { id: "INV-005", name: "Temple Bangles", sku: "TB-005", image: "/products/temple-bangles.png", stock: 56, reorderLevel: 20, status: "In Stock", category: "Bangles" },
    { id: "INV-006", name: "Pearl Ring", sku: "PR-006", image: "/products/pearl-ring.png", stock: 5, reorderLevel: 10, status: "Low Stock", category: "Rings" },
    { id: "INV-007", name: "Rose Gold Bracelet", sku: "RGB-007", image: "/products/rose-gold-bracelet.png", stock: 0, reorderLevel: 15, status: "Out of Stock", category: "Bracelets" },
    { id: "INV-008", name: "Infinity Ring", sku: "IR-008", image: "/products/infinity-ring.png", stock: 3, reorderLevel: 10, status: "Low Stock", category: "Rings" },
];

const categories = ["All", "Earrings", "Necklaces", "Pendants", "Bangles", "Rings", "Bracelets"];
const statusOptions = ["All", "In Stock", "Low Stock", "Out of Stock"];
const sortOptions = [
    { label: "Name A-Z", value: "name-asc" },
    { label: "Stock: Low to High", value: "stock-asc" },
    { label: "Stock: High to Low", value: "stock-desc" },
];

const statusColors: Record<string, string> = {
    "In Stock": "bg-emerald-50 text-emerald-600",
    "Low Stock": "bg-amber-50 text-amber-600",
    "Out of Stock": "bg-red-50 text-red-600",
};

const statusIcons: Record<string, React.ElementType> = {
    "In Stock": CheckCircle,
    "Low Stock": AlertTriangle,
    "Out of Stock": Package,
};

export default function InventoryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [sortBy, setSortBy] = useState("stock-asc");

    const filteredInventory = useMemo(() => {
        let result = [...inventory];

        if (searchQuery) {
            result = result.filter(i =>
                i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                i.sku.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (categoryFilter !== "All") result = result.filter(i => i.category === categoryFilter);
        if (statusFilter !== "All") result = result.filter(i => i.status === statusFilter);

        const [field, direction] = sortBy.split("-");
        result.sort((a, b) => {
            let comparison = field === "name" ? a.name.localeCompare(b.name) : a.stock - b.stock;
            return direction === "desc" ? -comparison : comparison;
        });

        return result;
    }, [searchQuery, categoryFilter, statusFilter, sortBy]);

    const stats = {
        total: inventory.length,
        inStock: inventory.filter(i => i.status === "In Stock").length,
        lowStock: inventory.filter(i => i.status === "Low Stock").length,
        outOfStock: inventory.filter(i => i.status === "Out of Stock").length,
    };

    const activeFilters = (categoryFilter !== "All" ? 1 : 0) + (statusFilter !== "All" ? 1 : 0);

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-semibold text-foreground">Inventory</h1>
                <p className="text-sm text-muted mt-1">Manage stock levels</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-border">
                    <p className="text-sm text-muted">Total SKUs</p>
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-border">
                    <p className="text-sm text-muted">In Stock</p>
                    <p className="text-2xl font-bold text-emerald-600">{stats.inStock}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-border">
                    <p className="text-sm text-muted">Low Stock</p>
                    <p className="text-2xl font-bold text-amber-600">{stats.lowStock}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-border">
                    <p className="text-sm text-muted">Out of Stock</p>
                    <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
                </div>
            </div>

            {/* Search, Filter, Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex-1 relative w-full">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" strokeWidth={1.5} />
                    <input type="text" placeholder="Search by name or SKU..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10" />
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
                        <button onClick={() => { setCategoryFilter("All"); setStatusFilter("All"); }} className="text-xs text-primary">Clear all</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-muted mb-2">Category</label>
                            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full px-3 py-2 bg-surface-hover border border-border rounded-lg text-sm">
                                {categories.map(c => <option key={c}>{c}</option>)}
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

            {/* Inventory Table */}
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-surface-hover">
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Product</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">SKU</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Stock</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Reorder Level</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Status</th>
                            <th className="text-left text-xs font-semibold text-muted uppercase px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredInventory.map((item) => {
                            const StatusIcon = statusIcons[item.status];
                            return (
                                <tr key={item.id} className="hover:bg-surface-hover/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-surface-hover" />
                                            <span className="text-sm font-medium text-foreground">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted font-mono">{item.sku}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-foreground">{item.stock}</td>
                                    <td className="px-6 py-4 text-sm text-muted">{item.reorderLevel}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${statusColors[item.status]}`}>
                                            <StatusIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-sm text-primary font-medium">Update Stock</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {filteredInventory.length === 0 && <div className="text-center py-12"><p className="text-muted">No items found.</p></div>}
            </div>
        </div>
    );
}
