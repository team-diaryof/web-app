"use client"

import Button from "@/components/ui/button"
import Loading from "@/components/ui/loading"
import { Check, Warning } from "@phosphor-icons/react"
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FormEvent, useState } from "react"
import heroImage from "@/public/newsletter.png"
import AnimatePageWrapper from "@/components/animations/animate-page-wrapper"
import { StaggerSection, StaggerItem } from "@/lib/animations"

const Newsletter = () => {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [error, setError] = useState<string | null>(null)

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            setStatus("loading")
            await axios.post("/api/v1/newsletter/subscribe", { email })
            // Artificial delay for smooth UX
            await new Promise((r) => setTimeout(r, 1000))
            setStatus("success")
        } catch {
            setStatus("error")
            setError("Something went wrong. Please try again.")
        } finally {
            // Reset after a few seconds
            setTimeout(() => {
                if (status !== 'error') setEmail("")
                setStatus("idle");
            }, 4000);
        }
    }

    return (
        <AnimatePageWrapper>
            <section className="min-h-[90vh] flex items-center justify-center py-24 px-6 bg-white dark:bg-black">
                <div className="max-w-[1400px] w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Content */}
                    <StaggerSection className="flex flex-col justify-center max-w-xl">

                        <StaggerItem>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full mb-8 shadow-sm w-fit">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Weekly Digest</span>
                            </div>
                        </StaggerItem>

                        <StaggerItem>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.05] mb-6">
                                Stories worth <br />
                                <span className="text-zinc-400 dark:text-zinc-600 font-serif italic">remembering.</span>
                            </h1>
                        </StaggerItem>

                        <StaggerItem>
                            <p className="text-lg md:text-xl text-zinc-500 leading-relaxed mb-10 max-w-md">
                                A weekly curation of thoughts, prompts, and stories about memory keeping, slow living, and the art of journaling. No spam, just substance.
                            </p>
                        </StaggerItem>

                        <StaggerItem>
                            <form onSubmit={onSubmit} className="relative w-full max-w-md">
                                <div className="relative group">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        className="w-full h-16 pl-6 pr-36 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700 transition-all placeholder:text-zinc-400 text-zinc-900 dark:text-white text-base"
                                        required
                                        disabled={status === "loading" || status === "success"}
                                    />
                                    <div className="absolute right-2 top-2 bottom-2">
                                        <Button
                                            type="submit"
                                            disabled={status === "loading" || status === "success"}
                                            className={`h-full rounded-full px-6 transition-all duration-300 ${status === 'success'
                                                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white w-32'
                                                    : 'bg-black hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white min-w-[100px]'
                                                }`}
                                        >
                                            <AnimatePresence mode="wait">
                                                {status === 'loading' ? (
                                                    <motion.div
                                                        key="loading"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    >
                                                        <Loading size="xs" className="text-white dark:text-black" />
                                                    </motion.div>
                                                ) : status === 'success' ? (
                                                    <motion.div
                                                        key="success"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Check size={18} weight="bold" />
                                                        <span>Joined</span>
                                                    </motion.div>
                                                ) : (
                                                    <motion.span
                                                        key="idle"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    >
                                                        Subscribe
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </Button>
                                    </div>
                                </div>

                                {/* Status Messages */}
                                <div className="absolute top-full left-6 mt-3 h-6">
                                    <AnimatePresence>
                                        {status === 'error' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="text-sm text-red-500 font-medium flex items-center gap-1.5"
                                            >
                                                <Warning size={16} weight="fill" />
                                                {error}
                                            </motion.div>
                                        )}
                                        {status === 'success' && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="text-sm text-emerald-500 font-medium flex items-center gap-1.5"
                                            >
                                                Welcome to the community.
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </form>
                        </StaggerItem>

                        <StaggerItem>
                            <div className="mt-20 flex gap-8 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                                <Link href="/archive" className="text-xs font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white uppercase tracking-widest transition-colors">Read Archive</Link>
                                <Link href="/rss" className="text-xs font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white uppercase tracking-widest transition-colors">RSS Feed</Link>
                            </div>
                        </StaggerItem>

                    </StaggerSection>

                    {/* Right Image */}
                    <StaggerSection delay={0.2} className="hidden lg:flex justify-center items-center h-full">
                        <StaggerItem type="scale" className="relative w-full max-w-md aspect-[4/5]">
                             <Image
                                src={heroImage}
                                alt="Newsletter Aesthetic"
                                className="object-contain"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                            />
                        </StaggerItem>
                    </StaggerSection>

                </div>
            </section>
        </AnimatePageWrapper>
    )
}

export default Newsletter