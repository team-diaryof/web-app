"use client";
import Button from "@/components/ui/button";
import { StaggerItem, StaggerSection } from "@/lib/animations";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus, X } from "lucide-react";
import { useState } from "react";

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
                        <h2 className="text-center mb-16 text-5xl font-medium text-zinc-900 dark:text-white">Frequently Asked Questions</h2>
                    </StaggerItem>

                    <div className="space-y-4 mb-12">
                        {faqs.map((faq, i) => (
                            <StaggerItem key={i}>
                                <div
                                    className={`rounded-4xl overflow-hidden transition-all duration-300 border ${openIndex === i ? "bg-amber-400 border-zinc-200 dark:border-zinc-800" : "bg-zinc-50/30 dark:bg-zinc-950/50 border-zinc-100 dark:border-zinc-800/60"}`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                        className="flex items-center justify-between w-full p-6 text-left"
                                    >
                                        <span className={`font-medium text-lg pr-4 ${openIndex === i ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}>
                                            {faq.q}
                                        </span>
                                        <div className={`w-8 h-8 cursor-pointer rounded-full flex items-center justify-center shrink-0 transition-colors ${openIndex === i ? "bg-black text-white dark:bg-white dark:text-black" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"}`}>
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
                                                <p className="px-6 pb-6 text-zinc-50 dark:text-zinc-800 leading-relaxed text-sm">
                                                    {faq.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </StaggerItem>
                        ))}
                    </div>

                    <StaggerItem className="flex justify-center">
                        <Button href="/help" variant="primary" className="group">
                            View all FAQs <ArrowRight size={16} className="ml-2 group-hover:translate-x-0.5 group-hover:scale-110 transition-transform" />
                        </Button>
                    </StaggerItem>
                </StaggerSection>
            </div>
        </section>
    );
};
export default FaqSection;