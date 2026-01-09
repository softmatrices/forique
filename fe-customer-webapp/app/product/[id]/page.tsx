"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart,
    Share2,
    Star,
    ShoppingBag,
    Truck,
    RotateCcw,
    Shield,
    Minus,
    Plus,
    Check,
    ChevronRight,
    Ruler,
    Camera,
    Package,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { getProductById, products, reviews } from "@/lib/mockData";

export default function ProductDetailPage() {
    const params = useParams();
    const product = getProductById(params.id as string);

    const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<"description" | "reviews" | "shipping">("description");

    const addToCart = useCartStore((state) => state.addItem);
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
    const inWishlist = product ? isInWishlist(product.id) : false;

    if (!product) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-surface-muted rounded-full flex items-center justify-center">
                            <span className="text-5xl">💎</span>
                        </div>
                        <h1 className="text-2xl font-serif text-foreground mb-2">Product Not Found</h1>
                        <p className="text-muted mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
                        <Link href="/category/all" className="btn-primary">
                            Browse All Products
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const handleAddToCart = () => {
        addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            color: selectedColor,
            brandName: product.brand.name,
        });
    };

    const handleWishlistToggle = () => {
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

    const relatedProducts = products
        .filter((p) => p.category.id === product.category.id && p.id !== product.id)
        .slice(0, 4);

    const productReviews = reviews.filter((r) => r.productId === product.id);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background">
                {/* Breadcrumb */}
                <div className="bg-surface-muted py-4 border-b border-border">
                    <div className="container-custom">
                        <nav className="flex items-center text-sm text-muted">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <ChevronRight className="w-4 h-4 mx-2" />
                            <Link href={`/category/${product.category.slug}`} className="hover:text-primary transition-colors">
                                {product.category.name}
                            </Link>
                            <ChevronRight className="w-4 h-4 mx-2" />
                            <span className="text-foreground line-clamp-1">{product.name}</span>
                        </nav>
                    </div>
                </div>

                <div className="container-custom py-8">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Product Gallery */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <motion.div
                                key={selectedImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="aspect-square bg-surface-muted rounded-2xl overflow-hidden relative"
                            >
                                <Image
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />

                                {/* Badges - Matching List View */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.isNew && (
                                        <span className="badge-primary text-[10px] px-2 py-1">New</span>
                                    )}
                                    {product.discount > 0 && (
                                        <span className="bg-foreground text-white text-[10px] px-2 py-1 rounded-full font-medium">
                                            -{product.discount}%
                                        </span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <button
                                        onClick={handleWishlistToggle}
                                        className={`p-3 rounded-full shadow-soft transition-all ${inWishlist ? "bg-primary text-white" : "bg-white hover:bg-primary hover:text-white"
                                            }`}
                                    >
                                        <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
                                    </button>
                                    <button className="p-3 bg-white rounded-full shadow-soft hover:bg-primary hover:text-white transition-all">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>

                            {/* Thumbnails */}
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index ? "border-primary" : "border-transparent hover:border-primary/50"
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {/* Brand & Title */}
                            <div>
                                <Link
                                    href={`/category/all?brand=${product.brand.id}`}
                                    className="text-xs font-semibold text-primary uppercase tracking-wider hover:underline"
                                >
                                    {product.brand.name}
                                </Link>
                                <h1 className="text-2xl md:text-3xl font-serif text-foreground mt-2">
                                    {product.name}
                                </h1>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < Math.floor(product.rating)
                                                ? "text-amber-400 fill-amber-400"
                                                : "text-gray-300"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm font-medium">{product.rating}</span>
                                <span className="text-sm text-muted">({product.reviewCount} reviews)</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-3">
                                <span className="text-2xl font-bold text-foreground">
                                    ₹{product.price.toLocaleString()}
                                </span>
                                {product.originalPrice > product.price && (
                                    <>
                                        <span className="text-lg text-muted line-through">
                                            ₹{product.originalPrice.toLocaleString()}
                                        </span>
                                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                            Save ₹{(product.originalPrice - product.price).toLocaleString()}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Color Selection */}
                            <div>
                                <h3 className="text-sm font-medium text-foreground mb-3">
                                    Color: <span className="font-normal text-muted">{selectedColor}</span>
                                </h3>
                                <div className="flex gap-3">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${selectedColor === color
                                                ? "border-primary bg-primary/5 text-primary"
                                                : "border-border hover:border-primary/50"
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div>
                                <h3 className="text-sm font-medium text-foreground mb-3">Quantity</h3>
                                <div className="inline-flex items-center border border-border rounded-full">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-surface-muted transition-colors rounded-l-full min-w-[44px] min-h-[44px] flex items-center justify-center"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-surface-muted transition-colors rounded-r-full min-w-[44px] min-h-[44px] flex items-center justify-center"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    className="btn-primary flex-1 py-4 text-sm"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                    Add to Cart
                                </button>
                                <Link href="/checkout" className="btn-secondary flex-1 py-4 text-sm text-center">
                                    Buy Now
                                </Link>
                            </div>

                            {/* Tools */}
                            <div className="flex gap-6 pt-2">
                                <Link
                                    href="/tools/skin-tone-analyzer"
                                    className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
                                >
                                    <Camera className="w-4 h-4" />
                                    Will this suit me?
                                </Link>
                                <Link
                                    href="/tools/size-guide"
                                    className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
                                >
                                    <Ruler className="w-4 h-4" />
                                    Size Guide
                                </Link>
                            </div>

                            {/* Features */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {product.features.map((feature) => (
                                    <span
                                        key={feature}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-muted rounded-full text-xs"
                                    >
                                        <Check className="w-3.5 h-3.5 text-green-600" />
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                                <div className="text-center">
                                    <Truck className="w-5 h-5 mx-auto text-primary mb-2" />
                                    <p className="text-xs text-muted">Free Shipping</p>
                                </div>
                                <div className="text-center">
                                    <RotateCcw className="w-5 h-5 mx-auto text-primary mb-2" />
                                    <p className="text-xs text-muted">7 Day Returns</p>
                                </div>
                                <div className="text-center">
                                    <Shield className="w-5 h-5 mx-auto text-primary mb-2" />
                                    <p className="text-xs text-muted">Secure Payment</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="mt-16">
                        <div className="border-b border-border">
                            <div className="flex gap-8">
                                {(["description", "reviews", "shipping"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-4 text-sm font-medium capitalize transition-colors relative ${activeTab === tab ? "text-primary" : "text-muted hover:text-foreground"
                                            }`}
                                    >
                                        {tab}
                                        {tab === "reviews" && ` (${productReviews.length})`}
                                        {activeTab === tab && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="py-8">
                            {activeTab === "description" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose max-w-none">
                                    <p className="text-foreground leading-relaxed">{product.description}</p>
                                    <h4 className="font-semibold mt-6 mb-3">Materials</h4>
                                    <ul className="space-y-1">
                                        {product.materials.map((m) => (
                                            <li key={m} className="text-muted flex items-center gap-2">
                                                <Package className="w-4 h-4" /> {m}
                                            </li>
                                        ))}
                                    </ul>
                                    <h4 className="font-semibold mt-6 mb-3">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map((tag) => (
                                            <span key={tag} className="badge-accent capitalize">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "reviews" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                    {productReviews.length > 0 ? (
                                        productReviews.map((review) => (
                                            <div key={review.id} className="p-6 bg-surface-muted rounded-2xl">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">{review.user.name}</span>
                                                            {review.verified && (
                                                                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                                                    Verified
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-1 mt-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-3.5 h-3.5 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-muted">{review.date}</span>
                                                </div>
                                                <h4 className="font-medium mb-2">{review.title}</h4>
                                                <p className="text-muted text-sm">{review.comment}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center text-muted py-8">No reviews yet. Be the first to review!</p>
                                    )}
                                </motion.div>
                            )}

                            {activeTab === "shipping" && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 bg-surface-muted rounded-xl">
                                        <Truck className="w-6 h-6 text-primary shrink-0" />
                                        <div>
                                            <h4 className="font-medium mb-1">Free Standard Shipping</h4>
                                            <p className="text-sm text-muted">Delivery in 5-7 business days. Free on orders above ₹999.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 p-4 bg-surface-muted rounded-xl">
                                        <RotateCcw className="w-6 h-6 text-primary shrink-0" />
                                        <div>
                                            <h4 className="font-medium mb-1">Easy Returns</h4>
                                            <p className="text-sm text-muted">7-day hassle-free returns. No questions asked.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Complete the Look / Related Products */}
                    {relatedProducts.length > 0 && (
                        <section className="mt-16 pt-16 border-t border-border">
                            <h2 className="text-2xl font-serif text-foreground mb-8">Complete the Look</h2>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                {relatedProducts.map((p, index) => (
                                    <ProductCard key={p.id} product={p} index={index} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
