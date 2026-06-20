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
  assert.equal(resolveThemeName(undefined, { TEMPLATE_THEME: 'hojas-forest' }), 'hojas-forest');
  assert.equal(resolveThemeName(undefined, {}), 'hojas-navy');
});

test('resolveThemeName preserves the generated active theme when no input is provided', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'theme-test-'));
  const themesDir = path.join(root, 'src', 'app', 'themes');

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
