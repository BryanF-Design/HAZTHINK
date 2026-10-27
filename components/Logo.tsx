import Image from "next/image";

/** Horizontal lockup built from the real HAZTHINK wordmark and lotus. */
export default function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const suffix = light ? "-light" : "";
  return (
    <span className={`logo ${className}`}>
      <Image className="logo-word" src={`/brand/wordmark${suffix}.png`} alt="HAZTHINK" width={912} height={126} priority />
      <Image className="logo-lotus" src={`/brand/lotus${suffix}.png`} alt="" width={724} height={570} priority />
    </span>
  );
}
