import { describe, expect, it } from "vitest";
import { setupLineHeightDemos } from "./lineHeightClient.js";

describe("setupLineHeightDemos", () => {
  it("updates preview line height and generated CSS", () => {
    document.body.innerHTML = createDemoFixture();
    setupLineHeightDemos(document);

    const calculated = document.querySelector('[data-line-height-control="mode"][value="calculated"]');
    calculated.checked = true;
    calculated.dispatchEvent(new Event("change", { bubbles: true }));

    expect(document.querySelector("[data-line-height-preview]")).toHaveStyle({
      "--line-height-demo-value": "calc(1em + 0.5rem)",
    });
    expect(document.querySelector('[data-line-height-code="css"]'))
      .toHaveTextContent("line-height: calc(1em + 0.5rem);");
  });

  it("does not attach duplicate listeners when setup runs twice", () => {
    document.body.innerHTML = createDemoFixture();
    setupLineHeightDemos(document);
    setupLineHeightDemos(document);

    expect(document.querySelector("[data-line-height-demo]").dataset.lineHeightReady)
      .toBe("true");
  });
});

function createDemoFixture() {
  return `
    <section data-line-height-demo>
      <input data-line-height-control="mode" name="line-height" type="radio" value="browserDefault" checked>
      <input data-line-height-control="mode" name="line-height" type="radio" value="fixed">
      <input data-line-height-control="mode" name="line-height" type="radio" value="calculated">
      <article data-line-height-preview></article>
      <code data-line-height-code="css"></code>
    </section>
  `;
}
