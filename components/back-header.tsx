// components/back-header.tsx
"use client"

import Image from "next/image"
import logo from "@/public/logo-landscape-transparent.png"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const BackHeader = () => {
    const router = useRouter()
    return (
        <div className="flex items-center justify-between w-full p-2">
            <ChevronLeft className="transition-colors duration-500 cursor-pointer hover:bg-gray-100 rounded-full p-2 size-10" onClick={()=>router.back()} />
            <Link href="/">
                <Image
                    src={logo}
                    alt="Logo"
                    width={150}
                    height={50}
                    priority
                />
            </Link>
            <div />
        </div>
    )
}

export default BackHeader