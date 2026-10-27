"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const d = dot.current!;
    const r = ring.current!;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3" });

    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      document.documentElement.classList.add("cursor-on");
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as Element).closest<HTMLElement>("[data-cursor], a, button");
      const text = target?.dataset.cursor ?? "";
      r.classList.toggle("is-hover", !!target);
      r.classList.toggle("has-label", !!text);
      if (label.current) label.current.textContent = text;
    };
    const down = () => r.classList.add("is-down");
    const up = () => r.classList.remove("is-down");
    const leave = () => document.documentElement.classList.remove("cursor-on");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor", "cursor-on");
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span ref={label} />
      </div>
    </>
  );
}
