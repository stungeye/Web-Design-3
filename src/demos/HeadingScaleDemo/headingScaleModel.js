export const headingScales = Object.freeze({
  browser: {
    label: "Browser defaults",
    sizes: {
      h1: "2em",
      h2: "1.5em",
      h3: "1.17em",
      h4: "1em",
      h5: "0.83em",
      h6: "0.67em",
    },
  },
  minorThird: {
    label: "Minor Third, 1.200",
    sizes: {
      h1: "2.488rem",
      h2: "2.074rem",
      h3: "1.728rem",
      h4: "1.44rem",
      h5: "1.2rem",
      h6: "1rem",
    },
  },
  majorThird: {
    label: "Major Third, 1.250",
    sizes: {
      h1: "3.052rem",
      h2: "2.441rem",
      h3: "1.953rem",
      h4: "1.563rem",
      h5: "1.25rem",
      h6: "1rem",
    },
  },
  perfectFourth: {
    label: "Perfect Fourth, 1.333",
    sizes: {
      h1: "4.209rem",
      h2: "3.157rem",
      h3: "2.369rem",
      h4: "1.777rem",
      h5: "1.333rem",
      h6: "1rem",
    },
  },
  perfectFifth: {
    label: "Perfect Fifth, 1.500",
    sizes: {
      h1: "7.594rem",
      h2: "5.063rem",
      h3: "3.375rem",
      h4: "2.25rem",
      h5: "1.5rem",
      h6: "1rem",
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
h4 { font-size: ${sizes.h4}; }
h5 { font-size: ${sizes.h5}; }
h6 { font-size: ${sizes.h6}; }`;
}

export function buildHeadingScaleHtml() {
  return `<h1>H1 Example</h1>
<h2>H2 Example</h2>
<h3>H3 Example</h3>
<h4>H4 Example</h4>
<h5>H5 Example</h5>
<h6>H6 Example</h6>`;
}
