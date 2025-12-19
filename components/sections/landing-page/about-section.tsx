"use client";
import { StaggerSection, StaggerItem } from "@/lib/animations";
import { Sparkles, Lock, CloudOff, Fingerprint, Feather, History } from "lucide-react";

const features = [
  {
    icon: <Feather className="w-5 h-5" />,
    title: "Pure Focus",
    desc: "A minimal editor that gets out of your way.",
  },
  {
    icon: <CloudOff className="w-5 h-5" />,
    title: "Offline First",
    desc: "Works instantly, even without signal.",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Encrypted",
    desc: "Your thoughts are locked to your device.",
  },
  {
    icon: <Fingerprint className="w-5 h-5" />,
    title: "Biometric",
    desc: "FaceID & TouchID support built-in.",
  },
  {
    icon: <History className="w-5 h-5" />,
    title: "Time Travel",
    desc: "Jump back to this day in previous years.",
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "AI Insights",
    desc: "On-device processing for weekly summaries.",
  },
];

const AboutSection = () => {
  return (
    <section className="w-full py-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        <StaggerSection className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Statement */}
            <StaggerItem className="lg:col-span-5 lg:sticky lg:top-32">
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white mb-8">
                    Why we built this.
                </h2>
                <div className="prose dark:prose-invert text-lg text-zinc-500 leading-relaxed font-serif italic border-l-2 border-zinc-200 dark:border-zinc-800 pl-6">
                    <p>"Most journaling apps feel like social networks. We wanted a quiet place to think that wasn't designed to keep us scrolling. A digital paper that doesn't sell your data."</p>
                </div>
            </StaggerItem>

            {/* Right: Bento Grid Features */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {features.map((item, i) => (
                    <StaggerItem key={i}>
                        <div className="h-full p-6 bg-white dark:bg-black rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm">
                            <div className="w-10 h-10 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-900 dark:text-white mb-4">
                                {item.icon}
                            </div>
                            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-zinc-500">{item.desc}</p>
                        </div>
                    </StaggerItem>
                ))}
            </div>
        </StaggerSection>
      </div>
    </section>
  );
};
export default AboutSection;