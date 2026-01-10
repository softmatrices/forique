import { Building2, User, Landmark, Shield, Bell, Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
                <p className="text-sm text-muted mt-1">Manage your account and preferences</p>
            </div>

            {/* Business Info */}
            <div className="bg-surface rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">Business Information</h2>
                        <p className="text-sm text-muted">Your registered business details</p>
                    </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Business Name</label>
                        <input
                            type="text"
                            defaultValue="Jaipur Silvers"
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Business Type</label>
                        <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm">
                            <option>Manufacturer</option>
                            <option>Retailer</option>
                            <option>Wholesaler</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">GSTIN</label>
                        <input
                            type="text"
                            defaultValue="08AABCU9603R1ZM"
                            disabled
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-muted cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">PAN</label>
                        <input
                            type="text"
                            defaultValue="AABCU9603R"
                            disabled
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-muted cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>

            {/* Contact Person */}
            <div className="bg-surface rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-lg bg-info/10 text-info">
                        <User className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">Contact Person</h2>
                        <p className="text-sm text-muted">Primary contact for your account</p>
                    </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                        <input
                            type="text"
                            defaultValue="Rajesh Kumar"
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                        <input
                            type="email"
                            defaultValue="rajesh@jaipursilvers.com"
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                        <input
                            type="tel"
                            defaultValue="+91 98765 43210"
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Bank Details */}
            <div className="bg-surface rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-lg bg-success/10 text-success">
                        <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">Bank Account</h2>
                        <p className="text-sm text-muted">Account details for settlements</p>
                    </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Account Holder</label>
                        <input
                            type="text"
                            defaultValue="Jaipur Silvers Pvt Ltd"
                            disabled
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-muted cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Account Number</label>
                        <input
                            type="text"
                            defaultValue="••••••••6789"
                            disabled
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-muted cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">IFSC Code</label>
                        <input
                            type="text"
                            defaultValue="SBIN0001234"
                            disabled
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-muted cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Bank Name</label>
                        <input
                            type="text"
                            defaultValue="State Bank of India"
                            disabled
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-muted cursor-not-allowed"
                        />
                    </div>
                </div>
                <p className="text-xs text-muted mt-4">
                    To update bank details, please contact support.
                </p>
            </div>

            {/* KYC Status */}
            <div className="bg-surface rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-lg bg-success/10 text-success">
                        <Shield className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">KYC Status</h2>
                        <p className="text-sm text-muted">Your verification status</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-success/5 border border-success/20 rounded-xl">
                    <div className="w-3 h-3 bg-success rounded-full" />
                    <p className="text-sm font-medium text-foreground">Verified</p>
                    <span className="text-xs text-muted">• Verified on Dec 15, 2025</span>
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-surface rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-lg bg-warning/10 text-warning">
                        <Bell className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
                        <p className="text-sm text-muted">Manage your notification preferences</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {[
                        { label: "New order alerts", enabled: true },
                        { label: "Low stock warnings", enabled: true },
                        { label: "Settlement notifications", enabled: true },
                        { label: "Marketing updates", enabled: false },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <span className="text-sm text-foreground">{item.label}</span>
                            <button
                                className={`w-11 h-6 rounded-full transition-colors relative ${item.enabled ? "bg-primary" : "bg-border"
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${item.enabled ? "left-6" : "left-1"
                                        }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-light transition-colors">
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </div>
        </div>
    );
}
