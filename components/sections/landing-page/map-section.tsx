"use client";

import { MapPin } from "lucide-react";
import { StaggerSection, StaggerItem } from "@/lib/animations";
import dynamic from "next/dynamic";

// CRITICAL FIX: Use next/dynamic with ssr: false. 
// This prevents the 'window is not defined' error by ensuring the Map component 
// and the Leaflet library are NEVER loaded on the server.
const Map = dynamic(() => import("@/components/ui/map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-zinc-50 dark:bg-zinc-800 animate-pulse flex items-center justify-center text-zinc-400">
      <span className="text-sm font-medium">Loading Map...</span>
    </div>
  ),
});

export default function MapSection() {
  return (
    <section className="py-24 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <StaggerSection 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          viewportAmount={0.3}
        >

          {/* Text Content */}
          <StaggerItem className="flex flex-col justify-center order-2 lg:order-1">
            <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 font-medium mb-4 text-xs uppercase tracking-widest">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-50 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500">
                <MapPin size={12} />
              </span>
              <span>Our Roots</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-normal text-zinc-900 dark:text-white mb-6 tracking-tight font-serif">
              Made in Patna.
            </h2>
            
            <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-10 max-w-md font-light">
              Crafted with care in Bihar, India. We believe in software that feels human, 
              respects privacy, and works efficiently offline.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-zinc-100 dark:border-zinc-800/50">
              <div>
                <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-200 mb-1">Address</h4>
                <p className="text-zinc-500 dark:text-zinc-500 text-sm leading-relaxed font-light">
                  Alinagar, Patna<br />
                  Bihar 800002, India
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-200 mb-1">Contact</h4>
                <p className="text-zinc-500 dark:text-zinc-500 text-sm leading-relaxed font-light">
                  hello@diaryof.com<br />
                  +91 123 456 7890
                </p>
              </div>
            </div>
          </StaggerItem>

          {/* Map Card */}
          <StaggerItem 
            className="order-1 lg:order-2 w-full rounded-4xl overflow-hidden relative isolate bg-zinc-50 dark:bg-zinc-900/50"
          >
             <Map
                position={[25.58, 85.09]}
                title="DiaryOf HQ"
                description="Alinagar, Patna"
                zoom={13}
              />
          </StaggerItem>

        </StaggerSection>
      </div>
    </section>
  );
}