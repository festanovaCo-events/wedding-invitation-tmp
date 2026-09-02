const assert = require('node:assert/strict');
const { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { resolveModelName, writeActiveModelFile, writeAppRoutesGenerated } = require('./select-model');

test('resolveModelName uses an explicit model before environment and default', () => {
  assert.equal(resolveModelName('modelo-02', { TEMPLATE_MODEL: 'modelo-01' }), 'modelo-02');
});

test('resolveModelName falls back to TEMPLATE_MODEL and then default model', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'model-test-'));

  try {
    mkdirSync(path.join(root, 'src', 'app', 'models'), { recursive: true });
    assert.equal(resolveModelName(undefined, { TEMPLATE_MODEL: 'modelo-02' }, root), 'modelo-02');
    assert.equal(resolveModelName(undefined, {}, root), 'modelo-01');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('resolveModelName preserves the generated active model when no input is provided', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'model-test-'));
  const modelsDir = path.join(root, 'src', 'app', 'models');

  try {
    mkdirSync(modelsDir, { recursive: true });
    writeFileSync(
      path.join(modelsDir, 'active-model.ts'),
      "export const ACTIVE_MODEL = { name: 'modelo-02' };\n"
    );

    assert.equal(resolveModelName(undefined, {}, root), 'modelo-02');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('resolveModelName rejects unknown models', () => {
  assert.throws(() => resolveModelName('unknown-model', {}), /Unknown model "unknown-model"/);
});

test('writeActiveModelFile generates the active model export', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'model-test-'));

  try {
    const filePath = writeActiveModelFile('modelo-02', root);
    const contents = readFileSync(filePath, 'utf8');

    assert.match(contents, /name: 'modelo-02'/);
    assert.match(contents, /Modelo02PageComponent/);
    assert.match(contents, /supportsThemes: false/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('writeAppRoutesGenerated points to the correct page component', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'model-test-'));

  try {
    const filePath = writeAppRoutesGenerated('modelo-01', root);
    const contents = readFileSync(filePath, 'utf8');

    assert.match(contents, /wedding-page\.component/);
    assert.match(contents, /WeddingPageComponent/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
