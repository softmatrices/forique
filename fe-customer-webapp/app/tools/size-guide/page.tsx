"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Ruler, Circle, Info } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const bangleSizes = [
    { size: "2.2", circumference: "5.5 inches", inner: "44mm" },
    { size: "2.4", circumference: "6.0 inches", inner: "48mm" },
    { size: "2.6", circumference: "6.5 inches", inner: "52mm" },
    { size: "2.8", circumference: "7.0 inches", inner: "56mm" },
    { size: "2.10", circumference: "7.5 inches", inner: "60mm" },
];

const ringSizes = [
    { size: "5", circumference: "49.3mm", diameter: "15.7mm" },
    { size: "6", circumference: "51.9mm", diameter: "16.5mm" },
    { size: "7", circumference: "54.4mm", diameter: "17.3mm" },
    { size: "8", circumference: "57.0mm", diameter: "18.1mm" },
    { size: "9", circumference: "59.5mm", diameter: "18.9mm" },
    { size: "10", circumference: "62.1mm", diameter: "19.8mm" },
];

export default function SizeGuidePage() {
    const [activeTab, setActiveTab] = useState<"bangle" | "ring">("bangle");
    const [measuredSize, setMeasuredSize] = useState("");

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-8">
                <div className="container-custom max-w-3xl">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/" className="p-2 hover:bg-surface-muted rounded-lg transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-serif text-foreground">Size Guide</h1>
                            <p className="text-sm text-muted">Find your perfect fit</p>
                        </div>
                    </div>

                    {/* Tab Toggle */}
                    <div className="flex gap-2 mb-8 p-1 bg-surface-muted rounded-xl max-w-xs">
                        <button
                            onClick={() => setActiveTab("bangle")}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "bangle"
                                    ? "bg-white shadow-soft text-primary"
                                    : "text-muted hover:text-foreground"
                                }`}
                        >
                            Bangles
                        </button>
                        <button
                            onClick={() => setActiveTab("ring")}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === "ring"
                                    ? "bg-white shadow-soft text-primary"
                                    : "text-muted hover:text-foreground"
                                }`}
                        >
                            Rings
                        </button>
                    </div>

                    {activeTab === "bangle" ? (
                        <motion.div
                            key="bangle"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {/* Measurement Method */}
                            <div className="card p-6 mb-6">
                                <h2 className="text-lg font-semibold mb-4">How to Measure Your Bangle Size</h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                                <span className="font-semibold text-primary">1</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Use a coin for reference</p>
                                                <p className="text-sm text-muted">Place a ₹10 coin (27mm) on screen</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                                <span className="font-semibold text-primary">2</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Measure your wrist</p>
                                                <p className="text-sm text-muted">At the widest point where bangle will rest</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                                <span className="font-semibold text-primary">3</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Find your size</p>
                                                <p className="text-sm text-muted">Match with the size chart below</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Visual Guide */}
                                    <div className="bg-surface-muted rounded-xl p-6 flex flex-col items-center justify-center">
                                        <Circle className="w-16 h-16 text-primary mb-3" />
                                        <p className="text-sm text-center text-muted">
                                            Place your existing bangle here to compare sizes
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Size Chart */}
                            <div className="card overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-surface-muted">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Size</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Circumference</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Inner Diameter</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bangleSizes.map((size, i) => (
                                            <tr key={size.size} className={i !== bangleSizes.length - 1 ? "border-b border-border" : ""}>
                                                <td className="px-6 py-4 font-medium">{size.size}</td>
                                                <td className="px-6 py-4 text-muted">{size.circumference}</td>
                                                <td className="px-6 py-4 text-muted">{size.inner}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="ring"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {/* Measurement Method */}
                            <div className="card p-6 mb-6">
                                <h2 className="text-lg font-semibold mb-4">How to Measure Your Ring Size</h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                                <span className="font-semibold text-primary">1</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Wrap a paper strip</p>
                                                <p className="text-sm text-muted">Around the base of your finger</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                                <span className="font-semibold text-primary">2</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Mark where it overlaps</p>
                                                <p className="text-sm text-muted">Make sure it's snug but comfortable</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                                <span className="font-semibold text-primary">3</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">Measure the length</p>
                                                <p className="text-sm text-muted">This is your circumference</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Interactive Sizer */}
                                    <div className="bg-surface-muted rounded-xl p-6">
                                        <label className="text-sm font-medium mb-2 block">Enter your measurement (mm)</label>
                                        <input
                                            type="number"
                                            value={measuredSize}
                                            onChange={(e) => setMeasuredSize(e.target.value)}
                                            placeholder="e.g., 54"
                                            className="input"
                                        />
                                        {measuredSize && (
                                            <p className="mt-3 text-sm">
                                                <span className="text-muted">Your size is approximately: </span>
                                                <span className="font-semibold text-primary">
                                                    {ringSizes.find((s) => parseFloat(s.circumference) >= parseFloat(measuredSize))?.size || "10+"}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Size Chart */}
                            <div className="card overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-surface-muted">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">US Size</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Circumference</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold">Diameter</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ringSizes.map((size, i) => (
                                            <tr key={size.size} className={i !== ringSizes.length - 1 ? "border-b border-border" : ""}>
                                                <td className="px-6 py-4 font-medium">{size.size}</td>
                                                <td className="px-6 py-4 text-muted">{size.circumference}</td>
                                                <td className="px-6 py-4 text-muted">{size.diameter}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {/* Tips */}
                    <div className="card p-4 mt-6">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <div className="text-sm text-muted">
                                <p className="font-medium text-foreground mb-1">Pro Tips</p>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Measure at the end of the day when fingers are largest</li>
                                    <li>Avoid measuring when cold or after exercise</li>
                                    <li>If between sizes, go for the larger one</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
