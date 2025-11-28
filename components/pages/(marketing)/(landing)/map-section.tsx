"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { MapPin } from "lucide-react";

// Dynamically import the map to avoid SSR issues
const Map = dynamic(() => import("@/components/ui/map"), { ssr: false });

export default function MapSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12 lg:gap-24">
        
        {/* Text Content */}
        <motion.div 
            className="lg:col-span-1 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
        >
            <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-zinc-900">
                    Built in India.
                </h2>
                <p className="text-zinc-500 leading-relaxed">
                    DiaryOf is crafted with care in Patna. We believe in building software that feels human.
                </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-zinc-100">
                <div className="flex gap-4">
                    <div className="mt-1 bg-zinc-50 p-2 rounded-lg h-fit">
                        <MapPin size={20} className="text-zinc-900"/>
                    </div>
                    <div>
                        <h4 className="font-medium text-zinc-900">Headquarters</h4>
                        <p className="text-sm text-zinc-500 mt-1">
                            Alinagar, Patna<br/>
                            Bihar, India - 800002
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Map Container */}
        <motion.div 
            className="lg:col-span-2 h-[400px] bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-200"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
             <Map 
                position={[25.58, 85.09]} 
                title="DiaryOf HQ" 
                description="Alinagar, Patna, Bihar" 
                zoom={14} 
            />
        </motion.div>

      </div>
    </section>
  );
}