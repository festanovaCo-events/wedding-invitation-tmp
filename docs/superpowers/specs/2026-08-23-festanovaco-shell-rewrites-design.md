# FestanovaCo: shell Next.js + invitaciones Angular (mismo dominio)

Fecha: 2026-08-23  
Repos: shell Next (nuevo) + este repo Angular de bodas (`wedding-invitation-tmp`)  
Hosting: Vercel  
Dominio público: `festanovaco.com`

## Contexto

El sitio comercial (home y categorías) vivirá en Next.js, en un repositorio distinto al de las invitaciones. Las invitaciones de boda ya existen en este repo Angular 18 y se identifican con `?token=`. Más adelante habrá otra app Angular de cumpleaños.

Se descartó Module Federation. La invitación se abre en **otra página a pantalla completa**, no dentro del layout de Next. React y Angular no comparten runtime ni documento. El equipo de React publica el shell; el de Angular publica cada mini-web. El navegador ve un solo dominio gracias a **rewrites de Vercel** (zonas / proxy de rutas).

## Objetivos

- `festanovaco.com` sirve el marketing en Next.
- “Ir a la invitación” abre la mini-web Angular de bodas en el mismo dominio.
- Cada equipo trabaja y despliega su repo sin mezclar stacks.
- El token de invitación sigue siendo query (`?token=`), como ya hace este Angular.
- El patrón se replica luego para cumpleaños.

## Fuera de alcance (esta entrega)

- Module Federation, webpack remoto, o widgets Angular embebidos en páginas React.
- Repo y UI de invitaciones de cumpleaños (solo se reserva la ruta).
- Rediseño visual de la landing tipo Fixdate (el shell puede ser mínimo).
- Cambios de API / backend.
- Cambios de RSVP, estilos o contenido de la invitación, salvo URLs y `base href`.

## Arquitectura

Tres proyectos Vercel, repos independientes. El DNS de `festanovaco.com` apunta **solo** al proyecto Next.

| Proyecto Vercel | Repo | Rol |
|-----------------|------|-----|
| Shell Next | Nuevo | Dueño del dominio. Sirve `/`, `/wedding`, `/birthday`. Reescribe las rutas de invitaciones. |
| Bodas Angular | Este repo | SPA detrás de `/invitations-wedding`. URL interna `*.vercel.app`, no pública. |
| Cumpleaños Angular | Futuro | SPA detrás de `/invitations-birthday`. |

Next no ejecuta Angular. En `next.config` reescribe:

- `/invitations-wedding` → `https://<bodas>.vercel.app/`
- `/invitations-wedding/:path*` → `https://<bodas>.vercel.app/:path*`

La query (`token`, `preview`) se reenvía. En local, el destino es `http://localhost:4200` con el mismo recorte de prefijo.

El mismo patrón aplica a `/invitations-birthday` cuando exista ese deploy.

## Rutas

### Next (páginas propias)

| URL | Contenido |
|-----|-----------|
| `festanovaco.com/` | Home del negocio |
| `festanovaco.com/wedding` | Categoría bodas (landing, CTA) |
| `festanovaco.com/birthday` | Categoría cumpleaños (placeholder hasta el repo futuro) |

Next **no** define páginas React en `/invitations-wedding` ni `/invitations-wedding/*`. Solo rewrite. Así no pisan el SPA Angular.

### Angular bodas (este repo)

| URL pública | Ruta Angular actual |
|-------------|---------------------|
| `festanovaco.com/invitations-wedding?token=…` | `path: ''` (invitación) |
| `festanovaco.com/invitations-wedding/expired?token=…` | `path: 'expired'` |

JS, CSS, vendor y assets de esta app se piden bajo `/invitations-wedding/…` y también se reescriben al proyecto Vercel de bodas.

### Angular cumpleaños (futuro)

| URL pública | Rol |
|-------------|-----|
| `festanovaco.com/invitations-birthday?token=…` | Invitación |
| `festanovaco.com/invitations-birthday/expired?token=…` | Expirada, si aplica |

### CTA

El botón de ir a la invitación **navega** a `/invitations-wedding?token=…`. No incrusta Angular en la landing. Next no genera tokens; el enlace ya los trae (backend, WhatsApp, etc.).

## Flujo de datos

1. El usuario está en `/wedding` (Next).
2. Pulsa ir a la invitación → `GET festanovaco.com/invitations-wedding?token=…`.
3. Vercel/Next reescribe al deploy Angular. Angular arranca con base `/invitations-wedding/`.
4. `WeddingPageComponent` lee `queryParams.token` (ya implementado) y llama `GET {apiBaseUrl}/v1/invitation/info/:token`.
5. Si el estado exige página expirada, `router.navigate(['/expired'], { queryParamsHandling: 'preserve' })` produce la URL pública `/invitations-wedding/expired?token=…` porque `APP_BASE_HREF` es `/invitations-wedding/`.
6. Accept/decline siguen contra el mismo API y el mismo token. El shell no intermedia.

