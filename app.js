const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;

/* Print-registration loader. Short, deterministic and never blocks accessibility. */
const preloader = document.querySelector("[data-preloader]");
const loaderCount = document.querySelector("[data-loader-count]");
const loaderStartedAt = performance.now();

if (preloader) {
  document.body.classList.add("preloading");
  const loaderDuration = prefersReducedMotion ? 120 : 980;

  const renderLoader = (now) => {
    const progress = Math.min((now - loaderStartedAt) / loaderDuration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    preloader.style.setProperty("--loader-progress", eased.toFixed(4));
    if (loaderCount) loaderCount.textContent = String(Math.round(eased * 100)).padStart(2, "0");
    if (progress < 1) requestAnimationFrame(renderLoader);
  };

  requestAnimationFrame(renderLoader);

  const dismissLoader = () => {
    const elapsed = performance.now() - loaderStartedAt;
    const remaining = Math.max(loaderDuration - elapsed, 0);
    window.setTimeout(() => {
      preloader.classList.add("is-done");
      document.body.classList.remove("preloading");
    }, remaining);
  };

  dismissLoader();
}

/* Preserve the brand colors while turning only near-black ink white on dark surfaces. */
if (!document.getElementById("hazthink-filter-defs")) {
  document.body.insertAdjacentHTML("afterbegin", `
    <svg id="hazthink-filter-defs" aria-hidden="true" width="0" height="0" style="position:absolute;overflow:hidden">
      <defs>
        <filter id="hazthink-logo-on-dark" color-interpolation-filters="sRGB">
          <feColorMatrix in="SourceGraphic" result="darkness" type="matrix" values="
            0 0 0 0 1
            0 0 0 0 1
            0 0 0 0 1
            -0.333 -0.333 -0.333 0 1" />
          <feComposite in="darkness" in2="SourceAlpha" operator="in" result="darkness-clipped" />
          <feComponentTransfer in="darkness-clipped" result="dark-mask">
            <feFuncA type="discrete" tableValues="0 0 0 0 1" />
          </feComponentTransfer>
          <feFlood flood-color="#ffffff" result="white" />
          <feComposite in="white" in2="dark-mask" operator="in" result="white-ink" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="white-ink" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  `);
}

/* Navigation */
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.getElementById("main-nav");

const closeNavigation = () => {
  mainNav?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Abrir menú");
};

navToggle?.addEventListener("click", () => {
  const isOpen = mainNav?.classList.toggle("is-open") ?? false;
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

mainNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNavigation));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

/* Same-site page transition reuses the loader as a pink print-sheet wipe. */
document.querySelectorAll("a[href]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!preloader || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target === "_blank" || link.hasAttribute("download")) return;

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (destination.pathname === window.location.pathname && destination.hash) return;

    event.preventDefault();
    preloader.classList.add("is-returning");
    document.body.classList.add("preloading");
    window.setTimeout(() => {
      window.location.assign(destination.href);
    }, prefersReducedMotion ? 20 : 360);
  });
});

/* Current year */
document.querySelectorAll(".year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

/* Scroll state and page progress */
const siteHeader = document.getElementById("siteHeader");
let scrollFramePending = false;

const updateScrollState = () => {
  const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
  document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 24);
  scrollFramePending = false;
};

const requestScrollUpdate = () => {
  if (scrollFramePending) return;
  scrollFramePending = true;
  requestAnimationFrame(updateScrollState);
};

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);
updateScrollState();

/* Contextual custom cursor */
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const cursorLabel = cursorRing?.querySelector("span");

if (supportsFinePointer && cursorDot && cursorRing) {
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let ringX = pointerX;
  let ringY = pointerY;

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    cursorDot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  const renderCursor = () => {
    ringX += (pointerX - ringX) * 0.16;
    ringY += (pointerY - ringY) * 0.16;
    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  };
  renderCursor();

  const cursorTargets = document.querySelectorAll("a, button, [data-cursor], .slide3d");
  cursorTargets.forEach((target) => {
    target.addEventListener("pointerenter", () => {
      cursorRing.classList.add("is-active");
      if (cursorLabel) cursorLabel.textContent = target.dataset.cursor || (target.matches("a") ? "Ir" : "Toca");
    });
    target.addEventListener("pointerleave", () => cursorRing.classList.remove("is-active"));
  });

  document.documentElement.addEventListener("mouseleave", () => {
    cursorDot.style.opacity = "0";
    cursorRing.style.opacity = "0";
  });
  document.documentElement.addEventListener("mouseenter", () => {
    cursorDot.style.opacity = "1";
    cursorRing.style.opacity = "1";
  });
}

/* Magnetic hover — kept deliberately subtle */
if (supportsFinePointer && !prefersReducedMotion) {
  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.transform = `translate3d(${x * 10}px, ${y * 8}px, 0)`;
    });
    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });
}

