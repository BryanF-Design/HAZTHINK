const sectionContent = {
  inicio: {
    title: "Explicar HAZTHINK en pocos segundos.",
    copy: "La portada presenta la propuesta principal, genera confianza y dirige al visitante hacia la acción más importante.",
  },
  nosotros: {
    title: "Dar contexto y ponerle cara al negocio.",
    copy: "Esta sección cuenta quién está detrás de HAZTHINK, cómo trabaja y por qué un cliente puede confiar en su propuesta.",
  },
  servicios: {
    title: "Mostrar la oferta sin hacer que el usuario adivine.",
    copy: "Los servicios se ordenan con nombres claros, una explicación breve y rutas directas para pedir información.",
  },
  contacto: {
    title: "Cerrar la distancia entre interés y conversación.",
    copy: "Datos, formulario y WhatsApp quedan en un mismo lugar para que contactar a HAZTHINK sea sencillo.",
  },
};

const tabs = document.querySelectorAll(".section-tab");
const previewTitle = document.querySelector("[data-preview-title]");
const previewCopy = document.querySelector("[data-preview-copy]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const content = sectionContent[tab.dataset.section];
    if (!content) return;

    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });

    previewTitle.textContent = content.title;
    previewCopy.textContent = content.copy;
  });

  tab.addEventListener("keydown", (event) => {
    const currentIndex = [...tabs].indexOf(tab);
    const lastIndex = tabs.length - 1;
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    if (event.key === "ArrowLeft") nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = lastIndex;

    if (nextIndex === currentIndex) return;
    event.preventDefault();
    tabs[nextIndex].focus();
    tabs[nextIndex].click();
  });
});

const copyButton = document.querySelector(".copy-id");
const copyStatus = copyButton?.querySelector(".copy-status");

copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyButton.dataset.copy);
    copyStatus.textContent = "Folio copiado";
    window.setTimeout(() => {
      copyStatus.textContent = "Copiar folio";
    }, 1800);
  } catch {
    copyStatus.textContent = copyButton.dataset.copy;
  }
});

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