`environment.apiBaseUrl` no cambia. No hay CORS nuevo para el HTML/JS (mismo dominio público). El API sigue en su origen actual.

## Cambios en este repo Angular

### Prefijo público

Constante única, por ejemplo `INVITATION_PUBLIC_BASE = '/invitations-wedding'`, usada para armar URLs absolutas de la invitación.

- Build de producción: `baseHref` `/invitations-wedding/`.
- Runtime: `APP_BASE_HREF` = `/invitations-wedding/`.
- `ng serve` de desarrollo: `--base-href /invitations-wedding/ --serve-path /invitations-wedding/` para que `http://localhost:4200/invitations-wedding?token=…` coincida con el rewrite del shell.

`router.navigate(['/'])` y `['/expired']` **no** se cambian: el router es relativo al base href.

### URLs que hoy asumen la raíz

En `wedding-expired-page.component.ts` hoy:

```text
`${window.location.origin}/?token=…`
```

Debe pasar a:

```text
`${window.location.origin}/invitations-wedding?token=…`
```

Esa URL alimenta el iframe de preview en `invitation-card`. Con el path correcto, `preview=1` sigue funcionando.

### Assets con ruta absoluta de origen

`src/index.html` tiene `<base href="/">` (lo sustituye el build) y enlaces que **empiezan por `/`** (`/favicon.ico`, `/assets/animations/music.json`, etc.). Esas rutas ignoran el `<base href>` y pedirían `festanovaco.com/favicon.ico` (Next), no la app de bodas.

Hay que pasarlas a rutas relativas (`favicon.ico`, `assets/animations/music.json`) o prefijadas (`/invitations-wedding/...`). Revisar el mismo patrón en plantillas y CSS.

### Vercel SPA

Añadir `vercel.json` en este repo: fallback a `index.html` para que `/expired` en el deploy Angular no dé 404. El público llega como `festanovaco.com/invitations-wedding/expired` → rewrite → `https://<bodas>.vercel.app/expired`.

### Qué no se toca

Servicios de invitación, feature flags, estilos, Lottie, RSVP, ni el contrato del API.

## Repo Next (nuevo, fuera de este árbol)

- Next.js App Router. Las rutas `/` y `/wedding` son páginas Next; `/invitations-wedding` no.
- `rewrites` de producción hacia `https://<bodas>.vercel.app` (variable de entorno `WEDDING_APP_URL`).
- `rewrites` de desarrollo hacia `http://localhost:4200`.
- `/birthday`: página placeholder hasta el tercer proyecto.
- Landing `/wedding` con CTA a `/invitations-wedding?token=…` (token de ejemplo o de entorno para demos).
- El dominio custom se configura **solo** en el proyecto Vercel del shell.

## Errores

| Caso | Comportamiento |
|------|----------------|
| Sin `token` | Igual que hoy: Angular no carga invitación real. Next no redirige ni inventa token. |
| Token inválido / API error | Estado de error actual en Angular. Next no sustituye esa ruta por una página React. |
| Invitación expirada | `/invitations-wedding/expired?token=…`. |
| Deploy Angular caído | Solo fallan las rutas `/invitations-wedding*`. `/` y `/wedding` siguen. |
| `baseHref` o assets mal | Invitación en blanco / 404 de JS. Se corrige en este repo. |
| CORS | No aplica al estático del mismo dominio. |

## Pruebas

- Local: Next `:3000` + `ng serve` con serve-path. Abrir `/invitations-wedding?token=…` y comprobar invitación, RSVP y `/expired`.
- Assets: en DevTools, JS/CSS/favicon/Lottie salen de `/invitations-wedding/…`, no de la raíz de Next.
- Producción: mismo flujo en `festanovaco.com`; `/wedding` no captura las rutas Angular.
- Humo: home Next, `/wedding`, token válido, token inválido, expirada.

## Orden de implementación

1. Este repo: prefijo, URLs, assets relativos, `vercel.json`, comprobar `ng serve` bajo `/invitations-wedding`.
2. Repo Next nuevo: home, `/wedding`, rewrites local y producción.
3. Vercel: dominio en el shell, `WEDDING_APP_URL` al deploy de bodas, prueba con token real.
4. Después: repo Angular de cumpleaños con el mismo patrón (`/invitations-birthday`).

## Decisión explícita

No se usa Module Federation. Si en el futuro hace falta un **widget** Angular dentro de una página React (no una invitación a pantalla completa), se reabre el diseño. Ese caso no forma parte de esta spec.
