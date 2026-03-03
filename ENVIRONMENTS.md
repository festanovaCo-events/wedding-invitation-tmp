# Variables de Entorno en Angular y Vercel

Esta guía explica cómo funcionan las variables de entorno en Angular y cómo se integran con Vercel para despliegues en producción.

## 📋 Tabla de Contenidos

1. [Concepto Básico](#concepto-básico)
2. [Estructura de Archivos](#estructura-de-archivos)
3. [Cómo Funciona en Angular](#cómo-funciona-en-angular)
4. [Cómo Funciona con Vercel](#cómo-funciona-con-vercel)
5. [Configuración Paso a Paso](#configuración-paso-a-paso)
6. [Troubleshooting](#troubleshooting)

---

## Concepto Básico

Las **variables de entorno** permiten usar valores distintos según el entorno (desarrollo, producción, etc.) **sin cambiar el código**. Esto es esencial para:

- ✅ Separar configuraciones de desarrollo y producción
- ✅ Proteger credenciales sensibles
- ✅ Facilitar despliegues automáticos
- ✅ Mantener el código limpio y reutilizable

---

## Estructura de Archivos

En Angular tienes **3 archivos principales** en `src/environments/`:

```
src/environments/
├── environment.ts              → Archivo BASE (requerido por TypeScript)
├── environment.development.ts  → Configuración para desarrollo
└── environment.prod.ts         → Configuración para producción
```

### Descripción de cada archivo:

- **`environment.ts`**: Archivo base que se importa en el código. TypeScript requiere que exista en tiempo de compilación.
- **`environment.development.ts`**: Valores para desarrollo local (ej: `http://localhost:3000`)
- **`environment.prod.ts`**: Valores para producción (ej: `https://api.tudominio.com`)

---

## Cómo Funciona en Angular

### 1. Importación en el Código

En tu código **siempre importas el archivo base**:

```typescript
// En invitation.service.ts o cualquier componente
import { environment } from '../../environments/environment';

// Usas las variables
const url = `${environment.apiBaseUrl}/api/invitation`;
```

### 2. Cómo Angular Decide Qué Archivo Usar

Angular usa `fileReplacements` en `angular.json` para reemplazar automáticamente el archivo base:

```json
{
  "configurations": {
    "development": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.development.ts"
        }
      ]
    },
    "production": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ]
    }
  }
}
```

### 3. Comandos y Configuración

| Comando | Configuración Usada | Archivo Final |
|---------|-------------------|---------------|
| `ng serve` | `development` (por defecto) | `environment.development.ts` |
| `ng build` | `production` (por defecto) | `environment.prod.ts` |
| `ng build --configuration development` | `development` | `environment.development.ts` |
| `ng build --configuration production` | `production` | `environment.prod.ts` |

---

## Cómo Funciona con Vercel

### Problema

Los archivos de entorno contienen **credenciales sensibles** y están en `.gitignore`, por lo que **no existen en el repositorio de Vercel**. Esto causa un error durante el build.

### Solución: Script de Generación Automática

El script `scripts/generate-environment.js` **genera los archivos automáticamente** antes del build usando las variables de entorno de Vercel.

### Flujo Completo en Vercel

```
1. Vercel detecta un push al repositorio
   ↓
2. Clona el repositorio (sin archivos de entorno)
   ↓
3. Ejecuta: npm install
   ↓
4. Ejecuta: npm run build
   ↓
5. Se ejecuta el hook "prebuild":
   → node scripts/generate-environment.js
   ↓
6. El script lee variables de entorno de Vercel:
   → process.env.NG_APP_API_BASE_URL
   ↓
7. Genera los archivos:
   → environment.ts (archivo base)
   → environment.prod.ts (producción)
   ↓
8. Continúa con: ng build --configuration production
   ↓
9. Angular compila usando los archivos generados
   ↓
10. ✅ Build exitoso
```

### Detalles del Script

El script `generate-environment.js` hace lo siguiente:

```javascript
// 1. Lee variables de entorno de Vercel
const apiBaseUrl = process.env.NG_APP_API_BASE_URL || 'https://api.example.com';

// 2. Genera el contenido del archivo
const environmentContent = `
export const environment = {
  production: true,
  apiBaseUrl: '${apiBaseUrl}'
};
`;

// 3. Escribe el archivo
fs.writeFileSync('src/environments/environment.ts', environmentContent);
fs.writeFileSync('src/environments/environment.prod.ts', environmentContent);
```

### Configuración en package.json

El script se ejecuta automáticamente gracias al hook `prebuild`:

```json
{
  "scripts": {
    "prebuild": "node scripts/generate-fonts-inline.js && node scripts/generate-environment.js",
    "build": "ng build --configuration production"
  }
}
```

---

## Configuración Paso a Paso

### 1. Configurar Variables en Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Haz clic en **Add New**
5. Configura la variable:
   - **Name**: `NG_APP_API_BASE_URL`
   - **Value**: `https://api.tudominio.com` (tu URL real)
   - **Environment**: Selecciona:
     - ✅ Production
     - ✅ Preview (opcional, para pull requests)
     - ❌ Development (no necesario, solo para `vercel dev`)
6. Haz clic en **Save**

### 2. Estructura de Variables

El prefijo `NG_APP_` es el **estándar recomendado** para Angular/Vercel:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NG_APP_API_BASE_URL` | URL base del API | `https://api.tudominio.com` |
| `NG_APP_API_KEY` | Clave API (opcional) | `abc123xyz` |
| `NG_APP_ANALYTICS_ID` | ID de Analytics (opcional) | `UA-123456-1` |

### 3. Agregar Nuevas Variables

Si necesitas agregar más variables:

1. **Edita `scripts/generate-environment.js`**:
   ```javascript
   const ENV_CONFIG = [
       {
           prop: 'apiBaseUrl',
           envVars: ['NG_APP_API_BASE_URL'],
           defaultValue: 'https://api.example.com'
       },
       // Agrega tu nueva variable:
       {
           prop: 'apiKey',
           envVars: ['NG_APP_API_KEY'],
           defaultValue: ''
       }
   ];
   ```

2. **Agrega la variable en Vercel** con el nombre `NG_APP_API_KEY`

3. **Actualiza los archivos de entorno** para incluir la nueva propiedad:
   ```typescript
   export const environment = {
     production: true,
     apiBaseUrl: '...',
     apiKey: '...'  // Nueva propiedad
   };
   ```

---

## Resumen Visual

### Desarrollo Local

```
Tú ejecutas: ng serve
    ↓
Angular usa: environment.development.ts (archivo local)
    ↓
Valores: http://localhost:3000
```

### Producción en Vercel

```
Vercel ejecuta: npm run build
    ↓
prebuild hook: genera environment.ts y environment.prod.ts
    ↓
Angular usa: environment.prod.ts (generado desde variables de Vercel)
    ↓
Valores: https://api.tudominio.com (desde NG_APP_API_BASE_URL)
```

---

## Ventajas de Este Enfoque

✅ **Seguridad**: Las credenciales no están en el código fuente  
✅ **Automático**: Se genera en cada build sin intervención manual  
✅ **Flexible**: Diferentes valores por entorno (dev, preview, production)  
✅ **Estándar**: Sigue las mejores prácticas de Angular/Vercel  
✅ **Mantenible**: Un solo lugar para gestionar variables (Vercel Dashboard)

---

## Troubleshooting

### Error: "Could not resolve '../../environments/environment'"

**Causa**: El archivo `environment.ts` no existe en el repositorio (está en `.gitignore`).

**Solución**: El script `generate-environment.js` debe ejecutarse antes del build. Verifica que:
- El hook `prebuild` está configurado en `package.json`
- El script genera `environment.ts` correctamente

### Error: Variables no se están usando en producción

**Causa**: La variable no está configurada en Vercel o tiene un nombre incorrecto.

**Solución**: 
- Verifica que la variable existe en Vercel Dashboard
- Usa el prefijo `NG_APP_` para variables de Angular
- Redespliega el proyecto después de agregar variables

### Desarrollo local usa valores de producción

**Causa**: El archivo `environment.ts` tiene valores de producción.

**Solución**: 
- Verifica que `environment.development.ts` tiene los valores correctos
- Asegúrate de que `angular.json` tiene `fileReplacements` para desarrollo
- Ejecuta `ng serve` (no `ng build`)

---

## Referencias

- [Angular Environment Variables](https://angular.dev/tools/cli/environments)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Angular CLI Build Configurations](https://angular.dev/reference/configs/angular-compiler-options)

---

## Archivos Relacionados

- `src/environments/environment.ts` - Archivo base (generado)
- `src/environments/environment.development.ts` - Desarrollo local
- `src/environments/environment.prod.ts` - Producción (generado)
- `scripts/generate-environment.js` - Script de generación
- `angular.json` - Configuración de fileReplacements
- `.gitignore` - Archivos de entorno ignorados

---

**Última actualización**: 2024
