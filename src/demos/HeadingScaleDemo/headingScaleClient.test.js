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
      .toHaveTextContent("h4 { font-size: 1em; }");
  });

  it("shows and hides actual browser default sizes", () => {
    document.body.innerHTML = createDemoFixture();
    setupHeadingScaleDemos(document);

    const control = document.querySelector('[data-heading-scale-control="scale"]');
    control.value = "browser";
    control.dispatchEvent(new Event("change", { bubbles: true }));

    document.querySelector('[data-heading-scale-action="add-level"]')
      .dispatchEvent(new Event("click", { bubbles: true }));
    document.querySelector('[data-heading-scale-action="add-level"]')
      .dispatchEvent(new Event("click", { bubbles: true }));

    expect(document.querySelector('[data-heading-scale-level="h5"]')).toHaveStyle({
      "--heading-scale-size": "0.83em",
    });
    expect(document.querySelector('[data-heading-scale-level="h6"]')).toHaveStyle({
      "--heading-scale-size": "0.67em",
    });
    expect(document.querySelector('[data-heading-scale-code="css"]'))
      .toHaveTextContent("h6 { font-size: 0.67em; }");
  });

  it("adds and removes heading levels while reapplying the selected scale", () => {
    document.body.innerHTML = createDemoFixture();
    setupHeadingScaleDemos(document);

    document.querySelector('[data-heading-scale-action="add-level"]')
      .dispatchEvent(new Event("click", { bubbles: true }));

    expect(document.querySelector('[data-heading-scale-level="h5"]')).toHaveTextContent("H5 Example");
    expect(document.querySelector('[data-heading-scale-level="h4"]')).toHaveStyle({
      "--heading-scale-size": "1.25rem",
    });
    expect(document.querySelector('[data-heading-scale-level="h5"]')).toHaveStyle({
      "--heading-scale-size": "1rem",
    });
    expect(document.querySelector('[data-heading-scale-code="css"]'))
      .toHaveTextContent("h5 { font-size: 1rem; }");

    document.querySelector('[data-heading-scale-action="remove-level"]')
      .dispatchEvent(new Event("click", { bubbles: true }));

    expect(document.querySelector('[data-heading-scale-level="h5"]')).not.toBeInTheDocument();
    expect(document.querySelector('[data-heading-scale-level="h4"]')).toHaveStyle({
      "--heading-scale-size": "1rem",
    });
    expect(document.querySelector('[data-heading-scale-code="css"]'))
      .not.toHaveTextContent("h5 { font-size: 1rem; }");
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
      <button type="button" data-heading-scale-action="remove-level"></button>
      <button type="button" data-heading-scale-action="add-level"></button>
      <div data-heading-scale-preview>
      <div data-heading-scale-level="h1"></div>
      <div data-heading-scale-level="h2"></div>
      <div data-heading-scale-level="h3"></div>
      <div data-heading-scale-level="h4"></div>
      </div>
      <code data-heading-scale-code="css"></code>
    </section>
  `;
}
