'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';

//interfaces
interface DropdownProps {
    trigger: ReactNode;
    children: ReactNode;
    align?: 'left' | 'right' | 'center';
    className?: string;
    menuClassName?: string;
    mobileSlideFrom?: 'left' | 'right';
    onItemClick?: (callback: () => void) => void;
}
interface DropdownItemProps {
    children: ReactNode;
    onClick?: () => void | Promise<void>;
    className?: string;
    disabled?: boolean;
    href?: string;
    preventClose?: boolean;
}

// dropdown component
export function Dropdown({
    trigger,
    children,
    align = 'left',
    className,
    menuClassName,
    mobileSlideFrom = 'right',
    onItemClick,
}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const closeDropdown = () => setIsOpen(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);

            // Prevent body scroll on mobile when dropdown is open
            if (isMobile) {
                document.body.style.overflow = 'hidden';
            }
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, isMobile]);

    const getAlignmentClass = () => {
        switch (align) {
            case 'right':
                return 'right-0';
            case 'center':
                return 'left-1/2 -translate-x-1/2';
            case 'left':
            default:
                return 'left-0';
        }
    };

    const getMobileAnimation = () => {
        if (mobileSlideFrom === 'left') {
            return {
                initial: { x: '-100%' },
                animate: { x: 0 },
                exit: { x: '-100%' },
            };
        }
        return {
            initial: { x: '100%' },
            animate: { x: 0 },
            exit: { x: '100%' },
        };
    };

    const getDesktopAnimation = () => {
        return {
            initial: { opacity: 0, y: -10, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: -10, scale: 0.95 },
        };
    };

    const animation = isMobile ? getMobileAnimation() : getDesktopAnimation();

    return (
        <div ref={dropdownRef} className={cn('relative inline-block', className)}>
            <div onClick={() => setIsOpen(!isOpen)} className={`cursor-pointer p-2 ${isOpen ? 'bg-gray-50' : ''}`}>
                {trigger}
            </div>

            <AnimatePresence>
                {isOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}
                {isOpen && (
                    <motion.div
                        initial={animation.initial}
                        animate={animation.animate}
                        exit={animation.exit}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className={cn(
                            isMobile
                                ? `fixed ${mobileSlideFrom === 'left' ? 'left-0' : 'right-0'} top-0 bottom-0 w-full bg-white shadow-2xl z-50 overflow-y-auto`
                                : 'absolute z-50 mt-2 min-w-[200px] border border-gray-200 bg-gray-50',
                            !isMobile && getAlignmentClass(),
                            menuClassName
                        )}
                    >
                        {isMobile && (
                            <div className="flex items-center justify-end p-4">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 bg-gray-100"
                                    aria-label="Close menu"
                                >
                                    <XIcon />
                                </button>
                            </div>
                        )}
                        <div>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

//dropdown item component
export function DropdownItem({
    children,
    onClick,
    className,
    href,
    disabled = false,
    preventClose = false,
}: DropdownItemProps) {
    const router = useRouter()
    
    const handleClick = async () => {
        if (href) {
            router.push(href);
        } else if (onClick) {
            await onClick();
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled}
            className={cn(
                'w-full px-4 py-3 text-left text-2xl md:text-sm cursor-pointer transition-colors',
                disabled && 'opacity-50 cursor-not-allowed hover:bg-white',
                className
            )}
        >
            {children}
        </button>
    );
}