"use client"
import Button from '@/components/ui/button'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/cn'
import { useAuthStore } from '@/store/auth'
import { motion } from 'framer-motion'
import { Check, Star, X } from 'lucide-react'

const plans = [
    {
        name: "Basic",
        price: "$0",
        period: "forever",
        description: "For casual writers.",
        buttonText: "Start Free",
        highlight: false,
        features: [
            { text: "2 entries per day", included: true },
            { text: "Generate 1 Month Recap", included: true },
            { text: "2 Months History Access", included: true },
            { text: "Photos & Cloud Sync", included: false },
            { text: "PDF & JSON Exports", included: false },
            { text: "Generate Year Recap", included: false },
            { text: "AI Insights & Badge", included: false },
        ]
    },
    {
        name: "Pro",
        price: "$9",
        period: "per month",
        description: "For daily journaling.",
        buttonText: "Subscribe",
        highlight: true,
        badge: "Most Popular",
        features: [
            { text: "Unlimited entries", included: true },
            { text: "Generate 2 Month Recaps", included: true },
            { text: "2 Prev. Months Access", included: true },
            { text: "Photos & Cloud Sync", included: true },
            { text: "PDF & JSON Exports", included: true },
            { text: "Generate 2 Year Recaps", included: true },
            { text: "AI Insights & Badge", included: false },
        ]
    },
    {
        name: "Lifetime",
        price: "$199",
        period: "one-time",
        description: "Own your history forever.",
        buttonText: "Get Lifetime",
        highlight: false,
        features: [
            { text: "Unlimited entries", included: true },
            { text: "Generate 10 Month Recaps", included: true },
            { text: "Unlimited History Access", included: true },
            { text: "Photos & Cloud Sync", included: true },
            { text: "PDF & JSON Exports", included: true },
            { text: "Generate 10 Year Recaps", included: true },
            { text: "AI Insights & Badge", included: true },
        ]
    }
]

const PriceSection = () => {
    const { status } = useAuthStore();
    const isAuthenticated = status === 'authenticated';

    return (
        <section id="pricing" className="min-h-[800px] flex items-center relative py-20 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-12 left-1/2 translate-y-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[40vh] bg-amber-100/40 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-5xl mx-auto px-6 w-full">

                <div className="text-center mb-12 space-y-3">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Simple, transparent pricing.
                    </h2>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                        Start for free, upgrade when you need more.
                    </p>
                </div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-6 items-center"
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.name}
                            variants={fadeInUp}
                            className={cn(
                                "relative flex flex-col p-6 rounded-3xl origin-bottom transition-all duration-300",
                                plan.highlight
                                    ? "bg-black dark:bg-white scale-105 z-10 py-10"
                                    : "bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800"
                            )}
                        >
                            {/* Badge */}
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <Star size={12} fill="#fafafa" />
                                    {plan.badge}
                                </div>
                            )}

                            {/* Header */}
                            <div className="mb-6 text-center">
                                <h3 className={cn("font-medium text-lg mb-1 text-zinc-500 dark:text-zinc-400")}>
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline justify-center gap-0.5">
                                    <span className={`text-4xl font-bold tracking-tight ${plan.highlight ? "text-white dark:text-black" : "text-black dark:text-white"}`}>{plan.price}</span>
                                    <span className={cn("text-sm text-zinc-500 dark:text-zinc-400")}>
                                        /{plan.period}
                                    </span>
                                </div>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-3 mb-8 flex-1">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm">
                                        <div className={cn(
                                            "mt-0.5 p-0.5 rounded-full shrink-0",
                                            feature.included
                                                ? (plan.highlight ? "bg-zinc-800 text-amber-400" : "bg-zinc-100 text-zinc-900")
                                                : "bg-transparent text-zinc-300"
                                        )}>
                                            {feature.included ? <Check size={12} strokeWidth={3} /> : <X size={14} className={plan.highlight ? "text-zinc-600" : "text-zinc-300"} />}
                                        </div>
                                        <span className={cn(
                                            feature.included
                                                ? (plan.highlight ? "text-zinc-300" : "text-zinc-700")
                                                : (plan.highlight ? "text-zinc-600 line-through decoration-zinc-700" : "text-zinc-300 line-through")
                                        )}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* Button */}
                            <div className="mt-auto">
                                <Button
                                    variant='secondary'
                                    className={cn(
                                        "w-full text-sm",
                                        plan.highlight
                                            ? "bg-primary/90 dark:bg-primary/90 dark:hover:bg-primary text-zinc-900 hover:bg-primary border-none"
                                            : ""
                                    )}
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