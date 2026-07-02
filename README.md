# Sitio web HAZTHINK

Página estática y autocontenida para HAZTHINK (diseño, impresión y publicidad).

## Abrir

Abrir `index.html` en navegador, o servir la carpeta con cualquier servidor estático
(ej. `python3 -m http.server`).

## Estructura

- `index.html` — marcado y contenido de todas las secciones.
- `styles.css` — estilos, paleta de marca y animaciones.
- `app.js` — cursor personalizado, menú móvil, animaciones de scroll y el efecto de
  tarjetas apiladas en "Proyectos".
- `assets/js/anime.min.js` — [anime.js](https://animejs.com/) v3.2.2, incluido localmente
  para no depender de una CDN externa.
- `assets/fonts/` — Fraunces (títulos) e Inter (texto).

## Pendiente

- Sustituir el logotipo real de HAZTHINK (actualmente el header usa un wordmark de texto)
  en cuanto se reciba el archivo vectorial.
- Reemplazar las tarjetas de ejemplo de "Proyectos" con casos reales conforme estén
  disponibles.

## Cotización (histórico)

La propuesta original que se usó para vender el proyecto a HAZTHINK (COT-HAZTHINK-2026-001)
vive en [`cotizacion/`](./cotizacion/) y ya no se publica desde la raíz del sitio.

## Publicar

Subir la carpeta completa a cualquier hosting estático (configurado para Vercel via
`vercel.json`). La carpeta `cotizacion/` es interna y no debe enlazarse desde el sitio público.
