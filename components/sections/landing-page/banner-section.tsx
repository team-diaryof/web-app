"use client"
import banner from "@/public/hero-banner-1.png"
import { motion } from 'framer-motion'
import Image from 'next/image'
import { containerVariants, itemVariants, fadeInVariants } from '@/lib/animations'

const BannerSection = () => {
    return (
        <div className="flex max-md:flex-col-reverse justify-between max-w-6xl w-full mx-auto py-10 md:py-20 max-md:px-6 gap-6">
            <motion.div 
                className="w-full flex flex-col gap-8 justify-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div
                    variants={containerVariants}
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
                    variants={itemVariants}
                    className="text-gray-700 max-w-md"
                >
                    Record your thoughts, experiences, and memories in a chronologically organized journal.
                </motion.p>

                <motion.button
                    variants={itemVariants}
                    className="btn-primary w-fit"
                >
                    Try It Now
                </motion.button>
            </motion.div>

            <motion.div
                variants={fadeInVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="w-full font-playfair flex items-center justify-center"
            >
                <Image src={banner} className='w-[200px] md:w-[400px]' alt="Newsletter" />
            </motion.div>
        </div>
    )
}

export default BannerSection