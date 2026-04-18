const DEFAULT_SLIDE_MODE = 'presentation';
const PT_TO_PX = 96 / 72;

const SLIDE_MODES = Object.freeze({
  presentation: Object.freeze({
    name: 'presentation',
    framePt: Object.freeze({ width: 720, height: 405 }),
    framePx: Object.freeze({ width: 720 * PT_TO_PX, height: 405 * PT_TO_PX }),
    screenshotPx: Object.freeze({ width: 1600, height: 900 }),
    pptxSizeIn: Object.freeze({ width: 13.33, height: 7.5 }),
    figmaSizeIn: Object.freeze({ width: 10, height: 5.625 }),
    sizeLabel: '720pt x 405pt',
    coordinateSpaceLabel: '960x540',
    aspectRatioLabel: '16:9',
  }),
  'card-news': Object.freeze({
    name: 'card-news',
    framePt: Object.freeze({ width: 720, height: 720 }),
    framePx: Object.freeze({ width: 720 * PT_TO_PX, height: 720 * PT_TO_PX }),
    screenshotPx: Object.freeze({ width: 1600, height: 1600 }),
    pptxSizeIn: Object.freeze({ width: 10, height: 10 }),
    figmaSizeIn: Object.freeze({ width: 10, height: 10 }),
    sizeLabel: '720pt x 720pt',
    coordinateSpaceLabel: '960x960',
    aspectRatioLabel: '1:1',
  }),
});

function getSlideModeChoices() {
  return Object.keys(SLIDE_MODES);
}

function normalizeSlideMode(value, options = {}) {
  const {
    allowEmpty = false,
    optionName = '--mode',
  } = options;

  if (typeof value !== 'string') {
    if (allowEmpty) {
      return '';
    }
    throw new Error(`${optionName} must be one of: ${getSlideModeChoices().join(', ')}`);
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === '') {
    if (allowEmpty) {
      return '';
    }
    throw new Error(`${optionName} must be one of: ${getSlideModeChoices().join(', ')}`);
  }

  if (!SLIDE_MODES[normalized]) {
    throw new Error(`Unknown ${optionName} value: ${value}. Expected one of: ${getSlideModeChoices().join(', ')}`);
  }

  return normalized;
}

function getSlideModeConfig(value = DEFAULT_SLIDE_MODE) {
  return SLIDE_MODES[normalizeSlideMode(value, { optionName: '--mode' })];
}

module.exports = {
  DEFAULT_SLIDE_MODE,
  PT_TO_PX,
  SLIDE_MODES,
  getSlideModeChoices,
  getSlideModeConfig,
  normalizeSlideMode,
};
