import { describe, expect, it } from "vitest";
import { setupSemanticElementsDemos } from "./semanticElementsClient.js";

describe("setupSemanticElementsDemos", () => {
  it("toggles the preview between light styling and browser defaults", () => {
    document.body.innerHTML = createDemoFixture();
    setupSemanticElementsDemos(document);

    const demo = document.querySelector("[data-semantic-elements-demo]");
    const control = document.querySelector('[data-elements-control="light-styling"]');

    expect(demo).toHaveAttribute("data-elements-style", "light");

    control.checked = false;
    control.dispatchEvent(inputEvent());

    expect(demo).toHaveAttribute("data-elements-style", "default");

    control.checked = true;
    control.dispatchEvent(changeEvent());

    expect(demo).toHaveAttribute("data-elements-style", "light");
  });

  it("does not attach duplicate listeners when setup runs twice", () => {
    document.body.innerHTML = createDemoFixture();
    setupSemanticElementsDemos(document);
    setupSemanticElementsDemos(document);

    const control = document.querySelector('[data-elements-control="light-styling"]');
    control.checked = false;
    control.dispatchEvent(inputEvent());

    expect(document.querySelector("[data-semantic-elements-demo]"))
      .toHaveAttribute("data-elements-style", "default");
  });
});

function createDemoFixture() {
  return `
    <section data-semantic-elements-demo data-elements-style="light">
      <input data-elements-control="light-styling" type="checkbox" checked />
    </section>
  `;
}

function inputEvent() {
  return new Event("input", { bubbles: true });
}

function changeEvent() {
  return new Event("change", { bubbles: true });
}
