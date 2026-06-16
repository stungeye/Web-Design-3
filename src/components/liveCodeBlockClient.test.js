import { describe, expect, it, vi } from "vitest";
import { setupLiveCodeBlocks } from "./liveCodeBlockClient.js";

describe("setupLiveCodeBlocks", () => {
  it("copies the current text from the nearest live code block", async () => {
    document.body.innerHTML = `
      <figure data-live-code-block>
        <button data-live-code-copy>Copy</button>
        <code>.feature-grid { display: grid; }</code>
      </figure>
    `;
    const writeText = vi.fn().mockResolvedValue();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    setupLiveCodeBlocks(document);

    const button = document.querySelector("[data-live-code-copy]");
    button.click();
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledWith(".feature-grid { display: grid; }");
    expect(button).toHaveTextContent("Copied");
    expect(button).toHaveAttribute("data-copy-state", "copied");
  });

  it("is idempotent when setup runs more than once", async () => {
    document.body.innerHTML = `
      <figure data-live-code-block>
        <button data-live-code-copy>Copy</button>
        <code>const count = 1;</code>
      </figure>
    `;
    const writeText = vi.fn().mockResolvedValue();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    setupLiveCodeBlocks(document);
    setupLiveCodeBlocks(document);

    document.querySelector("[data-live-code-copy]").click();
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledTimes(1);
  });
});
