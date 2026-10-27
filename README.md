# HAZTHINK — sitio web

Next.js 16 (App Router) + React 19 · GSAP ScrollTrigger · Lenis · React Three Fiber.
Dominio: https://www.hazthink.com (Vercel).

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run typecheck
```

## Qué incluye

- **Preloader** con el loto real llenándose de color, contador y salida en columnas de color.
- **Hero 3D** (`components/three/LotusScene.tsx`): el loto reconstruido en 3D; la cámara se encuadra sola a cualquier proporción (sin recortes). Arrastra para girarlo; con scroll se abre.
- **Scroll**: hero fijado, manifiesto con palabras que se encienden, servicios en tarjetas sticky apiladas, proceso en scroll horizontal, muestras con parallax.
- **Footer animado**: telón, marquee reactivo a la velocidad, pétalos que siguen el cursor, wordmark gigante con letras que saltan, reloj CDMX.
- **Idiomas MX / ES / EN** (`lib/dictionaries.ts`): se elige solo según el idioma del dispositivo y la zona horaria; se puede cambiar en el header, en el menú y en el panel de accesibilidad.
- **Accesibilidad**: tamaño de texto, alto contraste, reducir movimiento, subrayar enlaces, fuente legible, más espaciado y cursor del sistema. Respeta `prefers-reduced-motion`.
- **SEO**: metadatos por página, canonical, Open Graph/Twitter con imagen generada, JSON-LD (Organization, WebSite, ProfessionalService, FAQPage, Breadcrumbs), `sitemap.xml`, `robots.txt`, manifest.
- **Seguridad**: CSP, HSTS (preload), X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP/CORP (`next.config.ts`).

## Variables de entorno (Vercel → Settings → Environment Variables)

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_GA_ID` | ID de Google Analytics 4 (`G-XXXXXXXXXX`). Activa GA con aviso de cookies y Consent Mode v2. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Código de verificación de Google Search Console (método "etiqueta HTML"). Opcional si verificas por DNS. |

Después de agregarlas, vuelve a desplegar.

## Google Search Console

1. Agrega la propiedad `https://www.hazthink.com` (o dominio `hazthink.com` verificando por DNS).
2. En *Sitemaps* envía: `https://www.hazthink.com/sitemap.xml`.

## Estructura

- `app/` — rutas (`/`, `/nosotros`, `/proyectos`, `/contacto`, `/terminos`, `/privacidad`), sitemap, robots, OG image.
- `components/` — layout global (header, footer, preloader, cursor, transiciones, accesibilidad, analytics) y secciones.
- `lib/` — textos por idioma, textos legales, SEO, estado compartido.
- `public/brand/` — logotipo recortado (versiones para fondo claro y oscuro).
- `public/cotizacion/` — cotización estática original (`/cotizacion`).

## Contenido pendiente

Las piezas de proyectos son muestras conceptuales. Sustituir por casos reales cuando HAZTHINK entregue fotos y resultados aprobados.
