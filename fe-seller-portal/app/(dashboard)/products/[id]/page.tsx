"use client";

import Link from "next/link";
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, RotateCcw, Shield, Edit, Trash2 } from "lucide-react";

const product = {
    id: "PRD-001",
    name: "Kundan Jhumka Earrings",
    description: "Handcrafted traditional Kundan jhumka earrings with intricate meenakari work. Perfect for weddings and festive occasions. Features high-quality stones and gold plating.",
    image: "/products/kundan-jhumka.png",
    price: 2499,
    mrp: 3999,
    stock: 45,
    status: "Active",
    category: "Earrings",
    material: "Brass with Gold Plating",
    weight: "25g",
    rating: 4.5,
    reviews: 128,
    sold: 342,
};

export default function ProductDetailPage() {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/products" className="p-2 hover:bg-surface-hover rounded-xl">
                        <ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">{product.name}</h1>
                        <p className="text-sm text-muted mt-1">{product.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link href={`/products/${product.id}/edit`} className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-surface-hover">
                        <Edit className="w-4 h-4" strokeWidth={1.5} />
                        Edit
                    </Link>
                    <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50">
                        <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        Delete
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="bg-white rounded-2xl border border-border p-4">
                    <div className="aspect-square rounded-xl overflow-hidden bg-surface-hover">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    {/* Price */}
                    <div className="bg-white rounded-2xl border border-border p-6">
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                            <span className="text-lg text-muted line-through">₹{product.mrp.toLocaleString()}</span>
                            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-sm font-medium rounded">
                                {Math.round((1 - product.price / product.mrp) * 100)}% OFF
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span className="text-sm font-medium">{product.rating}</span>
                                <span className="text-sm text-muted">({product.reviews} reviews)</span>
                            </div>
                            <span className="text-sm text-muted">•</span>
                            <span className="text-sm text-muted">{product.sold} sold</span>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-xl border border-border p-4 text-center">
                            <p className="text-2xl font-bold text-foreground">{product.stock}</p>
                            <p className="text-xs text-muted">In Stock</p>
                        </div>
                        <div className="bg-white rounded-xl border border-border p-4 text-center">
                            <p className="text-2xl font-bold text-foreground">{product.sold}</p>
                            <p className="text-xs text-muted">Total Sold</p>
                        </div>
                        <div className="bg-white rounded-xl border border-border p-4 text-center">
                            <p className="text-2xl font-bold text-foreground">{product.reviews}</p>
                            <p className="text-xs text-muted">Reviews</p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="bg-white rounded-2xl border border-border p-6">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Product Details</h3>
                        <dl className="space-y-3">
                            <div className="flex justify-between">
                                <dt className="text-sm text-muted">Category</dt>
                                <dd className="text-sm font-medium text-foreground">{product.category}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-muted">Material</dt>
                                <dd className="text-sm font-medium text-foreground">{product.material}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-muted">Weight</dt>
                                <dd className="text-sm font-medium text-foreground">{product.weight}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-muted">Status</dt>
                                <dd className="text-sm font-medium text-emerald-600">{product.status}</dd>
                            </div>
                        </dl>
                    </div>

                    {/* Description */}
                    <div className="bg-white rounded-2xl border border-border p-6">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Description</h3>
                        <p className="text-sm text-muted leading-relaxed">{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
