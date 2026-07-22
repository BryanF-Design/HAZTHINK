# Auditoría UX, visual y técnica — HAZTHINK

Fecha: 21 de julio de 2026

## Objetivo

Convertir el sitio en una experiencia reconocible de HAZTHINK: rosa como tinta base, color de marca como sistema, interacción con propósito y una ruta clara hacia WhatsApp. Debe funcionar igual de bien en escritorio, móvil, teclado y movimiento reducido.

## Fallos confirmados en la revisión

1. El footer heredaba `max-width: 1360px`; en pantallas mayores dejaba franjas blancas laterales.
2. El archivo del logotipo conserva proporción vertical, pero se mostraba más alto que el header. El wordmark invadía la sección siguiente.
3. En móvil el logo no estaba anclado al centro real del viewport.
4. El cursor usaba `mix-blend-mode: difference`; sobre el header claro podía desaparecer.
5. Las páginas Nosotros, Proyectos, Contacto y legales conservaban gran parte de la composición previa.
6. El amarillo y el azul dominaban la interfaz aunque se pidió rosa como base.
7. No existía una transición de entrada con identidad.
8. Faltaban reglas completas para cambio de página, parallax controlado y presión sostenida fuera del objeto 3D.

## Dirección aplicada: Pink Press

El rosa funciona como tinta matriz. Azul, verde, amarillo, naranja y morado se usan como marcas de registro y categorías, no como fondos aleatorios. El lenguaje mezcla impresión editorial, líneas de corte, retículas, tipografía sobredimensionada y el loto real de HAZTHINK.

Las referencias se usaron por patrón, no por copia:

- collage geométrico y rosa protagonista;
- preloader de pantalla completa con identidad;
- objeto central grande y anotaciones;
- tipografía outline y composición asimétrica;
- botones e interacción con respuesta física.

## Mejoras implementadas

- Footer full-bleed al 100% del viewport, sin límite heredado.
- Logotipo transparente con proporción estable y mayor presencia.
- Header de 104 px en escritorio y 96 px en móvil; logo centrado matemáticamente en 390 px.
- Cursor sólido con borde y sombra; visible en rosa, blanco y vino.
- Preloader propio de “registro de color”, con progreso breve y salida en hoja.
- Transición rosa entre rutas internas.
- Rosa base en home, páginas internas, CTA, preloader y footer.
- Nuevos héroes editoriales para Nosotros, Proyectos y Contacto.
- Componentes internos reconstruidos: estadísticas, pilares, coverflow, tarjetas de contacto y documentos legales.
- Parallax limitado a capas concretas y transform-only.
- Clic, hover, pressed y hold en servicios; scroll, clic, hold y drag en Three.js.
- Navegación móvil inferior conservada; targets táctiles de 44 px.
- `prefers-reduced-motion` elimina parallax y deja el contenido visible.
- SEO base: metadatos indexables, Open Graph, JSON-LD de servicio profesional y `robots.txt`.
- Cabeceras de seguridad en Vercel: nosniff, SAMEORIGIN, referrer policy y permissions policy.

## Validación realizada

- Seis páginas probadas a 390 × 844 px: ancho de documento 390 px, sin scroll horizontal.
- Footer medido a 1440 px sobre viewport de 1440 px; `max-width: none`.
- Footer medido a 390 px sobre viewport de 390 px.
- Logo móvil: centro 195 px sobre viewport con centro 195 px.
- Todas las páginas mantienen un único `h1`.
- Cero imágenes rotas y cero errores de consola en las seis páginas.
- Preloader termina y libera el scroll.
- Click de servicio: `aria-expanded="true"` y tarjeta abierta.
- Hold de servicio: estado táctil activo después de 460 ms.
- WebGL disponible y Color Bloom renderizado.
- Reduced motion: 100% de reveals visibles y cero capas de parallax.
- `node --check` aprobado para `app.js` y `three-experience.js`.
- `git diff --check` aprobado.

## Pendientes de publicación

- Falta el dominio final para agregar canonical y generar un sitemap XML válido con URLs absolutas.
- Las muestras siguen etiquetadas como conceptuales. Deben sustituirse por casos reales aprobados cuando existan fotos y resultados verificables.
