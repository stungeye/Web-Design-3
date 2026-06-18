import { describe, expect, it } from "vitest";
import { setupBaseStylesheetDemos } from "./baseStylesheetClient.js";

describe("setupBaseStylesheetDemos", () => {
  it("toggles the preview between base styles and browser defaults", () => {
    document.body.innerHTML = createDemoFixture();
    setupBaseStylesheetDemos(document);

    const demo = document.querySelector("[data-base-stylesheet-demo]");
    const control = document.querySelector('[data-base-stylesheet-control="enabled"]');

    expect(demo).toHaveAttribute("data-base-styles", "enabled");

    control.checked = false;
    control.dispatchEvent(new Event("change", { bubbles: true }));

    expect(demo).toHaveAttribute("data-base-styles", "default");
  });

  it("does not attach duplicate listeners when setup runs twice", () => {
    document.body.innerHTML = createDemoFixture();
    setupBaseStylesheetDemos(document);
    setupBaseStylesheetDemos(document);

    expect(document.querySelector("[data-base-stylesheet-demo]").dataset.baseStylesheetReady)
      .toBe("true");
  });
});

function createDemoFixture() {
  return `
    <section data-base-stylesheet-demo>
      <input data-base-stylesheet-control="enabled" type="checkbox" checked>
    </section>
  `;
}
