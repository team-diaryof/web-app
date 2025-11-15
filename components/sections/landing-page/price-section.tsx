"use client"
import React, { use } from 'react'
import { Check } from 'lucide-react'
import Button from '@/components/ui/button'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/lib/animations'
import { useAuthStore } from '@/store/user'

const features = [
  'Access to our 150+ video library',
  'Custom videos featuring you and your team',
  'Play on as many TVs as you like',
  'Embed your videos on your website',
  'No contract, cancel anytime',
]



const PriceSection = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <section id="pricing" className="py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          className='max-w-xl mx-auto'
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-semibold text-gray-900"
          >
            So, how much does all this cost?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
          >
            Our goal is to make Channel D as easy and affordable as possible. No fluff, no hidden
            costs, just one month-to-month fee.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            filter: "blur(5px)",
          }}
          whileInView={{
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            transition: {
              duration: 0.8,
              ease: "easeInOut",
            },
          }}

          viewport={{ once: true, amount: 0.3 }}

          className="mt-12">
          <div className="mx-auto max-w-2xl bg-gray-50 border border-gray-100 px-8 py-12">
            <div className="flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-bold text-gray-900">$149</div>
              <div className="mt-2 uppercase tracking-wide text-gray-500 font-semibold">month</div>
            </div>

            <ul className="mt-8 space-y-4 text-left w-full md:w-[80%] mx-auto">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 flex-none text-black" />
                  <span className="text-gray-800">{item}</span>
                </li>
              ))}
            </ul>

            <div className="relative mt-10 flex items-center justify-center">
              {
                isAuthenticated ? (
                  <Button className="w-fit" href="/dashboard">Go to Dashboard</Button>
                ) : (
                  <Button className="w-fit" href="/register">Try It Now</Button>
                )
              }
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PriceSection