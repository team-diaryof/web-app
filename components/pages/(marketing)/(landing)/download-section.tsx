"use client"
import Loading from '@/components/ui/loading';
import { AndroidLogoIcon } from '@phosphor-icons/react';
import { AnimatePresence, Easing, motion, Variants } from 'framer-motion';
import { AlertTriangle, Apple, Check, Download, Loader2 } from 'lucide-react';
import { useState } from 'react';

// --- Animation Constants ---
const SMOOTH_EASE = [0.42, 0, 0.58, 1] as Easing;

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: SMOOTH_EASE
    }
  }
};

// --- Data for the Left Section ---
const features = [
  {
    title: "Honest Stories",
    desc: "We skip the marketing fluff and get straight to the people making wine with integrity and passion."
  },
  {
    title: "Better Process",
    desc: "Highlighting producers who care about the land, the grapes, and the final product in your glass."
  },
  {
    title: "Curated Recommendations",
    desc: "Every bottle, bar, and event is personally vetted. If we wouldn't go, we won't send you."
  },
  {
    title: "No Pay-to-Play",
    desc: "Our reviews are independent. We don't accept payment for positive coverage, ever."
  }
];

const AppFeaturesSection = () => {
  const apkUrl = "https://github.com/Saquib1973/hydrate-app/releases/download/v1.0.0/hydrated-1.0.0.apk";
  
  // State for button animation: 'idle' | 'processing' | 'downloading'
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'processing' | 'downloading'>('idle');

  const isMobileOrTablet = () => {
    if (typeof window === 'undefined') return false;
    const isTouch = navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 1024;
    return isTouch && isSmallScreen;
  };

  const handleDownload = async () => {
    // Prevent double clicks
    if (downloadStatus !== 'idle') return;

    if (isMobileOrTablet()) {
      // 1. Start Processing State
      setDownloadStatus('processing');

      // 2. Simulate preparation time (e.g. fetching link or UX delay)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // 3. Trigger Download (Same window)
      window.location.href = apkUrl;

      // 4. Show Success State
      setDownloadStatus('downloading');

      // 5. Reset to idle after a few seconds so they can download again if needed
      setTimeout(() => {
        setDownloadStatus('idle');
      }, 4000);

    } else {
      alert("Download is only available on mobile or tablet devices.");
    }
  };


  return (
    <div id='download' className="w-full h-screen-navbar flex items-center max-w-6xl mx-auto px-6 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

        <motion.div
          className="lg:col-span-7 max-md:hidden"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
            What to Expect
          </motion.h2>

          <div className="space-y-6">
            {features.map((feature, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="flex gap-5">
                {/* Number Badge */}
                <span className="shrink-0 w-8 h-8 rounded-full bg-zinc-100 text-zinc-500 font-bold flex items-center justify-center text-sm mt-1">
                  {idx + 1}
                </span>

                {/* Content */}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-base leading-relaxed max-w-lg">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>


        <motion.div
          className="lg:col-span-5 h-full"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={fadeInUp}
            className="bg-zinc-50 rounded-3xl p-8 border border-zinc-200 relative overflow-hidden group h-full"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-gray-200 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get the App
              </h2>

              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Read stories on the go. Currently available for Android via direct download.
              </p>

              <div className="space-y-4">
                
                <motion.button
                  onClick={handleDownload}
                  // Animate background color based on state
                  animate={{
                    backgroundColor: downloadStatus === 'downloading' ? '#10B981' : '#18181b', // Green if success, else primary (zinc-900)
                    scale: downloadStatus === 'processing' ? 0.98 : 1
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative flex items-center w-full justify-between p-4 rounded-xl shadow-sm hover:shadow-md overflow-hidden min-h-[80px]"
                >
                  <AnimatePresence mode="wait">
                    
                    {/* STATE 1: IDLE */}
                    {downloadStatus === 'idle' && (
                      <motion.div 
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center w-full justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-amber-50 p-2.5 rounded-lg bg-white/10">
                            <AndroidLogoIcon size={24} />
                          </div>
                          <div className="text-left">
                            <div className="text-sm text-white font-medium uppercase tracking-wider">Download APK</div>
                            <div className="text-xs font-bold text-zinc-300">Android</div>
                          </div>
                        </div>
                        <Download size={20} className="text-white" />
                      </motion.div>
                    )}

                    {/* STATE 2: PROCESSING */}
                    {downloadStatus === 'processing' && (
                      <motion.div 
                        key="processing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center w-full gap-3 text-white"
                      >
                        <Loading size='md' dark />
                        <span className="font-medium">Getting things ready...</span>
                      </motion.div>
                    )}

                    {/* STATE 3: SUCCESS/DOWNLOADING */}
                    {downloadStatus === 'downloading' && (
                      <motion.div 
                        key="downloading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center w-full gap-3 text-white"
                      >
                        <div className="bg-white/20 p-1 rounded-full">
                          <Check size={20} strokeWidth={3} />
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-sm">Download Started!</div>
                          <div className="text-xs opacity-90">Check your notification bar</div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </motion.button>

                {/* iOS Button (Disabled) */}
                <div className="flex items-center justify-between p-4 bg-gray-100/50 rounded-xl border border-gray-200 border-dashed cursor-not-allowed opacity-70">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-200 text-gray-400 p-2.5 rounded-lg">
                      <Apple size={24} strokeWidth={1.5} />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Coming Soon</div>
                      <div className="text-sm font-bold text-gray-400">iOS Version</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Beta Warning */}
              <div className="mt-8 pt-6 border-t border-gray-200/60">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <AlertTriangle size={14} />
                  <span className="font-medium">App is currently in Beta.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}

export default AppFeaturesSection