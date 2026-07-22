# Auditoría UX y visual — HAZTHINK

Fecha: 21 de julio de 2026

## Objetivo de la página

Presentar con claridad el alcance de HAZTHINK y convertir el interés en una conversación de cotización por WhatsApp, tanto en escritorio como en móvil.

## Hallazgos iniciales

1. **El logotipo perdía presencia.** Se mostraba desde un JPG cuadrado con fondo blanco y demasiado espacio alrededor. En header, hero y footer quedaba visualmente pequeño.
2. **La identidad del sitio no nacía de la marca.** El rosa pastel dominaba la interfaz aunque no forma parte del sistema cromático principal del loto de HAZTHINK.
3. **El hero dependía de mockups genéricos.** Las tarjetas flotantes comunicaban “diseño”, pero no construían una experiencia propia de HAZTHINK.
4. **La experiencia móvil invertía la prioridad.** El objeto visual ocupaba demasiado espacio antes del mensaje y el logotipo del header quedaba reducido.
5. **La interacción estaba concentrada en hover.** Tilt y cursor funcionaban con mouse, pero no existía una respuesta equivalente clara para clic, presión sostenida o tacto.
6. **La entrada tenía fricción innecesaria.** El preloader retrasaba el contenido sin aportar información.
7. **Las muestras podían confundirse con casos reales.** El sitio ya usaba ejemplos, pero la distinción necesitaba ser más visible y consistente.

## Dirección aplicada

La nueva dirección usa la figura real del loto como sistema de movimiento. El azul, verde, amarillo, naranja y morado de la marca organizan servicios, etapas y llamadas a la acción. El fondo oscuro del hero crea contraste, mientras que el resto alterna papel claro, tinta y bloques de color sólido.

La única pieza deliberadamente espectacular es el **Color Bloom** 3D. El resto del sitio mantiene tipografía, jerarquía, espacio y movimiento más contenidos para evitar una experiencia saturada.

## Mapa de interacción

| Acción | Respuesta |
|---|---|
| Scroll | Ensambla, gira y abre ligeramente el loto; activa reveals y progreso superior. |
| Hover | Cursor contextual, magnetismo sutil, movimiento de arte y estados cromáticos. |
| Clic | Abre entregables de servicios y dispara un pulso de color en el loto. |
| Mantener presionado | Separa las piezas del Color Bloom y cambia el estado anunciado. |
| Arrastrar | Gira manualmente el objeto tridimensional. |
| Teclado | Abre servicios, activa la presión del loto y muestra foco visible. |

## Mejoras implementadas

- Logotipo fiel al original, recortado, con fondo transparente y adaptación de tinta para superficies oscuras.
- Hero y cierre totalmente rediseñados.
- Three.js real con pétalos extruidos, iluminación, partículas y fallback.
- Servicios expandibles con entregables concretos.
- Proceso secuencial sticky en escritorio y lineal en móvil.
- Galería conceptual etiquetada sin inventar clientes, métricas ni resultados.
- Navegación, footer y páginas interiores alineadas al nuevo sistema.
- Eliminación del preloader.
- Movimiento reducido, foco visible, nombres accesibles y controles operables con teclado.
- Límite de densidad de píxeles y pausa de render fuera del viewport para controlar el costo de WebGL.

## Validación realizada

- JavaScript validado con `node --check` en `app.js` y `three-experience.js`.
- Three.js inicializa correctamente en navegador y el fallback permanece disponible.
- Las 24 entradas animadas se activaron al recorrer la página.
- Apertura de servicios confirmada: `aria-expanded` cambia y el contenido se vuelve visible.
- Presión sostenida confirmada: estado activo durante la presión y liberación correcta.
- Vista móvil comprobada a 390 × 844 px, sin desbordamiento horizontal.
- Header, navegación inferior y logotipos comprobados en móvil.
- Las combinaciones principales de texto y superficie mantienen al menos 4.58:1 de contraste.
- `nosotros.html`, `proyectos.html`, `contacto.html`, `privacidad.html` y `terminos.html` respondieron correctamente en el servidor local.

## Pendiente de contenido real

Las muestras visuales son deliberadamente conceptuales. La siguiente mejora editorial debe sustituirlas por proyectos reales aprobados, con fotografías y contexto entregados por HAZTHINK.
