"use client"
import banner from "@/public/hero-banner-1.png"
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25
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

const FirstSection = () => {
    return (
        <div className="flex max-md:flex-col-reverse justify-between max-w-5xl mx-auto py-10 md:py-20 max-md:px-6 gap-6">
            <div className="w-full flex flex-col gap-8 justify-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl leading-tight font-semibold"
                >
                    <motion.h1 variants={itemVariants} className="block">
                        Tell your
                        <span className="italic text-primary">
                            story
                        </span>
                    </motion.h1>
                    <motion.h1 variants={itemVariants} className="block">
                        one day at a time.
                    </motion.h1>
                    <motion.h1 variants={itemVariants} className="block">
                        Capture moments.
                    </motion.h1>
                </motion.div>

                <motion.p
                    className="text-gray-700 max-w-md"
                >
                    Record your thoughts, experiences, and memories in a chronologically organized journal.
                </motion.p>

                <button
                    className="btn-primary w-fit"
                >
                    Try It Now
                </button>
            </div>

            <div
                className="w-full font-playfair flex items-center justify-center"
            >
                <Image src={banner} className='w-[200px] md:w-[400px]' alt="Newsletter" />
            </div>
        </div>
    )
}

export default FirstSection