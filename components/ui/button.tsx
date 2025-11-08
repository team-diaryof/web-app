import Link from 'next/link';
import React from 'react'
import { cn } from '@/lib/utils';
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outlined';
    href?: string;
    disabled?: boolean;
}

const variantStyles = {
    primary: 'bg-black w-fit text-white font-playfair rounded-full p-3 px-6',
    secondary: 'bg-gray-100 w-fit text-black font-playfair rounded-full p-3 px-6',
    outlined: 'border-1 border-black w-fit text-black font-playfair rounded-full p-3 px-6',
}

const Button = ({ children, onClick, className, variant = 'primary', href, disabled }: ButtonProps) => {
    if(href) {
        return (
            <Link href={href} className={`btn ${variantStyles[variant]} ${className}`} onClick={onClick}>
                {children}
            </Link>
        )
    }
    return (
        <button onClick={onClick} className={cn("cursor-pointer",variantStyles[variant], className)} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button