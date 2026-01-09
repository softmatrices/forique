"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useAuthStore } from "@/stores/authStore";

interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    discount: number;
    images: string[];
    rating: number;
    reviewCount: number;
    brand: { id: string; name: string };
    isNew?: boolean;
    isBestseller?: boolean;
    colors: string[];
    category: { id: string; name: string; slug: string };
}

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const addToCart = useCartStore((state) => state.addItem);
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
    const { addRecentView } = useAuthStore();
    const inWishlist = isInWishlist(product.id);

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist({
                productId: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.images[0],
                brandName: product.brand.name,
            });
        }
    };

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            color: product.colors[0] || "Default",
            brandName: product.brand.name,
        });
    };

    const handleClick = () => {
        addRecentView({
            productId: product.id,
            name: product.name,
            image: product.images[0],
            price: product.price,
        });
    };

    const imageSrc = product.images[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
        >
            <Link href={`/product/${product.id}`} onClick={handleClick} className="group block">
                {/* Image Container */}
                <div className="relative aspect-[4/5] mb-4 overflow-hidden rounded-xl bg-surface-muted">
                    <Image
                        src={imageSrc}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.isNew && (
                            <span className="badge-primary text-[10px] px-2 py-1">New</span>
                        )}
                        {product.discount > 0 && (
                            <span className="bg-foreground text-white text-[10px] px-2 py-1 rounded-full font-medium">
                                -{product.discount}%
                            </span>
                        )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                        onClick={handleWishlistToggle}
                        className={`absolute top-3 right-3 p-2.5 rounded-full transition-all ${inWishlist
                            ? "bg-primary text-white"
                            : "bg-white/90 text-muted hover:text-primary sm:opacity-0 sm:group-hover:opacity-100"
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
                    </button>

                    {/* Quick Add */}
                    <div className="absolute bottom-3 left-3 right-3 sm:opacity-0 sm:group-hover:opacity-100 transition-all sm:translate-y-2 sm:group-hover:translate-y-0">
                        <button
                            onClick={handleQuickAdd}
                            className="w-full bg-white/95 backdrop-blur-sm text-foreground py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors"
                        >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1.5">
                    <p className="text-[11px] text-muted uppercase tracking-wider">
                        {product.brand.name}
                    </p>
                    <h3 className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-muted">{product.rating}</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-sm font-semibold text-foreground">
                            ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice > product.price && (
                            <span className="text-xs text-muted line-through">
                                ₹{product.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
