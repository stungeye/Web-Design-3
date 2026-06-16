import { describe, expect, it } from "vitest";
import { setupGridExplorerDemos } from "./gridExplorerClient.js";

describe("setupGridExplorerDemos", () => {
  it("updates generated CSS with Prism highlighting when controls change", () => {
    document.body.innerHTML = createDemoFixture();
    setupGridExplorerDemos(document);

    document.querySelector('[data-grid-control="columns"]').value = "cards";
    document.querySelector('[data-grid-control="columns"]').dispatchEvent(inputEvent("change"));
    document.querySelector('[data-grid-control="gap"]').value = "32";
    document.querySelector('[data-grid-control="gap"]').dispatchEvent(inputEvent("input"));
    document.querySelector('[data-grid-control="alignment"]').value = "center";
    document.querySelector('[data-grid-control="alignment"]').dispatchEvent(inputEvent("change"));
    document.querySelector('[data-grid-control="lead"]').checked = false;
    document.querySelector('[data-grid-control="lead"]').dispatchEvent(inputEvent("change"));

    const cssCode = document.querySelector('[data-grid-code="css"]');
    const preview = document.querySelector(".grid-explorer__preview");
    const leadCard = document.querySelector('[data-grid-card="lead"]');

    expect(cssCode.textContent).toContain("repeat(auto-fit, minmax(10rem, 1fr))");
    expect(cssCode.textContent).toContain("gap: 2rem;");
    expect(cssCode.textContent).toContain("align-items: center;");
    expect(cssCode.textContent).not.toContain("grid-column: 1 / -1;");
    expect([...cssCode.querySelectorAll(".token.property")].map((token) => token.textContent))
      .toContain("grid-template-columns");
    expect(preview.style.getPropertyValue("--grid-template-columns")).toBe(
      "repeat(auto-fit, minmax(10rem, 1fr))",
    );
    expect(preview.style.getPropertyValue("--grid-gap")).toBe("2rem");
    expect(preview.style.getPropertyValue("--grid-align-items")).toBe("center");
    expect(leadCard).not.toHaveAttribute("data-lead-spans");
  });

  it("lets keyboard users adjust the preview split", () => {
    document.body.innerHTML = createDemoFixture();
    const workspace = document.querySelector("[data-grid-workspace]");
    Object.defineProperty(workspace, "clientWidth", { configurable: true, value: 900 });

    setupGridExplorerDemos(document);

    const handle = document.querySelector("[data-grid-resize-handle]");
    handle.dispatchEvent(keyboardEvent("ArrowRight"));

    expect(workspace.style.getPropertyValue("--grid-controls-width")).toBe("264px");
    expect(handle).toHaveAttribute("aria-valuetext", "Preview width about 636 pixels");
  });

  it("lets the preview shrink to a narrow teaching width", () => {
    document.body.innerHTML = createDemoFixture();
    const workspace = document.querySelector("[data-grid-workspace]");
    Object.defineProperty(workspace, "clientWidth", { configurable: true, value: 900 });

    setupGridExplorerDemos(document);

    const handle = document.querySelector("[data-grid-resize-handle]");

    for (let step = 0; step < 30; step += 1) {
      handle.dispatchEvent(keyboardEvent("ArrowLeft"));
    }

    expect(workspace.style.getPropertyValue("--grid-controls-width")).toBe("708px");
    expect(handle).toHaveAttribute("aria-valuetext", "Preview width about 192 pixels");
  });

});

function createDemoFixture() {
  return `
    <section data-grid-explorer>
      <div data-grid-workspace>
        <select data-grid-control="columns">
          <option value="balanced">Three equal columns</option>
          <option value="cards">Responsive card tracks</option>
        </select>
        <input data-grid-control="gap" value="16" />
        <select data-grid-control="alignment">
          <option value="stretch">Stretch</option>
          <option value="center">Center</option>
        </select>
        <input data-grid-control="lead" type="checkbox" checked />
        <span data-grid-output="gap">1rem</span>
        <button data-grid-resize-handle></button>
        <div class="grid-explorer__preview"></div>
        <article data-grid-card="lead"></article>
        <code data-grid-code="css"></code>
      </div>
    </section>
  `;
}

function inputEvent(type) {
  return new Event(type, { bubbles: true });
}

function keyboardEvent(key) {
  return new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key });
}
