"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Lock, CloudOff, Fingerprint, Feather, History } from "lucide-react";
import { StaggerSection, StaggerItem } from "@/lib/animations";
import { cn } from "@/lib/cn";

const features = [
  { title: "Pure Focus", desc: "A minimal editor that gets out of your way.", icon: <Feather className="w-5 h-5" />, color: "text-orange-600 dark:text-orange-400" },
  { title: "Offline First", desc: "Works instantly, even without signal.", icon: <CloudOff className="w-5 h-5" />, color: "text-blue-600 dark:text-blue-400" },
  { title: "Encrypted", desc: "Your thoughts are locked to your device.", icon: <Lock className="w-5 h-5" />, color: "text-emerald-600 dark:text-emerald-400" },
  { title: "Biometric", desc: "FaceID & TouchID support built-in.", icon: <Fingerprint className="w-5 h-5" />, color: "text-rose-600 dark:text-rose-400" },
  { title: "Time Travel", desc: "Jump back to this day in previous years.", icon: <History className="w-5 h-5" />, color: "text-violet-600 dark:text-violet-400" },
  { title: "AI Insights", desc: "On-device processing for weekly summaries.", icon: <Sparkles className="w-5 h-5" />, color: "text-amber-600 dark:text-amber-400" },
];

const FeatureCard = ({ item }: { item: typeof features[0] }) => (
  <div className="h-full flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
    <div className={cn("mb-4", item.color)}>{item.icon}</div>
    <h3 className="font-medium text-zinc-900 dark:text-white mb-2">{item.title}</h3>
    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[280px] lg:max-w-none">{item.desc}</p>
  </div>
);

export default function AboutSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive((prev) => (prev + 1) % features.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <StaggerSection className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Narrative Section */}
          <StaggerItem className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
            <h2 className="text-3xl lg:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white text-balance">
              Why we built this.
            </h2>
            <div className="space-y-6 text-base lg:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
              <p className="font-serif italic text-zinc-800 dark:text-zinc-200">
                &apos;Most journaling apps feel like social networks. We wanted a quiet place to think.&apos;
              </p>
              <p>
                We designed a digital paper that doesn&apos;t sell your data, doesn&apos;t notify you, and simply waits for you to be ready.
              </p>
            </div>
            <div className="h-px w-24 bg-zinc-200 dark:bg-zinc-800" />
          </StaggerItem>

          {/* Features Section */}
          <div className="lg:col-span-7 w-full">
            
            {/* Mobile Carousel */}
            <div className="flex flex-col lg:hidden h-[280px]">
              
              {/* Content Area */}
              <div className="relative flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <FeatureCard item={features[active]} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {features.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      active === i 
                        ? "w-6 bg-zinc-900 dark:bg-white" // Active state
                        : "w-1.5 bg-zinc-200 dark:bg-zinc-800" // Inactive state
                    )}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-12 border-l border-zinc-100 dark:border-zinc-800 pl-12">
              {features.map((item, i) => (
                <StaggerItem key={i}>
                  <FeatureCard item={item} />
                </StaggerItem>
              ))}
            </div>

          </div>
        </StaggerSection>
      </div>
    </section>
  );
}