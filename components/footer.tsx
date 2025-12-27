import logo from '@/public/logo-landscape-transparent.png';
import { ArrowUpRight } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import ThemeDropdown from "./ui/theme-dropdown"; // Import the new dropdown

const Footer = () => {
    return (
        <footer className="bg-zinc-50 dark:bg-zinc-950">
            <div className="max-w-[1400px] mx-auto px-6 py-20">

                <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
                    <div className="max-w-md">
                        <Image src={logo} alt="DiaryOf" className='dark:invert dark:brightness-0 w-40 mb-8' />
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
                            Preserve your diary.
                        </h2>
                        <p className="text-zinc-500 leading-relaxed">
                            A minimal digital journal for preserving your thoughts. Built for those who value clarity over clutter.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div className="flex flex-col gap-4">
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Product</span>
                            <Link href="/download" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Download</Link>
                            <Link href="/pricing" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Pricing</Link>
                            <Link href="/changelog" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Changelog</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Legal</span>
                            <Link href="/privacy" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Privacy</Link>
                            <Link href="/terms" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">Terms</Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Socials</span>
                            <Link href="#" className="flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                                Twitter <ArrowUpRight size={12} />
                            </Link>
                            <Link href="#" className="flex items-center gap-1 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
                                GitHub <ArrowUpRight size={12} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">

                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 order-2 md:order-1">
                        <p className="text-xs text-zinc-400 font-medium">&copy; {new Date().getFullYear()} DiaryOf Inc.</p>
                    </div>

                    <div className="order-1 md:order-2">
                        <ThemeDropdown />
                    </div>

                </div>

            </div>
        </footer >
    )
}

export default Footer