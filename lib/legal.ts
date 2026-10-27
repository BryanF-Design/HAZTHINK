import type { Lang } from "./dictionaries";

export type Block = { h: string; p?: string[]; ul?: string[]; after?: string };
export type LegalDoc = { title: string; intro: string; blocks: Block[] };

const termsEs: LegalDoc = {
  title: "Términos y Condiciones",
  intro:
    "Al contratar los servicios de HAZTHINK o al utilizar este sitio web, aceptas los presentes Términos y Condiciones en su totalidad. Si tienes alguna duda, puedes contactarnos en hazthink@gmail.com antes de proceder.",
  blocks: [
    { h: "1. Descripción del servicio", p: ["HAZTHINK es un estudio de diseño gráfico, impresión y publicidad digital con sede en México. Ofrecemos servicios de diseño de redes sociales, impresión de lonas y gran formato, identidad corporativa, publicidad e invitaciones digitales e impresas."] },
    { h: "2. Proceso y alcance", p: ["Cada proyecto inicia con un brief acordado entre el cliente y HAZTHINK. El alcance, costo y plazos se definen por escrito antes de iniciar cualquier trabajo. Cambios al alcance original pueden implicar ajustes en costo y tiempo de entrega, que serán notificados al cliente antes de aplicarse."] },
    {
      h: "3. Pagos",
      ul: [
        "Los pagos pueden realizarse mediante transferencia bancaria o los medios acordados al inicio del proyecto.",
        "Algunos proyectos requieren un anticipo antes de iniciar la producción. El porcentaje se establece en la propuesta.",
        "El saldo restante se liquida antes de la entrega final de archivos o materiales impresos.",
        "No se realizan reembolsos una vez iniciado el proceso de diseño o producción.",
      ],
    },
    { h: "4. Entregas y plazos", p: ["Los plazos de entrega comienzan a contar desde que se reciben todos los materiales necesarios (textos, imágenes, logotipos, etc.) y el pago acordado. HAZTHINK se compromete a comunicar cualquier retraso con anticipación razonable."] },
    { h: "5. Revisiones", p: ["Cada proyecto incluye un número determinado de rondas de revisión, especificado en la propuesta. Revisiones adicionales pueden generar un costo extra que se cotizará antes de realizarse."] },
    {
      h: "6. Propiedad intelectual",
      p: [
        "Una vez liquidado el pago total del proyecto, el cliente obtiene los derechos de uso comercial de los materiales diseñados específicamente para él. HAZTHINK se reserva el derecho de utilizar los trabajos realizados como muestra de portafolio, salvo acuerdo de confidencialidad por escrito.",
        "Los materiales de stock, fuentes tipográficas y elementos de terceros utilizados en los proyectos están sujetos a sus propias licencias.",
      ],
    },
    { h: "7. Responsabilidades del cliente", p: ["El cliente es responsable de proveer la información, textos e imágenes necesarios para el proyecto, y de verificar que tiene los derechos sobre el material que entrega. HAZTHINK no se hace responsable de reclamos derivados del uso de material con derechos de terceros proporcionado por el cliente."] },
    { h: "8. Limitación de responsabilidad", p: ["HAZTHINK no garantiza resultados específicos de ventas, posicionamiento o tráfico derivados de los materiales diseñados. La responsabilidad de HAZTHINK se limita al valor del servicio contratado."] },
    { h: "9. Modificaciones", p: ["HAZTHINK puede modificar estos Términos en cualquier momento. La versión vigente siempre estará disponible en este sitio. El uso continuado de nuestros servicios implica la aceptación de los términos actualizados."] },
    { h: "10. Contacto", p: ["Para cualquier duda relacionada con estos Términos y Condiciones, puedes escribirnos a hazthink@gmail.com o por WhatsApp al (729) 455 0094."] },
  ],
};

