import { describe, expect, it } from "vitest";
import { setupHeadingScaleDemos } from "./headingScaleClient.js";

describe("setupHeadingScaleDemos", () => {
  it("updates heading sizes and generated CSS", () => {
    document.body.innerHTML = createDemoFixture();
    setupHeadingScaleDemos(document);

    const control = document.querySelector('[data-heading-scale-control="scale"]');
    control.value = "browser";
    control.dispatchEvent(new Event("change", { bubbles: true }));

    expect(document.querySelector('[data-heading-scale-level="h1"]')).toHaveStyle({
      "--heading-scale-size": "2em",
    });
    expect(document.querySelector('[data-heading-scale-code="css"]'))
      .toHaveTextContent("h6 { font-size: 0.67em; }");
  });

  it("does not attach duplicate listeners when setup runs twice", () => {
    document.body.innerHTML = createDemoFixture();
    setupHeadingScaleDemos(document);
    setupHeadingScaleDemos(document);

    expect(document.querySelector("[data-heading-scale-demo]").dataset.headingScaleReady)
      .toBe("true");
  });
});

function createDemoFixture() {
  return `
    <section data-heading-scale-demo>
      <select data-heading-scale-control="scale">
        <option value="majorThird" selected>Major Third</option>
        <option value="browser">Browser defaults</option>
      </select>
      <h1 data-heading-scale-level="h1"></h1>
      <h2 data-heading-scale-level="h2"></h2>
      <h3 data-heading-scale-level="h3"></h3>
      <h4 data-heading-scale-level="h4"></h4>
      <h5 data-heading-scale-level="h5"></h5>
      <h6 data-heading-scale-level="h6"></h6>
      <code data-heading-scale-code="css"></code>
    </section>
  `;
}
