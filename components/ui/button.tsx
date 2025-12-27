import { cn } from '@/lib/cn';
import Link from 'next/link';
import React from 'react';
import Loading from './loading';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link' | 'empty';
    href?: string;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    size?: "xs" | 'sm' | 'md' | 'lg';
}

const baseStyles = "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-white animate-theme duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none";

const variantStyles = {
    primary: 'hover:bg-black bg-black/90 text-zinc-50 dark:hover:bg-white dark:bg-white/90 dark:text-zinc-950',
    secondary: 'bg-zinc-100 hover:bg-zinc-200/80 text-black dark:bg-zinc-900/90 dark:hover:bg-zinc-900 border-zinc-200 border dark:border-zinc-800 dark:text-white',
    outline: 'border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 text-zinc-900',
    ghost: 'hover:bg-zinc-100 hover:text-zinc-900 text-zinc-600 hover:border-zinc-200 border border-transparent dark:hover:bg-zinc-900 dark:hover:text-white dark:text-white dark:hover:border-zinc-700',
    destructive: 'bg-red-500 text-zinc-50 hover:bg-red-500/90 shadow-sm',
    link: 'text-zinc-900 underline-offset-4 hover:underline p-0 h-auto rounded-none',
    empty: 'text-zinc-500 hover:text-zinc-900 underline-offset-4 p-0 h-auto rounded-none',
};

const sizeStyles = {
    xs: 'h-8 px-3 text-xs',
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6',
    lg: 'h-14 px-8 text-base',
};

const Button = ({
    children,
    onClick,
    className,
    variant = 'primary',
    href,
    disabled,
    loading = false,
    fullWidth = false,
    size = "md",
    ...props
}: ButtonProps) => {

    const compClasses = cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth ? "w-full" : "w-fit",
        className
    );

    if (href && !disabled && !loading) {
        return (
            <Link href={href} className={compClasses} onClick={onClick}>
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={compClasses}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <div className="flex items-center gap-2">
                    <Loading size="xs" dark={variant === 'secondary' || variant === 'outline' || variant === 'ghost'} />
                    <span className="opacity-70">{children}</span>
                </div>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;