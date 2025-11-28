"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const AboutSection = () => {
  return (
    <section className="pt-16 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        
        <motion.div 
            className="text-center space-y-8 mb-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-semibold text-zinc-900">
                Why we built this ?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed font-serif italic">
                &quot;We wanted a place to think that wasn&apos;t designed to keep us scrolling.&quot;
            </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
            {[
                {
                    title: "Clarity over Clutter",
                    desc: "Most journals are too complex. We removed the stickers, themes, and social features to focus purely on the writing experience."
                },
                {
                    title: "Memory Lane",
                    desc: "Our AI gently organizes your entries, making it effortless to look back on what you were doing exactly one year ago today."
                },
                {
                    title: "Data Ownership",
                    desc: "Your thoughts belong to you. Export your entire history to PDF or JSON at any time. We don't lock you in."
                },
                {
                    title: "Quiet by Design",
                    desc: "No notifications, no streaks, no gamification. Write because you want to, not because an app told you to."
                }
            ].map((item, i) => (
                <motion.div 
                    key={i} 
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                >
                    <h3 className="font-semibold text-zinc-900 text-lg">{item.title}</h3>
                    <p className="text-zinc-600 leading-relaxed">{item.desc}</p>
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;