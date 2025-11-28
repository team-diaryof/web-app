"use client"
import React from 'react'
import { Check, X, Sparkles } from 'lucide-react'
import { motion, Variants } from 'framer-motion'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useAuthStore } from '@/store'
import Button from '@/components/ui/button'

// --- Utilities (Inlined for Preview) ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// --- Animation Variants (Inlined) ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}


const plans = [
    {
        name: "Basic",
        price: "$0",
        period: "forever",
        description: "Perfect for casual writers just starting out.",
        features: [
            "30 entries per month",
            "Local storage only",
            "Basic text formatting",
            "PDF Export"
        ],
        notIncluded: [
            "Cloud Sync",
            "Photo attachments",
            "AI Sorting"
        ],
        buttonText: "Start Free",
        highlight: false
    },
    {
        name: "Pro",
        price: "$9",
        period: "per month",
        description: "The complete experience for daily journaling.",
        features: [
            "Unlimited entries",
            "Cloud Sync & Backup",
            "Photo attachments",
            "PDF & JSON Export",
            "Priority Support"
        ],
        notIncluded: [
            "AI Sorting (Beta)"
        ],
        buttonText: "Subscribe",
        highlight: true,
        badge: "Most Popular"
    },
    {
        name: "Lifetime",
        price: "$199",
        period: "one-time",
        description: "Pay once, own it forever. No subscriptions.",
        features: [
            "Everything in Pro",
            "AI Sorting & Insights",
            "Early access to features",
            "Founder badge",
            "Direct dev support"
        ],
        notIncluded: [],
        buttonText: "Get Lifetime",
        highlight: false
    }
]

const PriceSection = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <section id="pricing" className="py-24 pb-32 relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-amber-100/40 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto px-6">
                
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900">
                        Simple, transparent pricing.
                    </h2>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                        Start for free, upgrade when you need more. No hidden fees.
                    </p>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8 items-center" // items-center keeps cards aligned but allows height variance if needed
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.name}
                            variants={fadeInUp}
                            className={cn(
                                "relative flex flex-col h-full p-8 rounded-3xl transition-all duration-300",
                                plan.highlight 
                                    ? "bg-zinc-900 text-white shadow-2xl scale-105 z-10 ring-1 ring-zinc-800" 
                                    : "bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-300 hover:shadow-lg"
                            )}
                        >
                            {/* Popular Badge */}
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-zinc-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                    <Sparkles size={12} fill="currentColor" />
                                    {plan.badge}
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className={cn("font-medium text-lg mb-2", plan.highlight ? "text-zinc-200" : "text-zinc-500")}>
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                                    <span className={cn("text-sm", plan.highlight ? "text-zinc-400" : "text-zinc-500")}>
                                        /{plan.period}
                                    </span>
                                </div>
                                <p className={cn("text-sm mt-4 leading-relaxed", plan.highlight ? "text-zinc-400" : "text-zinc-500")}>
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1"> 
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm">
                                        <div className={cn("mt-0.5 p-0.5 rounded-full shrink-0", plan.highlight ? "bg-zinc-800 text-amber-400" : "bg-zinc-100 text-zinc-900")}>
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span className={cn(plan.highlight ? "text-zinc-300" : "text-zinc-600")}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                                {plan.notIncluded.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm opacity-50">
                                        <div className="mt-0.5 p-0.5 rounded-full shrink-0">
                                            <X size={14} className={cn(plan.highlight ? "text-zinc-600" : "text-zinc-400")} />
                                        </div>
                                        <span className={cn(plan.highlight ? "text-zinc-600" : "text-zinc-400")}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto">
                                <Button 
                                    className={cn(
                                        "w-full rounded-xl py-4 text-sm font-semibold transition-transform active:scale-95",
                                        plan.highlight 
                                            ? "bg-amber-400 text-zinc-900 hover:bg-amber-500 border-none" 
                                            : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border-none shadow-none"
                                    )}
                                    href={isAuthenticated ? "/dashboard" : "/register"}
                                >
                                    {plan.buttonText}
                                </Button>
                                {plan.highlight && (
                                    <p className="text-center text-xs text-zinc-500 mt-3">
                                        7-day money-back guarantee
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    )
}

export default PriceSection