"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    CreditCard,
    Wallet,
    Building,
    Gift,
    Video,
    Check,
    MapPin,
    Plus,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { mockUser } from "@/lib/mockData";

const paymentMethods = [
    { id: "upi", name: "UPI", icon: Wallet, desc: "Pay using any UPI app" },
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
    { id: "netbanking", name: "Net Banking", icon: Building, desc: "All major banks supported" },
    { id: "cod", name: "Cash on Delivery", icon: Wallet, desc: "Pay when you receive" },
];

import { Suspense } from "react";
// ... existing imports ...

// Move the main logic to a sub-component
function CheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isGift = searchParams.get("gift") === "true";

    const { items, getTotal, clearCart } = useCartStore();
    const { isAuthenticated } = useAuthStore();

    const [step, setStep] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState(mockUser.addresses[0]?.id || null);
    const [selectedPayment, setSelectedPayment] = useState("upi");
    const [giftMessage, setGiftMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const subtotal = getTotal();
    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal + shipping;

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        clearCart();
        router.push("/order-confirmation");
    };

    if (items.length === 0) {
        return (
            <>
                <Navbar />
                <main className="min-h-[70vh] flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-serif mb-4">No items to checkout</h1>
                        <Link href="/category/all" className="btn-primary">
                            Continue Shopping
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-8">
                <div className="container-custom max-w-4xl">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/cart" className="p-2 hover:bg-surface-muted rounded-lg transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-2xl font-serif text-foreground">Checkout</h1>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        {["Address", "Payment", "Confirm"].map((s, i) => (
                            <div key={s} className="flex items-center gap-2">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step > i + 1
                                        ? "bg-green-500 text-white"
                                        : step === i + 1
                                            ? "bg-primary text-white"
                                            : "bg-surface-muted text-muted"
                                        }`}
                                >
                                    {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
                                </div>
                                <span className={step >= i + 1 ? "text-foreground" : "text-muted"}>{s}</span>
                                {i < 2 && <div className="w-8 h-px bg-border mx-2" />}
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* Step 1: Address */}
                            {step === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="card p-6"
                                >
                                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-primary" />
                                        Delivery Address
                                    </h2>

                                    <div className="space-y-4">
                                        {mockUser.addresses.map((addr) => (
                                            <label
                                                key={addr.id}
                                                className={`block p-4 border rounded-xl cursor-pointer transition-all ${selectedAddress === addr.id
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border hover:border-primary/50"
                                                    }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <input
                                                        type="radio"
                                                        name="address"
                                                        checked={selectedAddress === addr.id}
                                                        onChange={() => setSelectedAddress(addr.id)}
                                                        className="mt-1"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">{addr.name}</span>
                                                            <span className="badge-primary text-xs">{addr.type}</span>
                                                            {addr.isDefault && (
                                                                <span className="text-xs text-green-600">Default</span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-muted mt-1">
                                                            {addr.line1}, {addr.line2}
                                                        </p>
                                                        <p className="text-sm text-muted">
                                                            {addr.city}, {addr.state} - {addr.pincode}
                                                        </p>
                                                        <p className="text-sm text-muted mt-1">{addr.phone}</p>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}

                                        <button className="w-full p-4 border-2 border-dashed border-border rounded-xl text-center text-muted hover:border-primary hover:text-primary transition-colors">
                                            <Plus className="w-5 h-5 mx-auto mb-1" />
                                            Add New Address
                                        </button>
                                    </div>

                                    {/* Gift Message */}
                                    {isGift && (
                                        <div className="mt-6 p-4 bg-accent/10 rounded-xl">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Gift className="w-5 h-5 text-primary" />
                                                <span className="font-medium">Gift Message</span>
                                            </div>
                                            <textarea
                                                value={giftMessage}
                                                onChange={(e) => setGiftMessage(e.target.value)}
                                                placeholder="Write a personal message for the recipient..."
                                                className="input resize-none h-24"
                                            />
                                            <button className="mt-3 text-sm text-primary flex items-center gap-1 hover:underline">
                                                <Video className="w-4 h-4" />
                                                Record a video message
                                            </button>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setStep(2)}
                                        disabled={!selectedAddress}
                                        className="btn-primary w-full mt-6"
                                    >
                                        Continue to Payment
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 2: Payment */}
                            {step === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="card p-6"
                                >
                                    <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-primary" />
                                        Payment Method
                                    </h2>

                                    <div className="space-y-3">
                                        {paymentMethods.map((method) => (
                                            <label
                                                key={method.id}
                                                className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${selectedPayment === method.id
                                                    ? "border-primary bg-primary/5"
                                                    : "border-border hover:border-primary/50"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    checked={selectedPayment === method.id}
                                                    onChange={() => setSelectedPayment(method.id)}
                                                />
                                                <method.icon className="w-6 h-6 text-primary" />
                                                <div>
                                                    <p className="font-medium">{method.name}</p>
                                                    <p className="text-xs text-muted">{method.desc}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 mt-6">
                                        <button onClick={() => setStep(1)} className="btn-secondary flex-1">
                                            Back
                                        </button>
                                        <button onClick={() => setStep(3)} className="btn-primary flex-1">
                                            Review Order
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 3: Confirm */}
                            {step === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="card p-6"
                                >
                                    <h2 className="text-lg font-semibold mb-6">Review & Confirm</h2>

                                    {/* Order Items */}
                                    <div className="space-y-4 mb-6">
                                        {items.map((item) => (
                                            <div key={`${item.productId}-${item.color}`} className="flex gap-4">
                                                <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg flex items-center justify-center shrink-0">
                                                    <span className="text-2xl">💎</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium line-clamp-1">{item.name}</p>
                                                    <p className="text-sm text-muted">
                                                        {item.color} × {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Address Summary */}
                                    <div className="p-4 bg-surface-muted rounded-xl mb-4">
                                        <p className="text-sm font-medium mb-1">Delivering to:</p>
                                        <p className="text-sm text-muted">
                                            {mockUser.addresses.find((a) => a.id === selectedAddress)?.line1},{" "}
                                            {mockUser.addresses.find((a) => a.id === selectedAddress)?.city}
                                        </p>
                                    </div>

                                    {/* Payment Summary */}
                                    <div className="p-4 bg-surface-muted rounded-xl mb-6">
                                        <p className="text-sm font-medium mb-1">Payment:</p>
                                        <p className="text-sm text-muted">
                                            {paymentMethods.find((p) => p.id === selectedPayment)?.name}
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button onClick={() => setStep(2)} className="btn-secondary flex-1">
                                            Back
                                        </button>
                                        <button
                                            onClick={handlePlaceOrder}
                                            disabled={isProcessing}
                                            className="btn-primary flex-1"
                                        >
                                            {isProcessing ? "Processing..." : `Pay ₹${total.toLocaleString()}`}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="card p-6 sticky top-24">
                                <h3 className="font-semibold mb-4">Order Summary</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted">Items ({items.length})</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted">Shipping</span>
                                        <span className={shipping === 0 ? "text-green-600" : ""}>
                                            {shipping === 0 ? "Free" : `₹${shipping}`}
                                        </span>
                                    </div>
                                    <div className="border-t border-border pt-3 flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span className="text-primary">₹{total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
