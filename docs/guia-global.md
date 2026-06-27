# Guia Global del Proyecto

Esta guia centraliza como levantar, configurar, desarrollar y desplegar el proyecto `wedding-invitation-tmp`. Tambien enlaza las documentaciones especificas para profundizar en entornos, feature flags, cache y sistema de temas.

## Indice

1. [Documentacion relacionada](#documentacion-relacionada)
2. [Requisitos](#requisitos)
3. [Levantar el proyecto en local](#levantar-el-proyecto-en-local)
4. [Variables de entorno](#variables-de-entorno)
5. [Entornos: local, development, preview y production](#entornos-local-development-preview-y-production)
6. [Feature flags](#feature-flags)
7. [Cambiar de template o tema](#cambiar-de-template-o-tema)
8. [Agregar un nuevo tema](#agregar-un-nuevo-tema)
9. [Build, pruebas y verificacion](#build-pruebas-y-verificacion)
10. [Despliegue y cache](#despliegue-y-cache)
11. [Troubleshooting rapido](#troubleshooting-rapido)

## Documentacion Relacionada

- [Variables de entorno en Angular y Vercel](./environments.md)
- [Feature flags para mocks de API](./api-mock-flags.md)
- [Configuracion de cache para produccion](./cache-config.md)
- [Sistema de temas para templates](./sistema-temas-template.md)

## Requisitos

- Node.js compatible con Angular 18. Recomendado: Node 20 LTS.
- npm.
- Angular CLI. Puedes usarlo via `npx ng` o instalarlo globalmente si lo prefieres.
- Acceso a las variables de entorno reales si vas a consumir el backend real.

## Levantar el Proyecto En Local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Crear los archivos de entorno locales

Los archivos dentro de `src/environments/` no estan versionados porque pueden contener valores sensibles. Para generarlos con valores por defecto:

```bash
node scripts/generate-environment.js
```

Si quieres apuntar a un API local:

```bash
NG_APP_API_BASE_URL=http://localhost:3000 node scripts/generate-environment.js
```

Esto genera:

```text
src/environments/environment.ts
src/environments/environment.development.ts
src/environments/environment.prod.ts
```

### 3. Seleccionar tema inicial

El proyecto tiene dos temas disponibles:

```bash
npm run theme:navy
npm run theme:forest
```

Si no seleccionas uno, los hooks del proyecto usan el tema activo actual o `hojas-navy` como valor por defecto.

### 4. Levantar la aplicacion

```bash
npm start
```

El comando abre Angular en:

```text
http://localhost:4200/
```

Internamente, `npm start` ejecuta `ng serve -o`. Antes de iniciar, el hook `prestart` selecciona el tema activo y genera estilos de fuentes.

## Variables De Entorno

La variable usada actualmente por el frontend es:

| Variable | Propiedad Angular | Uso | Ejemplo local | Ejemplo produccion |
| --- | --- | --- | --- | --- |
| `NG_APP_API_BASE_URL` | `environment.apiBaseUrl` | URL base del backend de invitaciones | `http://localhost:3000` | `https://api.tudominio.com` |

El servicio que consume esta variable es `src/app/services/invitation.service.ts`. La usa para construir las rutas reales de:

- Obtener informacion de invitacion.
- Aceptar invitacion.
- Rechazar invitacion.

### Como Se Montan Las Variables Dentro Del Proyecto

El flujo es:

1. Configuras `NG_APP_API_BASE_URL` en tu shell, Vercel o proveedor de deploy.
2. Se ejecuta `node scripts/generate-environment.js`.
3. El script lee `process.env.NG_APP_API_BASE_URL`.
4. Genera los archivos `environment.ts`, `environment.development.ts` y `environment.prod.ts`.
5. Angular importa siempre `src/environments/environment`.
6. `angular.json` reemplaza ese archivo segun la configuracion usada.

Para mas detalle, revisa [Variables de entorno en Angular y Vercel](./environments.md).

### Agregar Una Nueva Variable

1. Agrega la nueva entrada en `ENV_CONFIG` dentro de `scripts/generate-environment.js`.
2. Ejecuta de nuevo:

```bash
node scripts/generate-environment.js
```

3. Usa la nueva propiedad desde `environment`.
4. Configura la variable equivalente en Vercel para `Preview` y/o `Production`.

Ejemplo de nueva entrada:

```javascript
{
  prop: 'analyticsId',
  envVars: ['NG_APP_ANALYTICS_ID'],
  defaultValue: ''
}
```

## Entornos: Local, Development, Preview Y Production

### Local

Usado cuando trabajas en tu maquina con:

```bash
npm start
```

Angular sirve con la configuracion `development` por defecto. El archivo usado es:

```text
src/environments/environment.development.ts
```

Para local puedes usar:

```bash
NG_APP_API_BASE_URL=http://localhost:3000 node scripts/generate-environment.js
```

Si no tienes backend disponible, puedes activar mocks de API en `src/app/constants/api-mock-flags.ts`.

### Development

En Angular, `development` es la configuracion usada por `ng serve` y por:

```bash
npm run watch
```

Tambien puedes construir con esta configuracion:

```bash
npx ng build --configuration development
```

Usa `environment.development.ts`, source maps y optimizacion desactivada.

### Preview / Develop En Vercel

Si usas una rama `develop` o pull requests en Vercel, normalmente se despliegan como `Preview`.

Configura `NG_APP_API_BASE_URL` en Vercel con el entorno `Preview` apuntando al backend de pruebas o staging:

```text
NG_APP_API_BASE_URL=https://api-preview.tudominio.com
```

Aunque Vercel lo llame `Preview`, el build Angular sigue usando la configuracion `production` si ejecuta `npm run build`. La diferencia real viene de las variables configuradas en Vercel para ese entorno.

### Production

Produccion se genera con:

```bash
npm run build
```

El hook `prebuild` ejecuta:

```bash
node scripts/select-theme.js
node scripts/generate-fonts-inline.js
node scripts/generate-environment.js
```

Luego Angular compila con:

```bash
ng build --configuration production
```

Configura en Vercel:

```text
NG_APP_API_BASE_URL=https://api.tudominio.com
```

y asignala al entorno `Production`.

## Feature Flags

El proyecto tiene dos grupos de flags.

### Flags De UI

Archivo:

```text
src/app/constants/feature-flags.ts
```

Controlan funcionalidades visibles de la invitacion:

| Flag | Uso |
| --- | --- |
| `MUSIC_CARD` | Muestra u oculta la tarjeta de musica en instrucciones. |
| `SUGGEST_SONG` | Muestra u oculta la opcion de sugerir cancion en confirmaciones. |
| `SCHEDULE_PARTY` | Muestra u oculta la opcion de agendar fiesta. |
| `SCHEDULE_CEREMONY` | Muestra u oculta la opcion de agendar ceremonia. |

Ejemplo:

```typescript
export const FEATURE_FLAGS = {
  MUSIC_CARD: true,
  SUGGEST_SONG: true,
  SCHEDULE_PARTY: true,
  SCHEDULE_CEREMONY: true,
} as const;
```

### Flags De Mocks De API

Archivo:

```text
src/app/constants/api-mock-flags.ts
```

Controlan si cada endpoint usa mock o backend real:

| Flag | `true` | `false` |
| --- | --- | --- |
| `invitation.getInfo` | Usa `INVITATION_MOCKS.getInfo` | Llama al endpoint real. |
| `invitation.accept` | Usa `INVITATION_MOCKS.accept` | Llama al endpoint real. |
| `invitation.decline` | Usa `INVITATION_MOCKS.decline` | Llama al endpoint real. |

Para trabajar 100% con mocks:

```typescript
export const API_MOCK_FLAGS = {
  invitation: {
    getInfo: true,
    accept: true,
    decline: true,
  },
} as const;
```

Para mas detalle, revisa [Feature flags para mocks de API](./api-mock-flags.md).

## Cambiar De Template O Tema

Los temas disponibles son:

- `hojas-navy`
- `hojas-forest`

### Cambiar tema manualmente

```bash
npm run theme:navy
npm run theme:forest
```

Estos comandos ejecutan `scripts/select-theme.js`, que:

1. Valida el tema.
2. Genera `src/app/themes/active-theme.ts`.
3. Recolorea SVG y Lottie.
4. Escribe assets generados en `src/assets/generated/active/`.

### Cambiar tema durante un build

```bash
TEMPLATE_THEME=hojas-navy npm run build
TEMPLATE_THEME=hojas-forest npm run build
```

Tambien aplica para local:

```bash
TEMPLATE_THEME=hojas-forest npm start
```

### Archivos Que No Debes Editar Manualmente

Estos archivos son generados:

```text
src/app/themes/active-theme.ts
src/assets/generated/active/
```

Si necesitas cambiar colores, assets o animaciones, modifica los archivos fuente del tema, no la salida generada.

Para mas detalle, revisa [Sistema de temas para templates](./sistema-temas-template.md).

## Agregar Un Nuevo Tema

Paso a paso:

1. Crea el archivo del tema:

```text
src/app/themes/template-<nombre>.theme.ts
```

2. Agrega el nombre en `ThemeName`:

```text
src/app/themes/theme.types.ts
```

3. Registra el tema en:

```text
src/app/themes/themes.ts
```

4. Agrega el tema en `THEMES` dentro de:

```text
scripts/select-theme.js
```

5. Agrega el mapeo de colores para SVG y Lottie en `THEME_COLOR_MAPS` dentro de:

```text
scripts/generate-theme-assets.js
```

6. Agrega un script opcional en `package.json`:

```json
"theme:nuevo": "node scripts/select-theme.js hojas-nuevo"
```

7. Ejecuta el selector:

```bash
npm run theme:nuevo
```

8. Verifica visualmente que los assets generados correspondan al nuevo tema.

## Build, Pruebas Y Verificacion

### Pruebas unitarias

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

### Pruebas de scripts de temas

```bash
node --test scripts/select-theme.test.js scripts/generate-theme-assets.test.js
```

### Build de produccion

```bash
npm run build
```

### Preview local del build

```bash
npm run predeploy
```

Esto sirve el contenido de:

```text
dist/wedding-invitation-tmp/browser
```

en:

```text
http://localhost:8080/
```

## Despliegue Y Cache

El build de produccion queda en:

```text
dist/wedding-invitation-tmp/browser
```

El proyecto incluye configuraciones de cache para distintas plataformas:

- `.htaccess` para Apache.
- `nginx.conf` para Nginx.
- `_headers` para Netlify/Vercel.
- `scripts/copy-cache-config.js` para copiar `.htaccess` y `_headers` al build.

Flujo recomendado:

```bash
npm run build
node scripts/copy-cache-config.js
```

Luego despliega el contenido de:

```text
dist/wedding-invitation-tmp/browser
```

Para mas detalle, revisa [Configuracion de cache para produccion](./cache-config.md).

## Troubleshooting Rapido

### Error: no existe `src/environments/environment`

Genera los archivos:

```bash
node scripts/generate-environment.js
```

### El frontend llama al API equivocado

Revisa el valor generado en:

```text
src/environments/environment.development.ts
src/environments/environment.prod.ts
```

Luego vuelve a generar con la variable correcta:

```bash
NG_APP_API_BASE_URL=http://localhost:3000 node scripts/generate-environment.js
```

### El backend no esta disponible en local

Activa mocks en:

```text
src/app/constants/api-mock-flags.ts
```

### Cambie el tema pero no veo cambios

Ejecuta de nuevo:

```bash
npm run theme:navy
# o
npm run theme:forest
```

Luego reinicia `npm start`.

### El build falla por assets generados

Regenera el tema activo:

```bash
node scripts/select-theme.js
```

### Quiero cambiar colores pero no se donde

Edita el archivo del tema:

```text
src/app/themes/template-hojas-navy.theme.ts
src/app/themes/template-hojas-forest.theme.ts
```

Despues ejecuta:

```bash
node scripts/select-theme.js
```
