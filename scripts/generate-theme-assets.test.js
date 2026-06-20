const assert = require('node:assert/strict');
const { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { generateThemeAssets } = require('./generate-theme-assets');

function writeFixture(root, relativePath, contents) {
  const filePath = path.join(root, relativePath);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, contents);
}

test('generateThemeAssets recolors SVG files for the selected theme', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'theme-assets-'));

  try {
    writeFixture(root, 'src/assets/images/banner-home/img_ondas01.svg', '<svg><path fill="#4A6360"/></svg>');

    generateThemeAssets('hojas-navy', root, {
      svgFiles: ['images/banner-home/img_ondas01.svg'],
      lottieFiles: [],
    });

    const generated = readFileSync(
      path.join(root, 'src/assets/generated/active/images/banner-home/img_ondas01.svg'),
      'utf8'
    );

    assert.match(generated, /#425e87/);
    assert.doesNotMatch(generated, /#4A6360/i);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('generateThemeAssets recolors Lottie JSON arrays and hex colors for the selected theme', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'theme-assets-'));
  const lottie = {
    layers: [
      {
        shapes: [
          {
            c: {
              k: [0.505882352941, 0.580392156863, 0.545098039216, 1],
            },
          },
        ],
      },
    ],
    sc: '#C6D7CF',
  };

  try {
    writeFixture(root, 'src/assets/animations/heart.json', JSON.stringify(lottie));

    generateThemeAssets('hojas-navy', root, {
      svgFiles: [],
      lottieFiles: ['animations/heart.json'],
    });

    const generated = JSON.parse(
      readFileSync(path.join(root, 'src/assets/generated/active/animations/heart.json'), 'utf8')
    );

    assert.deepEqual(generated.layers[0].shapes[0].c.k, [0.258824, 0.368627, 0.529412, 1]);
    assert.equal(generated.sc, '#6c86ab');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('generateThemeAssets recolors heart solid color to forest soft color', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'theme-assets-'));
  const lottie = {
    sc: '#C6D7CF',
  };

  try {
    writeFixture(root, 'src/assets/animations/heart.json', JSON.stringify(lottie));

    generateThemeAssets('hojas-forest', root, {
      svgFiles: [],
      lottieFiles: ['animations/heart.json'],
    });

    const generated = JSON.parse(
      readFileSync(path.join(root, 'src/assets/generated/active/animations/heart.json'), 'utf8')
    );

    assert.equal(generated.sc, '#81948B');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
