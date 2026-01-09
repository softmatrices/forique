"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { getBestsellers } from "@/lib/mockData";

export default function BestsellerSection() {
    const bestsellers = getBestsellers().slice(0, 4);

    return (
        <section className="section bg-surface-muted">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-sm font-medium text-primary uppercase tracking-widest"
                        >
                            Customer Favorites
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl font-serif text-foreground mt-2"
                        >
                            Bestselling Pieces
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link href="/category/bestsellers" className="btn-secondary mt-4 md:mt-0">
                            View All
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {bestsellers.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
