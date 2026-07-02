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

/* Footer / copyright year */
document.querySelectorAll(".year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

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

/* 3D tilt: cards tilt toward the pointer, the hero stage tilts across the whole hero */
if (window.matchMedia("(pointer: fine)").matches) {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  document.querySelectorAll(".service-card, .contact-item").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--rx", `${clamp(-py * 14, -10, 10)}deg`);
      card.style.setProperty("--ry", `${clamp(px * 14, -10, 10)}deg`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });

  const heroStage = document.querySelector(".hero-stage");
  const stageTilt = document.querySelector(".stage-tilt");

  if (heroStage && stageTilt) {
    heroStage.addEventListener("mousemove", (event) => {
      const rect = heroStage.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      stageTilt.style.setProperty("--rx", `${clamp(8 - py * 16, -8, 20)}deg`);
      stageTilt.style.setProperty("--ry", `${clamp(-12 + px * 20, -28, 4)}deg`);
    });
    heroStage.addEventListener("mouseleave", () => {
      stageTilt.style.setProperty("--rx", "8deg");
      stageTilt.style.setProperty("--ry", "-12deg");
    });
  }
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
  /* Hero intro (title + supporting copy) is CSS-driven for reliability.
     anime.js only handles the ambient float loops below. */

  /* Keep each mock's static 3D offset (set in CSS) while animating a float loop on top of it. */
  anime({
    targets: ".hero-stage .mock-post",
    translateZ: 60,
    rotate: -6,
    translateY: [
      { value: -14, duration: 2600 },
      { value: 0, duration: 2600 },
    ],
    loop: true,
    easing: "easeInOutSine",
  });
  anime({
    targets: ".hero-stage .mock-brand",
    translateZ: 110,
    rotate: 4,
    translateY: [
      { value: 10, duration: 3100 },
      { value: 0, duration: 3100 },
    ],
    loop: true,
    easing: "easeInOutSine",
  });
  anime({
    targets: ".hero-stage .mock-banner",
    translateZ: 20,
    rotate: 3,
    translateY: [
      { value: -8, duration: 3600 },
      { value: 0, duration: 3600 },
    ],
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
      card.style.transform = `perspective(1200px) rotateX(${6 * progress}deg) scale(${1 - 0.06 * progress}) translateY(${-14 * progress}px)`;
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

/* ============================================================
   PRELOADER
   ============================================================ */
(function () {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const dismiss = () => {
    preloader.classList.add("is-done");
    setTimeout(() => preloader.remove(), 1000);
  };

  if (sessionStorage.getItem("hz-visited")) {
    preloader.style.display = "none";
    return;
  }

  sessionStorage.setItem("hz-visited", "1");
  setTimeout(dismiss, 1650);
})();

/* ============================================================
   HEADER SCROLL SHADOW
   ============================================================ */
(function () {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
})();

/* ============================================================
   3D SLIDER
   ============================================================ */
class Slider3D {
  constructor(stageEl) {
    this.stage = stageEl;
    this.slides = [...stageEl.querySelectorAll(".slide3d")];
    this.total = this.slides.length;
    this.current = 0;
    this.timer = null;

    const prevBtn = document.getElementById("sliderPrev");
    const nextBtn = document.getElementById("sliderNext");
    const bulletsEl = document.getElementById("sliderBullets");

    if (prevBtn) prevBtn.addEventListener("click", () => this.go(this.current - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => this.go(this.current + 1));

    if (bulletsEl) {
      this.bulletsEl = bulletsEl;
      this.slides.forEach((_, i) => {
        const b = document.createElement("button");
        b.className = "slider3d-bullet";
        b.setAttribute("aria-label", `Proyecto ${i + 1}`);
        b.addEventListener("click", () => this.go(i));
        bulletsEl.appendChild(b);
      });
    }

    // Touch / drag
    let startX = 0;
    stageEl.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
    stageEl.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 48) this.go(this.current + (dx > 0 ? -1 : 1));
    });

    // Mouse drag
    let mouseDown = false;
    stageEl.addEventListener("mousedown", (e) => { mouseDown = true; startX = e.clientX; });
    stageEl.addEventListener("mouseup", (e) => {
      if (!mouseDown) return;
      mouseDown = false;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 48) this.go(this.current + (dx > 0 ? -1 : 1));
    });
    stageEl.addEventListener("mouseleave", () => { mouseDown = false; });

    this.update();
    this.startAuto();
  }

  go(index) {
    this.current = ((index % this.total) + this.total) % this.total;
    this.update();
    this.startAuto();
  }

  startAuto() {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.go(this.current + 1), 5000);
  }

  update() {
    // Position config for 5-slide coverflow
    // Index maps to: 0=center, 1=right1, 2=far-right, 3=far-left, 4=left1
    const P = [
      { ry:   0, tx:    0, s: 1.00, op: 1.00, zi: 10 },
      { ry: -32, tx:  440, s: 0.84, op: 0.62, zi:  5 },
      { ry: -52, tx:  700, s: 0.68, op: 0.00, zi:  1 },
      { ry:  52, tx: -700, s: 0.68, op: 0.00, zi:  1 },
      { ry:  32, tx: -440, s: 0.84, op: 0.62, zi:  5 },
    ];

    this.slides.forEach((slide, i) => {
      const offset = (i - this.current + this.total) % this.total;
      const p = P[offset] || P[2];
      slide.style.transform = `translateX(calc(-50% + ${p.tx}px)) rotateY(${p.ry}deg) scale(${p.s})`;
      slide.style.opacity = p.op;
      slide.style.zIndex = p.zi;
      slide.classList.toggle("is-active", offset === 0);
    });

    document.querySelectorAll(".slider3d-bullet").forEach((b, i) => {
      b.classList.toggle("is-active", i === this.current);
    });
  }
}

// Init slider if stage exists
(function () {
  const stage = document.getElementById("slider3dStage");
  if (stage) new Slider3D(stage);
})();

/* ============================================================
   MOBILE TAB BAR — active state
   ============================================================ */
(function () {
  const tabs = document.querySelectorAll(".mobile-tabbar .tab[data-tab]");
  if (!tabs.length) return;

  // Normalise current path: "/", "/index", "/index.html" all map to "/"
  let path = window.location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/");
  if (path === "") path = "/";

  let matched = false;
  tabs.forEach((tab) => {
    const target = tab.getAttribute("data-tab");
    const isActive = target === "/" ? path === "/" : path === target || path.startsWith(target + "/");
    if (isActive) {
      tab.classList.add("is-active");
      tab.setAttribute("aria-current", "page");
      matched = true;
    }
  });

  // Fallback to Inicio if nothing matched (e.g. legal pages)
  if (!matched) {
    const home = document.querySelector('.mobile-tabbar .tab[data-tab="/"]');
    if (home && path === "/") home.classList.add("is-active");
  }
})();
