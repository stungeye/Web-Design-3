import { describe, expect, it } from "vitest";
import {
  buildSectionToc,
  createHeadingIdSlugger,
  slugifyHeadingText,
} from "./headingIds.js";

describe("heading ids", () => {
  it("slugifies section titles for fragment links", () => {
    expect(slugifyHeadingText("Meaning Before Appearance")).toBe(
      "meaning-before-appearance",
    );
    expect(slugifyHeadingText("Intrinsic & Flexible Tracks")).toBe(
      "intrinsic-and-flexible-tracks",
    );
  });

  it("creates deterministic ids for duplicate headings", () => {
    const slugger = createHeadingIdSlugger();

    expect(slugger.slug("Overview")).toBe("overview");
    expect(slugger.slug("Overview")).toBe("overview-1");
    expect(slugger.slug("Overview")).toBe("overview-2");
  });

  it("builds table of contents entries from parsed sections", () => {
    expect(
      buildSectionToc([
        { title: "Defining A Grid" },
        { title: "Exploring Track Changes" },
      ]),
    ).toEqual([
      { title: "Defining A Grid", id: "defining-a-grid" },
      { title: "Exploring Track Changes", id: "exploring-track-changes" },
    ]);
  });
});
