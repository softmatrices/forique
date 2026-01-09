"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";

export default function WishlistPage() {
    const { items, removeItem, clearWishlist } = useWishlistStore();
    const addToCart = useCartStore((state) => state.addItem);

    const handleMoveToCart = (item: typeof items[0]) => {
        addToCart({
            productId: item.productId,
            name: item.name,
            price: item.price,
            image: item.image,
            color: "Default",
            brandName: item.brandName,
        });
        removeItem(item.productId);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-8">
                <div className="container-custom max-w-4xl">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <Link href="/account" className="p-2 hover:bg-surface-muted rounded-lg transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <h1 className="text-2xl font-serif text-foreground">My Wishlist</h1>
                        </div>
                        {items.length > 0 && (
                            <button
                                onClick={clearWishlist}
                                className="text-sm text-muted hover:text-red-500 transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {items.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <AnimatePresence mode="popLayout">
                                {items.map((item, index) => (
                                    <motion.div
                                        key={item.productId}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="card overflow-hidden group"
                                    >
                                        {/* Image */}
                                        <Link href={`/product/${item.productId}`} className="block relative aspect-square bg-surface-muted overflow-hidden">
                                            <Image
                                                src={item.image || "/products/product-1.png"}
                                                alt={item.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform"
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    removeItem(item.productId);
                                                }}
                                                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-soft text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </Link>

                                        {/* Info */}
                                        <div className="p-4">
                                            <p className="text-xs text-muted uppercase tracking-wider mb-1">
                                                {item.brandName}
                                            </p>
                                            <Link
                                                href={`/product/${item.productId}`}
                                                className="font-medium text-foreground line-clamp-2 hover:text-primary transition-colors"
                                            >
                                                {item.name}
                                            </Link>

                                            <div className="flex items-baseline gap-2 mt-2 mb-4">
                                                <span className="text-lg font-semibold text-primary">
                                                    ₹{item.price.toLocaleString()}
                                                </span>
                                                {item.originalPrice > item.price && (
                                                    <span className="text-sm text-muted line-through">
                                                        ₹{item.originalPrice.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>

                                            <button
                                                onClick={() => handleMoveToCart(item)}
                                                className="btn-primary w-full py-2.5 text-sm"
                                            >
                                                <ShoppingBag className="w-4 h-4 mr-2" />
                                                Move to Cart
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <Heart className="w-16 h-16 mx-auto text-muted mb-4" />
                            <h2 className="text-xl font-serif text-foreground mb-2">Your wishlist is empty</h2>
                            <p className="text-muted mb-6">Save items you love for later</p>
                            <Link href="/category/all" className="btn-primary">
                                Explore Products
                            </Link>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
