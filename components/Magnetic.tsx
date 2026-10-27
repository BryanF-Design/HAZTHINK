"use client";

import { cloneElement, isValidElement, useEffect, useRef, type ReactElement, type Ref } from "react";
import { gsap } from "@/lib/gsap";

/** Pulls its single child toward the pointer. */
export default function Magnetic({ children, strength = 0.35 }: { children: ReactElement; strength?: number }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.35)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.35)" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  if (!isValidElement(children)) return children;
  return cloneElement(children as ReactElement<{ ref?: Ref<HTMLElement> }>, { ref });
}
