# Plataforma FestanovaCo

Documentación de intención: qué se quiere construir, por qué, qué se descarta y cómo queda montado. Fecha: 2026-08-23.

Repos:

- Shell Next.js: `festanovaco-web` (hermano de este repo, en `d:\Programacion\angular\festanovaco-web`)
- Invitaciones de boda (Angular): este repo (`wedding-invitation-tmp`)
- Invitaciones de cumpleaños (Angular): repo futuro

Dominio público: `festanovaco.com`. Hosting: Vercel.

Copia de trabajo alineada con `festanovaco-web/docs/arquitectura.md`. El detalle técnico de implementación de este Angular está en `docs/superpowers/specs/2026-08-23-festanovaco-shell-rewrites-design.md`.

---

## Objetivo

Tener **un solo sitio de marca** (`festanovaco.com`) donde el visitante vea el marketing y las categorías (bodas, cumpleaños, y más adelante otras), y al pulsar **ir a la invitación** entre a la mini-web real de esa celebración **en el mismo dominio**, a pantalla completa.

El marketing se construye en **Next.js / React**. Cada tipo de invitación es un **proyecto Angular aparte** (hoy bodas; después cumpleaños). Quien sabe React trabaja el shell; quien sabe Angular trabaja la invitación. TypeScript en todos. Deploys independientes. El usuario no nota que son aplicaciones distintas.

---

## Razones

1. **El equipo no comparte un solo stack.** Hay gente de Angular y gente que no. Forzar todo a React o todo a Angular deja fuera a una parte del equipo y tira el código de invitaciones que ya existe.
2. **Son productos distintos.** La web comercial (catálogo, contacto, SEO, landings) no es la invitación (RSVP, countdown, música, token). Mezclarlos en un solo SPA complica releases y responsabilidades.
3. **Ya hay una invitación de bodas en Angular 18** que carga por `?token=` y habla con el API. El objetivo es **enchufarla** al dominio, no reescribirla.
4. **Mismo dominio.** Las URLs deben ser de FestanovaCo (`/wedding`, `/invitations-wedding?token=…`), no un `*.vercel.app` ni un subdominio por mini-web.
5. **Escalar por categoría.** Bodas y cumpleaños (y otras) son features/productos que se añaden sin reabrir el shell entero.

---

## Qué se quiere lograr con esto y por qué no de otra forma

**Qué se quiere lograr**

- Un visitante entra a `festanovaco.com`, ve categorías, y en bodas pulsa ir a la invitación.
- El navegador abre otra página: `festanovaco.com/invitations-wedding?token=…`.
- Esa página es el SPA Angular de bodas. Next no pinta React encima ni al lado.
- El token sigue siendo query, como hoy. El API no cambia.
- En local y en Vercel el flujo es el mismo: el shell **reescribe** esa ruta al deploy Angular.

**Por qué no Module Federation**

Module Federation sirve cuando React y Angular tienen que **convivir en el mismo documento** (un widget Angular dentro de una página Next). Aquí la invitación es **otra página a pantalla completa**. Federation entre Next 16 y Angular 18 (esbuild, no webpack) es frágil, no aporta SSR de la invitación y obliga a cambiar el builder de Angular. No resuelve el problema real: equipos y deploys separados bajo un dominio.

**Por qué no un iframe**

Aísla bien, pero empeora historial, móvil, compartir enlace y sensación de “una sola web”. Innecesario si la invitación ya ocupa toda la ventana.

**Por qué no reescribir las invitaciones en Next**

Descartaría este repo Angular y a quien trabaja en Angular. El valor está en **reutilizar** esta mini-web.

**Por qué no dejar Angular como sitio único**

La web comercial (home, `/wedding`, `/birthday`) es marketing, SEO y evolución rápida de landings. Next encaja mejor ahí. Angular se queda donde ya aporta: la experiencia de invitación.

**Por qué no subdominios** (`jose-y-luz.festanovaco.com`)

Choca con el mapa de rutas acordado (`/wedding`, `/invitations-wedding`). Reescrituras en el mismo dominio cumplen marca y enlaces compartibles sin DNS extra por invitación. El invitado se distingue por `token`, no por host.

**Por qué rewrites de Vercel (zonas)**

El DNS apunta solo al proyecto Next. `/invitations-wedding` y sus assets se proxifican al proyecto Vercel de bodas. El navegador ve un origen. Cada repo se publica solo. Es el patrón de microfrontends por **ruta**, no por runtime compartido.

---

