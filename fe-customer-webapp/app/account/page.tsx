"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    User,
    Package,
    Heart,
    MapPin,
    Settings,
    LogOut,
    ChevronRight,
    Wallet,
    Palette,
    Camera,
    Clock,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuthStore } from "@/stores/authStore";
import { mockUser, mockOrders, getProductById } from "@/lib/mockData";

const menuItems = [
    { icon: Package, label: "Orders", href: "/account/orders", count: mockOrders.length },
    { icon: Heart, label: "Wishlist", href: "/account/wishlist" },
    { icon: MapPin, label: "Addresses", href: "/account/addresses" },
    { icon: Wallet, label: "Wallet", href: "/account/wallet", badge: `₹${mockUser.refundWallet}` },
    { icon: Palette, label: "Style Passport", href: "/account/style-passport" },
    { icon: Settings, label: "Settings", href: "/account/settings" },
];

export default function AccountPage() {
    const router = useRouter();
    const { logout, isAuthenticated, recentViews } = useAuthStore();
    const user = mockUser;

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-12">
                <div className="container-custom">
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-serif text-foreground mb-10"
                    >
                        My Account
                    </motion.h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {/* Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-1"
                        >
                            <div className="card p-5 sm:p-8">
                                {/* Avatar */}
                                <div className="relative w-20 h-20 mx-auto mb-5">
                                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/30 rounded-full flex items-center justify-center">
                                        <span className="text-3xl font-serif font-medium text-primary">
                                            {user.name.charAt(0)}
                                        </span>
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="text-center mb-8">
                                    <h2 className="text-xl font-serif text-foreground">{user.name}</h2>
                                    <p className="text-sm text-muted mt-1">{user.email}</p>
                                </div>

                                {/* Style Passport Preview */}
                                <div className="p-5 bg-surface-muted rounded-xl mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-2">
                                            <Palette className="w-3.5 h-3.5" />
                                            Style Passport
                                        </h3>
                                        <Link href="/tools/skin-tone-analyzer" className="text-xs text-primary hover:underline">
                                            Update
                                        </Link>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-xs">
                                        <div>
                                            <p className="text-muted mb-0.5">Skin Tone</p>
                                            <p className="font-medium text-foreground">{user.stylePassport.skinTone}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted mb-0.5">Metal</p>
                                            <p className="font-medium text-foreground">{user.stylePassport.preferredMetal}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 py-3 text-sm text-muted hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </motion.div>

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Quick Actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="grid grid-cols-3 gap-2 sm:gap-4"
                            >
                                <Link href="/account/orders" className="card p-4 sm:p-5 text-center hover:border-primary/30 transition-colors">
                                    <Package className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-primary mb-1 sm:mb-2" />
                                    <p className="text-xs sm:text-sm font-medium">Orders</p>
                                </Link>
                                <Link href="/account/wishlist" className="card p-4 sm:p-5 text-center hover:border-primary/30 transition-colors">
                                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-primary mb-1 sm:mb-2" />
                                    <p className="text-xs sm:text-sm font-medium">Wishlist</p>
                                </Link>
                                <Link href="/tools/skin-tone-analyzer" className="card p-4 sm:p-5 text-center hover:border-primary/30 transition-colors">
                                    <Camera className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-primary mb-1 sm:mb-2" />
                                    <p className="text-xs sm:text-sm font-medium">Style Match</p>
                                </Link>
                            </motion.div>

                            {/* Recently Viewed */}
                            {recentViews.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="card p-4 sm:p-6"
                                >
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted flex items-center gap-2 mb-4">
                                        <Clock className="w-3.5 h-3.5" />
                                        Recently Viewed
                                    </h3>
                                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                        {recentViews.slice(0, 5).map((item) => (
                                            <Link
                                                key={item.productId}
                                                href={`/product/${item.productId}`}
                                                className="shrink-0 w-24 group"
                                            >
                                                <div className="w-24 h-28 bg-surface-muted rounded-lg overflow-hidden mb-2 group-hover:scale-105 transition-transform">
                                                    <Image
                                                        src={item.image || "/products/product-1.png"}
                                                        alt={item.name}
                                                        width={96}
                                                        height={112}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <p className="text-xs text-foreground line-clamp-2">{item.name}</p>
                                                <p className="text-xs font-medium text-primary mt-0.5">₹{item.price.toLocaleString()}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Menu List */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="card overflow-hidden"
                            >
                                {menuItems.map((item, index) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center justify-between p-4 sm:p-5 hover:bg-surface-muted transition-colors ${index !== menuItems.length - 1 ? "border-b border-border" : ""
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon className="w-5 h-5 text-muted" />
                                            <span className="font-medium text-foreground">{item.label}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {item.badge && (
                                                <span className="text-sm font-medium text-green-600">{item.badge}</span>
                                            )}
                                            {item.count !== undefined && (
                                                <span className="text-sm text-muted">{item.count}</span>
                                            )}
                                            <ChevronRight className="w-4 h-4 text-muted" />
                                        </div>
                                    </Link>
                                ))}
                            </motion.div>

                            {/* Recent Orders */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="card p-6"
                            >
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Recent Orders</h3>
                                    <Link href="/account/orders" className="text-xs text-primary hover:underline">
                                        View All
                                    </Link>
                                </div>
                                <div className="space-y-4">
                                    {mockOrders.slice(0, 2).map((order) => (
                                        <Link
                                            key={order.id}
                                            href={`/account/orders/${order.id}`}
                                            className="flex items-center gap-4 p-4 bg-surface-muted rounded-xl hover:bg-border/30 transition-colors"
                                        >
                                            <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg flex items-center justify-center">
                                                <Package className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-mono text-sm font-medium">{order.id}</p>
                                                <p className="text-xs text-muted">{order.items.length} items</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${order.status === "Delivered"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-amber-50 text-amber-700"
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
