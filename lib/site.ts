export const site = {
  name: "HAZTHINK",
  url: "https://www.hazthink.com",
  slogan: "Diseñamos para conectar, imprimimos para compartir, publicamos para convencer.",
  phone: "+527294550094",
  phoneLabel: "(729) 455 0094",
  email: "hazthink@gmail.com",
  facebook: "https://www.facebook.com/share/18rEFEuTZb/",
};

export const wa = (text = "Hola HAZTHINK, quiero cotizar un proyecto.") =>
  `https://wa.me/527294550094?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: "/", key: "home" },
  { href: "/nosotros", key: "about" },
  { href: "/proyectos", key: "projects" },
  { href: "/contacto", key: "contact" },
] as const;

export const brandColors = ["var(--blue)", "var(--green)", "var(--yellow)", "var(--orange)", "var(--purple)"];

/** Visual tokens per service, in the same order as the dictionary list. */
export const serviceStyles = [
  { color: "var(--blue)", ink: "#ffffff", art: "social" },
  { color: "var(--green)", ink: "#06210c", art: "print" },
  { color: "var(--yellow)", ink: "#272100", art: "brand" },
  { color: "var(--orange)", ink: "#2c1100", art: "ads" },
  { color: "var(--purple)", ink: "#ffffff", art: "invite" },
] as const;

export type ArtKind = (typeof serviceStyles)[number]["art"];
