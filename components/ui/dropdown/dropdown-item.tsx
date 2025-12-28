// components/ui/dropdown/dropdown-item.tsx
"use client";

import { cn } from "@/lib/cn";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useDropdown } from "./dropdown";

interface DropdownItemProps {
  children: ReactNode;
  onClick?: () => void | Promise<void>;
  className?: string;
  disabled?: boolean;
  href?: string;
  preventClose?: boolean;
}

export function DropdownItem({
  children,
  onClick,
  className,
  href,
  disabled = false,
  preventClose = false,
}: DropdownItemProps) {
  const router = useRouter();
  const { close } = useDropdown();

  const handleClick = async () => {
    if (disabled) return;

    if (href) router.push(href);
    if (onClick) await onClick();

    if (!preventClose) close();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "w-full px-3 py-4 md:py-2.5 text-left text-2xl md:text-sm cursor-pointer transition-colors",
        // Light mode hover
        "hover:bg-zinc-50 text-zinc-800",
        // Dark mode styles
        "dark:hover:bg-zinc-800/50 dark:text-zinc-200",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}