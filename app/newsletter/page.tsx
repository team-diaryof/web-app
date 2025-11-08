"use client"

import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { FormEvent, useState } from "react"
import logo from "../../public/logo-landscape-white.png"
import heroImage from "../../public/newsletter.png"

const NewsLetter = () => {
    const [email, setEmail] = useState("")
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [error, setError] = useState<string | null>(null)

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError(null)

        try {
            setStatus("loading")
            await axios.post("/api/v1/subscribe", { email })
            await new Promise((r) => setTimeout(r, 900))
            setStatus("success")
            setEmail("")
        } catch {
            setStatus("error")
            setError("Something went wrong. Try again.")
        } finally {
            setTimeout(() => { setStatus("idle") }, 5000);
        }
    }

    return (
        <main className="min-h-screen bg-white">
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
                        <div className="mb-6 inline-flex items-center justify-center rounded-full border border-gray-200 px-3 py-1 text-xs">
                            NYC
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif leading-tight">
                            A newsletter
                            <br className="hidden md:block" /> without added
                            <br className="hidden md:block" /> sulfites
                        </h1>

                        <p className="mt-6 text-gray-700 leading-relaxed">
                            Highlighting places to visit, bottles to drink, and events to attend.
                            We tell the stories of honest people in wine who are dedicated to a better process.
                        </p>

                        <form onSubmit={onSubmit} className="mt-8 flex w-full bg-gray-100 gap-3 rounded-full">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="flex-1 px-6 py-5 outline-none"
                                autoComplete="email"
                                disabled={status === "loading"}
                                required
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="px-5 py-3 text-sm font-medium cursor-pointer btn-primary w-36 m-1"
                            >
                                {status === "loading" ? "Sending..." : "Sign Up"}
                            </button>
                        </form>

                        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
                        {status === "success" && (
                            <p className="mt-3 text-sm text-emerald-600">Thanks! Please check your inbox.</p>
                        )}

                        <div className="mt-12 flex items-center gap-8 text-sm text-zinc-600">
                            <Link href="/contact" className="hover:underline">
                                CONTACT
                            </Link>
                            <a
                                href="https://instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                            >
                                INSTAGRAM
                            </a>
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
        </main>
    )
}

export default NewsLetter