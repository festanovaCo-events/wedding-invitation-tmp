# Configuración de Variables de Entorno en Vercel

Este proyecto usa variables de entorno para manejar valores sensibles en producción. El archivo `environment.prod.ts` se genera automáticamente durante el build usando estas variables.

## 📋 Pasos para Configurar Variables de Entorno en Vercel

### 1. Accede al Dashboard de Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**

### 2. Agrega las Variables de Entorno

Agrega las siguientes variables según tus necesidades:

#### Variable Requerida:
- **`NG_APP_API_BASE_URL`** (o `API_BASE_URL`)
  - Descripción: URL base del API de producción
  - Ejemplo: `https://api.tudominio.com`
  - Entornos: Production, Preview, Development (según necesites)

#### Variables Opcionales (ejemplos):
- **`NG_APP_API_KEY`**: Clave API para autenticación
- **`NG_APP_ANALYTICS_ID`**: ID de Google Analytics u otro servicio
- **`NG_APP_SENTRY_DSN`**: DSN de Sentry para error tracking

### 3. Configura los Entornos

Para cada variable, selecciona en qué entornos debe estar disponible:
- ✅ **Production**: Solo en producción
- ✅ **Preview**: En preview deployments (pull requests)
- ✅ **Development**: En desarrollo local (si usas `vercel dev`)

### 4. Guarda y Redespliega

Después de agregar las variables:
1. Haz clic en **Save**
2. Ve a **Deployments**
3. Haz clic en los tres puntos (⋯) del último deployment
4. Selecciona **Redeploy**

## 🔧 Cómo Funciona

El script `scripts/generate-environment.js` se ejecuta automáticamente antes de cada build (`prebuild` hook) y:

1. Lee las variables de entorno de Vercel
2. Genera el archivo `src/environments/environment.prod.ts`
3. Usa valores por defecto si las variables no están definidas

## 📝 Agregar Nuevas Variables

Si necesitas agregar más variables:

1. **Edita `scripts/generate-environment.js`**:
   ```javascript
   const nuevaVariable = process.env.NG_APP_NUEVA_VARIABLE || 'valor-por-defecto';
   ```

2. **Actualiza el template en el script**:
   ```javascript
   const environmentContent = `...
     nuevaVariable: '${nuevaVariable}',
   `;
   ```

3. **Agrega la variable en Vercel** con el nombre `NG_APP_NUEVA_VARIABLE`

4. **Actualiza el tipo TypeScript** si es necesario (en `environment.ts` o una interfaz compartida)

## 🔒 Seguridad

- ✅ Las variables de entorno en Vercel están encriptadas
- ✅ No se exponen en el código fuente
- ✅ Solo están disponibles durante el build
- ✅ El archivo generado `environment.prod.ts` NO debe subirse al repositorio (está en `.gitignore`)

## 🧪 Prueba Localmente

Para probar localmente con variables de entorno:

```bash
# Windows (PowerShell)
$env:NG_APP_API_BASE_URL="https://api.localhost:3000"; npm run build

# Windows (Git Bash)
NG_APP_API_BASE_URL="https://api.localhost:3000" npm run build

# Linux/Mac
NG_APP_API_BASE_URL="https://api.localhost:3000" npm run build
```

## 📚 Referencias

- [Documentación de Variables de Entorno en Vercel](https://vercel.com/docs/concepts/projects/environment-variables)
- [Angular Environment Variables](https://angular.io/guide/build#configuring-application-environments)