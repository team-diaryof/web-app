"use client"

import Button from "@/components/ui/button"
import Loading from "@/components/ui/loading"
import { ThumbsUp, Warning, CheckCircle } from "@phosphor-icons/react"
import axios from "axios"
import { AnimatePresence, motion, Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FormEvent, useState } from "react"
import heroImage from "@/public/newsletter.png"
import AnimatePageWrapper from "@/components/animations/animate-page-wrapper"

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
}

const NewsLetter = () => {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [error, setError] = useState<string | null>(null)

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            setStatus("loading")
            await axios.post("/api/v1/newsletter/subscribe", { email })
            await new Promise((r) => setTimeout(r, 900))
            setStatus("success")
        } catch {
            setStatus("error")
            setError("Something went wrong. Try again.")
        } finally {
            setTimeout(() => {
                setStatus("idle");
                setEmail("")
            }, 5000);
        }
    }

    return (
        <AnimatePageWrapper>
            <section className="min-h-[85vh] flex items-center justify-center px-6 py-20">
                <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        className="max-w-lg"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full text-xs font-semibold text-zinc-600 mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Launching Fall 2026
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-6xl font-serif font-medium text-zinc-900 leading-[1.1] mb-6"
                        >
                            Stories worth <br />
                            <span className="italic text-zinc-400">remembering.</span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-zinc-500 leading-relaxed mb-10"
                        >
                            A weekly curation of thoughts, prompts, and stories about memory keeping,
                            slow living, and the art of journaling. No spam, just substance.
                        </motion.p>

                        <motion.form
                            variants={itemVariants}
                            onSubmit={onSubmit}
                            className="relative max-w-md"
                        >
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full h-14 pl-6 pr-32 bg-zinc-50 border border-zinc-200 rounded-full outline-none focus:ring-2 focus:ring-zinc-100 transition-all placeholder:text-zinc-400 text-zinc-900"
                                    required
                                    disabled={status === "loading" || status === "success"}
                                />
                                <div className="absolute right-1 top-1 bottom-1">
                                    <Button
                                        type="submit"
                                        disabled={status === "loading" || status === "success"}
                                        className={`h-full rounded-full px-6 transition-all ${status === 'success' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-zinc-900 hover:bg-zinc-800 text-white'}`}
                                    >
                                        <AnimatePresence mode="wait">
                                            {status === 'loading' ? (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                >
                                                    <Loading size="xs" className="text-white" />
                                                </motion.div>
                                            ) : status === 'success' ? (
                                                <motion.div
                                                    key="success"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                >
                                                    <ThumbsUp size={18} weight="bold" />
                                                </motion.div>
                                            ) : (
                                                <motion.span
                                                    key="idle"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    Join Waitlist
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </Button>
                                </div>
                            </div>

                            {/* Status Messages */}
                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute -bottom-8 left-6 text-sm text-emerald-600 font-medium flex items-center gap-1.5"
                                    >
                                        <CheckCircle size={16} weight="fill" /> You&apos;re on the list!
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute -bottom-8 left-6 text-sm text-red-500 font-medium flex items-center gap-1.5"
                                    >
                                        <Warning size={16} weight="fill" /> {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.form>

                        <motion.div variants={itemVariants} className="mt-16 flex gap-8 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                            <Link href="/contact" className="hover:text-zinc-900 transition-colors">Contact</Link>
                            <Link href="https://instagram.com" target="_blank" className="hover:text-zinc-900 transition-colors">Instagram</Link>
                            <Link href="/terms" className="hover:text-zinc-900 transition-colors">Terms</Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:block relative"
                    >
                        <div className="relative h-[300px] min-w-[300px] w-full max-w-md mx-auto">
                            <div className="absolute inset-0 -z-10" />
                            <Image
                                src={heroImage}
                                alt="Newsletter Preview"
                                className="object-cover"
                                fill
                            />
                        </div>
                    </motion.div>

                </div>
            </section>
        </AnimatePageWrapper>
    )
}

export default NewsLetter