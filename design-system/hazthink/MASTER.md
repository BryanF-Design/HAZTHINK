# HAZTHINK — Design System Master

Dirección: **Pink Press**. Estudio creativo mexicano, movimiento editorial y cultura de impresión.

## Principios

1. Rosa como tinta base; multicolor como registro y categoría.
2. Loto real de HAZTHINK, nunca sustitutos genéricos.
3. Una sola pieza espectacular por vista; el resto mantiene jerarquía y aire.
4. Bordes, retículas y sombras sólidas; no glassmorphism ni tarjetas SaaS.
5. Toda interacción importante funciona sin hover.

## Color

| Rol | Valor |
|---|---|
| Rosa base | `#F22670` |
| Rosa hot | `#FF3B82` |
| Rosa profundo | `#B80B4E` |
| Vino / tinta | `#360719` |
| Papel | `#FFF7FA` |
| Papel rosa | `#FFD0E0` |
| Azul registro | `#238ED1` |
| Verde registro | `#4DB45F` |
| Amarillo registro | `#F3E52B` |
| Naranja registro | `#FF9239` |
| Morado registro | `#A642BE` |

Texto normal debe mantener 4.5:1. Los colores de registro no se usan solos para transmitir estado.

## Tipografía

- Inter local: navegación, títulos sans, texto y controles.
- Fraunces local: acentos editoriales en cursiva.
- Display: tracking negativo, líneas compactas, máximo 11 caracteres visuales por renglón en héroes.
- Cuerpo: 16 px mínimo móvil, line-height 1.55–1.7.

## Composición

- 4/8 px como ritmo base.
- Héroes asimétricos con palabra outline de fondo.
- Bordes de 1 px en tinta; radios rectos salvo controles circulares.
- Footer siempre full-bleed, nunca dentro de `--max`.
- Header: 104 px escritorio, 96 px móvil; logo centrado al viewport en móvil.

## Motion

- Microinteracción: 150–300 ms.
- Reveals editoriales: 600–750 ms.
- Page wipe: 360 ms.
- Parallax: 3–5 capas como máximo, transform-only, ±70 px.
- Scroll nativo; sin scroll-jacking.
- `prefers-reduced-motion`: sin parallax, contenido visible de inmediato.

## Estados

- Hover: color/arte responde sin mover el layout.
- Click/tap: feedback inmediato y acción primaria.
- Hold: preview cromático opcional; nunca única vía.
- Focus: outline rosa de 3 px.
- Targets táctiles: 44 × 44 px mínimo.

## Prohibido

- Gradientes morados genéricos, glass cards, bento SaaS y iconos emoji.
- Copiar layouts completos de sitios de referencia.
- Inventar clientes, métricas o resultados.
- Animación infinita decorativa fuera de estados de carga.
- Logo deformado, con fondo o fuera de proporción.

## Validación

- 390 × 844, 768, 1024 y 1440.
- Landscape móvil.
- Reduced motion.
- Sin overflow horizontal.
- Un `h1`, imágenes válidas, focus visible y cero errores de consola.