const termsEn: LegalDoc = {
  title: "Terms & Conditions",
  intro:
    "By hiring HAZTHINK's services or using this website, you accept these Terms and Conditions in full. If you have any questions, contact us at hazthink@gmail.com before proceeding. The Spanish version prevails in case of discrepancy.",
  blocks: [
    { h: "1. Service description", p: ["HAZTHINK is a graphic design, printing and digital advertising studio based in Mexico. We offer social media design, banner and large-format printing, brand identity, advertising, and digital and printed invitations."] },
    { h: "2. Process and scope", p: ["Every project starts with a brief agreed between the client and HAZTHINK. Scope, cost and timelines are defined in writing before any work begins. Changes to the original scope may require cost and delivery adjustments, which will be communicated to the client before being applied."] },
    {
      h: "3. Payments",
      ul: [
        "Payments can be made by bank transfer or the methods agreed at the start of the project.",
        "Some projects require a deposit before production begins. The percentage is set in the proposal.",
        "The remaining balance is paid before final delivery of files or printed materials.",
        "No refunds are issued once the design or production process has started.",
      ],
    },
    { h: "4. Delivery and timelines", p: ["Delivery timelines start once all required materials (copy, images, logos, etc.) and the agreed payment are received. HAZTHINK commits to communicating any delay with reasonable notice."] },
    { h: "5. Revisions", p: ["Each project includes a set number of revision rounds, specified in the proposal. Additional revisions may incur an extra cost, quoted before being carried out."] },
    {
      h: "6. Intellectual property",
      p: [
        "Once the project is paid in full, the client obtains commercial usage rights to the materials designed specifically for them. HAZTHINK reserves the right to show the work in its portfolio unless a written confidentiality agreement exists.",
        "Stock materials, typefaces and third-party elements used in projects are subject to their own licenses.",
      ],
    },
    { h: "7. Client responsibilities", p: ["The client is responsible for providing the information, copy and images needed for the project, and for verifying they hold the rights to the material provided. HAZTHINK is not liable for claims arising from client-supplied third-party material."] },
    { h: "8. Limitation of liability", p: ["HAZTHINK does not guarantee specific sales, ranking or traffic results from the designed materials. HAZTHINK's liability is limited to the value of the contracted service."] },
    { h: "9. Changes", p: ["HAZTHINK may modify these Terms at any time. The current version will always be available on this site. Continued use of our services implies acceptance of the updated terms."] },
    { h: "10. Contact", p: ["For any questions about these Terms and Conditions, write to hazthink@gmail.com or WhatsApp (729) 455 0094."] },
  ],
};

const privacyEs: LegalDoc = {
  title: "Política de Privacidad",
  intro: "En HAZTHINK tomamos en serio la privacidad de nuestros clientes y visitantes. Esta Política explica qué información recopilamos, cómo la usamos y qué derechos tienes sobre ella.",
  blocks: [
    {
      h: "1. Información que recopilamos",
      p: ["Podemos recopilar la siguiente información cuando interactúas con nosotros:"],
      ul: [
        "Datos de contacto: nombre, número de teléfono, correo electrónico y cualquier información que nos compartas al escribirnos por WhatsApp, correo o Facebook.",
        "Datos del proyecto: información relacionada con el trabajo a realizar (textos, imágenes, logotipos) que nos proporcionas para llevar a cabo los servicios.",
        "Datos de navegación: información técnica básica (tipo de dispositivo, navegador, páginas visitadas, país aproximado) a través de Google Analytics 4 —solo si aceptas las cookies de análisis— y de Vercel Web Analytics, que mide visitas de forma agregada y sin cookies.",
        "Preferencias del sitio: idioma y opciones de accesibilidad que eliges, guardadas solo en tu dispositivo.",
      ],
    },
    {
      h: "2. Cómo usamos tu información",
      p: ["Usamos tu información únicamente para:"],
      ul: [
        "Responder tus consultas y cotizaciones.",
        "Llevar a cabo los proyectos contratados.",
        "Enviarte información relevante sobre tu proyecto o servicios que puedan interesarte (solo con tu consentimiento).",
        "Mejorar nuestro sitio web y la calidad de nuestros servicios.",
      ],
    },
    {
      h: "3. Con quién compartimos tu información",
      p: ["No vendemos, rentamos ni compartimos tu información personal con terceros, salvo en los siguientes casos:"],
      ul: [
        "Proveedores de servicios que nos ayudan a operar, como Vercel (alojamiento del sitio), Google (Google Analytics, si lo aceptas) y plataformas de mensajería como WhatsApp, bajo sus propias políticas de privacidad y acuerdos de tratamiento de datos.",
        "Cuando sea requerido por ley o autoridad competente.",
      ],
    },
    { h: "4. Cookies, analítica y almacenamiento local", p: ["Usamos almacenamiento local estrictamente necesario para recordar tu idioma, tus preferencias de accesibilidad y tu decisión sobre cookies. Las cookies de análisis de Google Analytics (_ga y similares) solo se activan si las aceptas en el aviso de cookies; usamos el Modo de Consentimiento de Google y no activamos publicidad ni personalización de anuncios. Puedes cambiar tu decisión en cualquier momento desde \"Preferencias de cookies\" en el pie de página o borrar los datos desde tu navegador."] },
    { h: "5. Conservación de datos", p: ["Guardamos tu información únicamente durante el tiempo necesario para prestar los servicios contratados y cumplir con las obligaciones legales aplicables. Una vez concluido el proyecto, los datos se conservan por un máximo de 2 años para efectos de historial de trabajo."] },
    {
      h: "6. Tus derechos (ARCO)",
      p: ["De conformidad con la legislación mexicana de protección de datos personales en posesión de los particulares, tienes derecho a:"],
      ul: [
        "Acceso: conocer qué datos tenemos sobre ti.",
        "Rectificación: corregir datos incorrectos o desactualizados.",
        "Cancelación: solicitar la eliminación de tus datos.",
        "Oposición: oponerte al uso de tus datos para fines específicos.",
      ],
      after: "Para ejercer cualquiera de estos derechos, escríbenos a hazthink@gmail.com con el asunto \"Solicitud ARCO\". Responderemos en un plazo máximo de 20 días hábiles.",
    },
    { h: "7. Seguridad", p: ["Implementamos medidas razonables para proteger tu información contra acceso no autorizado, pérdida o divulgación. Sin embargo, ningún sistema de transmisión por internet es 100% seguro."] },
    { h: "8. Cambios a esta política", p: ["Podemos actualizar esta Política en cualquier momento. La versión vigente siempre estará disponible en esta página con la fecha de última actualización."] },
    { h: "9. Contacto", p: ["Si tienes preguntas sobre esta Política de Privacidad, contáctanos en hazthink@gmail.com o por WhatsApp al (729) 455 0094."] },
  ],
};

