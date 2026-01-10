"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";

export default function EditProductPage() {
    const [formData, setFormData] = useState({
        name: "Kundan Jhumka Earrings",
        description: "Handcrafted traditional Kundan jhumka earrings with intricate meenakari work.",
        price: "2499",
        mrp: "3999",
        category: "Earrings",
        stock: "45",
    });

    return (
        <div className="max-w-2xl space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
                <Link href="/products" className="p-2 hover:bg-surface-hover rounded-xl">
                    <ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} />
                </Link>
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Edit Product</h1>
                    <p className="text-sm text-muted mt-1">Update product details</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6 space-y-5">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Product Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-sm resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Selling Price (₹)</label>
                        <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">MRP (₹)</label>
                        <input type="text" value={formData.mrp} onChange={(e) => setFormData({ ...formData, mrp: e.target.value })} className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-sm" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-sm">
                            <option>Earrings</option><option>Necklaces</option><option>Bangles</option><option>Rings</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Stock</label>
                        <input type="text" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-sm" />
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-medium">
                    <Save className="w-4 h-4" strokeWidth={1.5} />
                    Save Changes
                </button>
                <Link href="/products" className="px-6 py-3 border border-border rounded-xl font-medium text-center hover:bg-surface-hover">Cancel</Link>
            </div>
        </div>
    );
}
