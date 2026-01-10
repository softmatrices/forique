"use client";

import Link from "next/link";
import { ArrowLeft, Check, X, Building2, FileText, CreditCard, Phone, Mail, MapPin, Calendar, Star } from "lucide-react";
import { useState } from "react";

// Mock data - in real app, fetch by ID
const applicationData = {
    id: "APP-001",
    businessName: "Royal Jewels Pvt Ltd",
    businessType: "Manufacturer",
    gstin: "22AABCU9603R1ZM",
    pan: "AABCU9603R",
    email: "contact@royaljewels.com",
    phone: "+91 98765 43210",
    address: "123, Jewellery Lane, Jaipur, Rajasthan - 302001",
    website: "www.royaljewels.com",
    yearEstablished: 2015,
    employees: "50-100",
    monthlyRevenue: "₹25-50 Lakhs",
    categories: ["Earrings", "Necklaces", "Bangles"],
    submittedAt: "Jan 8, 2026",
    documents: [
        { name: "GST Certificate", status: "verified" },
        { name: "PAN Card", status: "verified" },
        { name: "Business Registration", status: "pending" },
        { name: "Bank Statement", status: "verified" },
    ],
};

export default function ApplicationReviewPage() {
    const [notes, setNotes] = useState("");

    return (
        <div className="max-w-4xl space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/applications" className="p-2 hover:bg-surface-hover rounded-xl transition-colors">
                        <ArrowLeft className="w-5 h-5 text-muted" strokeWidth={1.5} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-semibold text-foreground">{applicationData.businessName}</h1>
                            <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs font-medium rounded-lg">Pending Review</span>
                        </div>
                        <p className="text-sm text-muted mt-1">Application {applicationData.id} • Submitted {applicationData.submittedAt}</p>
                    </div>
                </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Building2, label: "Business Type", value: applicationData.businessType },
                    { icon: Calendar, label: "Established", value: applicationData.yearEstablished.toString() },
                    { icon: Star, label: "Employees", value: applicationData.employees },
                    { icon: CreditCard, label: "Monthly Revenue", value: applicationData.monthlyRevenue },
                ].map((item, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-border">
                        <div className="flex items-center gap-2 text-muted mb-1">
                            <item.icon className="w-4 h-4" strokeWidth={1.5} />
                            <span className="text-xs">{item.label}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Contact Information */}
                    <div className="bg-white rounded-xl border border-border p-5">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Contact Information</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="w-4 h-4 text-muted" strokeWidth={1.5} />
                                <span className="text-foreground">{applicationData.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="w-4 h-4 text-muted" strokeWidth={1.5} />
                                <span className="text-foreground">{applicationData.phone}</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm">
                                <MapPin className="w-4 h-4 text-muted mt-0.5" strokeWidth={1.5} />
                                <span className="text-foreground">{applicationData.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tax Details */}
                    <div className="bg-white rounded-xl border border-border p-5">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Tax & Legal Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-muted">GSTIN</p>
                                <p className="text-sm font-mono text-foreground mt-1">{applicationData.gstin}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted">PAN</p>
                                <p className="text-sm font-mono text-foreground mt-1">{applicationData.pan}</p>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="bg-white rounded-xl border border-border p-5">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Product Categories</h3>
                        <div className="flex flex-wrap gap-2">
                            {applicationData.categories.map((cat, i) => (
                                <span key={i} className="px-3 py-1.5 bg-surface-hover text-sm text-foreground rounded-lg">{cat}</span>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="bg-white rounded-xl border border-border p-5">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Review Notes</h3>
                        <textarea
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add internal notes about this application..."
                            className="w-full px-4 py-3 bg-surface-hover border border-border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/10"
                        />
                    </div>
                </div>

                {/* Documents & Actions */}
                <div className="space-y-6">
                    {/* Documents */}
                    <div className="bg-white rounded-xl border border-border p-5">
                        <h3 className="text-sm font-semibold text-foreground mb-4">Documents</h3>
                        <div className="space-y-3">
                            {applicationData.documents.map((doc, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-muted" strokeWidth={1.5} />
                                        <span className="text-sm text-foreground">{doc.name}</span>
                                    </div>
                                    <span className={`text-xs font-medium px-2 py-1 rounded ${doc.status === "verified"
                                            ? "bg-emerald-50 text-emerald-600"
                                            : "bg-amber-50 text-amber-600"
                                        }`}>
                                        {doc.status === "verified" ? "Verified" : "Pending"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white rounded-xl border border-border p-5 space-y-3">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors">
                            <Check className="w-4 h-4" strokeWidth={2} />
                            Approve Application
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors">
                            <X className="w-4 h-4" strokeWidth={2} />
                            Reject Application
                        </button>
                        <button className="w-full px-4 py-3 border border-border text-muted rounded-xl font-medium hover:bg-surface-hover transition-colors">
                            Request More Info
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
