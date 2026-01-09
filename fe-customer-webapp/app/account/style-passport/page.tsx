"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Palette, Camera, Check, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockUser } from "@/lib/mockData";

const skinTones = ["Fair", "Light", "Medium", "Olive", "Tan", "Dark"];
const metals = ["Gold", "Rose Gold", "Silver", "White Gold", "Platinum"];
const styles = ["Classic", "Bohemian", "Minimalist", "Statement", "Bridal", "Everyday"];

export default function StylePassportPage() {
    const [passport, setPassport] = useState(mockUser.stylePassport);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-12">
                <div className="container-custom max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link href="/account" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Account
                        </Link>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <Palette className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-serif text-foreground">Style Passport</h1>
                                <p className="text-sm text-muted">Personalized recommendations based on your preferences</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-8">
                        {/* AI Analysis CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card p-6 bg-gradient-to-br from-primary/5 to-accent/10"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                    <Camera className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium mb-1">AI Skin Tone Analysis</h3>
                                    <p className="text-sm text-muted mb-3">Get personalized metal and gemstone recommendations</p>
                                    <Link href="/tools/skin-tone-analyzer" className="btn-primary text-sm py-2">
                                        Analyze Now
                                        <Sparkles className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* Skin Tone */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="card p-6"
                        >
                            <h2 className="text-sm font-semibold mb-4">Skin Tone</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {skinTones.map((tone) => (
                                    <button
                                        key={tone}
                                        onClick={() => setPassport({ ...passport, skinTone: tone })}
                                        className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${passport.skinTone === tone
                                                ? "bg-primary text-white"
                                                : "bg-surface-muted text-muted hover:text-foreground"
                                            }`}
                                    >
                                        {tone}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Preferred Metal */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="card p-6"
                        >
                            <h2 className="text-sm font-semibold mb-4">Preferred Metal</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {metals.map((metal) => (
                                    <button
                                        key={metal}
                                        onClick={() => setPassport({ ...passport, preferredMetal: metal })}
                                        className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${passport.preferredMetal === metal
                                                ? "bg-primary text-white"
                                                : "bg-surface-muted text-muted hover:text-foreground"
                                            }`}
                                    >
                                        {metal}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Preferred Styles */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="card p-6"
                        >
                            <h2 className="text-sm font-semibold mb-4">Preferred Styles (select multiple)</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {styles.map((style) => {
                                    const isSelected = passport.preferredStyle.includes(style);
                                    return (
                                        <button
                                            key={style}
                                            onClick={() => {
                                                const updated = isSelected
                                                    ? passport.preferredStyle.filter((s) => s !== style)
                                                    : [...passport.preferredStyle, style];
                                                setPassport({ ...passport, preferredStyle: updated });
                                            }}
                                            className={`py-3 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${isSelected
                                                    ? "bg-primary text-white"
                                                    : "bg-surface-muted text-muted hover:text-foreground"
                                                }`}
                                        >
                                            {isSelected && <Check className="w-3.5 h-3.5" />}
                                            {style}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Sizes */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="card p-6"
                        >
                            <h2 className="text-sm font-semibold mb-4">My Sizes</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-muted block mb-2">Wrist Size</label>
                                    <input
                                        type="text"
                                        value={passport.wristSize}
                                        onChange={(e) => setPassport({ ...passport, wristSize: e.target.value })}
                                        className="input"
                                        placeholder="e.g., 2.4"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-muted block mb-2">Ring Size</label>
                                    <input
                                        type="text"
                                        value={passport.ringSize}
                                        onChange={(e) => setPassport({ ...passport, ringSize: e.target.value })}
                                        className="input"
                                        placeholder="e.g., 7"
                                    />
                                </div>
                            </div>
                            <Link href="/tools/size-guide" className="text-sm text-primary hover:underline mt-3 inline-block">
                                Not sure? Use our Size Guide
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <button className="btn-primary w-full">
                                Save Preferences
                            </button>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
