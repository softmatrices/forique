"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    SlidersHorizontal,
    ChevronDown,
    X,
    Grid3X3,
    LayoutGrid,
    List,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import {
    products,
    categories,
    brands,
    getProductsByCategory,
    getBestsellers,
    getNewArrivals,
} from "@/lib/mockData";

type SortOption = "popular" | "newest" | "price-low" | "price-high" | "rating";

const sortOptions: { value: SortOption; label: string }[] = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
];

const priceRanges = [
    { label: "Under ₹500", min: 0, max: 500 },
    { label: "₹500 - ₹1000", min: 500, max: 1000 },
    { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
    { label: "₹2000 - ₹3000", min: 2000, max: 3000 },
    { label: "Above ₹3000", min: 3000, max: Infinity },
];

const materials = [
    "Gold Plated",
    "Sterling Silver",
    "Brass",
    "Copper",
    "Kundan",
    "Pearl",
];

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>("popular");
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // Get products based on category
    const baseProducts = useMemo(() => {
        if (slug === "all") return products;
        if (slug === "bestsellers") return getBestsellers();
        if (slug === "new-arrivals") return getNewArrivals();
        if (slug === "offers") return products.filter((p) => p.discount > 0);
        return getProductsByCategory(slug);
    }, [slug]);

    // Apply filters
    const filteredProducts = useMemo(() => {
        let result = [...baseProducts];

        // Price filter
        if (selectedPriceRange !== null) {
            const range = priceRanges[selectedPriceRange];
            result = result.filter((p) => p.price >= range.min && p.price <= range.max);
        }

        // Brand filter
        if (selectedBrands.length > 0) {
            result = result.filter((p) => selectedBrands.includes(p.brand.id));
        }

        // Sort
        switch (sortBy) {
            case "newest":
                result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
                break;
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;
            default:
                result.sort((a, b) => b.reviewCount - a.reviewCount);
        }

        return result;
    }, [baseProducts, selectedPriceRange, selectedBrands, sortBy]);

    const category = categories.find((c) => c.slug === slug);
    const categoryName = category?.name ||
        (slug === "all" ? "All Jewelry" :
            slug === "bestsellers" ? "Bestsellers" :
                slug === "new-arrivals" ? "New Arrivals" :
                    slug === "offers" ? "Special Offers" : "Shop");

    const clearFilters = () => {
        setSelectedPriceRange(null);
        setSelectedBrands([]);
        setSelectedMaterials([]);
    };

    const hasActiveFilters = selectedPriceRange !== null || selectedBrands.length > 0 || selectedMaterials.length > 0;

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background">
                {/* Breadcrumb */}
                <div className="bg-surface-muted py-4 border-b border-border">
                    <div className="container-custom">
                        <nav className="flex items-center text-sm text-muted">
                            <Link href="/" className="hover:text-primary transition-colors">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-foreground">{categoryName}</span>
                        </nav>
                    </div>
                </div>

                {/* Header */}
                <div className="container-custom py-8">
                    <h1 className="text-3xl md:text-4xl font-serif text-foreground">
                        {categoryName}
                    </h1>
                    <p className="text-muted mt-2">
                        {filteredProducts.length} products found
                    </p>
                </div>

                <div className="container-custom pb-16">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filters Sidebar - Desktop */}
                        <aside className="hidden lg:block w-64 shrink-0">
                            <div className="sticky top-24 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-semibold text-foreground flex items-center gap-2">
                                        <SlidersHorizontal className="w-4 h-4" />
                                        Filters
                                    </h2>
                                    {hasActiveFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-xs text-primary hover:underline"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>

                                {/* Price Range */}
                                <div className="border border-border rounded-xl p-4">
                                    <h3 className="font-medium text-foreground mb-3">Price Range</h3>
                                    <div className="space-y-2">
                                        {priceRanges.map((range, index) => (
                                            <label key={index} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name="priceRange"
                                                    checked={selectedPriceRange === index}
                                                    onChange={() => setSelectedPriceRange(selectedPriceRange === index ? null : index)}
                                                    className="w-4 h-4 text-primary focus:ring-primary"
                                                />
                                                <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                                                    {range.label}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Brands */}
                                <div className="border border-border rounded-xl p-4">
                                    <h3 className="font-medium text-foreground mb-3">Brands</h3>
                                    <div className="space-y-2">
                                        {brands.map((brand) => (
                                            <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBrands.includes(brand.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedBrands([...selectedBrands, brand.id]);
                                                        } else {
                                                            setSelectedBrands(selectedBrands.filter((b) => b !== brand.id));
                                                        }
                                                    }}
                                                    className="w-4 h-4 text-primary rounded focus:ring-primary"
                                                />
                                                <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                                                    {brand.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Materials */}
                                <div className="border border-border rounded-xl p-4">
                                    <h3 className="font-medium text-foreground mb-3">Material</h3>
                                    <div className="space-y-2">
                                        {materials.map((material) => (
                                            <label key={material} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedMaterials.includes(material)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedMaterials([...selectedMaterials, material]);
                                                        } else {
                                                            setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
                                                        }
                                                    }}
                                                    className="w-4 h-4 text-primary rounded focus:ring-primary"
                                                />
                                                <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                                                    {material}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between mb-6 gap-4">
                                {/* Mobile Filter Button */}
                                <button
                                    onClick={() => setShowFilters(true)}
                                    className="lg:hidden btn-secondary py-2 px-4 text-sm"
                                >
                                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                                    Filters
                                    {hasActiveFilters && (
                                        <span className="ml-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                                            {(selectedPriceRange !== null ? 1 : 0) + selectedBrands.length + selectedMaterials.length}
                                        </span>
                                    )}
                                </button>

                                {/* Sort Dropdown */}
                                <div className="relative ml-auto">
                                    <button
                                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                                        className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm hover:border-primary transition-colors"
                                    >
                                        <span className="text-muted">Sort by:</span>
                                        <span className="font-medium">{sortOptions.find((s) => s.value === sortBy)?.label}</span>
                                        <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
                                    </button>

                                    <AnimatePresence>
                                        {showSortDropdown && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-elegant border border-border z-20"
                                            >
                                                {sortOptions.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => {
                                                            setSortBy(option.value);
                                                            setShowSortDropdown(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-surface-muted transition-colors first:rounded-t-xl last:rounded-b-xl ${sortBy === option.value ? "text-primary font-medium" : "text-foreground"
                                                            }`}
                                                    >
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Grid Toggle - Desktop */}
                                <div className="hidden md:flex items-center gap-1 border border-border rounded-xl p-1">
                                    {[2, 3, 4].map((cols) => (
                                        <button
                                            key={cols}
                                            onClick={() => setGridCols(cols as 2 | 3 | 4)}
                                            className={`p-2 rounded-lg transition-colors ${gridCols === cols ? "bg-primary text-white" : "text-muted hover:text-foreground"
                                                }`}
                                        >
                                            {cols === 2 ? <LayoutGrid className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Active Filters */}
                            {hasActiveFilters && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {selectedPriceRange !== null && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full">
                                            {priceRanges[selectedPriceRange].label}
                                            <button onClick={() => setSelectedPriceRange(null)}>
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    )}
                                    {selectedBrands.map((brandId) => {
                                        const brand = brands.find((b) => b.id === brandId);
                                        return (
                                            <span key={brandId} className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full">
                                                {brand?.name}
                                                <button onClick={() => setSelectedBrands(selectedBrands.filter((b) => b !== brandId))}>
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Product Grid */}
                            {filteredProducts.length > 0 ? (
                                <div
                                    className={`grid gap-4 md:gap-6 ${gridCols === 2
                                        ? "grid-cols-2"
                                        : gridCols === 3
                                            ? "grid-cols-2 lg:grid-cols-3"
                                            : "grid-cols-2 lg:grid-cols-4"
                                        }`}
                                >
                                    {filteredProducts.map((product, index) => (
                                        <ProductCard key={product.id} product={product} index={index} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="w-20 h-20 mx-auto mb-4 bg-surface-muted rounded-full flex items-center justify-center">
                                        <span className="text-4xl">💎</span>
                                    </div>
                                    <h3 className="text-xl font-serif text-foreground mb-2">No products found</h3>
                                    <p className="text-muted mb-6">Try adjusting your filters</p>
                                    <button onClick={clearFilters} className="btn-primary">
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Filters Modal */}
                <AnimatePresence>
                    {showFilters && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 lg:hidden"
                                onClick={() => setShowFilters(false)}
                            />
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "tween" }}
                                className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white z-50 overflow-y-auto lg:hidden"
                            >
                                <div className="p-4 border-b border-border flex items-center justify-between">
                                    <h2 className="font-semibold text-foreground">Filters</h2>
                                    <button onClick={() => setShowFilters(false)}>
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="p-4 space-y-6">
                                    {/* Price */}
                                    <div>
                                        <h3 className="font-medium mb-3">Price Range</h3>
                                        {priceRanges.map((range, index) => (
                                            <label key={index} className="flex items-center gap-3 py-2">
                                                <input
                                                    type="radio"
                                                    checked={selectedPriceRange === index}
                                                    onChange={() => setSelectedPriceRange(selectedPriceRange === index ? null : index)}
                                                    className="w-4 h-4 text-primary"
                                                />
                                                <span className="text-sm">{range.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {/* Brands */}
                                    <div>
                                        <h3 className="font-medium mb-3">Brands</h3>
                                        {brands.map((brand) => (
                                            <label key={brand.id} className="flex items-center gap-3 py-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBrands.includes(brand.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedBrands([...selectedBrands, brand.id]);
                                                        } else {
                                                            setSelectedBrands(selectedBrands.filter((b) => b !== brand.id));
                                                        }
                                                    }}
                                                    className="w-4 h-4 text-primary rounded"
                                                />
                                                <span className="text-sm">{brand.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-4 border-t border-border flex gap-3">
                                    <button onClick={clearFilters} className="btn-secondary flex-1 py-3">
                                        Clear
                                    </button>
                                    <button onClick={() => setShowFilters(false)} className="btn-primary flex-1 py-3">
                                        Apply
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </main>
            <Footer />
        </>
    );
}
