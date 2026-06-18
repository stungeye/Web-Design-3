import { describe, expect, it } from "vitest";
import { setupSkeletonReadingDemos } from "./skeletonReadingClient.js";

describe("setupSkeletonReadingDemos", () => {
  it("moves between skeletons with next and previous controls", () => {
    document.body.innerHTML = createDemoFixture();
    setupSkeletonReadingDemos(document);

    document.querySelector('[data-skeleton-control="next"]').click();

    expect(document.querySelector("[data-skeleton-reading-demo]").dataset.skeletonIndex)
      .toBe("1");
    expect(document.querySelector("[data-skeleton-title]").textContent)
      .toBe("Navigation and sections");
    expect(document.querySelector('[data-skeleton-panel="0"]').hidden).toBe(true);
    expect(document.querySelector('[data-skeleton-panel="1"]').hidden).toBe(false);

    document.querySelector('[data-skeleton-control="previous"]').click();

    expect(document.querySelector("[data-skeleton-reading-demo]").dataset.skeletonIndex)
      .toBe("0");
  });

  it("does not attach duplicate listeners when setup runs twice", () => {
    document.body.innerHTML = createDemoFixture();
    setupSkeletonReadingDemos(document);
    setupSkeletonReadingDemos(document);

    document.querySelector('[data-skeleton-control="next"]').click();

    expect(document.querySelector("[data-skeleton-reading-demo]").dataset.skeletonIndex)
      .toBe("1");
  });
});

function createDemoFixture() {
  return `
    <section data-skeleton-reading-demo data-skeleton-index="0">
      <button type="button" data-skeleton-control="previous">Previous</button>
      <span data-skeleton-title>Simple page shell</span>
      <span data-skeleton-count>1 / 5</span>
      <button type="button" data-skeleton-control="next">Next</button>
      <article data-skeleton-panel="0"></article>
      <article data-skeleton-panel="1" hidden></article>
      <article data-skeleton-panel="2" hidden></article>
      <article data-skeleton-panel="3" hidden></article>
      <article data-skeleton-panel="4" hidden></article>
    </section>
  `;
}
