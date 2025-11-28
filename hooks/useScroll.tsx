import { useEffect, useState } from "react";


export function useScroll(debounceMs = 100): { scrollY: number; scrollX: number } {
    const [scrollY, setScrollY] = useState(typeof window !== 'undefined' ? window.scrollY : 0);
    const [scrollX, setScrollX] = useState(typeof window !== 'undefined' ? window.scrollX : 0);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let timeout: NodeJS.Timeout;

        const handleScroll = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setScrollY(window.scrollY);
                setScrollX(window.scrollX);
            }, debounceMs);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeout);
        }
    }, [debounceMs])



    return { scrollY, scrollX };

}