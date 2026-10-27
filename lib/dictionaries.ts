export type Lang = "mx" | "es" | "en";

export const LANGS: { code: Lang; short: string; name: string; htmlLang: string }[] = [
  { code: "mx", short: "MX", name: "Español (México)", htmlLang: "es-MX" },
  { code: "es", short: "ES", name: "Español (España)", htmlLang: "es-ES" },
  { code: "en", short: "EN", name: "English", htmlLang: "en" },
];

const mx = {
  common: {
    skip: "Ir al contenido",
    loading: "Cargando HAZTHINK",
    tagline: "Diseño · Impresión · Publicidad",
    quote: "Cotiza tu idea",
    quoteShort: "Cotiza",
    waDefault: "Hola HAZTHINK, quiero cotizar un proyecto.",
    waAria: "Escríbenos por WhatsApp",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    menu: "Menú",
    home: "HAZTHINK, volver al inicio",
    concept: "Muestra conceptual",
    language: "Idioma",
    lotusAria: "Loto tridimensional de HAZTHINK. Arrastra para girarlo.",
    drag: "Arrastra",
  },
  nav: { home: "Inicio", about: "Nosotros", projects: "Proyectos", contact: "Contacto", terms: "Términos", privacy: "Privacidad" },
  hero: {
    eyebrow: "Estudio creativo · México",
    title1: "Ideas que",
    title2: "se ven,",
    title3: "marcas que se",
    accent: "mueven.",
    lead: "Convertimos lo que tienes en mente en una identidad que la gente puede ver, tocar, compartir y recordar.",
    cta: "Cuéntanos tu idea",
    secondary: "Ver servicios",
    signals: ["Un solo estudio", "Digital + impreso", "Hecho a tu medida"],
    scroll: "Desliza",
    hint: "Arrastra el loto",
  },
  marquee: ["Redes sociales", "Impresión de lonas", "Identidad corporativa", "Publicidad", "Invitaciones"],
  manifesto: {
    eyebrow: "Lo que hacemos",
    text: "Diseñamos para conectar, imprimimos para compartir, publicamos para convencer.",
    highlight: ["conectar,", "compartir,", "convencer."],
    aside: "No decoramos negocios. Les damos una forma clara de hacerse notar.",
  },
  services: {
    eyebrow: "Servicios",
    title: "Una idea. Cinco formas de ponerla en el mundo.",
    lead: "Desliza y descubre lo que podemos construir contigo.",
    cta: "Quiero trabajar esto",
    deliverables: "Entregables",
    list: [
      { medium: "Digital", title: "Redes sociales", lead: "Contenido visual que hace que tu marca se reconozca incluso antes de leer su nombre.", items: ["Diseño para feed e historias", "Plantillas para tu comunicación", "Dirección visual consistente"] },
      { medium: "Gran formato", title: "Impresión de lonas", lead: "Piezas de gran formato que conservan legibilidad, color y presencia a distancia.", items: ["Diseño adaptado al formato", "Preparación para impresión", "Producción para eventos y negocios"] },
      { medium: "Marca", title: "Identidad y logotipos", lead: "Una identidad flexible para que tu negocio se vea como el mismo negocio en todas partes.", items: ["Logotipo y versiones de uso", "Paleta y tipografías", "Aplicaciones esenciales de marca"] },
      { medium: "Campaña", title: "Publicidad", lead: "Mensajes visuales con una idea central clara y una acción concreta para tu audiencia.", items: ["Concepto visual de campaña", "Piezas digitales e impresas", "Adaptaciones por formato"] },
      { medium: "Evento", title: "Invitaciones", lead: "Invitaciones digitales o impresas que abren la experiencia antes de que empiece el evento.", items: ["Concepto acorde al evento", "Versión digital e impresa", "Información clara y lista para compartir"] },
    ],
    art: { feed: "CONECTA", banner: "GRAN APERTURA", bannerSub: "Lona 3×2 m", ads: "PROMO", adsSub: "de temporada", invite: "Nos casamos", inviteSub: "Guarda la fecha" },
  },
  process: {
    eyebrow: "Cómo trabajamos",
    title: "Del mensaje al mundo, sin perder la idea.",
    lead: "Un proceso simple para que cada decisión tenga una razón.",
    steps: [
      { title: "Escuchar", text: "Nos cuentas el objetivo, el contexto y dónde va a vivir la pieza. Primero entendemos qué debe pasar." },
      { title: "Pensar", text: "Definimos la idea central: qué debe decir tu marca y cómo debe sentirse." },
      { title: "Diseñar", text: "Color, tipografía, composición y formato trabajan juntos para decir lo mismo." },
      { title: "Lanzar", text: "Preparamos cada aplicación para su medio, digital o impreso, lista para ver, tocar o compartir." },
    ],
  },
  showcase: {
    eyebrow: "Muestras de trabajo",
    title: "No hacemos “posts”. Construimos presencia.",
    lead: "Exploraciones conceptuales del tipo de soluciones que HAZTHINK desarrolla. No representan resultados medidos de clientes.",
    more: "Ver todos los proyectos",
    items: [
      { tag: "Redes sociales", title: "Una voz visual que sobrevive al scroll." },
      { tag: "Gran formato", title: "Diseño que funciona a distancia." },
      { tag: "Identidad", title: "Una marca lista para cambiar de escala." },
      { tag: "Publicidad", title: "Piezas de temporada para punto de venta." },
      { tag: "Invitaciones", title: "La fiesta empieza en la invitación." },
    ],
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Resolvemos tus dudas.",
    lead: "Lo básico para empezar a trabajar con HAZTHINK.",
    items: [
      { q: "¿Cómo solicito una cotización?", a: "Escríbenos por WhatsApp o correo con lo que necesitas, para dónde es y para cuándo. Con eso te respondemos con opciones y un costo claro." },
      { q: "¿Qué necesito para iniciar un proyecto?", a: "Una idea de lo que quieres lograr. Si ya tienes logotipo, textos o fotos, compártelos; si no, te ayudamos a construirlos desde cero." },
      { q: "¿Cuánto tiempo toma un proyecto?", a: "Depende del alcance. Al cotizar acordamos plazos por escrito, que empiezan a contar cuando tenemos los materiales y el anticipo." },
      { q: "¿Hacen diseño e impresión en el mismo lugar?", a: "Sí. Esa es la idea de HAZTHINK: diseño, impresión y publicidad coordinados por un solo estudio, sin rebotar entre proveedores." },
      { q: "¿Trabajan con clientes fuera de su ciudad?", a: "Sí. Atendemos proyectos locales y a distancia en todo México." },
    ],
  },
  cta: {
    eyebrow: "Tu turno",
    title1: "Haz que tu idea",
    accent: "exista.",
    lead: "Una conversación basta para empezar a darle forma.",
    button: "Empezar por WhatsApp",
    wa: "Hola HAZTHINK, quiero darle forma a mi idea.",
    phone: "Teléfono",
    email: "Correo",
  },
  footer: {
    eyebrow: "¿Tienes una idea?",
    line1: "Hagámosla",
    line2: "existir.",
    orb: "COTIZA TU DISEÑO • ESCRÍBENOS POR WHATSAPP • ",
    navigate: "Navega",
    contact: "Contacto",
    studio: "Estudio",
    studioLines: ["Diseño, impresión y publicidad.", "Atendemos proyectos en todo México."],
    legal: "Legal",
    top: "Volver arriba",
    rights: "Todos los derechos reservados.",
    by: "Sitio por",
    slogan: ["Diseñamos para conectar", "imprimimos para compartir", "publicamos para convencer"],
  },
  about: {
    metaTitle: "Nosotros",
    eyebrow: "Nosotros",
    title: "Una idea, bien ejecutada, cambia todo.",
    lead: "Somos HAZTHINK: el estudio que une diseño, impresión y publicidad en un solo lugar para que tu marca hable sola.",
    storyEyebrow: "Nuestra historia",
    storyTitle: "Nacimos para simplificar la comunicación visual.",
    story: [
      "HAZTHINK surgió de una necesidad real: negocios y emprendedores que tenían que buscar diseñador por un lado, imprenta por otro y agencia de publicidad por un tercero. Nosotros juntamos todo.",
      "Trabajamos con marcas que necesitan presencia visual, impresa y digital, sin tener que coordinar proveedores distintos.",
      "Desde una tarjeta de presentación hasta una campaña de redes, cada proyecto lleva el mismo nivel de atención y compromiso.",
    ],
    facts: [
      { big: "5", label: "Servicios especializados" },
      { big: "1", label: "Estudio para coordinarlo todo" },
      { big: "∞", label: "Formatos: digital e impreso" },
    ],
    pillarsEyebrow: "Cómo pensamos",
    pillarsTitle: "Creatividad con propósito. Nada más, nada menos.",
    pillars: [
      { title: "Diseño a tu medida", text: "Nada de plantillas genéricas. Cada pieza parte de tu marca, tu tono y lo que quieres comunicar." },
      { title: "Proceso claro", text: "Brief, propuesta, diseño, revisión y entrega. Sin vueltas, sin sorpresas, con plazos acordados." },
      { title: "Un solo lugar", text: "Del diseño al impreso o digital sin saltar entre proveedores. Tú te enfocas en tu negocio, nosotros en lo visual." },
    ],
    valuesEyebrow: "Lo que nos mueve",
    valuesTitle: "Más que diseño, resultados que se ven.",
    values: [
      { title: "Comunicación directa", text: "Un solo punto de contacto para todo. Nada de rebotar entre personas o departamentos." },
      { title: "Atención al detalle", text: "Tipografía, colores, márgenes: revisamos todo antes de que salga de nuestras manos." },
      { title: "Compromiso real", text: "Si lo prometemos, lo entregamos. Y si hay un ajuste, lo resolvemos sin drama." },
    ],
  },
  projects: {
    metaTitle: "Proyectos",
    eyebrow: "Proyectos",
    title: "Así se ve el trabajo cuando se hace bien.",
    lead: "Una muestra del tipo de proyectos que entregamos. Desde redes sociales hasta identidad corporativa, todo con el mismo nivel de compromiso.",
    note: "Muestras conceptuales: exploraciones de alcance, no resultados medidos de clientes.",
    list: [
      { tag: "Redes sociales", title: "Sistema visual para un restaurante", text: "Calendario de contenido, diseño para feed, historias y reels con una identidad consistente." },
      { tag: "Impresión de lonas", title: "Material visual para una feria regional", text: "Lonas de gran formato, banners de pie y señalética preparada para exteriores." },
      { tag: "Identidad corporativa", title: "Sistema de marca para una boutique", text: "Logotipo y variantes, paleta, tipografía, papelería y una guía básica de uso." },
      { tag: "Publicidad", title: "Piezas de temporada para punto de venta", text: "Volantes, carteles, banners digitales y material de punto de venta adaptado a cada formato." },
      { tag: "Invitaciones", title: "Invitación digital e impresa para boda", text: "Concepto coordinado: invitación digital animada, versión impresa, mesa de regalos y recordatorios." },
    ],
    ctaTitle: "El tuyo puede ser el siguiente.",
    ctaLead: "Cuéntanos qué necesitas. En un solo mensaje lo analizamos y te damos opciones.",
    ctaButton: "Cotiza por WhatsApp",
  },
  contact: {
    metaTitle: "Contacto",
    eyebrow: "Contacto",
    title: "¿Hablamos?",
    lead: "Un solo mensaje es suficiente para empezar. Cuéntanos tu proyecto y te respondemos rápido.",
    methodsTitle: "Escríbenos por el canal que más uses.",
    methods: { wa: "WhatsApp", phone: "Teléfono", email: "Correo electrónico", fb: "Facebook" },
    stepsTitle: "Tu primer mensaje",
    steps: [
      { title: "Cuéntanos la idea", text: "Qué necesitas, para dónde y qué quieres lograr." },
      { title: "Recibe opciones", text: "Te proponemos alcance, tiempos y costo claro." },
      { title: "Lo hacemos realidad", text: "Diseñamos, revisamos contigo y entregamos listo para usar." },
    ],
    location: "Ubicación",
    locationText: "México · Atendemos proyectos locales y a distancia en todo el país.",
  },
  a11y: {
    open: "Opciones de accesibilidad",
    title: "Accesibilidad",
    lead: "Ajusta el sitio a tu forma de navegar. Guardamos tus preferencias en este dispositivo.",
    textSize: "Tamaño de texto",
    contrast: "Alto contraste",
    contrastHint: "Colores más fuertes y fondos sólidos.",
    motion: "Reducir movimiento",
    motionHint: "Desactiva animaciones, parallax y el 3D.",
    links: "Subrayar enlaces",
    linksHint: "Hace visibles todos los enlaces.",
    font: "Fuente legible",
    fontHint: "Tipografía pensada para lectura fácil.",
    cursor: "Cursor del sistema",
    cursorHint: "Usa el cursor normal de tu dispositivo.",
    spacing: "Más espaciado",
    spacingHint: "Aumenta el interlineado y el espacio entre letras.",
    reset: "Restablecer",
    close: "Cerrar",
  },
  consent: {
    title: "Tu privacidad, tu decisión",
    text: "Usamos cookies de análisis (Google Analytics) solo si nos das permiso, para entender cómo se usa el sitio y mejorarlo. No vendemos tus datos.",
    accept: "Aceptar",
    reject: "Solo necesarias",
    more: "Política de privacidad",
    manage: "Preferencias de cookies",
  },
  legal: { updated: "Última actualización: 2026", back: "Volver al inicio" },
};

