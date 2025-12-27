export const GridPattern = ({ className }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 -z-10 h-full w-full stroke-zinc-100/50 dark:stroke-zinc-800/50 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)] ${className}`}>
      <svg className="h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M.5 40V.5H40" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
};