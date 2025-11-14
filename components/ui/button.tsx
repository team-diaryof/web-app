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
    size?: 'sm' | 'md' | 'lg';
}   

const variantStyles = {
    primary: 'bg-black w-fit text-white font-playfair rounded-full',
    secondary: 'bg-gray-100 w-fit text-black font-playfair rounded-full',
    outlined: 'border-1 border-black w-fit text-black font-playfair rounded-full',
}
const sizeStyles = {
    sm: 'p-2 px-4 text-sm',
    md: 'p-3 px-6 text-md',
    lg: 'p-4 px-8 text-lg',
}

const Button = ({ children, onClick, className, variant = 'primary', href, disabled, size = "md" }: ButtonProps) => {
    if (href) {
        return (
            <Link href={href} className={`btn ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} onClick={onClick}>
                {children}
            </Link>
        )
    }
    return (
        <button onClick={onClick} className={cn("cursor-pointer", variantStyles[variant], sizeStyles[size], className)} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button