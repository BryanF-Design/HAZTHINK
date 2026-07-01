/* Mobile nav toggle */
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.getElementById("main-nav");

navToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

/* Footer year */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Custom cursor */
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;

if (supportsFinePointer && cursorDot && cursorRing) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  const tick = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  const hoverTargets = "a, button, .stack-card, .service-card, .contact-item";
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("is-active"));
    el.addEventListener("mouseleave", () => cursorRing.classList.remove("is-active"));
  });
}

/* Scroll reveal */
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

/* Hero line stagger with anime.js */
const heroLines = document.querySelectorAll(".hero-title .line");

heroLines.forEach((line) => {
  const span = document.createElement("span");
  span.textContent = line.textContent;
  line.textContent = "";
  line.appendChild(span);
});

if (window.anime) {
  anime({
    targets: ".hero-title .line span",
    translateY: ["110%", "0%"],
    duration: 900,
    delay: anime.stagger(140, { start: 200 }),
    easing: "easeOutExpo",
  });

  anime({
    targets: [".hero-eyebrow", ".hero-lead", ".hero-actions", ".scroll-note"],
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 700,
    delay: anime.stagger(120, { start: 700 }),
    easing: "easeOutCubic",
  });

  anime({
    targets: ".hero-blob-1",
    translateY: [0, -24],
    duration: 5200,
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine",
  });
  anime({
    targets: ".hero-blob-2",
    translateY: [0, 18],
    translateX: [0, -12],
    duration: 4200,
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine",
  });
  anime({
    targets: ".hero-blob-3",
    translateY: [0, -14],
    translateX: [0, 10],
    duration: 4800,
    direction: "alternate",
    loop: true,
    easing: "easeInOutSine",
  });
} else {
  document.querySelectorAll(".hero-title .line span").forEach((span) => {
    span.style.transform = "translateY(0)";
  });
  document
    .querySelectorAll(".hero-eyebrow, .hero-lead, .hero-actions, .scroll-note")
    .forEach((el) => (el.style.opacity = "1"));
}

/* Stacked project cards: scale + dim as the next card arrives */
const stackCards = [...document.querySelectorAll(".stack-card")];

if (stackCards.length) {
  const stickyTop = (index) => 96 + index * 26;
  let ticking = false;

  const updateStack = () => {
    stackCards.forEach((card, index) => {
      const next = stackCards[index + 1];
      if (!next) {
        card.style.transform = "";
        card.style.filter = "";
        return;
      }
      const nextTop = next.getBoundingClientRect().top;
      const progress = Math.min(Math.max((stickyTop(index + 1) + 220 - nextTop) / 220, 0), 1);
      card.style.transform = `scale(${1 - 0.06 * progress}) translateY(${-14 * progress}px)`;
      card.style.filter = `brightness(${1 - 0.2 * progress})`;
    });
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateStack);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  requestUpdate();
}
