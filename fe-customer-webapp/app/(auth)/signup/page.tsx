"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export default function SignupPage() {
    const router = useRouter();
    const { signup, isLoading } = useAuthStore();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async () => {
        setError("");
        if (!acceptTerms) {
            setError("Please accept the terms and conditions");
            return;
        }

        const success = await signup({ name, email, phone, password });
        if (success) {
            router.push("/account");
        } else {
            setError("Something went wrong. Please try again.");
        }
    };

    const passwordStrength = () => {
        if (!password) return 0;
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Left Panel - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full -translate-x-1/4 translate-y-1/4 blur-3xl" />
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-warm/30 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
                    <Link href="/" className="mb-8">
                        <Image
                            src="/logo.png"
                            alt="Forique"
                            width={200}
                            height={60}
                            className="h-16 w-auto brightness-0 invert"
                        />
                    </Link>

                    <div className="space-y-4 max-w-sm">
                        {["Exclusive access to new collections", "Personalized recommendations", "Special member discounts", "Easy order tracking"].map((benefit, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-accent" />
                                </div>
                                <span className="text-white/80">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel - Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <Link href="/" className="lg:hidden flex justify-center mb-8">
                        <Image
                            src="/logo.png"
                            alt="Forique"
                            width={160}
                            height={48}
                            className="h-12 w-auto"
                        />
                    </Link>

                    <h2 className="text-2xl font-serif text-foreground mb-2">Create Account</h2>
                    <p className="text-muted mb-8">Join Forique for exclusive benefits</p>

                    {error && (
                        <p className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg">{error}</p>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="input"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="input"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Phone Number</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">+91</span>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                    placeholder="Enter 10-digit number"
                                    className="input pl-14"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a strong password"
                                    className="input pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {/* Password Strength */}
                            {password && (
                                <div className="mt-2">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded-full ${passwordStrength() >= level
                                                    ? level <= 1
                                                        ? "bg-red-500"
                                                        : level <= 2
                                                            ? "bg-yellow-500"
                                                            : "bg-green-500"
                                                    : "bg-gray-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted mt-1">
                                        {passwordStrength() <= 1 && "Weak"}
                                        {passwordStrength() === 2 && "Fair"}
                                        {passwordStrength() === 3 && "Good"}
                                        {passwordStrength() >= 4 && "Strong"}
                                    </p>
                                </div>
                            )}
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 text-primary rounded"
                            />
                            <span className="text-sm text-muted">
                                I agree to the{" "}
                                <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                                {" "}and{" "}
                                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                            </span>
                        </label>

                        <button
                            onClick={handleSignup}
                            disabled={!name || !email || !phone || !password || isLoading}
                            className="btn-primary w-full"
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-muted">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary font-medium hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
