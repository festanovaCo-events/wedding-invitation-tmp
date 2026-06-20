# Feature Flags para Mocks de API

Esta guía explica cómo alternar cada endpoint entre una respuesta mock y una llamada real al backend.

## Objetivo

El sistema permite seguir trabajando y probando flujos del frontend aunque el backend no esté disponible. Cada endpoint tiene su propio flag, por lo que puedes simular solo una parte del API y dejar el resto consumiendo el servicio real.

## Archivos Principales

- `src/app/constants/api-mock-flags.ts`: define qué endpoints usan mock o API real.
- `src/app/mocks/invitation.mock.ts`: contiene las respuestas mock tipadas.
- `src/app/services/invitation.service.ts`: decide si devuelve el mock o llama al backend.
- `src/app/constants/api-routes.ts`: mantiene las rutas reales centralizadas.

## Cómo Activar o Desactivar Mocks

Edita `src/app/constants/api-mock-flags.ts`:

```typescript
export const API_MOCK_FLAGS = {
  invitation: {
    getInfo: false,
    accept: false,
    decline: false,
  },
} as const;
```

El significado de cada valor es:

- `true`: usa la respuesta mock definida en `src/app/mocks/invitation.mock.ts`.
- `false`: consume el endpoint real usando `HttpClient`.

## Endpoints Disponibles

| Flag | Endpoint Real | Método | Mock |
| --- | --- | --- | --- |
| `invitation.getInfo` | `/v1/invitation/info/:invitation_token` | `GET` | `INVITATION_MOCKS.getInfo` |
| `invitation.accept` | `/v1/invitation/accept/:invitation_token` | `POST` | `INVITATION_MOCKS.accept` |
| `invitation.decline` | `/v1/invitation/decline/:invitation_token` | `GET` | `INVITATION_MOCKS.decline` |

## Ejemplos de Uso

### Trabajar completamente con mocks

```typescript
export const API_MOCK_FLAGS = {
  invitation: {
    getInfo: true,
    accept: true,
    decline: true,
  },
} as const;
```

### Probar solo el endpoint real de aceptación

```typescript
export const API_MOCK_FLAGS = {
  invitation: {
    getInfo: true,
    accept: false,
    decline: true,
  },
} as const;
```

### Probar todo contra el backend real

```typescript
export const API_MOCK_FLAGS = {
  invitation: {
    getInfo: false,
    accept: false,
    decline: false,
  },
} as const;
```

## Cómo Cambiar las Respuestas Mock

Las respuestas están en `src/app/mocks/invitation.mock.ts` y usan las interfaces de `src/app/interfaces/invitation.interface.ts`.

Por ejemplo, para simular una invitación ya aceptada, cambia el estado del mock `getInfo`:

```typescript
invitation: {
  // ...
  status: 'ACCEPTED',
  guests: [
    { id: 'guest-1', name: 'Invitado Demo' }
  ]
}
```

Mantén la forma de los datos igual a la del backend para que los componentes se comporten como si estuvieran consumiendo el API real.

## Consideraciones

- Los mocks actuales son respuestas fijas: aceptar o rechazar no modifica automáticamente el resultado posterior de `getInfo`.
- Si necesitas una simulación más cercana a end to end, se puede extender este sistema con escenarios o estado temporal.
- Los flags de API están separados de `src/app/constants/feature-flags.ts`, que queda reservado para controlar funcionalidades visuales o de UI.

## Verificación

Después de cambiar flags, mocks o el servicio, ejecuta:

```bash
npm test -- --watch=false
```

Las pruebas de `src/app/services/invitation.service.spec.ts` validan que cada endpoint pueda alternar entre mock y llamada real.
