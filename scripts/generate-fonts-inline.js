#!/usr/bin/env node
/**
 * Genera CSS con fuentes inline (base64) para eliminar peticiones de red.
 * Ejecutar antes del build: node scripts/generate-fonts-inline.js
 */
const fs = require('fs');
const path = require('path');

const FONTS_DIR = path.join(__dirname, '../src/assets/fonts');
const OUTPUT_MAIN = path.join(__dirname, '../src/fonts-inline.generated.css');
const OUTPUT_SLICK = path.join(__dirname, '../src/slick-font-inline.generated.css');

const MAIN_FONTS = [
  { family: 'Open Sans', file: 'OpenSans-Regular.ttf', weight: 'normal', style: 'normal', format: 'truetype' },
  { family: 'Open Sans Light', file: 'OpenSans-Light.ttf', weight: '300', style: 'normal', format: 'truetype' },
  { family: 'Cookie', file: 'Cookie-Regular.ttf', weight: 'normal', style: 'normal', format: 'truetype' },
];

const SLICK_FONT = { family: 'slick', file: 'slick.woff', weight: 'normal', style: 'normal', format: 'woff' };

const mimeTypes = { ttf: 'font/ttf', woff: 'font/woff', woff2: 'font/woff2' };

function toBase64Font(font, fontsDir) {
  const fontPath = path.join(fontsDir, font.file);
  if (!fs.existsSync(fontPath)) {
    console.warn(`No existe: ${fontPath}`);
    return null;
  }
  const ext = path.extname(font.file).slice(1);
  const mime = mimeTypes[ext] || 'font/octet-stream';
  const base64 = fs.readFileSync(fontPath).toString('base64');
  return `@font-face {
  font-family: '${font.family}';
  font-weight: ${font.weight};
  font-style: ${font.style};
  font-display: swap;
  src: url(data:${mime};base64,${base64}) format('${font.format}');
}`;
}

let mainCss = `/**
 * Fuentes inline en base64 - generado por scripts/generate-fonts-inline.js
 */
`;
for (const font of MAIN_FONTS) {
  const rule = toBase64Font(font, FONTS_DIR);
  if (rule) mainCss += '\n' + rule + '\n';
}

const slickRule = toBase64Font(SLICK_FONT, FONTS_DIR);
const slickCss = slickRule
  ? `/**
 * Slick font inline - se carga después de slick.css para sobrescribir la url() externa.
 */
${slickRule}
`
  : '';

fs.writeFileSync(OUTPUT_MAIN, mainCss.trim() + '\n', 'utf8');
fs.writeFileSync(OUTPUT_SLICK, slickCss.trim() ? slickCss.trim() + '\n' : '/* slick.woff no encontrado */\n', 'utf8');
console.log('✓ Fuentes inline generadas: fonts-inline.generated.css, slick-font-inline.generated.css');
