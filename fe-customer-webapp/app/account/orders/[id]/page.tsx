"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Package,
    Truck,
    CheckCircle2,
    MapPin,
    CreditCard,
    Star,
    X,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockOrders } from "@/lib/mockData";

const statusSteps = ["Ordered", "Confirmed", "Shipped", "Delivered"];

export default function OrderDetailPage() {
    const params = useParams();
    const order = mockOrders.find((o) => o.id === params.id);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [reviewItem, setReviewItem] = useState<{ productId: string; name: string } | null>(null);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [submitted, setSubmitted] = useState(false);

    if (!order) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-serif mb-4">Order Not Found</h1>
                        <Link href="/account/orders" className="btn-primary">
                            View All Orders
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const currentStep = statusSteps.indexOf(order.status);

    const handleOpenReview = (item: { productId: string; name: string }) => {
        setReviewItem(item);
        setRating(0);
        setReviewText("");
        setSubmitted(false);
        setShowReviewModal(true);
    };

    const handleSubmitReview = () => {
        // Mock submission
        setSubmitted(true);
        setTimeout(() => {
            setShowReviewModal(false);
        }, 2000);
    };

    const handleDownloadReceipt = () => {
        const receiptHTML = `<!DOCTYPE html>
<html>
<head>
    <title>Forique Receipt - ${order.id}</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Outfit', sans-serif; background: #fff; color: #0f0f0f; padding: 40px; max-width: 800px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #e5e5e5; padding-bottom: 24px; margin-bottom: 32px; }
        .logo { font-size: 28px; font-weight: 700; color: #e11d48; }
        .section { margin-bottom: 24px; }
        .section-title { font-size: 11px; font-weight: 600; color: #737373; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 12px 0; text-align: left; border-bottom: 1px solid #e5e5e5; font-size: 14px; }
        th { font-size: 11px; color: #737373; text-transform: uppercase; }
        .addr { background: #fafafa; padding: 16px; border-radius: 8px; font-size: 13px; line-height: 1.6; }
        .summary { background: #fafafa; padding: 20px; border-radius: 8px; }
        .summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
        .summary-row.total { border-top: 2px solid #e5e5e5; margin-top: 12px; padding-top: 12px; font-weight: 700; font-size: 16px; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; color: #737373; font-size: 11px; }
        @media print { body { padding: 20px; } .no-print { display: none; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">FORIQUE</div>
        <div style="text-align:right">
            <p style="font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:1px">Order Receipt</p>
            <p style="font-weight:600;font-size:14px;margin-top:4px">${order.id}</p>
            <p style="font-size:13px;color:#737373;margin-top:4px">${order.date}</p>
        </div>
    </div>
    <div class="section">
        <h3 class="section-title">Order Items</h3>
        <table>
            <thead><tr><th>Product</th><th>Qty</th><th style="text-align:right">Price</th></tr></thead>
            <tbody>${order.items.map(item => '<tr><td style="font-weight:500">' + item.name + '</td><td>' + item.quantity + '</td><td style="text-align:right;font-weight:600">₹' + item.price.toLocaleString() + '</td></tr>').join('')}</tbody>
        </table>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
        <div class="section">
            <h3 class="section-title">Delivery Address</h3>
            <div class="addr">
                <p style="font-weight:600">${order.address.name}</p>
                <p>${order.address.line1}</p>
                <p>${order.address.line2}</p>
                <p>${order.address.city}, ${order.address.state} - ${order.address.pincode}</p>
                <p style="margin-top:8px">Phone: ${order.address.phone}</p>
            </div>
        </div>
        <div class="section">
            <h3 class="section-title">Payment Summary</h3>
            <div class="summary">
                <div class="summary-row"><span>Subtotal</span><span>₹${order.subtotal.toLocaleString()}</span></div>
                <div class="summary-row"><span>Shipping</span><span style="color:#16a34a">Free</span></div>
                <div class="summary-row"><span>Discount</span><span style="color:#16a34a">-₹${order.discount.toLocaleString()}</span></div>
                <div class="summary-row total"><span>Total</span><span>₹${order.total.toLocaleString()}</span></div>
                <p style="font-size:11px;color:#737373;margin-top:12px">Paid via ${order.paymentMethod}</p>
            </div>
        </div>
    </div>
    <div class="footer">
        <p style="color:#e11d48;font-weight:600">Thank you for shopping with Forique!</p>
        <p style="margin-top:8px">support@forique.com | © 2026 Forique</p>
    </div>
    <div class="no-print" style="text-align:center;margin-top:24px">
        <button onclick="window.print()" style="background:#0f0f0f;color:white;border:none;padding:12px 32px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer">Save as PDF</button>
    </div>
</body>
</html>`;
        const win = window.open('', '_blank');
        if (win) { win.document.write(receiptHTML); win.document.close(); }
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-8">
                <div className="container-custom max-w-4xl">
                    <Link
                        href="/account/orders"
                        className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Orders
                    </Link>

                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-serif text-foreground">{order.id}</h1>
                            <p className="text-sm text-muted mt-1">Placed on {order.date}</p>
                        </div>
                        <span
                            className={`px-4 py-2 rounded-full text-sm font-medium ${order.status === "Delivered"
                                ? "bg-green-50 text-green-600"
                                : order.status === "Shipped"
                                    ? "bg-blue-50 text-blue-600"
                                    : "bg-amber-50 text-amber-600"
                                }`}
                        >
                            {order.status}
                        </span>
                    </div>

                    {/* Status Tracker */}
                    <div className="card p-6 mb-6">
                        <div className="flex items-center justify-between relative">
                            <div className="absolute top-5 left-8 right-8 h-0.5 bg-border" />
                            <div
                                className="absolute top-5 left-8 h-0.5 bg-primary transition-all"
                                style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%`, maxWidth: "calc(100% - 4rem)" }}
                            />
                            {statusSteps.map((step, index) => (
                                <div key={step} className="relative z-10 flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${index <= currentStep
                                            ? "bg-primary text-white"
                                            : "bg-surface-muted text-muted"
                                            }`}
                                    >
                                        {index === 0 && <Package className="w-4 h-4" />}
                                        {index === 1 && <CheckCircle2 className="w-4 h-4" />}
                                        {index === 2 && <Truck className="w-4 h-4" />}
                                        {index === 3 && <CheckCircle2 className="w-4 h-4" />}
                                    </div>
                                    <span
                                        className={`text-xs mt-2 ${index <= currentStep ? "text-primary font-medium" : "text-muted"
                                            }`}
                                    >
                                        {step}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="card p-6 mb-6">
                        <h2 className="text-sm font-semibold mb-4">Order Items</h2>
                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="w-20 h-20 bg-surface-muted rounded-xl overflow-hidden shrink-0">
                                        <Image
                                            src={item.image || "/products/product-1.png"}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-foreground">{item.name}</h3>
                                        <p className="text-sm text-muted">Qty: {item.quantity}</p>
                                        <p className="text-sm font-medium mt-1">₹{item.price.toLocaleString()}</p>
                                        {order.status === "Delivered" && order.canReview && (
                                            <button
                                                onClick={() => handleOpenReview({ productId: item.productId, name: item.name })}
                                                className="text-xs text-primary hover:underline mt-2 inline-flex items-center gap-1"
                                            >
                                                <Star className="w-3 h-3" />
                                                Write a Review
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Delivery Address */}
                        <div className="card p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="w-4 h-4 text-primary" />
                                <h2 className="text-sm font-semibold">Delivery Address</h2>
                            </div>
                            <div className="text-sm text-muted space-y-1">
                                <p className="font-medium text-foreground">{order.address.name}</p>
                                <p>{order.address.line1}</p>
                                <p>{order.address.line2}</p>
                                <p>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                                <p>Phone: {order.address.phone}</p>
                            </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="card p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <CreditCard className="w-4 h-4 text-primary" />
                                <h2 className="text-sm font-semibold">Payment Summary</h2>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted">Subtotal</span>
                                    <span>₹{order.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted">Discount</span>
                                    <span className="text-green-600">-₹{order.discount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-semibold pt-2 border-t border-border">
                                    <span>Total</span>
                                    <span>₹{order.total.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-muted pt-2">Paid via {order.paymentMethod}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tracking and Actions */}
                    <div className="card p-6 mt-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-sm font-semibold">Order Actions</h2>
                                {order.trackingNumber && (
                                    <p className="text-muted text-sm mt-1">Tracking: {order.trackingNumber}</p>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                {order.trackingNumber && (
                                    <button className="btn-secondary text-sm py-2 w-full sm:w-auto">
                                        Track Order
                                    </button>
                                )}
                                <button
                                    onClick={handleDownloadReceipt}
                                    className="btn-primary text-sm py-2 w-full sm:w-auto"
                                >
                                    Download Receipt
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Review Modal */}
            {showReviewModal && reviewItem && (
                <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-surface rounded-2xl max-w-md w-full p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-serif">Write a Review</h2>
                            <button
                                onClick={() => setShowReviewModal(false)}
                                className="p-2 hover:bg-surface-muted rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="font-medium text-lg mb-2">Thank You!</h3>
                                <p className="text-sm text-muted">Your review has been submitted.</p>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm text-muted mb-4">
                                    Reviewing: <span className="text-foreground font-medium">{reviewItem.name}</span>
                                </p>

                                <div className="mb-6">
                                    <p className="text-sm font-medium mb-2">Your Rating</p>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className="p-1"
                                            >
                                                <Star
                                                    className={`w-8 h-8 transition-colors ${star <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="text-sm font-medium mb-2 block">Your Review</label>
                                    <textarea
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="Share your experience with this product..."
                                        className="input min-h-[120px] resize-none"
                                    />
                                </div>

                                <button
                                    onClick={handleSubmitReview}
                                    disabled={rating === 0}
                                    className="btn-primary w-full"
                                >
                                    Submit Review
                                </button>
                            </>
                        )}
                    </motion.div>
                </div>
            )}

            <Footer />
        </>
    );
}
