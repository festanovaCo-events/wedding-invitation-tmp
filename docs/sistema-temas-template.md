# Sistema de Temas para Templates

Esta documentación explica cómo funciona el sistema de temas del proyecto y cómo usarlo para cambiar colores, SVG, Lottie y assets sin editar cada componente manualmente.

## Objetivo

El proyecto usa una base común para varios templates visuales, por ejemplo `hojas-navy` y `hojas-forest`. La diferencia entre templates debe vivir en archivos de tema y assets generados, no en ramas duplicadas con cambios manuales en HTML, CSS, SVG y JSON.

## Archivos Principales

- `src/app/themes/theme.types.ts`: define el contrato `WeddingTheme`.
- `src/app/themes/template-hojas-navy.theme.ts`: paleta y assets del tema navy.
- `src/app/themes/template-hojas-forest.theme.ts`: paleta y assets del tema forest.
- `src/app/themes/active-theme.ts`: archivo generado automáticamente con el tema activo.
- `src/app/themes/theme-assets.ts`: importa Lotties generados y define paths de assets activos.
- `src/app/themes/theme-utils.ts`: convierte la paleta del tema en variables CSS `--theme-*`.
- `scripts/select-theme.js`: selecciona el tema activo y genera assets activos.
- `scripts/generate-theme-assets.js`: recolorea SVG y Lottie desde los assets base.
- `src/assets/generated/active/`: salida generada con SVG/Lottie ya recoloreados.

## Cambiar de Tema

Usa los scripts del proyecto:

```bash
npm run theme:navy
npm run theme:forest
```

También puedes usar variable de entorno:

```bash
TEMPLATE_THEME=hojas-navy npm run build
TEMPLATE_THEME=hojas-forest npm run build
```

Los hooks `prestart`, `prebuild` y `pretest` ejecutan `scripts/select-theme.js`. Si no pasas un tema explícito, el script conserva el tema activo actual leyendo `src/app/themes/active-theme.ts`.

## Flujo de Generación

Cuando se selecciona un tema:

1. `scripts/select-theme.js` valida el nombre del tema.
2. Genera `src/app/themes/active-theme.ts`.
3. Ejecuta `generateThemeAssets(themeName)`.
4. Escribe SVG y Lottie recoloreados en `src/assets/generated/active/`.
5. Angular importa los Lotties desde `assets/generated/active/animations`.
6. Los componentes usan clases semánticas como `text-heading`, `bg-primary`, `text-card-heading`.

## Paleta Semántica

La paleta se define en cada archivo `template-*.theme.ts`.

Tokens actuales:

- `primary`: color principal del tema.
- `primaryDark`: variante oscura.
- `primarySoft`: variante intermedia.
- `primaryLight`: variante clara.
- `coupleSeparatorText`: color del texto del separador `&` en el título de pareja.
- `cardHeading`: color para títulos de tarjetas.
- `accent`: color de acento.
- `heading`: títulos generales.
- `text`: texto general.
- `surface`: fondo claro principal.
- `surfaceAlt`: fondo claro alternativo.
- `muted`: texto o elementos secundarios.
- `overlay`: overlays de banners/modales.
- `success`, `info`, `border`: estados y bordes.

Estos tokens se exponen en `styles.css` con Tailwind v4:

```css
@theme {
  --color-primary: var(--theme-primary);
  --color-heading: var(--theme-heading);
  --color-card-heading: var(--theme-card-heading);
}
```

Y se usan en componentes:

```html
<h3 class="text-card-heading">...</h3>
<button class="bg-primary hover:bg-primary-soft">...</button>
```

## SVG y Lottie

Los SVG y Lottie no se recolorean por CSS global. Se generan desde los assets base usando `scripts/generate-theme-assets.js`.

Entradas base:

- `src/assets/images/...`
- `src/assets/animations/...`

Salida activa:

- `src/assets/generated/active/images/...`
- `src/assets/generated/active/animations/...`

`theme-assets.ts` debe apuntar a `assets/generated/active/...` para los archivos que cambian por tema.

## Agregar un Nuevo Color Semántico

1. Agrega la propiedad en `ThemePalette` dentro de `theme.types.ts`.
2. Define el valor en cada `template-*.theme.ts`.
3. Expón la variable en `theme-utils.ts`.
4. Agrega el token Tailwind en `styles.css`.
5. Usa la clase semántica en el componente.
6. Agrega o actualiza tests en `src/app/themes/*.spec.ts`.

Ejemplo:

```ts
cardHeading: '#8B6F4A'
```

```css
--color-card-heading: var(--theme-card-heading);
```

```html
<h3 class="text-card-heading">Música</h3>
```

## Agregar un Nuevo Tema

1. Crea `src/app/themes/template-<nombre>.theme.ts`.
2. Agrega el tema al tipo `ThemeName`.
3. Regístralo en `src/app/themes/themes.ts`.
4. Agrega el tema en `THEMES` dentro de `scripts/select-theme.js`.
5. Agrega su mapeo de colores en `THEME_COLOR_MAPS` dentro de `scripts/generate-theme-assets.js`.
6. Agrega un script opcional en `package.json`, por ejemplo:

```json
"theme:nuevo": "node scripts/select-theme.js hojas-nuevo"
```

## Verificación Recomendada

Después de cambiar temas o tokens:

```bash
node --test scripts/select-theme.test.js scripts/generate-theme-assets.test.js
npm test -- --watch=false --browsers=ChromeHeadless
npm run build
```

También conviene revisar visualmente:

- Banner principal.
- Countdown.
- Tarjetas de eventos.
- Instrucciones.
- Modales.
- Confirmación.
- Lotties generados.

## Notas

- `src/app/themes/active-theme.ts` es generado. No debe editarse manualmente.
- `src/assets/generated/active/` también es generado, pero debe existir antes de compilar porque Angular importa JSON desde ahí.
- El warning del IDE sobre `@theme` en `styles.css` es por sintaxis Tailwind v4 CSS-first. El build compila correctamente.
