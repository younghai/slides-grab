import assert from 'node:assert/strict';
import test from 'node:test';

import { buildViewerHtml, parseCliArgs } from '../../scripts/build-viewer.js';

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