## Conclusiones

- El shell Next es dueño de `festanovaco.com`.
- Cada invitación es un SPA Angular detrás de un prefijo (`/invitations-wedding`, mañana `/invitations-birthday`).
- React y Angular **no** se mezclan en la misma página.
- El enlace a la invitación debe ser navegación de documento completo (`<a>`), no `next/link`, para que el rewrite se aplique en el servidor.
- En el shell, cada categoría es un **feature** (`src/features/home`, `wedding`, `birthday`). Lo nuevo entra como feature, no como módulo anidado.
- Module Federation queda fuera salvo que un día se necesite un widget Angular **dentro** de una página React.

---

## Arquitectura planteada

### Piezas

| Pieza | Repo | Qué sirve | Dónde se publica |
|-------|------|-----------|------------------|
| Shell | `festanovaco-web` | `/`, `/wedding`, `/birthday` | Proyecto Vercel **con el dominio** |
| Bodas | `wedding-invitation-tmp` | SPA de invitación | Otro proyecto Vercel (`WEDDING_APP_URL`) |
| Cumpleaños | futuro | SPA de invitación | Otro proyecto; `BIRTHDAY_APP_URL` |

### Rutas públicas

| URL | Quién responde |
|-----|----------------|
| `festanovaco.com/` | Next — feature `home` |
| `festanovaco.com/wedding` | Next — feature `wedding` |
| `festanovaco.com/birthday` | Next — feature `birthday` (placeholder hasta el SPA Angular) |
| `festanovaco.com/invitations-wedding?token=…` | Angular bodas (rewrite, **sin** página Next) |
| `festanovaco.com/invitations-wedding/expired?token=…` | Angular bodas |
| `festanovaco.com/invitations-birthday?token=…` | Angular cumpleaños (cuando exista) |

Next **no** define rutas `/invitations-wedding/*`. Si existiera una página React ahí, taparía el SPA.

### Rewrite (mismo recorte de prefijo en local y producción)

- `/invitations-wedding` → `{WEDDING_APP_URL}/`
- `/invitations-wedding/:path*` → `{WEDDING_APP_URL}/:path*`

Local: `WEDDING_APP_URL=http://localhost:4200`. Producción: URL del deploy Angular en Vercel. La query (`token`, `preview`) se reenvía.

Este Angular debe servirse con `base href` `/invitations-wedding/` para que JS, CSS y el router no pidan archivos a la raíz de Next.

### Flujo

1. El usuario está en `/wedding` (Next).
2. Pulsa ir a la invitación → `/invitations-wedding?token=…`.
3. Vercel/Next reescribe a este SPA Angular.
4. Angular lee el token (ya lo hace) y llama al API (`/v1/invitation/info/:token`).
5. RSVP y expirada siguen en Angular. El shell no intermedia el API.

### Organización del código Next

```
src/app/                 → solo rutas (App Router)
src/features/home/
src/features/wedding/
src/features/birthday/   → cada uno es un feature
src/shared/              → header, botones, rutas, rewrites
```

Una categoría nueva en el marketing = un feature nuevo + una ruta en `app/`. Una mini-web nueva = un repo Angular + un rewrite + un prefijo `/invitations-…`.

### Qué ya está y qué falta

Hecho: repo `festanovaco-web` con features, landings mínimas y rewrites.

Pendiente en este Angular: `baseHref`, `APP_BASE_HREF`, URLs canónicas con `/invitations-wedding`, assets relativos, `vercel.json` SPA. Luego dominio en el proyecto Next y `WEDDING_APP_URL` de producción.

---

## Alcance a futuro

- **Cumpleaños:** repo Angular propio, feature `birthday` de verdad (no solo “próximamente”), rewrite `/invitations-birthday` con `BIRTHDAY_APP_URL`.
- **Más categorías** (bautizo, xv años, etc.): mismo patrón — feature en Next + SPA Angular + prefijo `/invitations-…`.
- **Landings de marketing:** el shell puede crecer (modelos, contacto, blog) sin tocar las invitaciones.
- **Tipos compartidos:** si hace falta, un paquete de tipos TypeScript entre repos; no implica Federation.
- **Widget Angular dentro de Next:** solo si el producto pide un trozo de Angular *dentro* de una página React. Entonces se reabre el diseño (Federation o web component). No es el caso de la invitación a pantalla completa.
- **Fuera de este alcance ahora:** rediseño tipo Fixdate, cambios de API, reescribir RSVP, y mezclar runtimes en una sola página.
