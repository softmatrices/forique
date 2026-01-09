"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Camera,
    Upload,
    Sparkles,
    ArrowLeft,
    RefreshCw,
    Check,
    Info,
    ChevronRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Monk Skin Tone Scale categories
const skinToneResults = [
    { id: 1, name: "Fair", tone: "#f6e0ce", metals: ["Rose Gold", "Silver"], colors: ["Pastel Pink", "Light Blue", "Lavender"] },
    { id: 2, name: "Light", tone: "#e9c6a4", metals: ["Rose Gold", "Silver", "White Gold"], colors: ["Soft Pink", "Mint", "Peach"] },
    { id: 3, name: "Light-Medium", tone: "#d4a574", metals: ["Rose Gold", "Gold"], colors: ["Coral", "Turquoise", "Emerald"] },
    { id: 4, name: "Medium", tone: "#c18e5c", metals: ["Gold", "Rose Gold"], colors: ["Ruby", "Emerald", "Sapphire"] },
    { id: 5, name: "Medium-Dark", tone: "#a56b3b", metals: ["Gold", "Bronze"], colors: ["Deep Green", "Royal Blue", "Burgundy"] },
    { id: 6, name: "Dark", tone: "#7d4a2d", metals: ["Gold", "Copper"], colors: ["Gold Accents", "Deep Purple", "Crimson"] },
];

export default function SkinToneAnalyzerPage() {
    const [step, setStep] = useState<"intro" | "capture" | "analyzing" | "result">("intro");
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [result, setResult] = useState<typeof skinToneResults[0] | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCapturedImage(e.target?.result as string);
                setStep("capture");
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = () => {
        setStep("analyzing");
        // Simulate AI analysis
        setTimeout(() => {
            // Random result for demo
            const randomResult = skinToneResults[Math.floor(Math.random() * skinToneResults.length)];
            setResult(randomResult);
            setStep("result");
        }, 3000);
    };

    const resetAnalysis = () => {
        setCapturedImage(null);
        setResult(null);
        setStep("intro");
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-8">
                <div className="container-custom max-w-2xl">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/" className="p-2 hover:bg-surface-muted rounded-lg transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-serif text-foreground">AI Skin Tone Analyzer</h1>
                            <p className="text-sm text-muted">Find jewelry that complements your skin tone</p>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {/* Intro Step */}
                        {step === "intro" && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center"
                            >
                                <div className="card p-8 mb-6">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Camera className="w-10 h-10 text-primary" />
                                    </div>

                                    <h2 className="text-xl font-serif mb-2">Discover Your Perfect Match</h2>
                                    <p className="text-muted mb-8 max-w-md mx-auto">
                                        Our AI analyzes your skin tone to recommend jewelry metals and gemstone colors that will look stunning on you.
                                    </p>

                                    <div className="space-y-4">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="btn-primary w-full max-w-xs mx-auto"
                                        >
                                            <Upload className="w-5 h-5 mr-2" />
                                            Upload Photo
                                        </button>
                                        <p className="text-xs text-muted">
                                            For best results, use a well-lit photo of your face without makeup
                                        </p>
                                    </div>
                                </div>

                                <div className="card p-4 text-left">
                                    <div className="flex items-start gap-3">
                                        <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <div className="text-sm text-muted">
                                            <p className="font-medium text-foreground mb-1">Privacy First</p>
                                            <p>Your photos are processed locally and never stored on our servers.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Capture Step */}
                        {step === "capture" && (
                            <motion.div
                                key="capture"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <div className="card p-6">
                                    <div className="aspect-square max-w-sm mx-auto mb-6 rounded-2xl overflow-hidden bg-surface-muted">
                                        {capturedImage && (
                                            <img
                                                src={capturedImage}
                                                alt="Captured"
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>

                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={resetAnalysis}
                                            className="btn-secondary"
                                        >
                                            <RefreshCw className="w-5 h-5 mr-2" />
                                            Retake
                                        </button>
                                        <button
                                            onClick={analyzeImage}
                                            className="btn-primary"
                                        >
                                            <Sparkles className="w-5 h-5 mr-2" />
                                            Analyze Skin Tone
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Analyzing Step */}
                        {step === "analyzing" && (
                            <motion.div
                                key="analyzing"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center py-16"
                            >
                                <div className="w-24 h-24 mx-auto mb-6 relative">
                                    <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                                    <div className="absolute inset-4 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Sparkles className="w-8 h-8 text-primary" />
                                    </div>
                                </div>
                                <h2 className="text-xl font-serif mb-2">Analyzing...</h2>
                                <p className="text-muted">Our AI is determining your skin tone</p>
                            </motion.div>
                        )}

                        {/* Result Step */}
                        {step === "result" && result && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <div className="card p-6 mb-6">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                            <Check className="w-5 h-5 text-green-600" />
                                        </div>
                                        <h2 className="text-xl font-serif">Analysis Complete!</h2>
                                    </div>

                                    {/* Skin Tone Result */}
                                    <div className="text-center mb-8">
                                        <div
                                            className="w-24 h-24 mx-auto rounded-full shadow-elegant mb-4"
                                            style={{ backgroundColor: result.tone }}
                                        />
                                        <h3 className="text-2xl font-serif text-foreground mb-1">{result.name} Tone</h3>
                                        <p className="text-muted">Based on the Monk Skin Tone Scale</p>
                                    </div>

                                    {/* Recommendations */}
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-3">Recommended Metals</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {result.metals.map((metal) => (
                                                    <span key={metal} className="badge-primary">{metal}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-foreground mb-3">Flattering Gemstone Colors</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {result.colors.map((color) => (
                                                    <span key={color} className="badge-accent">{color}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Save to Profile */}
                                <div className="card p-4 mb-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Sparkles className="w-5 h-5 text-primary" />
                                            <div>
                                                <p className="font-medium">Save to Style Passport</p>
                                                <p className="text-xs text-muted">Get personalized recommendations</p>
                                            </div>
                                        </div>
                                        <Link href="/account" className="btn-secondary py-2 text-sm">
                                            Save
                                        </Link>
                                    </div>
                                </div>

                                {/* Shop Now */}
                                <Link
                                    href={`/category/all?metal=${result.metals[0].toLowerCase().replace(' ', '-')}`}
                                    className="btn-primary w-full justify-center"
                                >
                                    Shop {result.metals[0]} Jewelry
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Link>

                                <button
                                    onClick={resetAnalysis}
                                    className="w-full text-center text-sm text-muted mt-4 hover:text-primary transition-colors"
                                >
                                    Try Again with Different Photo
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
            <Footer />
        </>
    );
}
