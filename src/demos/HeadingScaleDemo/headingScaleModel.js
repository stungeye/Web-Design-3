export const headingScales = Object.freeze({
  browser: {
    label: "Browser defaults",
    sizes: {
      h1: "2em",
      h2: "1.5em",
      h3: "1.17em",
      h4: "1em",
    },
  },
  minorThird: {
    label: "Minor Third, 1.200",
    sizes: {
      h1: "1.728rem",
      h2: "1.44rem",
      h3: "1.2rem",
      h4: "1rem",
    },
  },
  majorThird: {
    label: "Major Third, 1.250",
    sizes: {
      h1: "1.953rem",
      h2: "1.563rem",
      h3: "1.25rem",
      h4: "1rem",
    },
  },
  perfectFourth: {
    label: "Perfect Fourth, 1.333",
    sizes: {
      h1: "2.369rem",
      h2: "1.777rem",
      h3: "1.333rem",
      h4: "1rem",
    },
  },
  perfectFifth: {
    label: "Perfect Fifth, 1.500",
    sizes: {
      h1: "3.375rem",
      h2: "2.25rem",
      h3: "1.5rem",
      h4: "1rem",
    },
  },
  goldenRatio: {
    label: "Golden Ratio, 1.618",
    sizes: {
      h1: "4.236rem",
      h2: "2.618rem",
      h3: "1.618rem",
      h4: "1rem",
    },
  },
});

export const defaultHeadingScaleState = Object.freeze({
  scale: "majorThird",
});

export function getHeadingScale(scale) {
  return headingScales[scale] ?? headingScales.majorThird;
}

export function buildHeadingScaleCss(scale) {
  const { sizes } = getHeadingScale(scale);

  return `h1 { font-size: ${sizes.h1}; }
h2 { font-size: ${sizes.h2}; }
h3 { font-size: ${sizes.h3}; }
h4 { font-size: ${sizes.h4}; }`;
}
