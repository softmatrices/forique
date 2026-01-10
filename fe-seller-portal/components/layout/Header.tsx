"use client";

import { Bell, Search } from "lucide-react";

export default function Header() {
    return (
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-border">
            <div className="flex items-center justify-between h-full px-6">
                {/* Search */}
                <div className="flex-1 max-w-md">
                    <div className="relative group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" strokeWidth={1.5} />
                        <input
                            type="text"
                            placeholder="Search products, orders..."
                            className="w-full pl-10 pr-4 py-2.5 bg-surface-hover border border-transparent rounded-xl text-sm focus:outline-none focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 ml-4">
                    <button className="relative p-2.5 text-muted hover:text-foreground hover:bg-surface-hover rounded-xl transition-colors">
                        <Bell className="w-5 h-5" strokeWidth={1.5} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full animate-pulse-soft" />
                    </button>
                </div>
            </div>
        </header>
    );
}
