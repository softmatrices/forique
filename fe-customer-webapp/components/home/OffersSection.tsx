"use client";

import { motion } from "framer-motion";
import { Gift, Truck, Percent, Tag } from "lucide-react";
import { offers } from "@/lib/mockData";

const offerIcons = [Gift, Percent, Tag];

export default function OffersSection() {
    return (
        <section className="section bg-primary text-white overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />

            <div className="container-custom relative z-10">
                <div className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-medium text-accent uppercase tracking-widest"
                    >
                        Limited Time
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-serif mt-2"
                    >
                        Special Offers
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {offers.map((offer, index) => {
                        const Icon = offerIcons[index % offerIcons.length];
                        return (
                            <motion.div
                                key={offer.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-colors"
                            >
                                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4">
                                    <Icon className="w-7 h-7 text-foreground" />
                                </div>

                                <h3 className="text-xl font-serif font-semibold mb-2">
                                    {offer.title}
                                </h3>
                                <p className="text-white/70 text-sm mb-4">
                                    {offer.description}
                                </p>

                                {offer.code && (
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg">
                                        <span className="text-xs text-white/60">Use Code:</span>
                                        <span className="font-mono font-bold text-accent">{offer.code}</span>
                                    </div>
                                )}

                                {offer.validUntil && (
                                    <p className="text-xs text-white/50 mt-3">
                                        Valid until {new Date(offer.validUntil).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </p>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Free shipping banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 flex items-center justify-center gap-4 p-4 bg-white/10 rounded-xl"
                >
                    <Truck className="w-6 h-6 text-accent" />
                    <p className="text-sm md:text-base">
                        <span className="font-semibold">Free Express Shipping</span> on all orders above ₹999
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
