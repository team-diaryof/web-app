"use client"

import Button from "@/components/ui/button"
import { GridPattern } from "@/components/ui/grid-pattern"
import TextSwitcher from "@/components/ui/text-switcher"
import banner from "@/public/hero-banner.png"
import { useAuthStore } from "@/store/auth"
import { motion, Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from 'next/image'
import Link from "next/link"

const baseEase: [number, number, number, number] = [0.2, 0.65, 0.3, 0.9]

const staggerGroup: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25,
            delayChildren: 0.1,
        },
    },
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: baseEase },
    },
}

const imageReveal: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: baseEase,
        },
    },
}

const containerReveal: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
        },
    },
}

const words = ["unfolded.", "remembered.", "organized.", "simplified."];

const HeroSection = () => {
    const { status } = useAuthStore()

    return (
        <div className="relative w-full mt-4 flex items-center pt-20 md:pt-28 pb-12 overflow-hidden">
            <GridPattern />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.03] dark:opacity-[0.05] z-0 hidden sm:block">
                <h1 className="text-[18vw] leading-none font-black tracking-tighter">
                    DIARYOF
                </h1>
            </div>

            <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">

                <motion.div
                    className="flex flex-col gap-4 md:gap-6 md:pr-12 text-center md:text-left items-center md:items-start"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={staggerGroup}
                >
                    {/* --- RESPONSIVE BADGE CONTAINER --- */}
                    <motion.div variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                    }}>
                        <Link href="/download">
                            {/* 1. MOBILE VERSION (Static, Fully Visible) - Hidden on medium screens and up */}
                            <div className="md:hidden inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 rounded-full cursor-pointer mb-4">
                                <div className="relative flex h-2 w-2 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300 whitespace-nowrap">
                                    v1.0 Now Live
                                </span>
                                <div className="h-3 w-px bg-zinc-300 dark:bg-zinc-600 mx-1" />
                                <div className="flex items-center gap-1">
                                    <span className="text-[10px] font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                                        Get App
                                    </span>
                                    <ArrowRight size={12} className="text-zinc-900 dark:text-zinc-100" />
                                </div>
                            </div>

                            {/* 2. DESKTOP VERSION (Hover Expand) - Hidden on small screens */}
                            <motion.div
                                className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-100/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 rounded-full cursor-pointer overflow-hidden mb-6"
                                layout
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                initial="idle"
                                whileHover="hover"
                            >
                                <motion.div layout className="relative flex h-2 w-2 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </motion.div>

                                <motion.span
                                    layout
                                    className="text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300 whitespace-nowrap"
                                >
                                    v1.0 Now Live
                                </motion.span>

                                <motion.div
                                    variants={{
                                        idle: { width: 0, opacity: 0 },
                                        hover: { width: "auto", opacity: 1 }
                                    }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden flex items-center"
                                >
                                    <div className="flex items-center pl-2 border-l border-zinc-300 dark:border-zinc-600 ml-2">
                                        <motion.span
                                            variants={{
                                                idle: { x: -10, opacity: 0 },
                                                hover: { x: 0, opacity: 1 }
                                            }}
                                            className="text-xs font-medium text-zinc-900 dark:text-zinc-100 whitespace-nowrap mr-1"
                                        >
                                            Get App
                                        </motion.span>
                                        <motion.div
                                            variants={{
                                                idle: { x: -5, opacity: 0 },
                                                hover: { x: 0, opacity: 1 }
                                            }}
                                            transition={{ delay: 0.05 }}
                                        >
                                            <ArrowRight size={12} className="text-zinc-900 dark:text-zinc-100" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </Link>
                    </motion.div>
                    {/* --- END BADGE --- */}

                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        Your life,
                    </motion.h1>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl md:text-5xl md:text-7xl font-bold tracking-tight text-zinc-400 dark:text-white">
                        <TextSwitcher words={words} />
                    </motion.h1>

                    <motion.p
                        className="text-base md:text-xl text-zinc-500 leading-relaxed max-w-lg"
                        variants={fadeInUp}
                    >
                        A distraction-free sanctuary for your thoughts. No algorithms. Just you and your history.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 pt-2"
                        variants={fadeInUp}
                    >
                        <Button
                            className="group"
                            href={status == "authenticated" ? "/dashboard" : "/login"}
                        >
                            {status == "authenticated" ? "Go to Dashboard" : "Start Writing"}
                            <ArrowRight className="group-hover:scale-110 group-hover:translate-x-0.5 transition-all duration-500 animate ml-1 size-4 md:size-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            href="/about"
                        >
                            Our Philosophy
                        </Button>
                    </motion.div>

                </motion.div>

                <motion.div
                    className="relative flex justify-center w-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerReveal}
                >
                    <motion.div
                        className="relative w-full flex justify-center"
                        variants={imageReveal}
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-200 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 rounded-full blur-3xl opacity-50 -z-10 transform scale-75 md:scale-90" />
                        <Image
                            src={banner}
                            width={800}
                            height={800}
                            priority
                            className='w-full max-w-[280px] sm:max-w-[400px] md:max-w-[550px] object-contain relative dark:invert z-10 drop-shadow-2xl'
                            alt="Diary Interface"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div >
    )
}

export default HeroSection