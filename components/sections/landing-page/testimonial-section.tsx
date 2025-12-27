"use client";
import { StaggerItem, StaggerSection } from "@/lib/animations";
import { cn } from "@/lib/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState } from "react";

const testimonials = [
    {
        quote: "Finally, a journaling app that doesn't feel like a social network. It's just me and my thoughts. The simplicity is exactly what I needed.",
        author: "Sarah Smith",
        role: "UX Designer",
        company: "Google",
        initials: "SS",
        date: "Nov 20, 2024",
        rating: 5, // Added rating
        color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
    },
    {
        quote: "The 'Memory Lane' feature made me cry (in a good way) this morning. It surfacing old memories is magical.",
        author: "David K.",
        role: "Founder",
        company: "Stripe",
        initials: "DK",
        date: "Dec 12, 2024",
        rating: 5,
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
        quote: "I moved from Notion to DiaryOf because I needed something that loads instantly offline. I catch myself writing more often simply because there is zero friction.",
        author: "Priya M.",
        role: "Student",
        company: "MIT",
        initials: "PM",
        date: "Jan 05, 2025",
        rating: 4,
        color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
    },
    {
        quote: "Secure, simple, and stunning. The best investment for my mental health this year. I've tried every app out there.",
        author: "Alan Fresco",
        role: "Product Manager",
        company: "Linear",
        initials: "AF",
        date: "Feb 14, 2025",
        rating: 5,
        color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    },
    {
        quote: "It's rare to find software that respects your attention these days. No notifications, just peace.",
        author: "Fletch Skinner",
        role: "Developer",
        company: "Vercel",
        initials: "FS",
        date: "Mar 01, 2025",
        rating: 4,
        color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
    },
    {
        quote: "The biometric lock gives me the peace of mind to write honestly about my daily struggles.",
        author: "Elena R.",
        role: "Therapist",
        company: "Private Practice",
        initials: "ER",
        date: "Mar 10, 2025",
        rating: 5,
        color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
    },
];

const TestimonialCard = ({ t, className }: { t: typeof testimonials[0], className?: string }) => (
    <div className={cn(
        "group relative p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-4xl border border-zinc-100 dark:border-zinc-800 transition-all duration-500 h-full flex flex-col justify-between",
        className
    )}>
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm", t.color)}>
                        {t.initials}
                    </div>
                    <div>
                        <p className="text-sm font-bold leading-none">{t.author}</p>
                        <p className="text-xs text-zinc-500 mt-1">{t.role}</p>
                    </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-[10px] font-semibold text-zinc-400">
                    {t.company}
                </div>
            </div>

            {/* Quote */}
            <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 w-4 h-4 text-zinc-300 dark:text-zinc-700 rotate-180 opacity-50" />
                <p className="text-base font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed relative z-10 pl-2">
                    &apos;{t.quote}&apos;
                </p>
            </div>
        </div>

        {/* Card Footer */}
        <div className="pt-6 border-t border-zinc-200/50 dark:border-zinc-800 flex justify-between items-center opacity-60">
            <div className="flex items-center gap-0.5">
                {/* 3. Dynamic Star Logic */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                        key={i}
                        className={cn(
                            "w-3.5 h-3.5",
                            i < t.rating
                                ? "text-amber-400 fill-current"
                                : "text-zinc-300 dark:text-zinc-700 fill-transparent"
                        )}
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
            <span className="text-xs text-zinc-400 font-mono">{t.date}</span>
        </div>
    </div>
);

const TestimonialSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6">
                <StaggerSection staggerDuration={0.2}>
                    <StaggerItem className="mb-12 md:mb-16">
                        <h2 className="text-5xl md:text-6xl text-zinc-900 dark:text-white tracking-tight">
                            What are they <br /> saying about us?
                        </h2>
                    </StaggerItem>

                    <div className="block md:hidden relative">
                        <div className="relative h-[380px] w-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className="w-full h-full"
                                >
                                    <TestimonialCard t={testimonials[activeIndex]} />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center justify-end gap-2 mt-8">

                            <div className="flex mr-10 gap-2">
                                {testimonials.map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-4 rounded-full transition-all duration-300",
                                            activeIndex === i ? "w-8 bg-zinc-900 dark:bg-white" : "w-4 bg-zinc-300 dark:bg-zinc-700"
                                        )}
                                    />
                                ))}
                            </div>


                            <button
                                onClick={() => setActiveIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                                className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setActiveIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                                className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="hidden md:block md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {testimonials.map((t, i) => (
                            <StaggerItem key={i} className="break-inside-avoid mb-6">
                                <TestimonialCard t={t} />
                            </StaggerItem>
                        ))}
                    </div>
                </StaggerSection>
            </div >
        </section >
    );
};

export default TestimonialSection;  