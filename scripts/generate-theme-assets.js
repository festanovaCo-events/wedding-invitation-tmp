const { mkdirSync, readFileSync, writeFileSync } = require('node:fs');
const path = require('node:path');

const DEFAULT_SVG_FILES = [
  'images/banner-home/img_ondas01.svg',
  'images/banner-instagram/img_ondas05.svg',
  'images/banner-instagram/img_ondas06.svg',
  'images/event-scheduler/img_cinta01.svg',
  'images/event-scheduler/img_cinta02.svg',
  'images/event-scheduler/img_circuloContador01.svg',
  'images/event-scheduler/img_ondas02.svg',
  'images/event-scheduler/img_lineas01.svg',
  'images/instructions/img_ondas03.svg',
  'images/instructions/img_ondas04.svg',
  'images/instructions/tips.svg',
  'images/instructions/vestuario.svg',
];

const DEFAULT_LOTTIE_FILES = [
  'animations/arrow_continue.json',
  'animations/camera.json',
  'animations/dress.json',
  'animations/gift.json',
  'animations/heart.json',
  'animations/heart_pulse.json',
  'animations/instagram.json',
  'animations/music.json',
  'animations/party.json',
  'animations/rings.json',
  'animations/sounds.json',
  'animations/tips.json',
];

const FOREST_RGBA = [0.505882352941, 0.580392156863, 0.545098039216, 1];

const THEME_COLOR_MAPS = {
  'hojas-forest': {
    hex: {
      '#4A6360': '#4A6360',
      '#4a6360': '#4A6360',
      '#81948B': '#81948B',
      '#81948b': '#81948B',
      '#C6D7CF': '#C6D7CF',
      '#c6d7cf': '#C6D7CF',
      '#3A4F4C': '#3A4F4C',
      '#3a4f4c': '#3A4F4C',
    },
    lottieHex: {
      '#4A6360': '#4A6360',
      '#4a6360': '#4A6360',
      '#81948B': '#81948B',
      '#81948b': '#81948B',
      '#C6D7CF': '#81948B',
      '#c6d7cf': '#81948B',
      '#3A4F4C': '#3A4F4C',
      '#3a4f4c': '#3A4F4C',
    },
    lottiePrimary: [0.290196, 0.388235, 0.376471, 1],
  },
  'hojas-navy': {
    hex: {
      '#4A6360': '#425e87',
      '#4a6360': '#425e87',
      '#81948B': '#6c86ab',
      '#81948b': '#6c86ab',
      '#C6D7CF': '#a0c0e7',
      '#c6d7cf': '#a0c0e7',
      '#3A4F4C': '#0e243c',
      '#3a4f4c': '#0e243c',
    },
    lottieHex: {
      '#4A6360': '#425e87',
      '#4a6360': '#425e87',
      '#81948B': '#6c86ab',
      '#81948b': '#6c86ab',
      '#C6D7CF': '#6c86ab',
      '#c6d7cf': '#6c86ab',
      '#3A4F4C': '#0e243c',
      '#3a4f4c': '#0e243c',
    },
    lottiePrimary: [0.258824, 0.368627, 0.529412, 1],
  },
};

function isColorArray(value, color) {
  return (
    Array.isArray(value) &&
    value.length === color.length &&
    value.every((entry, index) => typeof entry === 'number' && Math.abs(entry - color[index]) < 0.000001)
  );
}

function recolorSvg(contents, themeName) {
  const theme = THEME_COLOR_MAPS[themeName];

  return Object.entries(theme.hex).reduce(
    (current, [source, target]) => current.replace(new RegExp(source, 'gi'), target),
    contents
  );
}

function recolorLottieValue(value, themeName) {
  const theme = THEME_COLOR_MAPS[themeName];

  if (typeof value === 'string') {
    return Object.entries(theme.lottieHex).reduce(
      (current, [source, target]) => current.replace(new RegExp(source, 'gi'), target),
      value
    );
  }

  if (isColorArray(value, FOREST_RGBA)) {
    return theme.lottiePrimary;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => recolorLottieValue(entry, themeName));
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, recolorLottieValue(entry, themeName)])
    );
  }

  return value;
}

function writeGeneratedFile(rootDir, relativePath, contents) {
  const destination = path.join(rootDir, 'src', 'assets', 'generated', 'active', relativePath);

  mkdirSync(path.dirname(destination), { recursive: true });
  writeFileSync(destination, contents);
}

function generateThemeAssets(themeName, rootDir = process.cwd(), options = {}) {
  if (!THEME_COLOR_MAPS[themeName]) {
    throw new Error(`Unknown theme "${themeName}" for asset generation`);
  }

  const svgFiles = options.svgFiles || DEFAULT_SVG_FILES;
  const lottieFiles = options.lottieFiles || DEFAULT_LOTTIE_FILES;

  svgFiles.forEach((relativePath) => {
    const source = path.join(rootDir, 'src', 'assets', relativePath);
    const contents = readFileSync(source, 'utf8');
    writeGeneratedFile(rootDir, relativePath, recolorSvg(contents, themeName));
  });

  lottieFiles.forEach((relativePath) => {
    const source = path.join(rootDir, 'src', 'assets', relativePath);
    const contents = JSON.parse(readFileSync(source, 'utf8'));
    writeGeneratedFile(rootDir, relativePath, `${JSON.stringify(recolorLottieValue(contents, themeName))}\n`);
  });
}

module.exports = {
  DEFAULT_LOTTIE_FILES,
  DEFAULT_SVG_FILES,
  THEME_COLOR_MAPS,
  generateThemeAssets,
  recolorLottieValue,
  recolorSvg,
};
