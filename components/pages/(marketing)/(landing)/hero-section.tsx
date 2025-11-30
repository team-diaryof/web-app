"use client"
import Button from "@/components/ui/button"
import Loading from "@/components/ui/loading"
import TextSwitcher from "@/components/ui/text-switcher"
import { containerVariants, fadeIn, fadeInUp, imageReveal, staggerContainer } from "@/lib/animations"
import banner from "@/public/hero-banner.png"
import { useAuthStore } from "@/store/auth"
import { AnimatePresence, motion } from "framer-motion"
import Image from 'next/image'

// Words to cycle through
const words = ["unfolded.", "remembered.", "organized.", "simplified."];

const HeroSection = () => {
    const { status } = useAuthStore()

    return (
        <div className="relative max-w-5xl mx-auto h-screen-navbar flex flex-col px-6 items-center justify-center h-full overflow-hidden md:overflow-visible">
            <div className="w-full flex flex-col-reverse md:grid md:grid-cols-2 gap-16 items-center relative z-10">

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="flex flex-col gap-8 relative z-20"
                >
                    {/* Our Tagline */}
                    <motion.div
                        className="space-y-1"
                        variants={fadeInUp}
                    >
                        <h1
                            className="text-5xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
                            Your life,
                        </h1>
                        <div className="text-5xl md:text-5xl font-medium tracking-tight h-[1.2em] relative flex items-center">
                            <TextSwitcher words={words} />
                        </div>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-zinc-500 leading-relaxed max-w-lg">
                        A clean, distraction-free space to record your daily journey. No algorithms, no likes, just you and your memories.
                    </motion.p>

                    {/* Action Button */}
                    <motion.div
                        variants={fadeIn}
                        className="flex gap-3"
                    >
                        <Button className="w-32" href={status == "authenticated" ? "/dashboard" : "/login"} size="md" disabled={status == "loading"} >
                            <AnimatePresence mode="wait">

                                {
                                    status == "loading" ? (
                                        <Loading size="sm" />
                                    ) : status == "authenticated" ? (
                                        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                                            Dashboard
                                        </motion.p>
                                    ) :
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                        >
                                            Get Started
                                        </motion.p>
                                }
                            </AnimatePresence>
                        </Button>

                        <Button
                            variant="ghost"
                            href={"/contact"}
                        >
                            Need Help?
                        </Button>
                    </motion.div>

                    {/* What we offer */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="flex w-fit p-2 items-center gap-6 text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]"
                    >
                        <motion.span variants={fadeInUp}>Private</motion.span>
                        <span className="size-1 rounded-full bg-zinc-200" />
                        <motion.span variants={fadeInUp}>Secure</motion.span>
                        <span className="size-1 rounded-full bg-zinc-200" />
                        <motion.span variants={fadeInUp}>Forever</motion.span>
                    </motion.div>
                </motion.div>

                <div className="max-md:hidden absolute top-24 -right-10 translate-x-1/2 -translate-y-1/2 -z-10 select-none pointer-events-none">
                    <motion.p initial="hidden" animate="visible" variants={containerVariants} className="text-[6rem] md:text-[8rem] leading-[0.75] font-playfair text-zinc-100/80 animate-theme font-bold w-[600px] md:w-[800px] text-right">
                        <motion.span variants={fadeInUp} className="block">

                            Because
                        </motion.span>
                        <motion.span variants={fadeInUp} className="block">
                            memories
                        </motion.span>
                        <motion.span variants={fadeInUp} className="block">

                            has more
                        </motion.span>
                        <motion.span variants={fadeInUp} className="block text-primary/20 dark:text-primary animate-theme">
                            patience
                        </motion.span>
                        <motion.span variants={fadeInUp} className="block">
                            than
                        </motion.span>
                        <motion.span variants={fadeInUp} className="block">
                            people.
                        </motion.span>
                    </motion.p>
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={imageReveal}
                    className="relative flex justify-center lg:justify-end"
                >
                    {/* Main Banner Image */}
                    <Image
                        src={banner}
                        width={600}
                        height={600}
                        className='w-full max-w-[250px] md:max-w-[350px] object-contain relative z-10'
                        alt="Diary Illustration"
                    />

                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection