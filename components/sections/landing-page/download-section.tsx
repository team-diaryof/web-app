"use client"
import AnimatePageWrapper from '@/components/animations/animate-page-wrapper'
import Button from '@/components/ui/button'
import { StaggerItem, StaggerSection, letterVariants } from "@/lib/animations"
import { Apple, Smartphone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const DownloadSection = () => {
    const router = useRouter()
    const bgText = "DOWNLOAD";

    return (
        <section id='download' className="relative w-full py-32 overflow-hidden bg-white dark:bg-black">
            
            {/* Letter by Letter Animation Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                 <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex space-x-2 md:space-x-4 lg:space-x-8"
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                >
                    {bgText.split("").map((char, i) => (
                        <motion.span 
                            key={i} 
                            variants={letterVariants}
                            className="text-[12vw] lg:text-[15vw] font-black text-zinc-100 dark:text-zinc-900 leading-none"
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>
            </div>

            <AnimatePageWrapper className="relative z-10 max-w-[1400px] mx-auto px-6 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Phone Image First on Mobile/Desktop Order Adjusted via Flex if needed, but standard Grid is good */}
                    <StaggerSection className="flex justify-center order-2 lg:order-1">
                        <StaggerItem type="scale">
                            <div className="relative w-[260px] md:w-[300px] aspect-[9/19] bg-black rounded-[44px] border-[8px] border-zinc-900 shadow-2xl ring-1 ring-zinc-200 dark:ring-zinc-800">
                                <video src="/app-demo.mp4" className="w-full h-full object-cover rounded-[34px]" autoPlay muted loop playsInline />
                            </div>
                        </StaggerItem>
                    </StaggerSection>

                    <StaggerSection className="flex flex-col items-center lg:items-start text-center lg:text-left order-1 lg:order-2">
                        <StaggerItem>
                            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-6">
                                Your Memories.<br />
                                <span className="text-zinc-400">In your pocket.</span>
                            </h2>
                        </StaggerItem>
                        <StaggerItem>
                            <p className="text-zinc-500 text-lg max-w-md mb-8 leading-relaxed">
                                Experience the clarity of offline-first journaling. Biometrically secured and designed for focus, wherever you go.
                            </p>
                        </StaggerItem>
                        <StaggerItem className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button className="h-14 px-8 text-lg bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black" onClick={() => router.push('/download')}>
                                <Apple size={20} className="mr-2" /> iOS App
                            </Button>
                            <Button variant="outline" className="h-14 px-8 text-lg" onClick={() => router.push('/download')}>
                                <Smartphone size={20} className="mr-2" /> Android
                            </Button>
                        </StaggerItem>
                    </StaggerSection>

                </div>
            </AnimatePageWrapper>
        </section>
    )
}
export default DownloadSection