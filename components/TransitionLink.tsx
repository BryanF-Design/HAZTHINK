"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

/** Internal link that plays the color-column wipe before navigating. */
export default function TransitionLink({ href, onClick, ...rest }: Props) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        const target = typeof href === "string" ? href : href.pathname ?? "/";
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.button !== 0 ||
          target.startsWith("#") ||
          target === pathname
        )
          return;
        event.preventDefault();
        window.dispatchEvent(new CustomEvent("hz:navigate", { detail: target }));
      }}
    />
  );
}
