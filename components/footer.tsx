import Button from '@/components/ui/button'
import logo from '@/public/logo-landscape-white.png'
import { Github, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
const Footer = () => {
  return (
    <footer className="py-20 pb-16 px-6 bg-zinc-50/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">

        <div className="space-y-4">
          <Image src={logo} alt="DiaryOf" className='w-44 -translate-x-4' />
          <p className="text-sm text-zinc-500 max-w-xs">
            A minimal digital journal for preserving your thoughts and memories.
          </p>
        </div>

        <div className="flex gap-12 text-sm">
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-zinc-900">Product</span>
            <Link href="#download" className="text-zinc-500 hover:text-zinc-900">Download</Link>
            <Link href="#pricing" className="text-zinc-500 hover:text-zinc-900">Pricing</Link>
            <Link href="/login" className="text-zinc-500 hover:text-zinc-900">Log In</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-zinc-900">Legal</span>
            <Link href="/privacy" className="text-zinc-500 hover:text-zinc-900">Privacy</Link>
            <Link href="/terms-and-conditions" className="text-zinc-500 hover:text-zinc-900">Terms</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-zinc-900">Support</span>
            <Link href="/help" className="text-zinc-500 hover:text-zinc-900">Help</Link>
            <Link href="#" className="text-zinc-500 hover:text-zinc-900">teamdiaryof@gmail.com</Link>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-zinc-100 flex justify-between items-center text-xs text-zinc-400">
        <p>&copy; 2025 DiaryOf Inc.</p>
        <div className="flex gap-4">
          <Button variant='link' className='text-zinc-500 hover:text-zinc-900' href={"https://github.com/team-diaryof"}>
            <Github size={18} />
          </Button>
          <Button variant='link' className='text-zinc-500 hover:text-zinc-900' href={"https://x.com/diaryof"}>
            <Twitter size={18} />
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer