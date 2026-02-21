const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'dist', 'wedding-invitation-tmp', 'browser');
const filesToCopy = [
  { src: '.htaccess', dest: '.htaccess' },
  { src: '_headers', dest: '_headers' }
];

console.log('📦 Copiando archivos de configuración de caché...');

// Verificar que el directorio de build existe
if (!fs.existsSync(buildDir)) {
  console.error('❌ Error: El directorio de build no existe. Ejecuta "ng build" primero.');
  process.exit(1);
}

// Copiar archivos
filesToCopy.forEach(({ src, dest }) => {
  const srcPath = path.join(__dirname, '..', src);
  const destPath = path.join(buildDir, dest);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copiado: ${src} → ${dest}`);
  } else {
    console.warn(`⚠️  No encontrado: ${src}`);
  }
});

console.log('✨ Archivos de configuración de caché copiados correctamente.');
console.log('📝 Nota: Para Nginx, copia manualmente nginx.conf a tu configuración del servidor.');
