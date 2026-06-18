import { describe, expect, it } from "vitest";
import { preserveInstructorModeLinks } from "./instructorModeLinks.js";

describe("instructor mode link preservation", () => {
  it("adds the instructor query parameter to marked same-origin links", () => {
    document.body.innerHTML = `
      <a data-preserve-instructor href="/Web-Design-3/01-semantic-html/01-introduction/slides/">Slides</a>
      <a href="/Web-Design-3/01-semantic-html/01-introduction/">Notes</a>
    `;

    preserveInstructorModeLinks(
      document,
      new URL("https://example.com/Web-Design-3/?instructor=1"),
    );

    expect(document.querySelector("[data-preserve-instructor]")).toHaveAttribute(
      "href",
      "/Web-Design-3/01-semantic-html/01-introduction/slides/?instructor=1",
    );
    expect(document.querySelector("a:not([data-preserve-instructor])")).toHaveAttribute(
      "href",
      "/Web-Design-3/01-semantic-html/01-introduction/",
    );
  });

  it("preserves existing query parameters and hashes on marked links", () => {
    document.body.innerHTML = `
      <a data-preserve-instructor href="/Web-Design-3/demos/GridExplorer/?view=code#demo-content">Full screen</a>
    `;

    preserveInstructorModeLinks(
      document,
      new URL("https://example.com/Web-Design-3/02-css-layout/01-grid/?instructor=1"),
    );

    expect(document.querySelector("a")).toHaveAttribute(
      "href",
      "/Web-Design-3/demos/GridExplorer/?view=code&instructor=1#demo-content",
    );
  });

  it("uses a stable instructor value when the current URL has a valueless flag", () => {
    document.body.innerHTML = `
      <a data-preserve-instructor href="/Web-Design-3/">Index</a>
    `;

    preserveInstructorModeLinks(
      document,
      new URL("https://example.com/Web-Design-3/02-css-layout/01-grid/slides/?instructor"),
    );

    expect(document.querySelector("a")).toHaveAttribute(
      "href",
      "/Web-Design-3/?instructor=1",
    );
  });

  it("does nothing when instructor mode is not active in the current URL", () => {
    document.body.innerHTML = `
      <a data-preserve-instructor href="/Web-Design-3/">Index</a>
    `;

    preserveInstructorModeLinks(
      document,
      new URL("https://example.com/Web-Design-3/02-css-layout/01-grid/slides/"),
    );

    expect(document.querySelector("a")).toHaveAttribute("href", "/Web-Design-3/");
  });
});
