"use client";

import { useState } from "react";
import { Cog, Percent, Truck, Bell, Shield, Globe, CreditCard, Users, FileText, ChevronRight, Save } from "lucide-react";

const configSections = [
    {
        title: "Commission Settings",
        icon: Percent,
        settings: [
            { key: "default_commission", label: "Default Commission Rate", value: "15", type: "percent", desc: "Applied to all new sellers" },
            { key: "premium_commission", label: "Premium Seller Rate", value: "12", type: "percent", desc: "For sellers with 4.5+ rating" },
            { key: "new_seller_rate", label: "New Seller Rate", value: "10", type: "percent", desc: "First 90 days promotional rate" },
        ]
    },
    {
        title: "Order Settings",
        icon: Truck,
        settings: [
            { key: "max_rto_rate", label: "Max RTO Rate Allowed", value: "20", type: "percent", desc: "Auto-suspend if exceeded" },
            { key: "default_return_window", label: "Default Return Window", value: "7", type: "days", desc: "Days for customer returns" },
            { key: "processing_time", label: "Max Processing Time", value: "48", type: "hours", desc: "Before order is flagged" },
        ]
    },
    {
        title: "Seller Requirements",
        icon: Users,
        settings: [
            { key: "min_products", label: "Minimum Products", value: "10", type: "number", desc: "Required to go live" },
            { key: "min_rating", label: "Minimum Rating", value: "4.0", type: "rating", desc: "To maintain active status" },
            { key: "kyc_expiry_days", label: "KYC Re-verification", value: "365", type: "days", desc: "Days before re-verification" },
        ]
    },
    {
        title: "Payment Settings",
        icon: CreditCard,
        settings: [
            { key: "payout_cycle", label: "Payout Cycle", value: "7", type: "days", desc: "Days after delivery" },
            { key: "min_payout", label: "Minimum Payout", value: "500", type: "currency", desc: "Minimum withdrawal amount" },
            { key: "hold_period", label: "Hold Period (New Sellers)", value: "14", type: "days", desc: "Additional hold for new sellers" },
        ]
    },
    {
        title: "Notifications",
        icon: Bell,
        settings: [
            { key: "email_alerts", label: "Email Alerts", value: true, type: "toggle", desc: "Admin email notifications" },
            { key: "slack_integration", label: "Slack Integration", value: false, type: "toggle", desc: "Send alerts to Slack" },
            { key: "daily_digest", label: "Daily Digest", value: true, type: "toggle", desc: "Summary email at 9 AM" },
        ]
    },
    {
        title: "Security",
        icon: Shield,
        settings: [
            { key: "two_factor", label: "Two-Factor Auth Required", value: true, type: "toggle", desc: "For all admin accounts" },
            { key: "session_timeout", label: "Session Timeout", value: "60", type: "minutes", desc: "Auto logout after inactivity" },
            { key: "ip_whitelist", label: "IP Whitelist", value: false, type: "toggle", desc: "Restrict admin access by IP" },
        ]
    },
];

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<Record<string, string | boolean>>(
        configSections.flatMap(s => s.settings).reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {})
    );

    return (
        <div className="max-w-4xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
                    <p className="text-sm text-muted mt-1">Platform configuration and preferences</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors">
                    <Save className="w-4 h-4" strokeWidth={1.5} />
                    Save Changes
                </button>
            </div>

            <div className="space-y-6">
                {configSections.map((section, i) => (
                    <div key={i} className="bg-white rounded-xl border border-border overflow-hidden">
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface-hover">
                            <section.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                            <h2 className="font-semibold text-foreground">{section.title}</h2>
                        </div>
                        <div className="divide-y divide-border">
                            {section.settings.map((setting, j) => (
                                <div key={j} className="flex items-center justify-between px-5 py-4">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">{setting.label}</p>
                                        <p className="text-xs text-muted mt-0.5">{setting.desc}</p>
                                    </div>
                                    <div className="ml-4">
                                        {setting.type === "toggle" ? (
                                            <button
                                                onClick={() => setSettings(s => ({ ...s, [setting.key]: !s[setting.key] }))}
                                                className={`w-12 h-6 rounded-full transition-colors ${settings[setting.key] ? "bg-primary" : "bg-border"
                                                    }`}
                                            >
                                                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${settings[setting.key] ? "translate-x-6" : "translate-x-0.5"
                                                    }`} />
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={settings[setting.key] as string}
                                                    onChange={(e) => setSettings(s => ({ ...s, [setting.key]: e.target.value }))}
                                                    className="w-20 px-3 py-2 bg-surface-hover border border-border rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-primary/10"
                                                />
                                                <span className="text-xs text-muted w-12">
                                                    {setting.type === "percent" && "%"}
                                                    {setting.type === "days" && "days"}
                                                    {setting.type === "hours" && "hrs"}
                                                    {setting.type === "minutes" && "min"}
                                                    {setting.type === "currency" && "₹"}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
