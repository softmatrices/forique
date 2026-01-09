"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, Camera, X, Clock, TrendingUp, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { useAuthStore } from "@/stores/authStore";
import { searchProducts, products } from "@/lib/mockData";

function SearchContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const isVisual = searchParams.get("visual") === "true";

    const { recentSearches, addRecentSearch, clearRecentSearches } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState(query);
    const [results, setResults] = useState(searchProducts(query));
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (query) {
            setResults(searchProducts(query));
            addRecentSearch(query);
        }
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleQuickSearch = (term: string) => {
        setSearchQuery(term);
        router.push(`/search?q=${encodeURIComponent(term)}`);
    };

    const trendingSearches = ["kundan earrings", "gold necklace", "bridal set", "rose gold"];

    return (
        <>
            {/* Search Header */}
            <div className="bg-surface py-12 border-b border-border">
                <div className="container-custom max-w-2xl">
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSearch}
                        className="relative"
                    >
                        <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                            placeholder="Search jewelry, brands, styles..."
                            className="w-full py-4 pl-14 pr-24 rounded-full border border-border bg-surface focus:border-primary focus:ring-0 focus:outline-none text-lg transition-all"
                            autoFocus
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="p-2 text-muted hover:text-foreground rounded-full"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                            <Link
                                href="/search?visual=true"
                                className="p-2.5 bg-surface-muted text-muted hover:text-primary rounded-full transition-colors"
                                title="Visual Search"
                            >
                                <Camera className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.form>

                    {/* Recent & Trending Searches */}
                    <AnimatePresence>
                        {!query && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-6 space-y-4"
                            >
                                {/* Recent Searches */}
                                {recentSearches.length > 0 && (
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
                                                <Clock className="w-3.5 h-3.5" />
                                                Recent
                                            </p>
                                            <button
                                                onClick={clearRecentSearches}
                                                className="text-xs text-muted hover:text-primary transition-colors"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {recentSearches.slice(0, 6).map((term) => (
                                                <button
                                                    key={term}
                                                    onClick={() => handleQuickSearch(term)}
                                                    className="px-4 py-2 bg-surface-muted rounded-full text-sm text-foreground hover:bg-primary hover:text-white transition-all"
                                                >
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Trending */}
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-2 mb-3">
                                        <TrendingUp className="w-3.5 h-3.5" />
                                        Trending
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {trendingSearches.map((term) => (
                                            <button
                                                key={term}
                                                onClick={() => handleQuickSearch(term)}
                                                className="px-4 py-2 border border-border rounded-full text-sm text-muted hover:text-primary hover:border-primary transition-all"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Visual Search Modal */}
            {isVisual && (
                <div className="container-custom py-16 max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="card p-12 text-center"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 bg-primary/5 rounded-full flex items-center justify-center">
                            <Camera className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-2xl font-serif mb-3">Visual Search</h2>
                        <p className="text-muted mb-8 max-w-sm mx-auto">
                            Upload an image and we'll find similar jewelry pieces for you
                        </p>
                        <label className="btn-primary cursor-pointer inline-flex">
                            <input type="file" accept="image/*" className="hidden" />
                            Upload Image
                        </label>
                        <p className="text-xs text-muted mt-4">
                            Powered by AI
                        </p>
                    </motion.div>
                </div>
            )}

            {/* Search Results */}
            {!isVisual && (
                <div className="container-custom py-12">
                    {query ? (
                        <>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-muted mb-8"
                            >
                                {results.length} results for "<span className="text-foreground font-medium">{query}</span>"
                            </motion.p>

                            {results.length > 0 ? (
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    {results.map((product, index) => (
                                        <ProductCard key={product.id} product={product} index={index} />
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-20"
                                >
                                    <SearchIcon className="w-12 h-12 mx-auto text-muted mb-4" />
                                    <h2 className="text-xl font-serif text-foreground mb-2">No results found</h2>
                                    <p className="text-muted mb-8">Try different keywords</p>
                                    <Link href="/category/all" className="btn-primary">
                                        Browse All
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </motion.div>
                            )}
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-6">Popular Now</h2>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {products.slice(0, 8).map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            )}
        </>
    );
}

export default function SearchPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background">
                <Suspense fallback={<div className="container-custom py-12">Loading...</div>}>
                    <SearchContent />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
