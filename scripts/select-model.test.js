const assert = require('node:assert/strict');
const { mkdtempSync, readFileSync, rmSync, writeFileSync, mkdirSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { resolveModelName, writeActiveModelFile, writeAppRoutesGenerated } = require('./select-model');

test('resolveModelName uses an explicit model before environment and default', () => {
  assert.equal(resolveModelName('model-02', { TEMPLATE_MODEL: 'model-01' }), 'model-02');
});

test('resolveModelName falls back to TEMPLATE_MODEL and then default model', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'model-test-'));

  try {
    mkdirSync(path.join(root, 'src', 'app', 'features', 'shared', 'models'), { recursive: true });
    assert.equal(resolveModelName(undefined, { TEMPLATE_MODEL: 'model-02' }, root), 'model-02');
    assert.equal(resolveModelName(undefined, {}, root), 'model-01');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('resolveModelName preserves the generated active model when no input is provided', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'model-test-'));
  const modelsDir = path.join(root, 'src', 'app', 'features', 'shared', 'models');

  try {
    mkdirSync(modelsDir, { recursive: true });
    writeFileSync(
      path.join(modelsDir, 'active-model.ts'),
      "export const ACTIVE_MODEL = { name: 'model-02' };\n"
    );

    assert.equal(resolveModelName(undefined, {}, root), 'model-02');
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
    const filePath = writeActiveModelFile('model-02', root);
    const contents = readFileSync(filePath, 'utf8');

    assert.match(contents, /name: 'model-02'/);
    assert.match(contents, /Model02PageComponent/);
    assert.match(contents, /supportsThemes: false/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('writeAppRoutesGenerated points to the correct page component', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'model-test-'));

  try {
    const filePath = writeAppRoutesGenerated('model-01', root);
    const contents = readFileSync(filePath, 'utf8');

    assert.match(contents, /features\/model-01\/pages\/model-01-page/);
    assert.match(contents, /Model01PageComponent/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
