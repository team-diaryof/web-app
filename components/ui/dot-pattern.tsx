export const DotPattern = ({ className }: { className?: string }) => {
    return (
        <div className={`absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] ${className}`} />
    );
};