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

**⚠️ IMPORTANTE**: El archivo `environment.prod.ts` se genera **automáticamente** durante el build usando variables de entorno de Vercel.

**NO** copies el archivo manualmente. En su lugar:

1. Configura las variables de entorno en Vercel (ver `VERCEL_ENV_SETUP.md` en la raíz del proyecto)
2. El script `scripts/generate-environment.js` generará `environment.prod.ts` automáticamente durante el build

**Para desarrollo local**, puedes crear el archivo manualmente si es necesario:
```bash
cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
```

## 🔒 Seguridad

- El archivo `environment.ts` está en `.gitignore` (valores sensibles de desarrollo)
- El archivo `environment.prod.ts` se genera automáticamente durante el build y NO debe subirse al repositorio
- Las variables de entorno se configuran de forma segura en Vercel
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
