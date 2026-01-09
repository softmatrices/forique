"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Star, ShieldCheck } from "lucide-react";
import { brands } from "@/lib/mockData";

export default function BrandsSection() {
    return (
        <section className="section bg-white">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium text-primary uppercase tracking-widest"
                    >
                        Trusted Partners
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-serif text-foreground mt-2"
                    >
                        Featured Brands
                    </motion.h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {brands.map((brand, index) => (
                        <motion.div
                            key={brand.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                href={`/category/all?brand=${brand.id}`}
                                className="group block p-6 bg-surface-muted rounded-2xl hover:bg-primary hover:shadow-elegant transition-all duration-300 text-center"
                            >
                                {/* Brand Logo */}
                                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-soft group-hover:shadow-none transition-shadow overflow-hidden">
                                    <Image
                                        src={brand.logo}
                                        alt={brand.name}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 object-contain"
                                    />
                                </div>

                                <h3 className="font-serif font-semibold text-foreground group-hover:text-white transition-colors">
                                    {brand.name}
                                </h3>
                                <p className="text-xs text-muted group-hover:text-white/70 mt-1 transition-colors">
                                    {brand.tagline}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Trust indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 grid md:grid-cols-3 gap-6"
                >
                    <div className="flex items-center gap-4 p-6 bg-surface-muted rounded-2xl">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Award className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Verified Brands</h4>
                            <p className="text-sm text-muted">All brands are verified for quality</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-6 bg-surface-muted rounded-2xl">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Star className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">4.8+ Average Rating</h4>
                            <p className="text-sm text-muted">Based on 10,000+ reviews</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-6 bg-surface-muted rounded-2xl">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground">Quality Assured</h4>
                            <p className="text-sm text-muted">100% genuine products</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
