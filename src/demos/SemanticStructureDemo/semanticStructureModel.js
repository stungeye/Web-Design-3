export const defaultSemanticStructureState = Object.freeze({
  mode: "semantic",
});

export const semanticStructureModes = Object.freeze({
  generic: {
    label: "Generic markup",
    htmlCode: `<div class="top">
  <div class="big">Visit Gimli</div>
  <div><span>Home</span> <span>Events</span></div>
</div>

<div class="page-title">Visit Gimli</div>

<div class="section">
  <div class="section-title">Summer Festivals</div>
  <div>Enjoy music, food, markets, and lakefront events.</div>
  <div class="button">Click here</div>
</div>

<div class="section">
  <div class="section-title">Before You Go</div>
  <div>Season: May to September</div>
  <div>Admission: Free</div>
  <div>Pets: Leashed dogs are welcome outdoors.</div>
</div>

<div class="quote">
  The pier is one of the best places to watch the sunset.
</div>

<div>Gimli Visitor Information Centre</div>`,
  },
  semantic: {
    label: "Semantic HTML",
    htmlCode: `<header>
  <a href="index.html">Visit Gimli</a>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="events.html">Events</a></li>
    </ul>
  </nav>
</header>

<main>
  <h1>Visit Gimli</h1>

  <section>
    <h2>Summer Festivals</h2>
    <p>Enjoy music, food, markets, and lakefront events.</p>
    <a href="events.html">Explore summer festivals</a>
  </section>

  <section>
    <h2>Before You Go</h2>
    <dl>
      <dt>Season</dt>
      <dd>May to September</dd>
      <dt>Admission</dt>
      <dd>Free</dd>
      <dt>Pets</dt>
      <dd>Leashed dogs are welcome outdoors.</dd>
    </dl>
  </section>

  <blockquote>
    <p>The pier is one of the best places to watch the sunset.</p>
    <cite>Tourism Gimli Visitor Guide</cite>
  </blockquote>
</main>

<footer>
  <address>Gimli Visitor Information Centre</address>
</footer>`,
  },
});

export function getSemanticStructureMode(modeName) {
  return semanticStructureModes[modeName] ?? semanticStructureModes[defaultSemanticStructureState.mode];
}
