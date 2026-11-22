import Image from "next/image";

/** The NG Studio logo image (transparent background). */
export function LogoMark({ size = 56, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="NG Studio"
      width={size}
      height={size}
      priority
      className={className}
    />
  );
}

export default function Logo({ className = "h-14 w-14 sm:h-16 sm:w-16" }: { className?: string }) {
  return (
    <span className="flex items-center">
      <LogoMark size={72} className={className} />
      <span className="sr-only">NG Studio</span>
    </span>
  );
}
