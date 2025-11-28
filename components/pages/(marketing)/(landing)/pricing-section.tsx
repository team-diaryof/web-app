"use client"
import React from 'react'
import { Check, X } from 'lucide-react'
import Button from '@/components/ui/button'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useAuthStore } from '@/store/auth'
import { cn } from '@/lib/cn'

const plans = [
    {
        name: "Basic",
        price: "$0",
        period: "forever",
        description: "For casual writers.",
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
        description: "For daily journaling.",
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
        highlight: true // This will be the black card
    },
    {
        name: "Lifetime",
        price: "$199",
        period: "one-time",
        description: "Pay once, own forever.",
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
        <section id="pricing" className="py-24">
            <div className="max-w-6xl mx-auto px-6">
                
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-semibold text-zinc-900">
                        Choose your plan
                    </h2>
                    <p className="text-zinc-500">
                        Simple pricing for every stage of your journey.
                    </p>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8" // Removed items-start to allow stretching
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.name}
                            variants={fadeInUp}
                            className={cn(
                                "flex flex-col h-full rounded-2xl p-8 border transition-all duration-300", // Added flex flex-col h-full
                                plan.highlight 
                                    ? "bg-zinc-900 border-zinc-900 text-white ring-4 ring-zinc-200" 
                                    : "bg-white border-zinc-200 text-zinc-900 hover:border-zinc-300"
                            )}
                        >
                            <div className="mb-8 space-y-2">
                                <h3 className={cn("font-medium", plan.highlight ? "text-zinc-300" : "text-zinc-500")}>
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className={cn("text-sm", plan.highlight ? "text-zinc-400" : "text-zinc-500")}>
                                        /{plan.period}
                                    </span>
                                </div>
                                <p className={cn("text-sm pt-2", plan.highlight ? "text-zinc-400" : "text-zinc-500")}>
                                    {plan.description}
                                </p>
                            </div>

                            {/* Added flex-1 to push button to bottom */}
                            <ul className="space-y-4 mb-8 text-sm flex-1"> 
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <Check size={16} className={cn(plan.highlight ? "text-white" : "text-zinc-900")} />
                                        <span className={cn(plan.highlight ? "text-zinc-200" : "text-zinc-600")}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                                {plan.notIncluded.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 opacity-50">
                                        <X size={16} className={cn(plan.highlight ? "text-zinc-500" : "text-zinc-400")} />
                                        <span className={cn(plan.highlight ? "text-zinc-500" : "text-zinc-400")}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto"> {/* Ensures button is always at the bottom */}
                                <Button 
                                    fullWidth 
                                    variant={plan.highlight ? "secondary" : "primary"}
                                    href={isAuthenticated ? "/dashboard" : "/register"}
                                >
                                    {plan.buttonText}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    )
}

export default PriceSection