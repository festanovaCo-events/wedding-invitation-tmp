# Configuración de Variables de Entorno

## ⚠️ Importante

Los archivos `environment.ts` y `environment.prod.ts` contienen información sensible y **NO deben subirse al repositorio**.

## 📋 Configuración Inicial

### Para Desarrollo

1. Copia el archivo de ejemplo:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   ```

2. Edita `src/environments/environment.ts` y reemplaza los valores de ejemplo con tus valores reales:
   ```typescript
   export const environment = {
     production: false,
     apiBaseUrl: 'http://localhost:3000' // Tu URL real aquí
   };
   ```

### Para Producción

1. Copia el archivo de ejemplo:
   ```bash
   cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
   ```

2. Edita `src/environments/environment.prod.ts` y reemplaza los valores de ejemplo con tus valores reales de producción:
   ```typescript
   export const environment = {
     production: true,
     apiBaseUrl: 'https://api.tudominio.com' // Tu URL real aquí
   };
   ```

## 🔒 Seguridad

- Los archivos `environment.ts` y `environment.prod.ts` están en `.gitignore`
- Solo los archivos `.example.ts` se suben al repositorio
- Nunca compartas tus archivos de entorno con valores reales

## 📝 Variables Disponibles

- `production`: Indica si está en modo producción (boolean)
- `apiBaseUrl`: URL base de la API (string)

## 🚀 Uso en la Aplicación

Las variables de entorno se importan así:

```typescript
import { environment } from '../../environments/environment';

// Usar la variable
const apiUrl = environment.apiBaseUrl;
```
