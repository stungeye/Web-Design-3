export const defaultBoxSizingState = Object.freeze({
  boxSizing: "content-box",
  borderWidth: 4,
  padding: 24,
});

export function formatPx(value) {
  return `${value}px`;
}

export function getPaintedWidth({ borderWidth, boxSizing, padding }) {
  const declaredWidth = 220;

  if (boxSizing === "border-box") {
    return declaredWidth;
  }

  return declaredWidth + padding * 2 + borderWidth * 2;
}

export function getContentWidth({ borderWidth, boxSizing, padding }) {
  const declaredWidth = 220;

  if (boxSizing === "content-box") {
    return declaredWidth;
  }

  return Math.max(0, declaredWidth - padding * 2 - borderWidth * 2);
}

export function buildBoxSizingCss({ borderWidth, boxSizing, padding }) {
  return `.demo-box {
  box-sizing: ${boxSizing};
  width: 220px;
  padding: ${formatPx(padding)};
  border: ${formatPx(borderWidth)} solid #0f766e;
}`;
}

export function buildBoxSizingHtml() {
  return `<div class="demo-box">
  <div class="demo-box__content">
    Content area
  </div>
</div>`;
}
