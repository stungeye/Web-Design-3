import { describe, expect, it } from "vitest";
import {
  getNextSlideIndexForKey,
  setupSlideDeck,
} from "./slideDeckController.js";

describe("slide deck keyboard navigation", () => {
  it.each([
    ["ArrowRight"],
    ["ArrowDown"],
    ["PageDown"],
    [" "],
  ])("moves to the next slide with %s", (key) => {
    expect(getNextSlideIndexForKey({ key }, 1, 4)).toBe(2);
  });

  it.each([
    ["ArrowLeft"],
    ["ArrowUp"],
    ["PageUp"],
  ])("moves to the previous slide with %s", (key) => {
    expect(getNextSlideIndexForKey({ key }, 1, 4)).toBe(0);
  });

  it("moves backward with Shift+Space", () => {
    expect(getNextSlideIndexForKey({ key: " ", shiftKey: true }, 2, 4)).toBe(1);
  });

  it("jumps to the first and last slide with Home and End", () => {
    expect(getNextSlideIndexForKey({ key: "Home" }, 2, 4)).toBe(0);
    expect(getNextSlideIndexForKey({ key: "End" }, 0, 4)).toBe(3);
  });

  it("clamps navigation at the first and last slide", () => {
    expect(getNextSlideIndexForKey({ key: "ArrowLeft" }, 0, 4)).toBe(0);
    expect(getNextSlideIndexForKey({ key: "ArrowRight" }, 3, 4)).toBe(3);
  });
});

describe("slide deck setup", () => {
  it("wraps one title slide plus one slide per h2", () => {
    document.body.innerHTML = `
      <main>
        <div id="slide-content" data-slide-source>
          <h1>CSS Grid</h1>
          <p>Opening content.</p>
          <h2>Grid Containers</h2>
          <p>Display grid.</p>
          <h3>Nested Heading</h3>
          <p>Still same slide.</p>
          <h2>Template Areas</h2>
          <p>Named regions.</p>
        </div>
        <p data-slide-status></p>
      </main>
    `;

    const deck = setupSlideDeck(document);

    expect(deck.slides).toHaveLength(3);
    expect(deck.slides[0]).toHaveTextContent("CSS Grid");
    expect(deck.slides[1]).toHaveTextContent("Grid Containers");
    expect(deck.slides[1]).toHaveTextContent("Nested Heading");
    expect(deck.slides[2]).toHaveTextContent("Template Areas");
    expect(document.querySelector("#slide-content")).toHaveAttribute("data-slide-deck");
    expect(document.querySelector("#slide-content")).toHaveAttribute("tabindex", "-1");
    expect(document.querySelector("[data-slide-status]")).toHaveTextContent("1 / 3");
    expect(document.querySelector("[data-slide-status]")).toHaveAttribute(
      "aria-label",
      "Slide 1 of 3",
    );
  });

  it("updates the active slide from keyboard events", () => {
    document.body.innerHTML = `
      <main>
        <div data-slide-source>
          <h1>Title</h1>
          <h2>First Section</h2>
          <h2>Second Section</h2>
        </div>
        <p data-slide-status></p>
      </main>
    `;

    const deck = setupSlideDeck(document);

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "End" }));
    expect(deck.activeIndex).toBe(2);
    expect(deck.slides[2]).toHaveAttribute("data-active");

    document.dispatchEvent(new KeyboardEvent("keydown", { key: " ", shiftKey: true }));
    expect(deck.activeIndex).toBe(1);
    expect(deck.slides[1]).toHaveAttribute("data-active");

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Home" }));
    expect(deck.activeIndex).toBe(0);
    expect(deck.slides[0]).toHaveAttribute("data-active");
  });

  it("does not intercept keyboard events from interactive elements", () => {
    document.body.innerHTML = `
      <main>
        <div data-slide-source>
          <h1>Title</h1>
          <h2>First Section</h2>
        </div>
        <button type="button">Keep focus here</button>
      </main>
    `;

    const deck = setupSlideDeck(document);
    const button = document.querySelector("button");

    button.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );

    expect(deck.activeIndex).toBe(0);
  });

  it("does not intercept keyboard events from focusable separator controls", () => {
    document.body.innerHTML = `
      <main>
        <div data-slide-source>
          <h1>Title</h1>
          <h2>First Section</h2>
        </div>
        <div role="separator" tabindex="0">Resize preview area</div>
      </main>
    `;

    const deck = setupSlideDeck(document);
    const separator = document.querySelector('[role="separator"]');

    separator.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    );

    expect(deck.activeIndex).toBe(0);
  });
});
