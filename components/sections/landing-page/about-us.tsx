"use client";

import { LightbulbFilamentIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="text-center flex flex-col items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mb-24"
      >
        <div className="text-8xl text-black ">“</div>
        <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-gray-900 mb-4">
          What makes Channel D different? <br />
          <span className="font-normal italic">It’s all about the message.</span>
        </h2>

        <p className="text-gray-600 leading-relaxed font-light">
          With personality-packed, metaphor-driven content, Channel D makes
          complex topics simple and dentistry interesting. The result? Curious
          patients who initiate conversations on topics that matter to you. This
          triggers deeper relationships, better clinical outcomes, and more
          personal referrals.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        <LightbulbFilamentIcon className="w-12 h-12 text-black mb-6" />
        <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-gray-900 mb-4">
          Channel D has it all
        </h2>

        <p className="text-gray-600 leading-relaxed font-light max-w-lg">
          With over 150 videos (and growing), we aim to cover every conceivable
          topic you would ever want to communicate to your patients.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutSection;
