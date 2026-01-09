"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
    const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-background py-12">
                <div className="container-custom max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-6 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </Link>
                        <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-3">Contact Us</h1>
                        <p className="text-muted max-w-xl">Have a question or feedback? We'd love to hear from you.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-6"
                        >
                            <div className="card p-6">
                                <Mail className="w-5 h-5 text-primary mb-3" />
                                <h3 className="font-medium mb-1">Email</h3>
                                <p className="text-sm text-muted">support@forique.in</p>
                            </div>
                            <div className="card p-6">
                                <Phone className="w-5 h-5 text-primary mb-3" />
                                <h3 className="font-medium mb-1">Phone</h3>
                                <p className="text-sm text-muted">+91 98765 43210</p>
                            </div>
                            <div className="card p-6">
                                <Clock className="w-5 h-5 text-primary mb-3" />
                                <h3 className="font-medium mb-1">Hours</h3>
                                <p className="text-sm text-muted">Mon - Sat, 10am - 7pm IST</p>
                            </div>
                            <div className="card p-6">
                                <MapPin className="w-5 h-5 text-primary mb-3" />
                                <h3 className="font-medium mb-1">Address</h3>
                                <p className="text-sm text-muted">123 Jewelry Lane<br />Mumbai, Maharashtra 400001</p>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="md:col-span-2"
                        >
                            <div className="card p-8">
                                {isSubmitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                                            <Send className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h2 className="text-xl font-serif mb-2">Message Sent!</h2>
                                        <p className="text-muted mb-6">We'll get back to you within 24 hours.</p>
                                        <button onClick={() => setIsSubmitted(false)} className="btn-secondary">
                                            Send Another
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                                                <input
                                                    type="text"
                                                    value={formState.name}
                                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                    className="input"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                                                <input
                                                    type="email"
                                                    value={formState.email}
                                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                    className="input"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                                            <input
                                                type="text"
                                                value={formState.subject}
                                                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                                className="input"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                                            <textarea
                                                value={formState.message}
                                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                                className="input min-h-[150px] resize-none"
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn-primary w-full md:w-auto">
                                            Send Message
                                            <Send className="w-4 h-4 ml-2" />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
