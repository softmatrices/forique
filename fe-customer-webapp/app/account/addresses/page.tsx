"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockUser } from "@/lib/mockData";

interface Address {
    id: string;
    type: string;
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    isDefault: boolean;
}

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>(mockUser.addresses);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        type: "Home",
        name: "",
        line1: "",
        line2: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        isDefault: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newAddress: Address = {
            id: `addr-${Date.now()}`,
            ...formData,
        };
        setAddresses([...addresses, newAddress]);
        setShowAddModal(false);
        setFormData({
            type: "Home",
            name: "",
            line1: "",
            line2: "",
            city: "",
            state: "",
            pincode: "",
            phone: "",
            isDefault: false,
        });
    };

    const handleDelete = (id: string) => {
        setAddresses(addresses.filter(addr => addr.id !== id));
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-12">
                <div className="container-custom max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link href="/account" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Account
                        </Link>
                        <h1 className="text-2xl font-serif text-foreground mb-8">Saved Addresses</h1>
                    </motion.div>

                    <div className="space-y-4">
                        {addresses.map((address, index) => (
                            <motion.div
                                key={address.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="card p-6"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium px-2.5 py-1 bg-surface-muted rounded-full">
                                            {address.type}
                                        </span>
                                        {address.isDefault && (
                                            <span className="text-xs text-green-600 flex items-center gap-1">
                                                <Check className="w-3 h-3" />
                                                Default
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-muted hover:text-primary transition-colors">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(address.id)}
                                            className="p-2 text-muted hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-muted mt-0.5 shrink-0" />
                                    <div className="text-sm">
                                        <p className="font-medium text-foreground">{address.name}</p>
                                        <p className="text-muted">{address.line1}</p>
                                        {address.line2 && <p className="text-muted">{address.line2}</p>}
                                        <p className="text-muted">{address.city}, {address.state} - {address.pincode}</p>
                                        <p className="text-muted mt-1">{address.phone}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            onClick={() => setShowAddModal(true)}
                            className="w-full p-6 border-2 border-dashed border-border rounded-xl text-center text-muted hover:border-primary hover:text-primary transition-colors"
                        >
                            <Plus className="w-5 h-5 mx-auto mb-2" />
                            Add New Address
                        </motion.button>
                    </div>
                </div>
            </main>

            {/* Add Address Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-surface rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-border">
                                <h2 className="text-lg font-serif">Add New Address</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="p-2 hover:bg-surface-muted rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div>
                                    <label className="text-sm font-medium mb-1.5 block">Address Type</label>
                                    <div className="flex gap-3">
                                        {["Home", "Work", "Other"].map((type) => (
                                            <button
                                                key={type}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, type })}
                                                className={`px-4 py-2 rounded-lg text-sm transition-colors ${formData.type === type
                                                        ? "bg-primary text-white"
                                                        : "bg-surface-muted text-foreground hover:bg-border"
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-1.5 block">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="input"
                                        placeholder="Enter full name"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-1.5 block">Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="input"
                                        placeholder="10-digit mobile number"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-1.5 block">Address Line 1 *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.line1}
                                        onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                                        className="input"
                                        placeholder="House/Flat No., Building Name"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-1.5 block">Address Line 2</label>
                                    <input
                                        type="text"
                                        value={formData.line2}
                                        onChange={(e) => setFormData({ ...formData, line2: e.target.value })}
                                        className="input"
                                        placeholder="Street, Landmark (optional)"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium mb-1.5 block">City *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className="input"
                                            placeholder="City"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1.5 block">State *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.state}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                            className="input"
                                            placeholder="State"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-1.5 block">Pincode *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.pincode}
                                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                        className="input"
                                        placeholder="6-digit pincode"
                                    />
                                </div>

                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isDefault}
                                        onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                                        className="w-4 h-4 text-primary rounded"
                                    />
                                    <span className="text-sm">Set as default address</span>
                                </label>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="btn-secondary flex-1"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn-primary flex-1">
                                        Save Address
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </>
    );
}

