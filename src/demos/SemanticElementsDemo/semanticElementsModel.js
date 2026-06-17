export const defaultSemanticElementState = Object.freeze({
  index: 0,
});

export const semanticElementExamples = Object.freeze([
  {
    name: "details",
    title: "Details",
    summary: "Use details and summary for optional information the visitor can expand when needed.",
    previewHtml: `<details>
  <summary>Are pets allowed?</summary>
  <p>Leashed dogs are welcome on outdoor trails.</p>
</details>`,
    htmlCode: `<details>
  <summary>Are pets allowed?</summary>
  <p>Leashed dogs are welcome on outdoor trails.</p>
</details>`,
  },
  {
    name: "figure",
    title: "Figure",
    summary: "Use figure when an image, diagram, chart, or code sample needs a connected caption.",
    previewHtml: `<figure>
  <div class="semantic-elements-demo__image" role="img" aria-label="Boats docked in Gimli Harbour">
    Gimli Harbour
  </div>
  <figcaption>Gimli Harbour is a popular summer walking route.</figcaption>
</figure>`,
    htmlCode: `<figure>
  <img src="harbour.jpg" alt="Boats docked in Gimli Harbour">
  <figcaption>Gimli Harbour is a popular summer walking route.</figcaption>
</figure>`,
  },
  {
    name: "time",
    title: "Time",
    summary: "Use time when a visible date or time should also have a precise machine-readable value.",
    previewHtml: `<p>
  The market opens
  <time datetime="2026-07-18T09:00">Saturday at 9 a.m.</time>.
</p>`,
    htmlCode: `<p>
  The market opens
  <time datetime="2026-07-18T09:00">Saturday at 9 a.m.</time>.
</p>`,
  },
  {
    name: "mark",
    title: "Mark",
    summary: "Use mark to highlight text because it is relevant in the current context.",
    previewHtml: `<p>
  Guided walking tours include
  <mark>harbour history</mark>, public art, and local food stops.
</p>`,
    htmlCode: `<p>
  Guided walking tours include
  <mark>harbour history</mark>, public art, and local food stops.
</p>`,
  },
  {
    name: "abbr",
    title: "Abbreviation",
    summary: "Use abbr when a shortened term should expose its full meaning.",
    previewHtml: `<p>
  Check the <abbr title="World Wide Web Consortium">W3C</abbr>
  validator before submitting your page.
</p>`,
    htmlCode: `<p>
  Check the <abbr title="World Wide Web Consortium">W3C</abbr>
  validator before submitting your page.
</p>`,
  },
  {
    name: "meter",
    title: "Meter",
    summary: "Use meter for a known value inside a fixed range, such as capacity, rating, or availability.",
    previewHtml: `<p>
  Picnic shelter availability:
  <meter min="0" max="10" value="7">7 out of 10</meter>
</p>`,
    htmlCode: `<p>
  Picnic shelter availability:
  <meter min="0" max="10" value="7">7 out of 10</meter>
</p>`,
  },
  {
    name: "q",
    title: "Inline Quote",
    summary: "Use q for a short quotation that belongs inside a sentence.",
    previewHtml: `<p>
  A visitor called the harbour walk <q>the best sunset route in town</q>.
</p>`,
    htmlCode: `<p>
  A visitor called the harbour walk <q>the best sunset route in town</q>.
</p>`,
  },
  {
    name: "dl",
    title: "Description List",
    summary: "Use dl, dt, and dd for name-value information such as facts, specs, hours, or prices.",
    previewHtml: `<dl>
  <dt>Admission</dt>
  <dd>Free</dd>
  <dt>Season</dt>
  <dd>May to September</dd>
</dl>`,
    htmlCode: `<dl>
  <dt>Admission</dt>
  <dd>Free</dd>
  <dt>Season</dt>
  <dd>May to September</dd>
</dl>`,
  },
  {
    name: "blockquote",
    title: "Blockquote",
    summary: "Use blockquote for quoted material from another source, with cite for the source label.",
    previewHtml: `<blockquote>
  <p>The pier is one of the best places to watch the sunset.</p>
  <cite>Tourism Gimli Visitor Guide</cite>
</blockquote>`,
    htmlCode: `<blockquote>
  <p>The pier is one of the best places to watch the sunset.</p>
  <cite>Tourism Gimli Visitor Guide</cite>
</blockquote>`,
  },
  {
    name: "address",
    title: "Address",
    summary: "Use address for contact information for a person, organization, or page owner.",
    previewHtml: `<address>
  Gimli Visitor Information Centre<br>
  10 Centre Street<br>
  <a href="mailto:info@example.ca">info@example.ca</a>
</address>`,
    htmlCode: `<address>
  Gimli Visitor Information Centre<br>
  10 Centre Street<br>
  <a href="mailto:info@example.ca">info@example.ca</a>
</address>`,
  },
]);

export function getSemanticElement(index) {
  const normalizedIndex = Number.parseInt(index, 10);

  if (Number.isNaN(normalizedIndex)) {
    return semanticElementExamples[defaultSemanticElementState.index];
  }

  return semanticElementExamples[
    ((normalizedIndex % semanticElementExamples.length) + semanticElementExamples.length)
      % semanticElementExamples.length
  ];
}
