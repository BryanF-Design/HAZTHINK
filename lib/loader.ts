"use client";

// Tiny shared signal so sections can wait for the preloader before animating in.
let ready = false;
const listeners = new Set<() => void>();

export const isSiteReady = () => ready;

export function markSiteReady() {
  if (ready) return;
  ready = true;
  document.documentElement.dataset.ready = "true";
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onSiteReady(fn: () => void) {
  if (ready) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** True for the OS setting and for the in-site "reduce motion" option. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  (document.documentElement.classList.contains("reduced") || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
