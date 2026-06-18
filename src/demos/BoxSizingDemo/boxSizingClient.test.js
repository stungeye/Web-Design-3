import { fireEvent, screen } from "@testing-library/dom";
import { beforeEach, describe, expect, it } from "vitest";
import { setupBoxSizingDemos } from "./boxSizingClient.js";

describe("setupBoxSizingDemos", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section data-box-sizing-demo>
        <select data-box-sizing-control="mode">
          <option value="content-box" selected>content-box</option>
          <option value="border-box">border-box</option>
        </select>
        <input aria-label="Border width" data-box-sizing-control="border-width" value="4" />
        <input aria-label="Padding" data-box-sizing-control="padding" value="24" />
        <span data-box-sizing-output="border-width"></span>
        <output data-box-sizing-output="padding"></output>
        <strong data-box-sizing-output="painted-width"></strong>
        <strong data-box-sizing-output="content-width"></strong>
        <div data-box-sizing-preview="box"></div>
        <code data-box-sizing-code="css"></code>
      </section>
    `;
  });

  it("updates preview styles and generated CSS", () => {
    setupBoxSizingDemos();

    fireEvent.change(screen.getByDisplayValue("content-box"), {
      target: { value: "border-box" },
    });
    fireEvent.input(screen.getByLabelText("Padding"), { target: { value: "40" } });
    fireEvent.input(screen.getByLabelText("Border width"), { target: { value: "12" } });

    expect(screen.getByText("220px")).toBeInTheDocument();
    expect(screen.getByText("116px")).toBeInTheDocument();
    expect(document.querySelector('[data-box-sizing-preview="box"]')).toHaveStyle({
      "--box-border-width": "12px",
      "--box-sizing": "border-box",
      "--box-padding": "40px",
    });
    expect(document.querySelector('[data-box-sizing-preview="box"]'))
      .toHaveAttribute("data-box-sizing-border-width", "12");
    expect(document.querySelector('[data-box-sizing-code="css"]').textContent)
      .toContain("box-sizing: border-box;");
    expect(document.querySelector('[data-box-sizing-code="css"]').textContent)
      .toContain("border: 12px solid #0f766e;");
  });

  it("is idempotent", () => {
    const demo = document.querySelector("[data-box-sizing-demo]");

    setupBoxSizingDemos();
    setupBoxSizingDemos();

    expect(demo.dataset.boxSizingReady).toBe("true");
  });
});
