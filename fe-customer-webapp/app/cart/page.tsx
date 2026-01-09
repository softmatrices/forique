"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Trash2,
    Minus,
    Plus,
    ShoppingBag,
    ArrowRight,
    Tag,
    Gift,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/stores/cartStore";

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
    const [promoCode, setPromoCode] = useState("");
    const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
    const [isGift, setIsGift] = useState(false);

    const subtotal = getTotal();
    const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0;
    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal - discount + shipping;

    const applyPromo = () => {
        if (promoCode.toUpperCase() === "FIRST15") {
            setAppliedPromo(promoCode.toUpperCase());
            setPromoCode("");
        }
    };

    if (items.length === 0) {
        return (
            <>
                <Navbar />
                <main className="min-h-[70vh] flex items-center justify-center bg-background">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center px-4"
                    >
                        <div className="w-24 h-24 mx-auto mb-6 bg-surface-muted rounded-full flex items-center justify-center">
                            <ShoppingBag className="w-12 h-12 text-muted" />
                        </div>
                        <h1 className="text-2xl font-serif text-foreground mb-2">
                            Your cart is empty
                        </h1>
                        <p className="text-muted mb-8">
                            Looks like you haven't added anything yet.
                        </p>
                        <Link href="/category/all" className="btn-primary">
                            Start Shopping
                        </Link>
                    </motion.div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-8">
                <div className="container-custom">
                    <h1 className="text-3xl font-serif text-foreground mb-8">
                        Shopping Cart ({items.length} items)
                    </h1>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item, index) => (
                                <motion.div
                                    key={`${item.productId}-${item.color}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="card p-4 md:p-6"
                                >
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-surface-muted rounded-xl overflow-hidden relative">
                                            <Image
                                                src={item.image || "/products/product-1.png"}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between gap-2">
                                                <div>
                                                    <p className="text-xs text-muted uppercase tracking-wider mb-1">
                                                        {item.brandName}
                                                    </p>
                                                    <h3 className="font-medium text-foreground line-clamp-2">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-muted mt-1">
                                                        Color: {item.color}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.productId, item.color)}
                                                    className="p-2 text-muted hover:text-red-500 transition-colors h-fit"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                {/* Quantity */}
                                                <div className="flex items-center border border-border rounded-lg">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(item.productId, item.color, item.quantity - 1)
                                                        }
                                                        className="p-3 hover:bg-surface-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="w-10 text-center font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(item.productId, item.color, item.quantity + 1)
                                                        }
                                                        className="p-3 hover:bg-surface-muted transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <p className="text-lg font-semibold text-primary">
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            <button
                                onClick={clearCart}
                                className="text-sm text-muted hover:text-red-500 transition-colors"
                            >
                                Clear Cart
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="card p-6 sticky top-24">
                                <h2 className="text-lg font-semibold text-foreground mb-6">
                                    Order Summary
                                </h2>

                                {/* Promo Code */}
                                <div className="mb-6">
                                    <label className="text-sm font-medium text-foreground mb-2 block">
                                        Promo Code
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                                            <input
                                                type="text"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                placeholder="Enter code"
                                                className="input pl-10"
                                                disabled={!!appliedPromo}
                                            />
                                        </div>
                                        <button
                                            onClick={applyPromo}
                                            disabled={!promoCode || !!appliedPromo}
                                            className="btn-secondary px-4"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {appliedPromo && (
                                        <p className="text-sm text-green-600 mt-2">
                                            ✓ Code {appliedPromo} applied! 10% off
                                        </p>
                                    )}
                                </div>

                                {/* Gift Option */}
                                <label className="flex items-center gap-3 p-4 bg-surface-muted rounded-xl mb-6 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isGift}
                                        onChange={(e) => setIsGift(e.target.checked)}
                                        className="w-4 h-4 text-primary rounded"
                                    />
                                    <Gift className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="font-medium text-sm">Make this a gift</p>
                                        <p className="text-xs text-muted">Add video message at checkout</p>
                                    </div>
                                </label>

                                {/* Price Breakdown */}
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted">Subtotal</span>
                                        <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span>-₹{discount.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-muted">Shipping</span>
                                        <span className={shipping === 0 ? "text-green-600" : "text-foreground"}>
                                            {shipping === 0 ? "Free" : `₹${shipping}`}
                                        </span>
                                    </div>
                                    {shipping > 0 && (
                                        <p className="text-xs text-muted">
                                            Add ₹{(999 - subtotal).toLocaleString()} more for free shipping
                                        </p>
                                    )}
                                    <div className="border-t border-border pt-3 flex justify-between text-base font-semibold">
                                        <span className="text-foreground">Total</span>
                                        <span className="text-primary">₹{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Link
                                    href={`/checkout${isGift ? "?gift=true" : ""}`}
                                    className="btn-primary w-full mt-6 py-4"
                                >
                                    Proceed to Checkout
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>

                                <Link
                                    href="/category/all"
                                    className="block text-center text-sm text-primary mt-4 hover:underline"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
