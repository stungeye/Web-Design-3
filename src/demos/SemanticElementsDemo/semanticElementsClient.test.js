import { describe, expect, it } from "vitest";
import { setupSemanticElementsDemos } from "./semanticElementsClient.js";

describe("setupSemanticElementsDemos", () => {
  it("navigates between semantic element examples", () => {
    document.body.innerHTML = createDemoFixture();
    setupSemanticElementsDemos(document);

    const demo = document.querySelector("[data-semantic-elements-demo]");
    const next = document.querySelector('[data-elements-action="next"]');
    const previous = document.querySelector('[data-elements-action="previous"]');

    expect(demo).toHaveAttribute("data-elements-index", "0");
    expect(document.querySelector("[data-elements-title]")).toHaveTextContent("<details>");
    expect(demo).toHaveAttribute("data-elements-style", "light");

    next.click();

    expect(demo).toHaveAttribute("data-elements-index", "1");
    expect(document.querySelector("[data-elements-title]")).toHaveTextContent("<figure>");
    expect(document.querySelector("[data-elements-count]")).toHaveTextContent("2 of 10");
    expect(document.querySelector("[data-elements-preview]")).toHaveTextContent("Gimli Harbour");
    expect(document.querySelector('[data-elements-code="html"]'))
      .toHaveTextContent("<figure>");

    previous.click();

    expect(demo).toHaveAttribute("data-elements-index", "0");
    expect(document.querySelector("[data-elements-title]")).toHaveTextContent("<details>");
  });

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

    document.querySelector('[data-elements-action="next"]').click();

    expect(document.querySelector("[data-semantic-elements-demo]"))
      .toHaveAttribute("data-elements-index", "1");
  });
});

function createDemoFixture() {
  return `
    <section data-semantic-elements-demo data-elements-index="0">
      <h3 data-elements-title></h3>
      <p data-elements-summary></p>
      <input data-elements-control="light-styling" type="checkbox" checked />
      <button type="button" data-elements-action="previous">Previous</button>
      <span data-elements-count></span>
      <button type="button" data-elements-action="next">Next</button>
      <div data-elements-preview></div>
      <code data-elements-code="html"></code>
    </section>
  `;
}

function inputEvent() {
  return new Event("input", { bubbles: true });
}

function changeEvent() {
  return new Event("change", { bubbles: true });
}
