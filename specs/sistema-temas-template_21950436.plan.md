---
name: sistema-temas-template
overview: Convertir el proyecto en una base reutilizable por template, donde colores y assets visuales se definan desde un archivo central y los componentes usen tokens semánticos en vez de nombres concretos como navy o forest.
todos:
  - id: crear-contrato-tema
    content: Crear tipos y archivos base de tema para navy, forest y active theme.
    status: completed
  - id: tokens-css
    content: Convertir `src/styles.css` a tokens semánticos consumidos por Tailwind y variables CSS.
    status: completed
  - id: migrar-componentes
    content: Reemplazar clases y colores concretos por tokens semánticos en componentes HTML/CSS.
    status: completed
  - id: centralizar-assets
    content: Mover imágenes, SVGs, música y Lotties variables a la configuración del tema.
    status: completed
  - id: automatizar-seleccion-tema
    content: Crear un script/env para seleccionar el tema activo sin editar archivos manualmente.
    status: completed
  - id: validar-ramas
    content: Usar las ramas `template-hojas-navy` y `template-hojas-forest` como referencia para comprobar que ambos templates se pueden representar con el nuevo sistema.
    status: completed
  - id: verificar-build
    content: Ejecutar build y revisión visual básica para confirmar que la base queda lista para nuevas ramas.
    status: completed
isProject: false
---

# Sistema De Temas Para Templates

## Recomendación

Usar un sistema de tema por archivo central, pensado principalmente para build/deploy por invitación. La idea es que `template-hojas-navy` y `template-hojas-forest` dejen de vivir como ramas duplicadas y pasen a ser configuraciones intercambiables dentro del mismo código base.

El cambio clave es pasar de clases/valores acoplados a una paleta concreta, por ejemplo `text-navy`, `bg-navy`, `#425e87`, a tokens semánticos como `text-primary`, `bg-primary`, `text-heading`, `bg-surface`, `bg-overlay`. Así puedes cambiar la paleta sin editar cada componente.

## Enfoques Evaluados

**Opción recomendada: tema central + tokens semánticos + assets por template.**

Crear archivos como:

- [`src/app/themes/template-hojas-navy.theme.ts`](src/app/themes/template-hojas-navy.theme.ts)
- [`src/app/themes/template-hojas-forest.theme.ts`](src/app/themes/template-hojas-forest.theme.ts)
- [`src/app/themes/active-theme.ts`](src/app/themes/active-theme.ts)
- [`src/app/themes/theme.types.ts`](src/app/themes/theme.types.ts)
- [`scripts/select-theme.js`](scripts/select-theme.js)

`active-theme.ts` exportaría el tema que se usa en esa rama/proyecto, pero no se editaría a mano: lo generaría un script a partir de una variable o comando. Cada tema tendría paleta, overlays, Lottie data, imágenes decorativas, video/música y cualquier asset que hoy cambia entre ramas.

**Opción simple: solo variables CSS en [`src/styles.css`](src/styles.css).**

Es más rápida, pero no resuelve bien Lottie JSON, SVGs con colores internos, videos, imágenes o música. Sirve si solo cambian colores CSS, pero tu comparación entre ramas muestra cambios en HTML, CSS, Lotties, SVGs e imágenes.

**Opción avanzada: selector runtime de tema.**

Permitir `?theme=navy` o una configuración remota para previsualizar varios temas sin recompilar. Es útil más adelante, pero ahora agrega complejidad innecesaria si cada invitación se deploya con un template fijo.

## Arquitectura Propuesta

1. Crear un contrato `WeddingTheme` con:

- `palette`: colores base y semánticos.
- `assets`: imágenes, videos, música y decoraciones SVG.
- `animations`: datos Lottie importados por tema.
- `classes` o `cssVars`: variables aplicables al documento.

2. Generar un archivo activo:

```ts
export { TEMPLATE_HOJAS_NAVY as ACTIVE_THEME } from "./template-hojas-navy.theme";
```

El archivo [`src/app/themes/active-theme.ts`](src/app/themes/active-theme.ts) será generado por [`scripts/select-theme.js`](scripts/select-theme.js), usando una lista permitida de temas para evitar nombres inválidos. Esto permite decidir el template sin tocar componentes:

```bash
npm run theme:navy
npm run theme:forest
TEMPLATE_THEME=hojas-navy npm run build
```

En [`package.json`](package.json) se añadirían scripts de ayuda:

```json
{
  "theme:navy": "node scripts/select-theme.js hojas-navy",
  "theme:forest": "node scripts/select-theme.js hojas-forest",
  "prebuild": "node scripts/select-theme.js"
}
```

Si `TEMPLATE_THEME` no está definido, el script usaría un tema por defecto, inicialmente `hojas-navy`.

3. Refactorizar [`src/styles.css`](src/styles.css) para declarar tokens semánticos de Tailwind:

```css
@theme {
  --color-primary: var(--theme-primary);
  --color-primary-dark: var(--theme-primary-dark);
  --color-surface: var(--theme-surface);
  --color-heading: var(--theme-heading);
}
```

Luego los componentes usan `text-primary`, `bg-primary`, `text-heading`, `bg-surface`, etc.

4. Reemplazar referencias dispersas en componentes:

- `text-navy`, `bg-navy`, `text-navy-dark`, `bg-slate-blue` pasan a tokens semánticos.
- Hex directos como `#425e87`, `#a0c0e7`, overlays `rgba(74, 79, 96, 0.60)` pasan a variables.
- Assets hardcodeados en CSS/HTML pasan por variables CSS o por `ACTIVE_THEME.assets`.

5. Centralizar Lottie.

Hoy varios componentes importan JSON directamente desde `src/assets/animations`, por ejemplo [`src/app/components/common/loader-heart/loader-heart.component.ts`](src/app/components/common/loader-heart/loader-heart.component.ts), [`src/app/components/wedding-components/banner-home/banner-home.component.ts`](src/app/components/wedding-components/banner-home/banner-home.component.ts) y [`src/app/components/cards/event-card/event-card.component.ts`](src/app/components/cards/event-card/event-card.component.ts). La propuesta es que estos componentes lean desde `ACTIVE_THEME.animations`, para que cada template pueda traer sus Lotties ya coloreados.

6. Organizar assets por template.

Mantener assets comunes y assets específicos:

- `src/assets/templates/hojas-navy/...`
- `src/assets/templates/hojas-forest/...`
- `src/assets/common/...`

Así no se pisan archivos como `img_ondas01.svg`, `img_cinta01.svg` o `heart.json` entre ramas.

## Flujo De Trabajo Después Del Cambio

Para crear una rama nueva con cambios de API o cliente:

1. Partir desde la rama base refactorizada.
2. Elegir el tema con comando o variable, por ejemplo `npm run theme:navy` o `TEMPLATE_THEME=hojas-forest npm run build`.
3. Crear la rama nueva para API/contenido.
4. Cambiar endpoints, `WEDDING_INFO`, fechas, invitados o datos del cliente sin tocar colores manualmente.

## Verificación

Después de implementar, habría que validar:

- `npm run build` para confirmar que Tailwind/Angular compilan con los nuevos tokens.
- Revisión visual rápida de secciones principales: banner, countdown, cards, modales, confirmación, Instagram y loader.
- Comparación de `template-hojas-navy` y `template-hojas-forest` para migrar los assets ya existentes al nuevo sistema sin perder diseños actuales.
