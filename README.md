# Sitio web HAZTHINK

Experiencia web estática para HAZTHINK, estudio de diseño, impresión y publicidad.

## Abrir en local

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Después abre `http://127.0.0.1:4173/`. En Vercel, `vercel.json` mantiene las rutas limpias (`/nosotros`, `/proyectos`, etc.).

## Experiencia

- Hero inmersivo con el **Color Bloom** de HAZTHINK construido en Three.js.
- Movimiento conectado al scroll, arrastre, clic y presión sostenida.
- Tarjetas de servicios expandibles por clic o teclado.
- Respuesta magnética, cursor contextual y estados de presión para puntero y tacto.
- Diseño responsive con navegación inferior móvil y fallback estático si WebGL no está disponible.
- Soporte de `prefers-reduced-motion`, foco visible y navegación semántica.

## Archivos principales

- `index.html` — portada y contenido principal.
- `styles.css` — estilos históricos compartidos con las páginas interiores.
- `experience.css` — sistema visual y responsive del rediseño.
- `app.js` — navegación, scroll, clic, hover, reveals y slider.
- `three-experience.js` — escena Three.js e interacción del Color Bloom.
- `assets/hazthink-logo-transparent.png` — logotipo final recortado con canal alfa.
- `assets/hazthink-favicon.png` — isotipo transparente optimizado para pestañas y accesos directos.
- `AUDITORIA_UX.md` — hallazgos, decisiones y validación del rediseño.

## Dependencias

- `assets/js/anime.min.js` está incluido localmente.
- Three.js está fijado a `0.184.0` mediante un módulo ESM de jsDelivr.

## Contenido pendiente

Las piezas de proyectos siguen identificadas como muestras conceptuales. Deben sustituirse por casos reales cuando HAZTHINK entregue fotografías y resultados aprobados.
