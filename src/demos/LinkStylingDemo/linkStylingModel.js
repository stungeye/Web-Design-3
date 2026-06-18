export const decorationStyles = Object.freeze(["solid", "dotted", "dashed", "wavy"]);
export const colorTransition = "300ms ease";
export const underlineOffsetTransition = "200ms ease";

export const defaultLinkStylingState = Object.freeze({
  color: "#075985",
  hoverColor: "#0f766e",
  decorationStyle: "solid",
  underlineThickness: 0.08,
  underlineOffset: 0.16,
  bold: true,
  animate: true,
});

export function normalizeLinkStylingState(state = {}) {
  return {
    color: normalizeColor(state.color, defaultLinkStylingState.color),
    hoverColor: normalizeColor(state.hoverColor, defaultLinkStylingState.hoverColor),
    decorationStyle: decorationStyles.includes(state.decorationStyle)
      ? state.decorationStyle
      : defaultLinkStylingState.decorationStyle,
    underlineThickness: normalizeRange(
      state.underlineThickness,
      defaultLinkStylingState.underlineThickness,
      0.04,
      0.2,
    ),
    underlineOffset: normalizeRange(
      state.underlineOffset,
      defaultLinkStylingState.underlineOffset,
      0.08,
      0.36,
    ),
    bold: normalizeBoolean(state.bold, defaultLinkStylingState.bold),
    animate: normalizeBoolean(state.animate, defaultLinkStylingState.animate),
  };
}

export function buildLinkStylingCss(state = defaultLinkStylingState) {
  const settings = normalizeLinkStylingState(state);
  const transitionProperties = [
    settings.animate ? `color ${colorTransition}` : null,
    settings.animate ? `text-underline-offset ${underlineOffsetTransition}` : null,
  ].filter(Boolean);
  const transitionRule = transitionProperties.length > 0
    ? `\n  transition: ${transitionProperties.join(", ")};`
    : "";
  const hoverUnderlineRules = `\n  text-underline-offset: ${formatEm(settings.underlineOffset + 0.04)};`;
  const reducedMotionRule = transitionProperties.length > 0
    ? `\n\n@media (prefers-reduced-motion: reduce) {\n  a {\n    transition: none;\n  }\n}`
    : "";

  return `a {
  color: ${settings.color};
  text-decoration-line: underline;
  text-decoration-style: ${settings.decorationStyle};
  text-decoration-thickness: ${formatEm(settings.underlineThickness)};
  text-underline-offset: ${formatEm(settings.underlineOffset)};
  font-weight: ${settings.bold ? "600" : "400"};${transitionRule}
}

a:hover,
a:focus-visible {
  color: ${settings.hoverColor};${hoverUnderlineRules}
}${reducedMotionRule}`;
}

export function formatEm(value) {
  return `${Number.parseFloat(value.toFixed(2))}em`;
}

function normalizeColor(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}

function normalizeRange(value, fallback, min, max) {
  const number = Number.parseFloat(value);

  if (Number.isNaN(number)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, number));
}

function normalizeBoolean(value, fallback) {
  if (typeof value === "boolean") {
    return value;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return fallback;
}
