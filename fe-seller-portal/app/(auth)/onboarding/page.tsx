"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Building2,
    FileText,
    Landmark,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
} from "lucide-react";

const steps = [
    { id: 1, name: "Business Info", icon: Building2 },
    { id: 2, name: "Documents", icon: FileText },
    { id: 3, name: "Bank Details", icon: Landmark },
    { id: 4, name: "Verification", icon: CheckCircle2 },
];

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-surface border-b border-border">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <img src="/logo.png" alt="Forique" className="h-10" />
                    </Link>
                    <Link
                        href="/login"
                        className="text-sm text-info hover:underline"
                    >
                        Already have an account?
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-10">
                {/* Progress Steps */}
                <div className="mb-10">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center flex-1">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${step.id <= currentStep
                                            ? "bg-primary border-primary text-white"
                                            : "bg-surface border-border text-muted"
                                            }`}
                                    >
                                        <step.icon className="w-5 h-5" />
                                    </div>
                                    <p
                                        className={`text-xs mt-2 font-medium ${step.id <= currentStep ? "text-foreground" : "text-muted"
                                            }`}
                                    >
                                        {step.name}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`flex-1 h-0.5 mx-3 ${step.id < currentStep ? "bg-primary" : "bg-border"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-surface rounded-2xl border border-border p-8">
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold text-foreground">
                                    Business Information
                                </h2>
                                <p className="text-sm text-muted mt-1">
                                    Tell us about your business
                                </p>
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Business Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Jaipur Silvers"
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Business Type
                                    </label>
                                    <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30">
                                        <option>Manufacturer</option>
                                        <option>Retailer</option>
                                        <option>Wholesaler</option>
                                        <option>Artisan</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Business Address
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Full business address"
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold text-foreground">
                                    Document Verification
                                </h2>
                                <p className="text-sm text-muted mt-1">
                                    Upload required documents for KYC
                                </p>
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        GSTIN
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="22AAAAA0000A1Z5"
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        PAN Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="ABCDE1234F"
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        GST Certificate
                                    </label>
                                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/30 transition-colors cursor-pointer">
                                        <FileText className="w-8 h-8 mx-auto text-muted mb-2" />
                                        <p className="text-sm text-muted">
                                            Drop file here or <span className="text-info">browse</span>
                                        </p>
                                        <p className="text-xs text-muted mt-1">PDF, PNG, JPG up to 5MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold text-foreground">
                                    Bank Account Details
                                </h2>
                                <p className="text-sm text-muted mt-1">
                                    Add your bank details for settlements
                                </p>
                            </div>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Account Holder Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="As per bank records"
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Account Number
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="1234567890123"
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        IFSC Code
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="SBIN0001234"
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Bank Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="State Bank of India"
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="space-y-6 text-center py-8">
                            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-8 h-8 text-success" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-foreground">
                                    Application Submitted!
                                </h2>
                                <p className="text-sm text-muted mt-2 max-w-md mx-auto">
                                    Your seller application has been submitted for review. We&apos;ll
                                    verify your documents and notify you within 2-3 business days.
                                </p>
                            </div>
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-light transition-colors"
                            >
                                Go to Login
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    {currentStep < 4 && (
                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${currentStep === 1
                                    ? "text-muted cursor-not-allowed"
                                    : "text-foreground hover:bg-background"
                                    }`}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-light transition-colors"
                            >
                                {currentStep === 3 ? "Submit Application" : "Continue"}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
