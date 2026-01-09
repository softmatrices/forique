"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";
import { categories } from "@/lib/mockData";

const footerLinks = {
    shop: categories.slice(0, 6),
    help: [
        { name: "FAQ", href: "/faq" },
        { name: "Shipping", href: "/faq" },
        { name: "Returns", href: "/faq" },
        { name: "Size Guide", href: "/tools/size-guide" },
    ],
    company: [
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
    ],
    legal: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
    ],
};

const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
];

export default function Footer() {
    return (
        <footer className="bg-surface border-t border-border mt-auto">
            {/* Newsletter */}
            <div className="border-b border-border">
                <div className="container-custom py-12 md:py-16">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-3">
                            Join the Forique Family
                        </h2>
                        <p className="text-muted mb-6">
                            Be the first to know about new collections, exclusive offers, and style tips.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-5 py-3 rounded-full border border-border bg-surface focus:border-primary focus:outline-none transition-colors text-center sm:text-left"
                            />
                            <button type="submit" className="btn-primary whitespace-nowrap">
                                Subscribe
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Links */}
            <div className="container-custom py-12 md:py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <Image
                                src="/logo.png"
                                alt="Forique"
                                width={180}
                                height={54}
                                className="h-12 w-auto"
                            />
                        </Link>
                        <p className="text-sm text-muted mb-6 max-w-xs">
                            Unique for you. Curated jewelry from trusted artisans across India.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Shop</h3>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((cat) => (
                                <li key={cat.id}>
                                    <Link href={`/category/${cat.slug}`} className="text-sm text-foreground hover:text-primary transition-colors">
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Help</h3>
                        <ul className="space-y-3">
                            {footerLinks.help.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Legal</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm text-foreground hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border">
                <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted text-center md:text-left">
                        © {new Date().getFullYear()} Forique. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-muted">Secure payments</span>
                        <div className="flex gap-2">
                            {["Visa", "MC", "UPI"].map((method) => (
                                <span key={method} className="px-2 py-1 bg-surface-muted rounded text-[10px] font-medium text-muted">
                                    {method}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
