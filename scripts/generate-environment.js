#!/usr/bin/env node
/**
 * Genera environment.prod.ts desde variables de entorno de Vercel
 * 
 * Este script lee las variables de entorno y genera el archivo environment.prod.ts
 * antes del build. Si las variables no están definidas, usa valores por defecto.
 * 
 * Variables de entorno esperadas (configurar en Vercel):
 * - NG_APP_API_BASE_URL: URL base del API de producción (estándar recomendado)
 * 
 * El prefijo NG_APP_ es el estándar para variables de entorno en Angular/Vercel.
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '../src/environments/environment.prod.ts');

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

// Generar el contenido del archivo environment.prod.ts
const properties = Object.entries(envValues)
    .map(([key, value]) => `  ${key}: '${value}'`)
    .join(',\n');

const environmentContent = `/**
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
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Escribir el archivo
fs.writeFileSync(OUTPUT_FILE, environmentContent, 'utf8');

console.log('✓ environment.prod.ts generado desde variables de entorno');
Object.entries(envValues).forEach(([key, value]) => {
    console.log(`  - ${key}: ${value}`);
});