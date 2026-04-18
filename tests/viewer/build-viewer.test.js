import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { buildViewerHtml, findSlideFiles, parseCliArgs } from '../../scripts/build-viewer.js';

test('build-viewer CLI supports card-news mode', () => {
  assert.deepEqual(parseCliArgs([]), { slidesDir: 'slides', mode: 'presentation', help: false });
  assert.equal(parseCliArgs(['--mode', 'card-news']).mode, 'card-news');
  assert.throws(() => parseCliArgs(['--mode']), /missing value/i);
  assert.throws(() => parseCliArgs(['--mode', 'story']), /unknown --mode value/i);
});

test('buildViewerHtml uses square frame dimensions for card-news mode', () => {
  const html = buildViewerHtml([{ file: 'slide-01.html', html: '<!doctype html><html><body></body></html>' }], { slideMode: 'card-news' });

  assert.match(html, /width: 720pt;/);
  assert.match(html, /height: 720pt;/);
});

test('findSlideFiles honors the slide-*.html deck contract and ignores viewer artifacts', async () => {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), 'build-viewer-slides-'));

  try {
    await Promise.all([
      writeFile(path.join(tempDir, 'slide-10.html'), ''),
      writeFile(path.join(tempDir, 'slide-2.html'), ''),
      writeFile(path.join(tempDir, 'slide-alpha.html'), ''),
      writeFile(path.join(tempDir, 'Slide-03.HTML'), ''),
      writeFile(path.join(tempDir, 'viewer.html'), ''),
      writeFile(path.join(tempDir, 'notes.html'), ''),
    ]);

    assert.deepEqual(findSlideFiles(tempDir), [
      'slide-2.html',
      'Slide-03.HTML',
      'slide-10.html',
      'slide-alpha.html',
    ]);
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
});
