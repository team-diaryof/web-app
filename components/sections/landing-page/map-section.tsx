"use client";
import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { StaggerSection, StaggerItem } from "@/lib/animations";

const Map = dynamic(() => import("@/components/ui/map"), { ssr: false });

export default function MapSection() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-black">
      <div className="max-w-[1400px] mx-auto">
         <StaggerSection className="grid lg:grid-cols-2 gap-8">
             
            <StaggerItem>
                <div className="h-full flex flex-col justify-center p-12 bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800">
                    <div className="w-12 h-12 bg-white dark:bg-black rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                        <MapPin className="text-zinc-900 dark:text-white" size={24} />
                    </div>
                    <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6">Made in Patna.</h2>
                    <p className="text-lg text-zinc-500 leading-relaxed mb-8">
                        Crafted with care in Bihar, India. We believe in software that feels human, respects your privacy, and works efficiently offline.
                    </p>
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-black rounded-full border border-zinc-200 dark:border-zinc-800 w-fit">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm font-medium">Alinagar, Patna - 800002</span>
                    </div>
                </div>
            </StaggerItem>

            <StaggerItem>
                <div className="h-[500px] w-full bg-zinc-100 dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 relative group">
                    <div className="absolute inset-0 z-10 pointer-events-none border-[12px] border-white/50 dark:border-black/50 rounded-[2.5rem]" />
                    <Map 
                        position={[25.58, 85.09]} 
                        title="DiaryOf HQ" 
                        description="Alinagar, Patna" 
                        zoom={14} 
                    />
                </div>
            </StaggerItem>

         </StaggerSection>
      </div>
    </section>
  );
}