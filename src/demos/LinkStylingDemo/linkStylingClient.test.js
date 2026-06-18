import { describe, expect, it } from "vitest";
import { setupLinkStylingDemos } from "./linkStylingClient.js";

describe("setupLinkStylingDemos", () => {
  it("updates preview variables and generated CSS", () => {
    document.body.innerHTML = createDemoFixture();
    setupLinkStylingDemos(document);

    const color = document.querySelector('[data-link-styling-control="color"]');
    const decorationStyle = document.querySelector('[data-link-styling-control="decorationStyle"]');
    const thickness = document.querySelector('[data-link-styling-control="underlineThickness"]');
    const bold = document.querySelector('[data-link-styling-control="bold"]');

    color.value = "#1d4ed8";
    decorationStyle.value = "wavy";
    thickness.value = "0.12";
    bold.checked = false;
    thickness.dispatchEvent(new Event("input", { bubbles: true }));

    expect(document.querySelector("[data-link-styling-demo]")).toHaveStyle({
      "--link-demo-color": "#1d4ed8",
      "--link-demo-decoration-style": "wavy",
      "--link-demo-thickness": "0.12em",
      "--link-demo-weight": "400",
    });
    expect(document.querySelector('[data-link-styling-output="underlineThickness"]'))
      .toHaveTextContent("0.12em");
    expect(document.querySelector('[data-link-styling-code="css"]'))
      .toHaveTextContent("text-decoration-style: wavy;");
    expect(document.querySelector('[data-link-styling-code="css"]'))
      .toHaveTextContent("font-weight: 400;");
  });

  it("updates the animation data attribute and generated CSS", () => {
    document.body.innerHTML = createDemoFixture();
    setupLinkStylingDemos(document);

    const animate = document.querySelector('[data-link-styling-control="animate"]');
    animate.checked = false;
    animate.dispatchEvent(new Event("change", { bubbles: true }));

    expect(document.querySelector("[data-link-styling-demo]").dataset.linkStylingAnimate)
      .toBe("disabled");
    expect(document.querySelector('[data-link-styling-code="css"]'))
      .not.toHaveTextContent("transition:");
  });

  it("does not attach duplicate listeners when setup runs twice", () => {
    document.body.innerHTML = createDemoFixture();
    setupLinkStylingDemos(document);
    setupLinkStylingDemos(document);

    expect(document.querySelector("[data-link-styling-demo]").dataset.linkStylingReady)
      .toBe("true");
  });
});

function createDemoFixture() {
  return `
    <section data-link-styling-demo>
      <input data-link-styling-control="color" value="#075985">
      <input data-link-styling-control="hoverColor" value="#0f766e">
      <select data-link-styling-control="decorationStyle">
        <option value="solid" selected>solid</option>
        <option value="wavy">wavy</option>
      </select>
      <input data-link-styling-control="underlineThickness" value="0.08">
      <input data-link-styling-control="underlineOffset" value="0.16">
      <input data-link-styling-control="bold" type="checkbox" checked>
      <input data-link-styling-control="animate" type="checkbox" checked>
      <output data-link-styling-output="underlineThickness"></output>
      <output data-link-styling-output="underlineOffset"></output>
      <code data-link-styling-code="css"></code>
    </section>
  `;
}
