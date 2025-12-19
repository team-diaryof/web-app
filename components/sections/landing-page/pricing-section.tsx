"use client"
import { useState } from 'react'
import Button from '@/components/ui/button'
import { cn } from '@/lib/cn'
import { useAuthStore } from '@/store/auth'
import { Check, X } from 'lucide-react'
import { StaggerSection, StaggerItem } from "@/lib/animations"
import { motion } from "framer-motion"

const plans = [
    {
        name: "Basic",
        price: "$0",
        period: "forever",
        description: "Perfect for getting started.",
        buttonText: "Start Free",
        highlight: false,
        features: [
            { text: "2 entries per day", included: true },
            { text: "Basic Text Formatting", included: true },
            { text: "Local Backup", included: true },
            { text: "1 Month Recap", included: true },
            { text: "Cloud Sync", included: false },
        ]
    },
    {
        name: "Pro",
        price: "$9",
        period: "per month",
        description: "For the daily chronicler.",
        buttonText: "Subscribe",
        highlight: true,
        badge: "Most Popular",
        features: [
            { text: "Unlimited entries", included: true },
            { text: "Rich Text & Markdown", included: true },
            { text: "Encrypted Cloud Sync", included: true },
            { text: "Unlimited Recaps", included: true },
            { text: "Priority Support", included: true },
        ]
    },
    {
        name: "Lifetime",
        price: "$199",
        period: "one-time",
        description: "Pay once, own it forever.",
        buttonText: "Get Lifetime",
        highlight: false,
        features: [
            { text: "Everything in Pro", included: true },
            { text: "Early Access Features", included: true },
            { text: "Lifetime Cloud Storage", included: true },
            { text: "Founder's Badge", included: true },
            { text: "Direct Dev Access", included: true },
        ]
    }
]

const PriceSection = () => {
    const { status } = useAuthStore();
    // Default to index 1 (Pro)
    const [activeIndex, setActiveIndex] = useState(1);

    return (
        <section id="pricing" className="py-24 md:py-32 bg-white dark:bg-black">
            <div className="max-w-[1200px] mx-auto px-6">
                
                <div className="text-center mb-12 md:mb-20 space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">Simple, transparent pricing.</h2>
                    <p className="text-zinc-500 text-lg">Invest in your peace of mind.</p>
                </div>

                {/* --- MOBILE TABS (Visible only on small screens) --- */}
                <div className="flex md:hidden justify-center mb-8">
                    <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full relative">
                        {plans.map((plan, i) => (
                            <button
                                key={plan.name}
                                onClick={() => setActiveIndex(i)}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 z-10",
                                    activeIndex === i 
                                        ? "text-black dark:text-white" 
                                        : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                                )}
                            >
                                {activeIndex === i && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white dark:bg-zinc-800 shadow-sm rounded-full"
                                        initial={false}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{plan.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <StaggerSection className="grid md:grid-cols-3 gap-6 items-stretch">
                    {plans.map((plan, i) => {
                        // Logic: On mobile, only show the active index. On desktop (md), show all.
                        const isHiddenOnMobile = activeIndex !== i;
                        
                        return (
                            <StaggerItem 
                            
                                key={plan.name}
                                className={cn(
                                    "h-full", // Ensure height stretches
                                    isHiddenOnMobile ? "hidden md:block" : "block"
                                )}
                            >
                                <div className={cn(
                                    "relative flex flex-col p-8 rounded-[2rem] border transition-all duration-300 h-full",
                                    plan.highlight
                                        ? "bg-amber-400 border-amber-400 shadow-xl md:scale-105 z-10 text-black" 
                                        : "bg-white dark:bg-black border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white"
                                )}>
                                    {plan.badge && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                                            {plan.badge}
                                        </div>
                                    )}
                                    
                                    <div className={`mb-8 text-center border-b pb-8 ${plan.highlight ? "border-black/10" : "border-zinc-100 dark:border-zinc-800"}`}>
                                        <h3 className="font-medium text-lg mb-2 opacity-80">{plan.name}</h3>
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                                            <span className="text-sm opacity-70">/{plan.period}</span>
                                        </div>
                                        <p className="text-sm opacity-60 mt-2">{plan.description}</p>
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-1">
                                        {plan.features.map((f, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm">
                                                <div className={cn("p-0.5 rounded-full shrink-0", f.included ? (plan.highlight ? "bg-black/10" : "bg-emerald-500/10 text-emerald-500") : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400")}>
                                                    {f.included ? <Check size={14} strokeWidth={3} /> : <X size={14} />}
                                                </div>
                                                <span className={f.included ? "font-medium" : "opacity-50 line-through"}>{f.text}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        variant={plan.highlight ? "primary" : "outline"}
                                        className={cn(
                                            "w-full h-12 font-semibold border-0", 
                                            plan.highlight ? "bg-black text-white hover:bg-black/80" : ""
                                        )}
                                        href={status === "authenticated" ? "/dashboard" : "/register"}
                                    >
                                        {plan.buttonText}
                                    </Button>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </StaggerSection>
            </div>
        </section>
    )
}
export default PriceSection