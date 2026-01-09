"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export default function LoginPage() {
    const router = useRouter();
    const { login, loginWithOTP, isLoading } = useAuthStore();

    const [loginMethod, setLoginMethod] = useState<"email" | "phone">("phone");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState("");

    const handleSendOTP = () => {
        if (phone.length >= 10) {
            setOtpSent(true);
        }
    };

    const handleLogin = async () => {
        setError("");
        let success = false;

        if (loginMethod === "email") {
            success = await login(email, password);
        } else {
            success = await loginWithOTP(phone, otp);
        }

        if (success) {
            router.push("/account");
        } else {
            setError(loginMethod === "email" ? "Invalid email or password" : "Invalid OTP");
        }
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
                    <p className="text-xl text-white/80 text-center max-w-md leading-relaxed">
                        Discover exquisite jewelry pieces crafted with elegance and love.
                    </p>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo */}
                    <Link href="/" className="lg:hidden flex justify-center mb-8">
                        <Image
                            src="/logo.png"
                            alt="Forique"
                            width={160}
                            height={48}
                            className="h-12 w-auto"
                        />
                    </Link>

                    <h2 className="text-2xl font-serif text-foreground mb-2">Welcome Back</h2>
                    <p className="text-muted mb-8">Sign in to continue shopping</p>

                    {/* Login Method Toggle */}
                    <div className="flex gap-2 mb-6 p-1 bg-surface-muted rounded-xl">
                        <button
                            onClick={() => setLoginMethod("phone")}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === "phone"
                                ? "bg-white shadow-soft text-primary"
                                : "text-muted hover:text-foreground"
                                }`}
                        >
                            <Phone className="w-4 h-4 inline mr-2" />
                            Phone OTP
                        </button>
                        <button
                            onClick={() => setLoginMethod("email")}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === "email"
                                ? "bg-white shadow-soft text-primary"
                                : "text-muted hover:text-foreground"
                                }`}
                        >
                            <Mail className="w-4 h-4 inline mr-2" />
                            Email
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded-lg">{error}</p>
                    )}

                    {loginMethod === "phone" ? (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Phone Number
                                </label>
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

                            {otpSent && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <label className="text-sm font-medium text-foreground mb-2 block">
                                        OTP
                                    </label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                        placeholder="Enter 6-digit OTP"
                                        className="input text-center tracking-widest text-lg"
                                        maxLength={6}
                                    />
                                    <p className="text-xs text-muted mt-2">
                                        Demo: Use OTP <span className="font-mono font-bold">123456</span>
                                    </p>
                                </motion.div>
                            )}

                            {!otpSent ? (
                                <button
                                    onClick={handleSendOTP}
                                    disabled={phone.length < 10}
                                    className="btn-primary w-full"
                                >
                                    Send OTP
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    disabled={otp.length < 6 || isLoading}
                                    className="btn-primary w-full"
                                >
                                    {isLoading ? "Verifying..." : "Verify & Sign In"}
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="input"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
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
                            </div>

                            <div className="flex justify-end">
                                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                onClick={handleLogin}
                                disabled={!email || !password || isLoading}
                                className="btn-primary w-full"
                            >
                                {isLoading ? "Signing in..." : "Sign In"}
                            </button>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-muted">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-primary font-medium hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-border">
                        <p className="text-xs text-center text-muted">
                            By signing in, you agree to our{" "}
                            <Link href="/terms" className="text-primary hover:underline">Terms</Link> and{" "}
                            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
