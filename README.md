# Wedding Invitation Template

Proyecto Angular para una invitacion de boda con soporte para temas visuales, variables de entorno generadas, feature flags y mocks de API. Forma parte de la plataforma FestanovaCo: el marketing vive en Next.js (`festanovaco-web`) y esta app se sirve en `festanovaco.com/invitations-wedding`.

- Intención (objetivo, razones, arquitectura, alcance): [docs/arquitectura-festanovaco.md](./docs/arquitectura-festanovaco.md)
- Spec técnica de rewrites y `baseHref`: [docs/superpowers/specs/2026-08-23-festanovaco-shell-rewrites-design.md](./docs/superpowers/specs/2026-08-23-festanovaco-shell-rewrites-design.md)

## Documentacion Principal

La guia completa esta en:

- [Guia global del proyecto](./docs/guia-global.md)

Documentacion especifica:

- [Variables de entorno en Angular y Vercel](./docs/environments.md)
- [Feature flags para mocks de API](./docs/api-mock-flags.md)
- [Configuracion de cache para produccion](./docs/cache-config.md)
- [Sistema de temas para templates](./docs/sistema-temas-template.md)

## Inicio Rapido

Instala dependencias:

```bash
npm install
```

Genera los archivos de entorno:

```bash
node scripts/generate-environment.js
```

Opcionalmente, apunta a un API local:

```bash
NG_APP_API_BASE_URL=http://localhost:3000 node scripts/generate-environment.js
```

Selecciona un tema:

```bash
npm run theme:navy
# o
npm run theme:forest
```

Levanta el proyecto:

```bash
npm start
```

La aplicacion queda disponible en:

```text
http://localhost:4200/
```

## Scripts Utiles

```bash
npm start
npm run build
npm run watch
npm test -- --watch=false --browsers=ChromeHeadless
node --test scripts/select-theme.test.js scripts/generate-theme-assets.test.js
```

Para ver el paso a paso completo de entorno local, production, develop/preview, feature flags y templates, consulta la [guia global](./docs/guia-global.md).
