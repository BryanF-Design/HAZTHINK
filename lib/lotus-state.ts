// Mutable state shared between GSAP scroll timelines and the R3F render loop.
export const lotusState = {
  /** 0 → 1 while the hero is pinned. Opens the petals and turns the flower. */
  progress: 0,
  /** 0 → 1 once the preloader finishes. Grows the flower in. */
  intro: 0,
  /** Short impulse on click/tap. */
  burst: 0,
};
