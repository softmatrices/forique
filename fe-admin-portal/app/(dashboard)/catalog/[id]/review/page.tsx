"use client";

import Link from "next/link";
import { ArrowLeft, Check, X, Heart, ShoppingCart, Star, Eye, AlertTriangle } from "lucide-react";
import { useState } from "react";

const productData = {
    id: "PROD-001",
    name: "Kundan Jhumka Earrings",
    seller: { name: "Jaipur Silvers", id: "SEL-001", rating: 4.8 },
    description: "Handcrafted traditional Kundan jhumka earrings with intricate meenakari work. Perfect for weddings and festive occasions.",
    price: 2499,
    mrp: 3999,
    category: "Earrings",
    material: "Brass with Gold Plating",
    weight: "25g",
    stock: 50,
    submittedAt: "2 hours ago",
};

export default function ProductReviewPage() {
    const [notes, setNotes] = useState("");

    return (
        <div className="space-y-6 animate-fade-in max-w-6xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/catalog" className="p-2 hover:bg-surface-hover rounded-xl">
                        <ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Product Review</h1>
                        <p className="text-sm text-muted mt-1">{productData.id} • Submitted {productData.submittedAt}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-danger text-danger rounded-xl font-medium hover:bg-danger/5">
                        <X className="w-4 h-4" strokeWidth={1.5} />
                        Reject
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-success text-white rounded-xl font-medium hover:bg-success/90">
                        <Check className="w-4 h-4" strokeWidth={1.5} />
                        Approve
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Product Details */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-border p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Product Information</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-muted uppercase">Product Name</p>
                                <p className="text-sm font-medium text-foreground mt-1">{productData.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted uppercase">Description</p>
                                <p className="text-sm text-foreground mt-1">{productData.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-muted uppercase">Selling Price</p>
                                    <p className="text-sm font-medium text-foreground mt-1">₹{productData.price.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted uppercase">MRP</p>
                                    <p className="text-sm font-medium text-foreground mt-1">₹{productData.mrp.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-muted uppercase">Category</p>
                                    <p className="text-sm font-medium text-foreground mt-1">{productData.category}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted uppercase">Stock</p>
                                    <p className="text-sm font-medium text-foreground mt-1">{productData.stock} units</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-border p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Seller Information</h3>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                JS
                            </div>
                            <div>
                                <p className="font-medium text-foreground">{productData.seller.name}</p>
                                <p className="text-sm text-muted">{productData.seller.id} • ⭐ {productData.seller.rating}</p>
                            </div>
                            <Link href={`/sellers/${productData.seller.id}`} className="ml-auto text-sm text-primary">View Profile</Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-border p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Review Notes</h3>
                        <textarea
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add notes about this product listing..."
                            className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>

                {/* Customer App Preview */}
                <div className="lg:sticky lg:top-24 h-fit">
                    <div className="bg-white rounded-2xl border border-border overflow-hidden">
                        <div className="bg-primary/5 px-4 py-3 border-b border-border flex items-center justify-between">
                            <p className="text-sm font-medium text-primary">Customer App Preview</p>
                            <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                                <AlertTriangle className="w-3 h-3" />
                                Pending Approval
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="bg-surface-hover rounded-xl overflow-hidden max-w-[280px] mx-auto shadow-lg">
                                <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-pink-100">
                                    <div className="absolute inset-0 flex items-center justify-center text-muted">
                                        <span className="text-sm">Product Image</span>
                                    </div>
                                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md">
                                        <Heart className="w-4 h-4 text-muted" strokeWidth={1.5} />
                                    </button>
                                    <div className="absolute top-3 left-3 px-2 py-1 bg-rose-500 text-white text-xs font-medium rounded-md">
                                        {Math.round((1 - productData.price / productData.mrp) * 100)}% OFF
                                    </div>
                                </div>

                                <div className="p-4">
                                    <p className="text-xs text-muted uppercase tracking-wider">Forique</p>
                                    <h3 className="text-sm font-medium text-foreground mt-1 line-clamp-2">{productData.name}</h3>

                                    <div className="flex items-center gap-1 mt-2">
                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        <span className="text-xs font-medium">New</span>
                                    </div>

                                    <div className="flex items-baseline gap-2 mt-2">
                                        <span className="text-lg font-bold text-foreground">₹{productData.price.toLocaleString()}</span>
                                        <span className="text-sm text-muted line-through">₹{productData.mrp.toLocaleString()}</span>
                                    </div>

                                    <button className="w-full mt-3 py-2.5 bg-primary text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2">
                                        <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-border p-4">
                            <p className="text-xs font-medium text-muted uppercase mb-3">Product Details</p>
                            <p className="text-sm text-foreground leading-relaxed">{productData.description}</p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className="px-2 py-1 bg-surface-hover rounded text-xs text-muted">{productData.category}</span>
                                <span className="px-2 py-1 bg-surface-hover rounded text-xs text-muted">{productData.material}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
