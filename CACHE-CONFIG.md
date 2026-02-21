# Configuración de Caché para Producción

Este proyecto incluye archivos de configuración para optimizar los tiempos de caché y mejorar el rendimiento.

## 📁 Archivos de Configuración

### 1. `.htaccess` (Apache)
Para servidores Apache, copia el archivo `.htaccess` a la raíz de tu servidor web (donde está `index.html`).

**Ubicación:** `dist/wedding-invitation-tmp/browser/.htaccess`

### 2. `nginx.conf` (Nginx)
Para servidores Nginx, incluye esta configuración en tu archivo de sitio o `nginx.conf`.

**Ubicación:** Configuración del servidor Nginx

### 3. `_headers` (Netlify/Vercel)
Para Netlify o Vercel, copia el archivo `_headers` a la raíz del build.

**Ubicación:** `dist/wedding-invitation-tmp/browser/_headers`

## 🚀 Configuración por Plataforma

### Apache
1. Copia `.htaccess` a `dist/wedding-invitation-tmp/browser/`
2. Asegúrate de que `mod_expires` y `mod_headers` estén habilitados:
   ```bash
   sudo a2enmod expires
   sudo a2enmod headers
   sudo systemctl restart apache2
   ```

### Nginx
1. Incluye la configuración de `nginx.conf` en tu archivo de sitio
2. Reinicia Nginx:
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Netlify
1. Copia `_headers` a `dist/wedding-invitation-tmp/browser/`
2. El archivo se aplicará automáticamente en el deploy

### Vercel
1. Copia `_headers` a `dist/wedding-invitation-tmp/browser/`
2. O crea un archivo `vercel.json` con la configuración de headers

### Firebase Hosting
Crea un archivo `firebase.json`:
```json
{
  "hosting": {
    "public": "dist/wedding-invitation-tmp/browser",
    "headers": [
      {
        "source": "**/*.@(js|css|jpg|jpeg|png|gif|webp|svg|ico|ttf|otf|woff|woff2|mp4|webm)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      }
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## 📊 Tiempos de Caché Configurados

- **Recursos estáticos con hash** (JS, CSS con hash): **1 año** (31536000 segundos)
- **Imágenes** (JPG, PNG, WebP, SVG): **1 año**
- **Fuentes** (TTF, OTF, WOFF, WOFF2): **1 año**
- **Videos** (MP4, WebM): **1 año**
- **HTML**: **Sin caché** (siempre fresco)

## ✅ Verificación

Después de configurar, verifica los headers con:
- Chrome DevTools → Network → Headers
- O usando: `curl -I https://tu-dominio.com/ruta/al/recurso`

Los recursos estáticos deberían mostrar:
```
Cache-Control: public, max-age=31536000, immutable
```

## 🔧 Desarrollo Local

Para desarrollo local, el servidor de Angular (`ng serve`) no permite configurar headers de caché fácilmente. Los headers de caché solo se aplicarán en producción cuando despliegues a un servidor web real.

Para probar localmente con headers de caché, puedes usar:
```bash
npx http-server dist/wedding-invitation-tmp/browser -p 8080 --cors
```

Y configurar headers manualmente o usar un servidor como Apache/Nginx localmente.
