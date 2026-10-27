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

// Page-transition signal: heavy work (WebGL, intro timelines) waits until the
// colour columns have uncovered the new page so the wipe never stutters.
let transitioning = false;
const revealListeners = new Set<() => void>();

export const isTransitioning = () => transitioning;

export function setTransitioning(value: boolean) {
  transitioning = value;
  if (!value) {
    revealListeners.forEach((fn) => fn());
    revealListeners.clear();
  }
}

export function whenRevealed(fn: () => void) {
  if (!transitioning) {
    fn();
    return () => {};
  }
  revealListeners.add(fn);
  return () => revealListeners.delete(fn);
}
