import Link from "next/link";
import { Sparkles, Award, Heart, Users, Shield, Truck, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const values = [
    { icon: Heart, title: "Crafted with Love", desc: "Every piece is handpicked for quality and beauty" },
    { icon: Shield, title: "100% Authentic", desc: "Guaranteed genuine products from verified brands" },
    { icon: Users, title: "Customer First", desc: "Dedicated support for a seamless experience" },
    { icon: Truck, title: "Pan-India Delivery", desc: "Fast and reliable shipping across the country" },
];

const stats = [
    { value: "10,000+", label: "Happy Customers" },
    { value: "500+", label: "Jewelry Pieces" },
    { value: "50+", label: "Partner Brands" },
    { value: "4.8", label: "Average Rating" },
];

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background">
                {/* Hero */}
                <section className="relative py-24 md:py-32 bg-primary text-white overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-warm rounded-full blur-3xl" />
                    </div>
                    <div className="container-custom relative z-10 text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="w-8 h-8 text-accent" />
                            <span className="text-sm font-medium tracking-widest uppercase text-accent">Our Story</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                            Unique for You
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                            Forique was born from a simple belief: every person deserves jewelry that tells their unique story.
                        </p>
                    </div>
                </section>

                {/* Mission */}
                <section className="section">
                    <div className="container-custom">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="text-sm font-medium text-primary uppercase tracking-widest">Our Mission</span>
                                <h2 className="text-3xl md:text-4xl font-serif text-foreground mt-2 mb-6">
                                    Redefining How India Shops for Jewelry
                                </h2>
                                <p className="text-muted leading-relaxed mb-4">
                                    At Forique, we're bridging the gap between traditional craftsmanship and modern convenience.
                                    We've curated a marketplace where heritage meets innovation, bringing you authentic,
                                    high-quality jewelry from trusted artisans and brands across India.
                                </p>
                                <p className="text-muted leading-relaxed">
                                    Our AI-powered tools help you find pieces that not only match your style but also
                                    complement your unique features—because the right jewelry should feel like it was
                                    made just for you.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl aspect-square flex items-center justify-center">
                                <Sparkles className="w-32 h-32 text-primary/30" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-16 bg-surface-muted">
                    <div className="container-custom">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <p className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-muted">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="section">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <span className="text-sm font-medium text-primary uppercase tracking-widest">What We Stand For</span>
                            <h2 className="text-3xl md:text-4xl font-serif text-foreground mt-2">
                                Our Values
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value) => (
                                <div key={value.title} className="card p-6 text-center">
                                    <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <value.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                                    <p className="text-sm text-muted">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 md:py-24 bg-primary text-white">
                    <div className="container-custom text-center">
                        <Award className="w-12 h-12 mx-auto text-accent mb-6" />
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                            Start Your Jewelry Journey
                        </h2>
                        <p className="text-white/80 mb-8 max-w-md mx-auto">
                            Discover pieces that speak to your style and soul.
                        </p>
                        <Link href="/category/all" className="btn-accent text-foreground">
                            Explore Collection
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
