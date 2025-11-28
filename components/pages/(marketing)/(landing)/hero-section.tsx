"use client"
import Button from "@/components/ui/button"
import TextSwitcher from "@/components/ui/text-switcher"
import banner from "@/public/hero-banner.png"
import { useAuthStore } from "@/store/auth"
import { ArrowDown } from "lucide-react"
import Image from 'next/image'

// Words to cycle through
const words = ["unfolded.", "remembered.", "organized.", "simplified."];

const HeroSection = () => {
    const { status } = useAuthStore()

    return (
        <section className="min-h-[80vh] flex flex-col py-16 md:py-24 pb-0 px-6 justify-between items-center">
            <div className="flex items-center justify-center ">

                <div className="w-full flex flex-col-reverse md:grid md:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="flex flex-col gap-8">
                        <div className="space-y-1">
                            <h1 className="text-5xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
                                Your life,
                            </h1>
                            <div className="text-5xl md:text-5xl font-medium tracking-tight h-[1.2em] relative flex items-center">
                                <TextSwitcher words={words} />
                            </div>
                        </div>

                        <p className="text-zinc-500 leading-relaxed max-w-lg">
                            A clean, distraction-free space to record your daily journey. No algorithms, no likes, just you and your memories.
                        </p>

                        <div className="flex gap-3">
                            <Button
                                href={status === "authenticated" ? "/dashboard" : "/register"}
                                >
                                {status === "authenticated" ? "Dashboard" : "Get Started"}
                            </Button>

                            <Button
                                variant="ghost"
                                href={"/contact"}
                            >
                                Need Help?
                            </Button>
                        </div>

                        <div className="flex w-fit p-2 items-center gap-6 text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                            <span>Private</span>
                            <span className="size-1 rounded-full bg-zinc-200" />
                            <span>Secure</span>
                            <span className="size-1 rounded-full bg-zinc-200" />
                            <span>Forever</span>
                        </div>
                    </div>

                    <div className="relative flex justify-center lg:justify-end">
                        <Image
                            src={banner}
                            width={500}
                            height={600}
                            className='w-full max-w-[200px] md:max-w-[400px] object-contain'
                            alt="Diary Illustration"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection