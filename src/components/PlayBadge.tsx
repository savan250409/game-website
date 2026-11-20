export function PlayIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M3.6 2.2 13.4 12l-9.8 9.8c-.4-.2-.6-.6-.6-1.1V3.3c0-.5.2-.9.6-1.1Z" fill="#2E9BFF" />
      <path d="m16.7 8.7-3.3 3.3-9.8-9.8c.3-.2.8-.2 1.2 0l11.9 6.5Z" fill="#12B5A5" />
      <path d="m16.7 15.3-11.9 6.5c-.4.2-.9.2-1.2 0l9.8-9.8 3.3 3.3Z" fill="#FF5B3A" />
      <path d="m20.4 13.3-3.7 2-3.3-3.3 3.3-3.3 3.7 2c1 .6 1 2 0 2.6Z" fill="#FFC23C" />
    </svg>
  );
}

/** "Get it on Google Play" button. */
export default function PlayBadge({
  href,
  label = "Get it on",
  dark = true,
  className = "",
}: {
  href: string;
  label?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative inline-flex items-center gap-3 overflow-hidden rounded-2xl px-5 py-3 ${
        dark ? "bg-ink text-white shadow-lift" : "border-2 border-ink bg-paper text-ink"
      } ${className}`}
    >
      <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <PlayIcon className="h-7 w-7" />
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] font-semibold tracking-wider uppercase opacity-70">{label}</span>
        <span className="font-display text-lg font-bold">Google Play</span>
      </span>
    </a>
  );
}
