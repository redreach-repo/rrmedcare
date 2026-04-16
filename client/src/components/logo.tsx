export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="RRmedcare icon"
      >
        {/* Rounded square with medical cross */}
        <rect x="1" y="1" width="30" height="30" rx="8" fill="currentColor" opacity="0.12" />
        <rect x="13" y="6" width="6" height="20" rx="2" fill="currentColor" />
        <rect x="6" y="13" width="20" height="6" rx="2" fill="currentColor" />
      </svg>
      <span className="font-semibold text-[1em] leading-none tracking-tight">
        <span className="font-bold">RR</span>
        <span className="font-normal text-muted-foreground">medcare</span>
      </span>
    </div>
  );
}
