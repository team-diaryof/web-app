"use client"

import AnimatePageWrapper from '@/components/animations/animate-page-wrapper'
import { StaggerSection, StaggerItem } from "@/lib/animations"
import { AndroidLogoIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import {
    AlertCircle,
    Check,
    Loader2,
    ShieldCheck,
    Sparkles,
    WifiOff
} from 'lucide-react'
import { useState } from 'react'

const DownloadPage = () => {
    const apkUrl = "https://github.com/Saquib1973/hydrate-app/releases/download/v1.0.0/hydrated-1.0.0.apk";
    const [downloadStatus, setDownloadStatus] = useState<'idle' | 'processing' | 'downloading'>('idle');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleDownload = async () => {
        if (downloadStatus !== 'idle') return;
        setErrorMsg(null);

        try {
            setDownloadStatus('processing');
            // Simulate preparation time
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Trigger download
            const link = document.createElement('a');
            link.href = apkUrl;
            link.setAttribute('download', 'hydrated-v1.0.0.apk');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setDownloadStatus('downloading');

            // Reset state
            setTimeout(() => {
                setDownloadStatus('idle');
            }, 3000);
        } catch (err) {
            setDownloadStatus('idle');
            setErrorMsg("Download failed. Please try again.");
        }
    };

    return (
        <AnimatePageWrapper>
            <section className="min-h-[85vh] flex flex-col justify-center items-center px-6 py-20 font-sans">

                <div className="w-full max-w-xl mx-auto">

                    <StaggerSection className="flex flex-col items-center text-center">

                        {/* Version Pill */}
                        <StaggerItem>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full mb-8 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">v1.0.0 Public Beta</span>
                            </div>
                        </StaggerItem>

                        {/* Typography Heading */}
                        <StaggerItem>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.05] mb-6">
                                Simple. Focused. <br />
                                <span className="text-zinc-400 dark:text-zinc-600 font-serif italic">Offline.</span>
                            </h1>
                        </StaggerItem>

                        <StaggerItem>
                            <p className="text-lg text-zinc-500 leading-relaxed max-w-sm mb-12">
                                The diary app designed to get out of your way. No ads, no tracking, just your thoughts.
                            </p>
                        </StaggerItem>

                        {/* Action Area */}
                        <StaggerItem className="w-full max-w-xs space-y-6">
                            <button
                                onClick={handleDownload}
                                disabled={downloadStatus !== 'idle'}
                                className="group relative w-full h-14 bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black rounded-full overflow-hidden transition-all duration-300 active:scale-[0.98] shadow-xl shadow-zinc-200/50 dark:shadow-none"
                            >
                                <AnimatePresence mode="wait">
                                    {downloadStatus === 'idle' && (
                                        <motion.div
                                            key="idle"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="flex items-center justify-center gap-3 w-full h-full font-medium text-lg"
                                        >
                                            <AndroidLogoIcon className="w-5 h-5 opacity-80" weight="fill" />
                                            <span>Download APK</span>
                                        </motion.div>
                                    )}

                                    {downloadStatus === 'processing' && (
                                        <motion.div
                                            key="processing"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="absolute inset-0 flex items-center justify-center gap-2"
                                        >
                                            <Loader2 className="animate-spin opacity-80" size={20} />
                                            <span className="font-medium">Preparing...</span>
                                        </motion.div>
                                    )}

                                    {downloadStatus === 'downloading' && (
                                        <motion.div
                                            key="downloading"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            className="absolute inset-0 flex items-center justify-center gap-2"
                                        >
                                            <Check className="text-emerald-500 dark:text-emerald-600" strokeWidth={3} size={20} />
                                            <span className="font-medium">Downloading Started</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>

                            <div className="flex items-center justify-center gap-4 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                <span>15.4 MB</span>
                                <span className="w-1 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                                <span>Android 8.0+</span>
                            </div>
                        </StaggerItem>

                        {/* Minimal Features */}
                        <StaggerItem className="w-full mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-900">
                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    { icon: WifiOff, label: "Offline First" },
                                    { icon: ShieldCheck, label: "Secure Storage" },
                                    { icon: Sparkles, label: "Clean UI" },
                                ].map((Feature, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3 group cursor-default">
                                        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300">
                                            <Feature.icon size={20} strokeWidth={1.5} />
                                        </div>
                                        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{Feature.label}</span>
                                    </div>
                                ))}
                            </div>
                        </StaggerItem>

                    </StaggerSection>

                </div>

                {/* Error Toast */}
                <AnimatePresence>
                    {errorMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full border border-red-100 dark:border-red-900/50 shadow-xl text-sm font-medium z-50"
                        >
                            <AlertCircle size={16} />
                            {errorMsg}
                        </motion.div>
                    )}
                </AnimatePresence>

            </section>
        </AnimatePageWrapper>
    )
}

export default DownloadPage