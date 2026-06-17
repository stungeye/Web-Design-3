import { describe, expect, it } from "vitest";
import { setupSemanticStructureDemos } from "./semanticStructureClient.js";
import { semanticStructureModes } from "./semanticStructureModel.js";

describe("setupSemanticStructureDemos", () => {
  it("updates the generated code when the selected version changes", () => {
    document.body.innerHTML = createDemoFixture();
    setupSemanticStructureDemos(document);

    document.querySelector('[data-semantic-control="mode"]').value = "generic";
    document.querySelector('[data-semantic-control="mode"]').dispatchEvent(inputEvent());

    const htmlCode = document.querySelector('[data-semantic-code="html"]');

    expect(htmlCode.textContent).toContain('<div class="top">');
    expect(htmlCode.textContent).not.toContain("<main>");
    expect([...htmlCode.querySelectorAll(".token.tag")].some((token) => (
      token.textContent.includes("div")
    ))).toBe(true);
  });

  it("does not attach duplicate listeners when setup runs twice", () => {
    document.body.innerHTML = createDemoFixture();
    setupSemanticStructureDemos(document);
    setupSemanticStructureDemos(document);

    document.querySelector('[data-semantic-control="mode"]').value = "generic";
    document.querySelector('[data-semantic-control="mode"]').dispatchEvent(changeEvent());

    expect(document.querySelector('[data-semantic-code="html"]').textContent)
      .toContain('<div class="top">');
  });
});

function createDemoFixture() {
  return `
    <section data-semantic-structure-demo>
      <select data-semantic-control="mode">
        <option value="semantic" selected>Semantic HTML</option>
        <option value="generic">Generic markup</option>
      </select>
      <code data-semantic-code="html">${semanticStructureModes.semantic.htmlCode}</code>
    </section>
  `;
}

function changeEvent() {
  return new Event("change", { bubbles: true });
}

function inputEvent() {
  return new Event("input", { bubbles: true });
}
