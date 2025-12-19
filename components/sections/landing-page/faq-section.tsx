"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ArrowRight } from "lucide-react";
import { StaggerSection, StaggerItem } from "@/lib/animations";
import Link from "next/link";
import Button from "@/components/ui/button";

const faqs = [
  { q: "Can I export my data later?", a: "Yes. You can export your entire journal to PDF, JSON, or TXT formats at any time. Your data belongs to you." },
  { q: "Is my data encrypted?", a: "Absolutely. We use industry-standard encryption for data at rest and in transit. On the Pro plan, cloud sync is end-to-end encrypted." },
  { q: "Do you offer student discounts?", a: "Yes! Students with a valid .edu email can get 50% off the Pro plan. Contact support to apply." },
  { q: "What happens if I cancel my subscription?", a: "Your data is safe. Your account reverts to the Basic plan. You will lose access to cloud sync and unlimited history, but your existing entries remain." },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="max-w-[800px] mx-auto px-6">
        <StaggerSection>
            <StaggerItem>
                <div className="text-center mb-16">
                    <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-2">Support</p>
                    <h2 className="text-4xl font-medium text-zinc-900 dark:text-white">Frequently Asked Questions</h2>
                </div>
            </StaggerItem>
            
            <div className="space-y-4 mb-12">
                {faqs.map((faq, i) => (
                    <StaggerItem key={i}>
                        <div 
                            className={`rounded-[2rem] overflow-hidden transition-all duration-300 border ${openIndex === i ? "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800" : "bg-white dark:bg-black border-zinc-100 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="flex items-center justify-between w-full p-6 text-left"
                            >
                                <span className={`font-medium text-lg pr-4 ${openIndex === i ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}>
                                    {faq.q}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${openIndex === i ? "bg-black text-white dark:bg-white dark:text-black" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"}`}>
                                    {openIndex === i ? <X size={16} /> : <Plus size={16} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                    >
                                        <p className="px-6 pb-6 text-zinc-500 leading-relaxed text-base">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </StaggerItem>
                ))}
            </div>

            <StaggerItem>
                <div className="flex justify-center">
                    <Link href="/faq">
                        <Button variant="outline" className="rounded-full px-8 h-12 text-sm font-medium border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                            View all FAQs <ArrowRight size={16} className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </StaggerItem>
        </StaggerSection>
      </div>
    </section>
  );
};
export default FaqSection;