const {
  DEFAULT_SLIDE_MODE,
  getSlideModeConfig,
} = require('./slide-mode.cjs');

const RESOLUTION_HEIGHTS = Object.freeze({
  '720p': 720,
  '1080p': 1080,
  '1440p': 1440,
  '2160p': 2160,
});

const RESOLUTION_ALIASES = Object.freeze({
  '4k': '2160p',
  uhd: '2160p',
});

function getResolutionChoices() {
  return Object.keys(RESOLUTION_HEIGHTS);
}

function normalizeResolutionPreset(value, options = {}) {
  const { allowEmpty = true } = options;

  if (typeof value !== 'string') {
    if (allowEmpty) {
      return '';
    }
    throw new Error(`--resolution must be one of: ${getResolutionChoices().join(', ')}, 4k`);
  }

  const trimmed = value.trim().toLowerCase();
  if (trimmed === '') {
    if (allowEmpty) {
      return '';
    }
    throw new Error(`--resolution must be one of: ${getResolutionChoices().join(', ')}, 4k`);
  }

  const normalized = RESOLUTION_ALIASES[trimmed] || trimmed;
  if (!RESOLUTION_HEIGHTS[normalized]) {
    throw new Error(`Unknown resolution "${value}". Expected one of: ${getResolutionChoices().join(', ')}, 4k`);
  }

  return normalized;
}

function getResolutionSize(value, slideMode = DEFAULT_SLIDE_MODE) {
  const normalized = normalizeResolutionPreset(value);
  if (!normalized) {
    return null;
  }

  const height = RESOLUTION_HEIGHTS[normalized];
  const { framePx } = getSlideModeConfig(slideMode);
  const aspectRatio = framePx.width / framePx.height;
  return {
    width: Math.round(height * aspectRatio),
    height,
  };
}

module.exports = {
  RESOLUTION_PRESETS: RESOLUTION_HEIGHTS,
  getResolutionChoices,
  getResolutionSize,
  normalizeResolutionPreset,
};
