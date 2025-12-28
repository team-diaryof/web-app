"use client";

import AnimatePageWrapper from "@/components/animations/animate-page-wrapper";
import { StaggerSection, StaggerItem } from "@/lib/animations";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Book, CreditCard, Lock, Minus, Plus, Search, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Categorized Data
const faqCategories = [
  {
    title: "General",
    icon: Book,
    questions: [
      { q: "What is DiaryOf?", a: "DiaryOf is a minimalist, offline-first journaling app designed to help you capture thoughts without distractions." },
      { q: "Is the app free?", a: "Yes! The core experience is completely free. We offer a Pro plan for cloud sync and advanced export features." },
      { q: "Can I use it offline?", a: "Absolutely. DiaryOf is built to be offline-first. Your data lives on your device and syncs when you reconnect." },
    ]
  },
  {
    title: "Privacy & Security",
    icon: Lock,
    questions: [
      { q: "Is my data encrypted?", a: "Yes. We use AES-256 encryption for data at rest. If you use Cloud Sync (Pro), it is end-to-end encrypted." },
      { q: "Can you read my entries?", a: "No. We have zero access to your content. Your private key is generated on your device and never sent to us." },
      { q: "How do I export my data?", a: "You can export to PDF, JSON, or Markdown at any time from the Settings menu. Your data belongs to you." },
    ]
  },
  {
    title: "Billing & Account",
    icon: CreditCard,
    questions: [
      { q: "How do I cancel?", a: "You can cancel your subscription anytime via the App Store or Google Play Store settings." },
      { q: "Do you offer refunds?", a: "We offer a 14-day money-back guarantee for the Pro plan if you are not satisfied." },
    ]
  },
  {
    title: "Technical",
    icon: Settings,
    questions: [
      { q: "Does it support Dark Mode?", a: "Yes, DiaryOf fully supports both Light and Dark modes, respecting your system settings." },
      { q: "Can I add photos?", a: "Yes, Pro users can attach unlimited high-resolution photos to their entries." },
    ]
  }
];

const FAQPage = () => {
  // State to track which question is open (categoryIndex-questionIndex string)
  const [openKey, setOpenKey] = useState<string | null>("0-0");

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <AnimatePageWrapper>
      <section className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Header */}
          <StaggerSection className="text-center mb-24 max-w-2xl mx-auto">
            <StaggerItem>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full mb-6">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"/>
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Help Center</span>
                </div>
            </StaggerItem>
            <StaggerItem>
              <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
                How can we help?
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg text-zinc-500 leading-relaxed">
                Everything you need to know about DiaryOf. Can't find the answer? <Link href="/contact" className="text-black dark:text-white underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-all">Chat to our team.</Link>
              </p>
            </StaggerItem>
            
            {/* Search Bar Visual */}
            <StaggerItem className="mt-10">
                <div className="relative max-w-md mx-auto group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 dark:group-focus-within:text-white transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search for answers..." 
                        className="w-full h-14 pl-12 pr-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-700 transition-all text-zinc-900 dark:text-white"
                    />
                </div>
            </StaggerItem>
          </StaggerSection>

          {/* Categories Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            {faqCategories.map((category, catIndex) => (
              <StaggerSection key={catIndex} delay={catIndex * 0.1}>
                <StaggerItem className="mb-8 flex items-center gap-4">
                    <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-zinc-900 dark:text-white">
                        <category.icon size={24} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{category.title}</h2>
                </StaggerItem>

                <div className="space-y-3">
                  {category.questions.map((q, qIndex) => {
                    const uniqueKey = `${catIndex}-${qIndex}`;
                    const isOpen = openKey === uniqueKey;

                    return (
                      <StaggerItem key={qIndex}>
                        <div 
                            className={`rounded-[1.5rem] overflow-hidden transition-all duration-300 border ${isOpen ? "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800" : "bg-white dark:bg-black border-zinc-100 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"}`}
                        >
                            <button
                                onClick={() => toggle(uniqueKey)}
                                className="flex items-center justify-between w-full p-5 text-left"
                            >
                                <span className={`font-medium text-lg pr-4 ${isOpen ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-zinc-400"}`}>
                                    {q.q}
                                </span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? "bg-black text-white dark:bg-white dark:text-black" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"}`}>
                                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                    >
                                        <p className="px-5 pb-6 text-zinc-500 leading-relaxed text-base">
                                            {q.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </div>
              </StaggerSection>
            ))}
          </div>

          <StaggerSection className="mt-32 p-12 rounded-[3rem] bg-zinc-900 dark:bg-zinc-50 text-white dark:text-black text-center relative overflow-hidden">
                <StaggerItem className="relative z-10">
                    <h3 className="text-3xl font-bold mb-4">Still have questions?</h3>
                    <p className="text-zinc-400 dark:text-zinc-600 mb-8 max-w-md mx-auto">
                        Can't find the answer you're looking for? Please chat to our friendly team.
                    </p>
                    <Link href="/contact">
                        <button className="h-12 px-8 rounded-full bg-white text-black dark:bg-black dark:text-white font-bold hover:scale-105 transition-transform">
                            Get in touch
                        </button>
                    </Link>
                </StaggerItem>
                {/* Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800 dark:bg-zinc-200 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          </StaggerSection>

        </div>
      </section>
    </AnimatePageWrapper>
  );
};

export default FAQPage;