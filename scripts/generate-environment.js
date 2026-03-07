#!/usr/bin/env node
/**
 * Genera archivos de entorno desde variables de entorno de Vercel
 * 
 * Este script lee las variables de entorno y genera los archivos:
 * - environment.ts (archivo base requerido por TypeScript)
 * - environment.prod.ts (configuración de producción)
 * 
 * Se ejecuta antes del build (prebuild hook). Si las variables no están definidas, usa valores por defecto.
 * 
 * Variables de entorno esperadas (configurar en Vercel):
 * - NG_APP_API_BASE_URL: URL base del API de producción (estándar recomendado)
 * 
 * El prefijo NG_APP_ es el estándar para variables de entorno en Angular/Vercel.
 */

const fs = require('fs');
const path = require('path');

const ENV_BASE_FILE = path.join(__dirname, '../src/environments/environment.ts');
const ENV_PROD_FILE = path.join(__dirname, '../src/environments/environment.prod.ts');

/**
 * CONFIGURACIÓN DE VARIABLES DE ENTORNO
 * 
 * Para agregar una nueva variable:
 * 1. Agrega una línea aquí con el nombre de la propiedad y los nombres posibles de la variable de entorno
 * 2. Agrega la propiedad en el objeto environment más abajo
 * 
 * Ejemplo:
 *   { prop: 'apiKey', envVars: ['NG_APP_API_KEY', 'API_KEY'], defaultValue: '' },
 */
const ENV_CONFIG = [
    {
        prop: 'apiBaseUrl',
        envVars: ['NG_APP_API_BASE_URL'],
        defaultValue: 'https://api.example.com'
    },
    // Agrega más variables aquí siguiendo el estándar NG_APP_:
    // { prop: 'apiKey', envVars: ['NG_APP_API_KEY'], defaultValue: '' },
    // { prop: 'analyticsId', envVars: ['NG_APP_ANALYTICS_ID'], defaultValue: '' },
    // { prop: 'sentryDsn', envVars: ['NG_APP_SENTRY_DSN'], defaultValue: '' },
];

/**
 * Lee una variable de entorno buscando en múltiples nombres posibles
 */
function getEnvVar(config) {
    for (const envVar of config.envVars) {
        if (process.env[envVar]) {
            return process.env[envVar];
        }
    }
    return config.defaultValue;
}

// Leer todas las variables de entorno
const envValues = {};
ENV_CONFIG.forEach(config => {
    envValues[config.prop] = getEnvVar(config);
});

// Generar el contenido de los archivos
const properties = Object.entries(envValues)
    .map(([key, value]) => `  ${key}: '${value}'`)
    .join(',\n');

// Contenido para environment.ts (archivo base - usado como fallback)
const environmentBaseContent = `/**
 * Variables de entorno base
 * 
 * Este archivo es generado automáticamente por scripts/generate-environment.js
 * durante el proceso de build usando variables de entorno de Vercel.
 * 
 * Este es el archivo BASE que se importa en el código.
 * Angular lo reemplaza automáticamente según la configuración:
 * - Development: se reemplaza por 'environment.development.ts'
 * - Production: se reemplaza por 'environment.prod.ts'
 * 
 * NO edites este archivo manualmente - será sobrescrito en cada build.
 */
export const environment = {
  production: true,
${properties}
};
`;

// Contenido para environment.prod.ts (producción específico)
const environmentProdContent = `/**
 * Variables de entorno para producción
 * 
 * Este archivo es generado automáticamente por scripts/generate-environment.js
 * durante el proceso de build usando variables de entorno de Vercel.
 * 
 * NO edites este archivo manualmente - será sobrescrito en cada build.
 * Para cambiar los valores, configura las variables de entorno en Vercel.
 */
export const environment = {
  production: true,
${properties}
};
`;

// Crear el directorio si no existe
const outputDir = path.dirname(ENV_BASE_FILE);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Escribir ambos archivos
fs.writeFileSync(ENV_BASE_FILE, environmentBaseContent, 'utf8');
fs.writeFileSync(ENV_PROD_FILE, environmentProdContent, 'utf8');

console.log('✓ Archivos de entorno generados desde variables de entorno:');
console.log('  - environment.ts (archivo base)');
console.log('  - environment.prod.ts (producción)');
Object.entries(envValues).forEach(([key, value]) => {
    console.log(`  - ${key}: ${value}`);
});