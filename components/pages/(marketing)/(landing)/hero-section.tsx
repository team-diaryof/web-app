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
        <section className="min-h-[75vh] flex flex-col py-24 pb-10 px-6 justify-between items-center">
            <div className="flex items-center justify-center ">

                <div className="w-full grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="flex flex-col gap-8">
                        <div className="space-y-1">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
                                Your life,
                            </h1>
                            <div className="text-4xl md:text-5xl font-medium tracking-tight h-[1.2em] relative flex items-center">
                                <TextSwitcher words={words} />
                            </div>
                        </div>

                        <p className="text-zinc-500 leading-relaxed max-w-lg">
                            A clean, distraction-free space to record your daily journey. No algorithms, no likes, just you and your memories.
                        </p>

                        <div>
                            <Button
                                href={status === "authenticated" ? "/dashboard" : "/register"}
                                className="h-12 px-8 text-base bg-zinc-900 hover:bg-zinc-800 text-white rounded-full"
                            >
                                {status === "authenticated" ? "Go to Dashboard" : "Start Writing"}
                            </Button>
                        </div>

                        <div className="flex items-center gap-6 text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em] pt-8">
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
                            className='w-full max-w-[400px] object-contain'
                            alt="Diary Illustration"
                            priority
                        />
                    </div>
                </div>
            </div>
            <ArrowDown className="animate-bounce bg-amber-50 rounded-full text-primary p-2" size={40} />
        </section>
    )
}

export default HeroSection