/* Pointer tilt on legacy cards across the inner pages */
if (supportsFinePointer && !prefersReducedMotion) {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  document.querySelectorAll(".tilt, .contact-method-card, .project-mini-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--rx", `${clamp(-py * 10, -6, 6)}deg`);
      card.style.setProperty("--ry", `${clamp(px * 10, -6, 6)}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

/* Press feedback for touch, pen and mouse */
document.querySelectorAll("button, .button, [data-interactive-card], .project-piece").forEach((element) => {
  element.addEventListener("pointerdown", () => element.classList.add("is-pressed"));
  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    element.addEventListener(eventName, () => element.classList.remove("is-pressed"));
  });
});

/* Hold state: an optional tactile preview; click remains the accessible primary action. */
document.querySelectorAll("[data-interactive-card]").forEach((card) => {
  let holdTimer = 0;
  const clearHold = () => {
    window.clearTimeout(holdTimer);
    card.classList.remove("is-holding");
  };

  card.addEventListener("pointerdown", () => {
    holdTimer = window.setTimeout(() => card.classList.add("is-holding"), 460);
  });
  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    card.addEventListener(eventName, clearHold);
  });
});

/* Scroll reveals */
const revealItems = document.querySelectorAll(".reveal");
if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });

  revealItems.forEach((item) => revealObserver.observe(item));
}

/* Controlled parallax: transform-only, viewport-bound and disabled for reduced motion. */
const parallaxDefinitions = [
  [".hero-logo", -0.08],
  [".hero-orbit-one", -0.14],
  [".hero-orbit-two", 0.1],
  [".contact-watermark", -0.07],
  [".process-glyph", 0.055],
  [".page-hero-wrap::after", 0],
];

const parallaxLayers = [];
if (!prefersReducedMotion) {
  parallaxDefinitions.forEach(([selector, speed]) => {
    if (!speed || selector.includes("::")) return;
    document.querySelectorAll(selector).forEach((element) => {
      element.classList.add("parallax-layer");
      parallaxLayers.push({ element, speed });
    });
  });
}

let parallaxFramePending = false;
const updateParallax = () => {
  const viewportCenter = window.innerHeight / 2;
  parallaxLayers.forEach(({ element, speed }) => {
    const rect = element.getBoundingClientRect();
    const distance = rect.top + rect.height / 2 - viewportCenter;
    const offset = Math.max(-70, Math.min(70, distance * speed));
    element.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
  });
  parallaxFramePending = false;
};

const requestParallaxUpdate = () => {
  if (parallaxFramePending || !parallaxLayers.length) return;
  parallaxFramePending = true;
  requestAnimationFrame(updateParallax);
};

if (parallaxLayers.length) {
  window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
  window.addEventListener("resize", requestParallaxUpdate);
  requestParallaxUpdate();
}

/* Hero line entrance */
document.querySelectorAll(".hero-title .line").forEach((line) => {
  if (line.firstElementChild) return;
  const content = document.createElement("span");
  content.textContent = line.textContent;
  line.textContent = "";
  line.appendChild(content);
});

if (prefersReducedMotion) {
  document.querySelectorAll(".hero-title .line span").forEach((line) => {
    line.style.transform = "none";
  });
}

/* Expandable services — click is the primary interaction */
document.querySelectorAll("[data-interactive-card]").forEach((card) => {
  const toggle = card.querySelector(".service-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const willOpen = !card.classList.contains("is-open");
    const grid = card.closest(".interactive-service-grid");

    grid?.querySelectorAll("[data-interactive-card].is-open").forEach((openCard) => {
      if (openCard === card) return;
      openCard.classList.remove("is-open");
      openCard.querySelector(".service-toggle")?.setAttribute("aria-expanded", "false");
    });

    card.classList.toggle("is-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
  });
});

/* Project artwork reacts to hover position without moving the card itself */
if (supportsFinePointer && !prefersReducedMotion) {
  document.querySelectorAll(".project-piece").forEach((piece) => {
    const art = piece.querySelector(".project-art");
    if (!art) return;

    piece.addEventListener("pointermove", (event) => {
      const rect = piece.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      art.style.transform = `scale(1.025) translate3d(${x * -10}px, ${y * -10}px, 0)`;
    });
    piece.addEventListener("pointerleave", () => {
      art.style.transform = "";
    });
  });
}

/* Legacy stacked cards on older project sections */
const stackCards = [...document.querySelectorAll(".stack-card")];
if (stackCards.length && !prefersReducedMotion) {
  const stickyTop = (index) => 96 + index * 26;
  let stackFramePending = false;

  const updateStack = () => {
    stackCards.forEach((card, index) => {
      const next = stackCards[index + 1];
      if (!next) return;
      const progress = Math.min(Math.max((stickyTop(index + 1) + 220 - next.getBoundingClientRect().top) / 220, 0), 1);
      card.style.transform = `perspective(1200px) rotateX(${5 * progress}deg) scale(${1 - 0.045 * progress}) translateY(${-12 * progress}px)`;
      card.style.filter = `brightness(${1 - 0.12 * progress})`;
    });
    stackFramePending = false;
  };

  const requestStackUpdate = () => {
    if (stackFramePending) return;
    stackFramePending = true;
    requestAnimationFrame(updateStack);
  };

  window.addEventListener("scroll", requestStackUpdate, { passive: true });
  window.addEventListener("resize", requestStackUpdate);
  requestStackUpdate();
}

/* 3D coverflow on proyectos.html */
class Slider3D {
  constructor(stageElement) {
    this.stage = stageElement;
    this.slides = [...stageElement.querySelectorAll(".slide3d")];
    this.total = this.slides.length;
    this.current = 0;
    this.timer = null;
    this.reducedMotion = prefersReducedMotion;

    document.getElementById("sliderPrev")?.addEventListener("click", () => this.go(this.current - 1));
    document.getElementById("sliderNext")?.addEventListener("click", () => this.go(this.current + 1));

    this.bulletsElement = document.getElementById("sliderBullets");
    this.slides.forEach((_, index) => {
      if (!this.bulletsElement) return;
      const bullet = document.createElement("button");
      bullet.className = "slider3d-bullet";
      bullet.type = "button";
      bullet.setAttribute("aria-label", `Mostrar proyecto ${index + 1}`);
      bullet.addEventListener("click", () => this.go(index));
      this.bulletsElement.appendChild(bullet);
    });

    let dragStart = 0;
    let isDragging = false;

    stageElement.addEventListener("pointerdown", (event) => {
      isDragging = true;
      dragStart = event.clientX;
      stageElement.setPointerCapture?.(event.pointerId);
    });
    stageElement.addEventListener("pointerup", (event) => {
      if (!isDragging) return;
      isDragging = false;
      const distance = event.clientX - dragStart;
      if (Math.abs(distance) > 48) this.go(this.current + (distance > 0 ? -1 : 1));
    });
    stageElement.addEventListener("pointercancel", () => { isDragging = false; });
    stageElement.addEventListener("pointerenter", () => this.stopAuto());
    stageElement.addEventListener("pointerleave", () => {
      isDragging = false;
      this.startAuto();
    });
    stageElement.addEventListener("focusin", () => this.stopAuto());
    stageElement.addEventListener("focusout", () => this.startAuto());

    this.update();
    this.startAuto();
  }

  go(index) {
    if (!this.total) return;
    this.current = ((index % this.total) + this.total) % this.total;
    this.update();
    this.startAuto();
  }

  stopAuto() {
    window.clearInterval(this.timer);
    this.timer = null;
  }

  startAuto() {
    this.stopAuto();
    if (this.reducedMotion || document.hidden) return;
    this.timer = window.setInterval(() => this.go(this.current + 1), 5200);
  }

  update() {
    const positions = [
      { ry: 0, tx: 0, scale: 1, opacity: 1, z: 10 },
      { ry: -30, tx: 440, scale: 0.84, opacity: 0.58, z: 5 },
      { ry: -48, tx: 700, scale: 0.7, opacity: 0, z: 1 },
      { ry: 48, tx: -700, scale: 0.7, opacity: 0, z: 1 },
      { ry: 30, tx: -440, scale: 0.84, opacity: 0.58, z: 5 },
    ];

    this.slides.forEach((slide, index) => {
      const offset = (index - this.current + this.total) % this.total;
      const position = positions[offset] || positions[2];
      slide.style.transform = `translateX(calc(-50% + ${position.tx}px)) rotateY(${position.ry}deg) scale(${position.scale})`;
      slide.style.opacity = position.opacity;
      slide.style.zIndex = position.z;
      slide.classList.toggle("is-active", offset === 0);
      slide.setAttribute("aria-hidden", String(offset !== 0));
    });

    this.bulletsElement?.querySelectorAll(".slider3d-bullet").forEach((bullet, index) => {
      const active = index === this.current;
      bullet.classList.toggle("is-active", active);
      bullet.setAttribute("aria-current", active ? "true" : "false");
    });
  }
}

const sliderStage = document.getElementById("slider3dStage");
if (sliderStage) new Slider3D(sliderStage);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) requestScrollUpdate();
});

/* Mobile tab active state */
const tabs = document.querySelectorAll(".mobile-tabbar .tab[data-tab]");
if (tabs.length) {
  let path = window.location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/");
  if (!path) path = "/";

  tabs.forEach((tab) => {
    const target = tab.getAttribute("data-tab");
    const active = target === "/" ? path === "/" : path === target || path.startsWith(`${target}/`);
    tab.classList.toggle("is-active", active);
    if (active) tab.setAttribute("aria-current", "page");
  });
}
