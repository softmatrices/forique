"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Heart, ShoppingCart, Star, Eye, Check, Clock } from "lucide-react";

export default function NewProductPage() {
    const [mode, setMode] = useState<"latch" | "new">("new");
    const [showPreview, setShowPreview] = useState(false);
    const [formData, setFormData] = useState({
        name: "Kundan Jhumka Earrings",
        description: "Handcrafted traditional Kundan jhumka earrings with intricate meenakari work. Perfect for weddings and festive occasions.",
        price: "2499",
        mrp: "3999",
        category: "Earrings",
        material: "Brass with Gold Plating",
        weight: "25g",
        stock: "50",
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
                <Link href="/products" className="p-2 hover:bg-surface-hover rounded-xl">
                    <ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} />
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold text-foreground">Add New Product</h1>
                    <p className="text-sm text-muted mt-1">Create a new product listing</p>
                </div>
                <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-surface-hover"
                >
                    <Eye className="w-4 h-4" strokeWidth={1.5} />
                    {showPreview ? "Hide Preview" : "Show Customer Preview"}
                </button>
            </div>

            <div className={`grid ${showPreview ? "lg:grid-cols-2" : ""} gap-6`}>
                {/* Form */}
                <div className="space-y-6">
                    {/* Mode Selector */}
                    <div className="bg-white rounded-2xl border border-border p-4">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setMode("new")}
                                className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${mode === "new" ? "bg-primary text-white" : "bg-surface-hover text-muted hover:text-foreground"
                                    }`}
                            >
                                Create New Product
                            </button>
                            <button
                                onClick={() => setMode("latch")}
                                className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${mode === "latch" ? "bg-primary text-white" : "bg-surface-hover text-muted hover:text-foreground"
                                    }`}
                            >
                                Latch onto Existing
                            </button>
                        </div>
                    </div>

                    {/* Product Form */}
                    <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Product Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                            <textarea
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Selling Price (₹)</label>
                                <input
                                    type="text"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">MRP (₹)</label>
                                <input
                                    type="text"
                                    value={formData.mrp}
                                    onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                                    className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-sm"
                                >
                                    <option>Earrings</option>
                                    <option>Necklaces</option>
                                    <option>Bangles</option>
                                    <option>Rings</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">Stock Quantity</label>
                                <input
                                    type="text"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Product Images</label>
                            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                <Upload className="w-8 h-8 text-muted mx-auto mb-2" strokeWidth={1.5} />
                                <p className="text-sm text-muted">Drag & drop or click to upload</p>
                                <p className="text-xs text-muted mt-1">PNG, JPG up to 5MB</p>
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center gap-3">
                        <button className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                            <Clock className="w-4 h-4" strokeWidth={1.5} />
                            Submit for Approval
                        </button>
                        <button className="px-6 py-3 border border-border rounded-xl font-medium hover:bg-surface-hover">
                            Save Draft
                        </button>
                    </div>

                    <p className="text-xs text-muted text-center">
                        Products require admin approval before going live on the customer app
                    </p>
                </div>

                {/* Customer App Preview */}
                {showPreview && (
                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="bg-white rounded-2xl border border-border overflow-hidden">
                            <div className="bg-primary/5 px-4 py-3 border-b border-border">
                                <p className="text-sm font-medium text-primary text-center">Customer App Preview</p>
                            </div>

                            {/* Product Card Preview */}
                            <div className="p-4">
                                <div className="bg-surface-hover rounded-xl overflow-hidden max-w-[280px] mx-auto shadow-lg">
                                    {/* Image */}
                                    <div className="relative aspect-square bg-gradient-to-br from-purple-100 to-pink-100">
                                        <div className="absolute inset-0 flex items-center justify-center text-muted">
                                            <span className="text-sm">Product Image</span>
                                        </div>
                                        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md">
                                            <Heart className="w-4 h-4 text-muted" strokeWidth={1.5} />
                                        </button>
                                        <div className="absolute top-3 left-3 px-2 py-1 bg-rose-500 text-white text-xs font-medium rounded-md">
                                            {Math.round((1 - parseInt(formData.price) / parseInt(formData.mrp)) * 100)}% OFF
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="p-4">
                                        <p className="text-xs text-muted uppercase tracking-wider">Forique</p>
                                        <h3 className="text-sm font-medium text-foreground mt-1 line-clamp-2">{formData.name}</h3>

                                        <div className="flex items-center gap-1 mt-2">
                                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                            <span className="text-xs font-medium">4.5</span>
                                            <span className="text-xs text-muted">(128)</span>
                                        </div>

                                        <div className="flex items-baseline gap-2 mt-2">
                                            <span className="text-lg font-bold text-foreground">₹{parseInt(formData.price).toLocaleString()}</span>
                                            <span className="text-sm text-muted line-through">₹{parseInt(formData.mrp).toLocaleString()}</span>
                                        </div>

                                        <button className="w-full mt-3 py-2.5 bg-primary text-white text-sm font-medium rounded-lg flex items-center justify-center gap-2">
                                            <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* PDP Preview */}
                            <div className="border-t border-border p-4">
                                <p className="text-xs font-medium text-muted uppercase mb-3">Product Detail Page</p>
                                <div className="space-y-3">
                                    <p className="text-sm text-foreground leading-relaxed">{formData.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-1 bg-surface-hover rounded text-xs text-muted">{formData.category}</span>
                                        <span className="px-2 py-1 bg-surface-hover rounded text-xs text-muted">{formData.material}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
