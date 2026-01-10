"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    Box,
    Layers,
    Receipt,
    CreditCard,
    Cog,
    ArrowRightFromLine,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutGrid },
    { name: "Products", href: "/products", icon: Box },
    { name: "Inventory", href: "/inventory", icon: Layers },
    { name: "Orders", href: "/orders", icon: Receipt },
    { name: "Payments", href: "/payments", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Cog },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-md border border-border hover:shadow-lg transition-shadow"
            >
                <Menu className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </button>

            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-20 px-4 border-b border-border">
                        <Link href="/" className="flex items-center justify-center">
                            <img src="/logo.png" alt="Forique" className="h-14 object-contain" />
                        </Link>
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="lg:hidden p-1.5 hover:bg-surface-hover rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-muted" strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                        ? "bg-primary text-white shadow-md shadow-primary/25"
                                        : "text-muted hover:bg-surface-hover hover:text-foreground"
                                        }`}
                                >
                                    <item.icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-3 border-t border-border">
                        <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-surface-hover rounded-xl">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-sm font-medium text-white">
                                JS
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">Jaipur Silvers</p>
                                <p className="text-xs text-muted truncate">seller@example.com</p>
                            </div>
                        </div>
                        <Link href="/login" className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-muted hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors">
                            <ArrowRightFromLine className="w-[18px] h-[18px]" strokeWidth={1.5} />
                            Sign out
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
