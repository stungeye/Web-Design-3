export const headingScales = Object.freeze({
  browser: {
    label: "Browser defaults",
    browserSizes: [2, 1.5, 1.17, 1, 0.83, 0.67],
  },
  minorThird: {
    label: "Minor Third, 1.200",
    ratio: 1.2,
  },
  majorThird: {
    label: "Major Third, 1.250",
    ratio: 1.25,
  },
  perfectFourth: {
    label: "Perfect Fourth, 1.333",
    ratio: 1.333,
  },
  perfectFifth: {
    label: "Perfect Fifth, 1.500",
    ratio: 1.5,
  },
  goldenRatio: {
    label: "Golden Ratio, 1.618",
    ratio: 1.618,
  },
});

export const minHeadingLevelCount = 2;
export const maxHeadingLevelCount = 6;

export const defaultHeadingScaleState = Object.freeze({
  scale: "majorThird",
  levelCount: 4,
});

export function getHeadingScale(scale) {
  return headingScales[scale] ?? headingScales.majorThird;
}

export function clampHeadingLevelCount(levelCount) {
  const count = Number.parseInt(levelCount, 10);

  if (Number.isNaN(count)) {
    return defaultHeadingScaleState.levelCount;
  }

  return Math.min(maxHeadingLevelCount, Math.max(minHeadingLevelCount, count));
}

export function getHeadingLevels(levelCount = defaultHeadingScaleState.levelCount) {
  const count = clampHeadingLevelCount(levelCount);

  return Array.from({ length: count }, (_, index) => `h${index + 1}`);
}

export function getHeadingScaleSizes(scale, levelCount = defaultHeadingScaleState.levelCount) {
  const definition = getHeadingScale(scale);
  const count = clampHeadingLevelCount(levelCount);
  const levels = getHeadingLevels(count);

  if (definition.browserSizes) {
    return Object.fromEntries(
      levels.map((level, index) => [level, formatEm(definition.browserSizes[index])]),
    );
  }

  return Object.fromEntries(
    levels.map((level, index) => {
      const exponent = count - index - 1;
      return [level, formatRem(definition.ratio ** exponent)];
    }),
  );
}

export function buildHeadingScaleCss(scale, levelCount = defaultHeadingScaleState.levelCount) {
  const sizes = getHeadingScaleSizes(scale, levelCount);

  return Object.entries(sizes)
    .map(([level, size]) => `${level} { font-size: ${size}; }`)
    .join("\n");
}

function formatRem(value) {
  const rounded = Number.parseFloat(value.toFixed(3));

  return `${rounded}rem`;
}

function formatEm(value) {
  const rounded = Number.parseFloat(value.toFixed(3));

  return `${rounded}em`;
}
