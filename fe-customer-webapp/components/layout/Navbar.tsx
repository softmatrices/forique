"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    ShoppingBag,
    Heart,
    User,
    Menu,
    X,
    ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { categories } from "@/lib/mockData";

const navLinks = [
    { name: "Shop", href: "/category/all", hasDropdown: true },
    { name: "New", href: "/category/new-arrivals" },
    { name: "Bestsellers", href: "/category/bestsellers" },
    { name: "About", href: "/about" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const cartCount = useCartStore((state) => state.getItemCount());
    const wishlistCount = useWishlistStore((state) => state.items.length);

    // Prevent hydration mismatch by only showing counts after client mount
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <>
            <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-lg border-b border-border">
                <nav className="container-custom">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-muted hover:text-foreground transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        {/* Logo - Centered on mobile */}
                        <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
                            <Image
                                src="/logo.png"
                                alt="Forique"
                                width={200}
                                height={60}
                                className="h-10 md:h-14 w-auto"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() => link.hasDropdown && setIsShopDropdownOpen(true)}
                                    onMouseLeave={() => link.hasDropdown && setIsShopDropdownOpen(false)}
                                >
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-1 text-sm font-medium transition-colors ${pathname === link.href || (link.hasDropdown && pathname.startsWith("/category"))
                                            ? "text-primary"
                                            : "text-muted hover:text-foreground"
                                            }`}
                                    >
                                        {link.name}
                                        {link.hasDropdown && (
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isShopDropdownOpen ? "rotate-180" : ""}`} />
                                        )}
                                    </Link>

                                    {/* Shop Dropdown */}
                                    {link.hasDropdown && (
                                        <AnimatePresence>
                                            {isShopDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="absolute top-full left-0 pt-4"
                                                >
                                                    <div className="w-64 bg-surface rounded-xl shadow-elegant border border-border p-4">
                                                        {categories.slice(0, 8).map((category) => (
                                                            <Link
                                                                key={category.id}
                                                                href={`/category/${category.slug}`}
                                                                className="flex items-center gap-4 px-3 py-3 rounded-lg text-sm text-muted hover:text-foreground hover:bg-surface-muted transition-colors group"
                                                            >
                                                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-muted">
                                                                    <Image
                                                                        src={category.image}
                                                                        alt={category.name}
                                                                        width={40}
                                                                        height={40}
                                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                                    />
                                                                </div>
                                                                <span className="font-medium">{category.name}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-1">
                            <Link
                                href="/search"
                                className="p-3 text-muted hover:text-foreground transition-colors rounded-full hover:bg-surface-muted"
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5" />
                            </Link>

                            <Link
                                href="/account/wishlist"
                                className="hidden sm:flex relative p-3 text-muted hover:text-foreground transition-colors rounded-full hover:bg-surface-muted"
                                aria-label="Wishlist"
                            >
                                <Heart className="w-5 h-5" />
                                {isMounted && wishlistCount > 0 && (
                                    <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>

                            <Link
                                href="/cart"
                                className="relative p-3 text-muted hover:text-foreground transition-colors rounded-full hover:bg-surface-muted"
                                aria-label="Cart"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {isMounted && cartCount > 0 && (
                                    <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <Link
                                href="/account"
                                className="hidden sm:flex p-3 text-muted hover:text-foreground transition-colors rounded-full hover:bg-surface-muted"
                                aria-label="Account"
                            >
                                <User className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </nav>
            </header >

            {/* Mobile Menu */}
            <AnimatePresence>
                {
                    isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-[100] lg:hidden"
                            />
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "tween", duration: 0.25 }}
                                className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-80 bg-surface z-[100] lg:hidden overflow-y-auto"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-10">
                                        <Image
                                            src="/logo.png"
                                            alt="Forique"
                                            width={160}
                                            height={48}
                                            className="h-10 w-auto"
                                        />
                                        <button
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="p-2 text-muted hover:text-foreground"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="space-y-1 mb-8">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block py-3.5 px-4 text-foreground font-medium rounded-lg hover:bg-surface-muted transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="border-t border-border pt-6 space-y-2">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-muted px-4 mb-4">Categories</p>
                                        {categories.slice(0, 6).map((category) => (
                                            <Link
                                                key={category.id}
                                                href={`/category/${category.slug}`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center gap-4 py-3 px-4 text-muted hover:text-foreground rounded-lg hover:bg-surface-muted transition-colors"
                                            >
                                                <div className="w-8 h-8 rounded-md overflow-hidden bg-surface-muted">
                                                    <Image
                                                        src={category.image}
                                                        alt={category.name}
                                                        width={32}
                                                        height={32}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                {category.name}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="border-t border-border pt-6 mt-6 space-y-1">
                                        <Link
                                            href="/account"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 py-3.5 px-4 text-foreground font-medium rounded-lg hover:bg-surface-muted"
                                        >
                                            <User className="w-4 h-4" />
                                            Account
                                        </Link>
                                        <Link
                                            href="/account/wishlist"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 py-3.5 px-4 text-foreground font-medium rounded-lg hover:bg-surface-muted"
                                        >
                                            <Heart className="w-4 h-4" />
                                            Wishlist
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )
                }
            </AnimatePresence >
        </>
    );
}