const privacyEn: LegalDoc = {
  title: "Privacy Policy",
  intro: "At HAZTHINK we take the privacy of our clients and visitors seriously. This Policy explains what information we collect, how we use it and what rights you have over it. The Spanish version prevails in case of discrepancy.",
  blocks: [
    {
      h: "1. Information we collect",
      p: ["We may collect the following information when you interact with us:"],
      ul: [
        "Contact details: name, phone number, email and any information you share when writing to us on WhatsApp, email or Facebook.",
        "Project data: information related to the work (copy, images, logos) you provide so we can deliver the services.",
        "Browsing data: basic technical information (device type, browser, pages visited, approximate country) through Google Analytics 4 —only if you accept analytics cookies— and Vercel Web Analytics, which measures visits in aggregate without cookies.",
        "Site preferences: the language and accessibility options you choose, stored only on your device.",
      ],
    },
    {
      h: "2. How we use your information",
      p: ["We use your information only to:"],
      ul: [
        "Answer your questions and quote requests.",
        "Carry out contracted projects.",
        "Send you relevant information about your project or services that may interest you (only with your consent).",
        "Improve our website and the quality of our services.",
      ],
    },
    {
      h: "3. Who we share it with",
      p: ["We do not sell, rent or share your personal information with third parties, except:"],
      ul: [
        "Service providers that help us operate, such as Vercel (site hosting), Google (Google Analytics, if you accept it) and messaging platforms like WhatsApp, under their own privacy policies and data processing agreements.",
        "When required by law or a competent authority.",
      ],
    },
    { h: "4. Cookies, analytics and local storage", p: ["We use strictly necessary local storage to remember your language, accessibility preferences and cookie choice. Google Analytics cookies (_ga and similar) are only set if you accept them in the cookie notice; we use Google Consent Mode and never enable advertising or ad personalization. You can change your choice at any time from \"Cookie preferences\" in the footer or clear the data in your browser."] },
    { h: "5. Data retention", p: ["We keep your information only as long as needed to provide the contracted services and meet applicable legal obligations. After a project ends, data is kept for up to 2 years for work-history purposes."] },
    {
      h: "6. Your rights (ARCO)",
      p: ["Under Mexican personal data protection law, you have the right to:"],
      ul: [
        "Access: know what data we hold about you.",
        "Rectification: correct inaccurate or outdated data.",
        "Cancellation: request deletion of your data.",
        "Opposition: object to the use of your data for specific purposes.",
      ],
      after: "To exercise any of these rights, email hazthink@gmail.com with the subject \"ARCO Request\". We will reply within 20 business days.",
    },
    { h: "7. Security", p: ["We implement reasonable measures to protect your information against unauthorized access, loss or disclosure. However, no internet transmission system is 100% secure."] },
    { h: "8. Changes to this policy", p: ["We may update this Policy at any time. The current version will always be available on this page with its last-updated date."] },
    { h: "9. Contact", p: ["If you have questions about this Privacy Policy, contact us at hazthink@gmail.com or WhatsApp (729) 455 0094."] },
  ],
};

export const legal: Record<"terms" | "privacy", Record<Lang, LegalDoc>> = {
  terms: { mx: termsEs, es: termsEs, en: termsEn },
  privacy: { mx: privacyEs, es: privacyEs, en: privacyEn },
};
