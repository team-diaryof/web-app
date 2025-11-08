"use client"

import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { FormEvent, useState } from "react"
import { AnimatePresence, motion, Variants } from "framer-motion"
import logo from "../../public/logo-landscape-white.png"
import heroImage from "../../public/newsletter.png"
import AnimatePageWrapper from "@/components/animations/animate-page-wrapper"
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeInOut"
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

    const getButtonText = () => {
        switch (status) {
            case "loading":
                return "Sending..."
            case "success":
                return "Sent!"
            case "error":
                return "Failed"
            default:
                return "Sign Up"
        }
    }

    return (
        <AnimatePageWrapper>
            <header className="pt-4 flex items-center justify-center">
                <Link href="/">
                    <Image
                        src={logo}
                        alt="Logo"
                        className="h-20 w-auto"
                        priority
                    />
                </Link>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">
                <div className="flex justify-between gap-12 items-center">
                    <div className="text-center md:px-12">
                        <div
                            className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 px-3 py-1 text-xs"
                        >
                            <span className="mr-2 text-gray-500">🚀</span> Launching Fall 2026
                        </div>

                        <motion.h1
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-5xl md:text-6xl font-serif leading-tight"
                        >
                            <motion.span variants={itemVariants} className="block">
                                A newsletter
                            </motion.span>
                            <motion.span variants={itemVariants} className="block">
                                without added
                            </motion.span>
                            <motion.span variants={itemVariants} className="block">
                                sulfites
                            </motion.span>
                        </motion.h1>

                        <p
                            className="mt-6 text-gray-700 leading-relaxed"
                        >
                            Highlighting places to visit, bottles to drink, and events to attend.
                            We tell the stories of honest people in wine who are dedicated to a better process.
                        </p>

                        <form onSubmit={onSubmit} className="mt-8 flex w-full bg-gray-100 gap-3 rounded-full relative overflow-hidden">
                            <div className="relative flex-1">
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={email ? "" : "Email Address"}
                                    className="flex-1 w-full px-6 py-5 outline-none placeholder:text-sm placeholder:text-black bg-transparent"
                                    autoComplete="email"
                                    disabled={status === "loading"}
                                    required
                                />
                                <AnimatePresence mode="wait">
                                    {(status === "error" || status === "success") && (
                                        <motion.div
                                            key={status}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -12 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="bg-gray-100 absolute inset-0 flex items-center px-6 pointer-events-none"
                                        >
                                            <span className={`text-sm font-medium ${status === "error" ? "text-red-600" : "text-emerald-600"}`}>
                                                {status === "error" ? error : "Thanks! Please check your inbox."}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="px-5 py-3 text-sm font-medium cursor-pointer btn-primary w-36 m-1 relative overflow-hidden"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={status}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="block"
                                    >
                                        {getButtonText()}
                                    </motion.span>
                                </AnimatePresence>
                            </button>
                        </form>

                        <div className="mt-12 flex max-md:justify-center items-center gap-8 text-sm text-zinc-600">
                            <Link href="/contact" className="hover:underline">
                                CONTACT
                            </Link>
                            <Link
                                href="https://instagram.com/"
                                target="_blank"
                                className="hover:underline"
                            >
                                INSTAGRAM
                            </Link>
                        </div>
                    </div>

                    <div className="relative max-md:hidden w-full">
                        <Image src={heroImage} alt="Hero Image" className="object-cover" />
                        <p className="mt-3 text-center text-xs text-gray-500">
                            Illustration by <Link href="https://sacube.xyz" target="_blank" className="underline decoration-zinc-400">Saquib Ali</Link>
                        </p>
                    </div>
                </div>
            </section>
        </AnimatePageWrapper>
    )
}

export default NewsLetter