export type Dict = typeof mx;

type DeepPartial<T> = { [K in keyof T]?: T[K] extends (infer U)[] ? U[] : T[K] extends object ? DeepPartial<T[K]> : T[K] };

function merge<T>(base: T, over: DeepPartial<T>): T {
  const out = { ...base } as Record<string, unknown>;
  for (const [k, v] of Object.entries(over as Record<string, unknown>)) {
    const b = (base as Record<string, unknown>)[k];
    out[k] = v && typeof v === "object" && !Array.isArray(v) && b && typeof b === "object" ? merge(b, v as never) : v;
  }
  return out as T;
}

// Spain: same studio, peninsular vocabulary (presupuesto, vosotros, móvil…).
const es: Dict = merge(mx, {
  common: { quote: "Pide presupuesto", quoteShort: "Presupuesto", waDefault: "Hola HAZTHINK, quiero pedir presupuesto para un proyecto." },
  hero: { eyebrow: "Estudio creativo · desde México", lead: "Convertimos lo que tienes en mente en una identidad que la gente puede ver, tocar, compartir y recordar.", cta: "Cuéntanos tu idea" },
  services: { lead: "Haz scroll y descubre lo que podemos construir contigo.", cta: "Quiero trabajar en esto" },
  faq: {
    items: [
      { q: "¿Cómo pido un presupuesto?", a: "Escríbenos por WhatsApp o correo con lo que necesitas, para dónde es y para cuándo. Te respondemos con opciones y un precio claro." },
      { q: "¿Qué necesito para empezar un proyecto?", a: "Una idea de lo que quieres conseguir. Si ya tienes logotipo, textos o fotos, compártelos; si no, te ayudamos a crearlos desde cero." },
      { q: "¿Cuánto tarda un proyecto?", a: "Depende del alcance. Al hacer el presupuesto acordamos plazos por escrito, que empiezan a contar cuando tenemos los materiales y la señal." },
      { q: "¿Hacéis diseño e impresión en el mismo sitio?", a: "Sí. Esa es la idea de HAZTHINK: diseño, impresión y publicidad coordinados por un solo estudio, sin ir de proveedor en proveedor." },
      { q: "¿Trabajáis a distancia?", a: "Sí. Somos un estudio con base en México y trabajamos proyectos a distancia." },
    ],
  },
  footer: { orb: "PIDE PRESUPUESTO • ESCRÍBENOS POR WHATSAPP • ", studioLines: ["Diseño, impresión y publicidad.", "Estudio con base en México, trabajo a distancia."] },
  projects: { ctaButton: "Pide presupuesto por WhatsApp", ctaLead: "Cuéntanos qué necesitas. Con un solo mensaje lo analizamos y te damos opciones." },
  contact: { lead: "Con un solo mensaje basta para empezar. Cuéntanos tu proyecto y te respondemos enseguida.", steps: [
    { title: "Cuéntanos la idea", text: "Qué necesitas, para dónde y qué quieres conseguir." },
    { title: "Recibe opciones", text: "Te proponemos alcance, plazos y un precio claro." },
    { title: "Lo hacemos realidad", text: "Diseñamos, lo revisamos contigo y lo entregamos listo para usar." },
  ], locationText: "Estudio con base en México · Trabajamos a distancia." },
  a11y: { lead: "Ajusta la web a tu forma de navegar. Guardamos tus preferencias en este dispositivo." },
});

