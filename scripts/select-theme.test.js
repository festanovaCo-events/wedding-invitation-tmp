const assert = require('node:assert/strict');
const { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { resolveThemeName, writeActiveThemeFile } = require('./select-theme');

test('resolveThemeName uses an explicit theme before environment and default', () => {
  assert.equal(resolveThemeName('hojas-forest', { TEMPLATE_THEME: 'hojas-navy' }), 'hojas-forest');
});

test('resolveThemeName falls back to TEMPLATE_THEME and then default theme', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'theme-test-'));

  try {
    mkdirSync(path.join(root, 'src', 'app', 'features', 'shared', 'themes'), { recursive: true });
    assert.equal(resolveThemeName(undefined, { TEMPLATE_THEME: 'hojas-forest' }, root), 'hojas-forest');
    assert.equal(resolveThemeName(undefined, {}, root), 'hojas-navy');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('resolveThemeName preserves the generated active theme when no input is provided', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'theme-test-'));
  const themesDir = path.join(root, 'src', 'app', 'features', 'shared', 'themes');

  try {
    mkdirSync(themesDir, { recursive: true });
    writeFileSync(
      path.join(themesDir, 'active-theme.ts'),
      "export { TEMPLATE_HOJAS_FOREST as ACTIVE_THEME } from './template-hojas-forest.theme';\n"
    );

    assert.equal(resolveThemeName(undefined, {}, root), 'hojas-forest');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('resolveThemeName rejects unknown themes', () => {
  assert.throws(() => resolveThemeName('unknown-theme', {}), /Unknown theme "unknown-theme"/);
});

test('writeActiveThemeFile generates the active theme export', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'theme-test-'));

  try {
    const filePath = writeActiveThemeFile('hojas-forest', root);
    const generated = readFileSync(filePath, 'utf8');

    assert.match(generated, /AUTO-GENERATED/);
    assert.match(generated, /TEMPLATE_HOJAS_FOREST as ACTIVE_THEME/);
    assert.match(generated, /template-hojas-forest\.theme/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('writeThemeVarsCss writes palette tokens for the selected theme', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'theme-test-'));

  try {
    const themesDir = path.join(root, 'src', 'app', 'features', 'shared', 'themes');
    mkdirSync(themesDir, { recursive: true });
    writeFileSync(
      path.join(themesDir, 'template-hojas-forest.theme.ts'),
      readFileSync(path.join(__dirname, '../src/app/features/shared/themes/template-hojas-forest.theme.ts'), 'utf8')
    );

    const { writeThemeVarsCss } = require('./select-theme');
    const filePath = writeThemeVarsCss('hojas-forest', root);
    const generated = readFileSync(filePath, 'utf8');

    assert.match(generated, /AUTO-GENERATED/);
    assert.match(generated, /--theme-primary:\s*#4A6360/);
    assert.match(generated, /--theme-primary-soft:\s*#81948B/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('updateSplashFallback writes the theme primarySoft into index.html', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'theme-test-'));

  try {
    const themesDir = path.join(root, 'src', 'app', 'features', 'shared', 'themes');
    const srcDir = path.join(root, 'src');
    mkdirSync(themesDir, { recursive: true });
    writeFileSync(
      path.join(themesDir, 'template-hojas-forest.theme.ts'),
      readFileSync(path.join(__dirname, '../src/app/features/shared/themes/template-hojas-forest.theme.ts'), 'utf8')
    );
    writeFileSync(
      path.join(srcDir, 'index.html'),
      '<div id="app-splash" style="background:var(--theme-primary-soft, #6c86ab)"></div>\n'
    );

    const { updateSplashFallback } = require('./select-theme');
    updateSplashFallback('hojas-forest', root);
    const html = readFileSync(path.join(srcDir, 'index.html'), 'utf8');

    assert.match(html, /background:var\(--theme-primary-soft, #81948B\)/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
