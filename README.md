# Sitio web HAZTHINK

Experiencia web estática para HAZTHINK, estudio de diseño, impresión y publicidad.

## Abrir en local

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Después abre `http://127.0.0.1:4173/`. En Vercel, `vercel.json` mantiene las rutas limpias (`/nosotros`, `/proyectos`, etc.).

## Experiencia

- Sistema **Pink Press**: rosa como tinta base, retícula editorial y marcas de registro multicolor.
- Preloader propio de registro de color y transición rosa entre páginas.
- Hero inmersivo con el **Color Bloom** de HAZTHINK construido en Three.js.
- Movimiento conectado al scroll, arrastre, clic y presión sostenida.
- Tarjetas de servicios expandibles por clic o teclado.
- Respuesta magnética, parallax controlado, cursor visible y estados de hover, clic y hold.
- Diseño responsive con navegación inferior móvil y fallback estático si WebGL no está disponible.
- Soporte de `prefers-reduced-motion`, foco visible y navegación semántica.

## Archivos principales

- `index.html` — portada y contenido principal.
- `styles.css` — estilos históricos compartidos con las páginas interiores.
- `experience.css` — sistema visual y responsive del rediseño.
- `pink-rebuild.css` — reconstrucción Pink Press compartida por todas las páginas.
- `app.js` — navegación, scroll, clic, hover, reveals y slider.
- `three-experience.js` — escena Three.js e interacción del Color Bloom.
- `assets/hazthink-logo-transparent.png` — logotipo final recortado con canal alfa.
- `assets/hazthink-favicon.png` — isotipo transparente optimizado para pestañas y accesos directos.
- `AUDITORIA_UX.md` — hallazgos, decisiones y validación del rediseño.
- `robots.txt` y `vercel.json` — rastreo básico, rutas limpias y cabeceras de seguridad.

## Dependencias

- `assets/js/anime.min.js` está incluido localmente.
- Three.js está fijado a `0.184.0` mediante un módulo ESM de jsDelivr.

## Contenido pendiente

Las piezas de proyectos siguen identificadas como muestras conceptuales. Deben sustituirse por casos reales cuando HAZTHINK entregue fotografías y resultados aprobados.