const en: Dict = {
  common: {
    skip: "Skip to content",
    loading: "Loading HAZTHINK",
    tagline: "Design · Print · Advertising",
    quote: "Get a quote",
    quoteShort: "Quote",
    waDefault: "Hi HAZTHINK, I'd like a quote for a project.",
    waAria: "Message us on WhatsApp",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    menu: "Menu",
    home: "HAZTHINK, back to home",
    concept: "Concept sample",
    language: "Language",
    lotusAria: "Interactive 3D HAZTHINK lotus. Drag to spin it.",
    drag: "Drag",
  },
  nav: { home: "Home", about: "About", projects: "Work", contact: "Contact", terms: "Terms", privacy: "Privacy" },
  hero: {
    eyebrow: "Creative studio · Mexico",
    title1: "Ideas you",
    title2: "can see,",
    title3: "brands that",
    accent: "move.",
    lead: "We turn what's on your mind into an identity people can see, touch, share and remember.",
    cta: "Tell us your idea",
    secondary: "See services",
    signals: ["One studio", "Digital + print", "Made to measure"],
    scroll: "Scroll",
    hint: "Drag the lotus",
  },
  marquee: ["Social media", "Banner printing", "Brand identity", "Advertising", "Invitations"],
  manifesto: {
    eyebrow: "What we do",
    text: "We design to connect, we print to share, we publish to convince.",
    highlight: ["connect,", "share,", "convince."],
    aside: "We don't decorate businesses. We give them a clear way to get noticed.",
  },
  services: {
    eyebrow: "Services",
    title: "One idea. Five ways to put it into the world.",
    lead: "Scroll to discover what we can build together.",
    cta: "I want this",
    deliverables: "Deliverables",
    list: [
      { medium: "Digital", title: "Social media", lead: "Visual content that makes your brand recognizable before anyone reads its name.", items: ["Feed and stories design", "Templates for your communication", "Consistent art direction"] },
      { medium: "Large format", title: "Banner printing", lead: "Large-format pieces that keep legibility, color and presence from a distance.", items: ["Format-specific design", "Print-ready preparation", "Production for events and businesses"] },
      { medium: "Brand", title: "Identity & logos", lead: "A flexible identity so your business looks like the same business everywhere.", items: ["Logo and usage versions", "Palette and typography", "Essential brand applications"] },
      { medium: "Campaign", title: "Advertising", lead: "Visual messages with one clear idea and a concrete action for your audience.", items: ["Campaign visual concept", "Digital and printed pieces", "Format adaptations"] },
      { medium: "Event", title: "Invitations", lead: "Digital or printed invitations that open the experience before the event begins.", items: ["Concept that fits the event", "Digital and printed version", "Clear info, ready to share"] },
    ],
    art: { feed: "CONNECT", banner: "GRAND OPENING", bannerSub: "3×2 m banner", ads: "SALE", adsSub: "seasonal", invite: "We're getting married", inviteSub: "Save the date" },
  },
  process: {
    eyebrow: "How we work",
    title: "From message to world, without losing the idea.",
    lead: "A simple process so every decision has a reason.",
    steps: [
      { title: "Listen", text: "You tell us the goal, the context and where the piece will live. First we understand what needs to happen." },
      { title: "Think", text: "We define the central idea: what your brand must say and how it should feel." },
      { title: "Design", text: "Color, type, composition and format work together to say the same thing." },
      { title: "Launch", text: "We prepare every application for its medium, digital or print, ready to see, touch or share." },
    ],
  },
  showcase: {
    eyebrow: "Work samples",
    title: "We don't make “posts”. We build presence.",
    lead: "Concept explorations of the kind of solutions HAZTHINK develops. They don't represent measured client results.",
    more: "See all work",
    items: [
      { tag: "Social media", title: "A visual voice that survives the scroll." },
      { tag: "Large format", title: "Design that works from a distance." },
      { tag: "Identity", title: "A brand ready to change scale." },
      { tag: "Advertising", title: "Seasonal point-of-sale pieces." },
      { tag: "Invitations", title: "The party starts with the invite." },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Your questions, answered.",
    lead: "The basics to start working with HAZTHINK.",
    items: [
      { q: "How do I request a quote?", a: "Message us on WhatsApp or email with what you need, where it's for and when. We'll reply with options and a clear price." },
      { q: "What do I need to start a project?", a: "An idea of what you want to achieve. If you already have a logo, copy or photos, share them; if not, we'll help you build them from scratch." },
      { q: "How long does a project take?", a: "It depends on scope. When quoting we agree on written timelines, which start once we have the materials and the deposit." },
      { q: "Do you do design and printing in one place?", a: "Yes. That's the HAZTHINK idea: design, print and advertising coordinated by one studio, no bouncing between vendors." },
      { q: "Do you work with remote clients?", a: "Yes. We're a Mexico-based studio and take on local and remote projects." },
    ],
  },
  cta: {
    eyebrow: "Your turn",
    title1: "Make your idea",
    accent: "exist.",
    lead: "One conversation is enough to start shaping it.",
    button: "Start on WhatsApp",
    wa: "Hi HAZTHINK, I want to give shape to my idea.",
    phone: "Phone",
    email: "Email",
  },
  footer: {
    eyebrow: "Got an idea?",
    line1: "Let's make it",
    line2: "real.",
    orb: "GET A QUOTE • MESSAGE US ON WHATSAPP • ",
    navigate: "Navigate",
    contact: "Contact",
    studio: "Studio",
    studioLines: ["Design, print and advertising.", "Mexico-based, working remotely too."],
    legal: "Legal",
    top: "Back to top",
    rights: "All rights reserved.",
    by: "Site by",
    slogan: ["We design to connect", "we print to share", "we publish to convince"],
  },
  about: {
    metaTitle: "About",
    eyebrow: "About us",
    title: "One idea, well executed, changes everything.",
    lead: "We are HAZTHINK: the studio that brings design, print and advertising together so your brand speaks for itself.",
    storyEyebrow: "Our story",
    storyTitle: "We were born to simplify visual communication.",
    story: [
      "HAZTHINK came from a real need: businesses and entrepreneurs had to find a designer in one place, a printer in another and an ad agency in a third. We put it all together.",
      "We work with brands that need visual presence, in print and digital, without coordinating different vendors.",
      "From a business card to a social campaign, every project gets the same level of care and commitment.",
    ],
    facts: [
      { big: "5", label: "Specialized services" },
      { big: "1", label: "Studio to coordinate it all" },
      { big: "∞", label: "Formats: digital and print" },
    ],
    pillarsEyebrow: "How we think",
    pillarsTitle: "Creativity with purpose. Nothing more, nothing less.",
    pillars: [
      { title: "Made-to-measure design", text: "No generic templates. Every piece starts from your brand, your tone and what you want to say." },
      { title: "Clear process", text: "Brief, proposal, design, review and delivery. No detours, no surprises, agreed timelines." },
      { title: "One place", text: "From design to print or digital without jumping between vendors. You focus on your business, we handle the visuals." },
    ],
    valuesEyebrow: "What drives us",
    valuesTitle: "More than design, results you can see.",
    values: [
      { title: "Direct communication", text: "One point of contact for everything. No bouncing between people or departments." },
      { title: "Attention to detail", text: "Type, color, margins: we check everything before it leaves our hands." },
      { title: "Real commitment", text: "If we promise it, we deliver it. And if something needs adjusting, we fix it without drama." },
    ],
  },
  projects: {
    metaTitle: "Work",
    eyebrow: "Work",
    title: "This is what work looks like when it's done right.",
    lead: "A sample of the kind of projects we deliver. From social media to brand identity, all with the same commitment.",
    note: "Concept samples: scope explorations, not measured client results.",
    list: [
      { tag: "Social media", title: "Visual system for a restaurant", text: "Content calendar, feed, stories and reels design with a consistent identity." },
      { tag: "Banner printing", title: "Visual material for a regional fair", text: "Large-format banners, roll-ups and signage ready for outdoor display." },
      { tag: "Brand identity", title: "Brand system for a boutique", text: "Logo and variants, palette, typography, stationery and a basic usage guide." },
      { tag: "Advertising", title: "Seasonal point-of-sale pieces", text: "Flyers, posters, digital banners and POS material adapted to each format." },
      { tag: "Invitations", title: "Digital and printed wedding invitation", text: "Coordinated concept: animated digital invite, printed version, registry and reminders." },
    ],
    ctaTitle: "Yours could be next.",
    ctaLead: "Tell us what you need. With one message we review it and give you options.",
    ctaButton: "Get a quote on WhatsApp",
  },
  contact: {
    metaTitle: "Contact",
    eyebrow: "Contact",
    title: "Let's talk?",
    lead: "One message is enough to start. Tell us about your project and we'll reply fast.",
    methodsTitle: "Write to us on the channel you use most.",
    methods: { wa: "WhatsApp", phone: "Phone", email: "Email", fb: "Facebook" },
    stepsTitle: "Your first message",
    steps: [
      { title: "Tell us the idea", text: "What you need, where it's for and what you want to achieve." },
      { title: "Get options", text: "We propose scope, timing and a clear price." },
      { title: "We make it real", text: "We design, review with you and deliver ready to use." },
    ],
    location: "Location",
    locationText: "Mexico · We work on local and remote projects.",
  },
  a11y: {
    open: "Accessibility options",
    title: "Accessibility",
    lead: "Adjust the site to the way you browse. Preferences are saved on this device.",
    textSize: "Text size",
    contrast: "High contrast",
    contrastHint: "Stronger colors and solid backgrounds.",
    motion: "Reduce motion",
    motionHint: "Turns off animation, parallax and 3D.",
    links: "Underline links",
    linksHint: "Makes every link visible.",
    font: "Readable font",
    fontHint: "A typeface designed for easy reading.",
    cursor: "System cursor",
    cursorHint: "Use your device's normal cursor.",
    spacing: "Extra spacing",
    spacingHint: "Increases line height and letter spacing.",
    reset: "Reset",
    close: "Close",
  },
  consent: {
    title: "Your privacy, your call",
    text: "We use analytics cookies (Google Analytics) only with your permission, to understand how the site is used and improve it. We never sell your data.",
    accept: "Accept",
    reject: "Necessary only",
    more: "Privacy policy",
    manage: "Cookie preferences",
  },
  legal: { updated: "Last updated: 2026", back: "Back to home" },
};

export const dictionaries: Record<Lang, Dict> = { mx, es, en };

/** Picks a language from the device locale and, for Spanish, the region/timezone. */
export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "mx";
  const langs = (navigator.languages?.length ? navigator.languages : [navigator.language]).map((l) => l.toLowerCase());
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  const primary = langs[0] ?? "es-mx";
  if (primary.startsWith("en")) return "en";
  if (primary.startsWith("es")) {
    if (primary === "es-es" || (primary === "es" && tz === "Europe/Madrid") || tz === "Europe/Madrid" || tz === "Atlantic/Canary" || tz === "Africa/Ceuta") {
      return primary === "es-mx" ? "mx" : "es";
    }
    return "mx";
  }
  // Other device languages: Spanish if they're physically in Mexico or Spain, otherwise English.
  if (tz.startsWith("America/Mexico") || ["America/Cancun", "America/Merida", "America/Monterrey", "America/Tijuana", "America/Chihuahua", "America/Hermosillo", "America/Mazatlan", "America/Matamoros", "America/Ojinaga", "America/Bahia_Banderas"].includes(tz)) return "mx";
  if (tz === "Europe/Madrid" || tz === "Atlantic/Canary") return "es";
  return "en";
}
