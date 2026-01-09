"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "@/lib/mockData";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function CategoryGrid() {
    return (
        <section className="section bg-white">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-semibold text-primary uppercase tracking-widest"
                    >
                        Browse by Category
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-serif text-foreground mt-3"
                    >
                        Find Your Perfect Piece
                    </motion.h2>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
                >
                    {categories.slice(0, 8).map((category, index) => (
                        <motion.div key={category.id} variants={item}>
                            <Link
                                href={`/category/${category.slug}`}
                                className="group block relative overflow-hidden rounded-2xl aspect-square"
                            >
                                {/* Background Image */}
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center z-10">
                                    <h3 className="text-lg md:text-xl font-serif font-medium text-white mb-1 group-hover:translate-y-0 translate-y-0 transition-transform">
                                        {category.name}
                                    </h3>
                                    <p className="text-xs text-white/70">
                                        {category.count} items
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="text-center mt-12">
                    <Link href="/category/all" className="btn-secondary">
                        View All Categories
                    </Link>
                </div>
            </div>
        </section>
    );
}
