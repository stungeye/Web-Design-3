import "./SemanticStructureDemo.css";

export default function SemanticStructureDemo() {
  return (
    <section
      className="semantic-structure-demo"
      role="group"
      aria-label="Semantic Structure Demo demo"
    >
      <div className="semantic-structure-demo__page" aria-label="Page structure preview">
        <header>header</header>
        <nav>nav</nav>
        <main>main</main>
        <aside>aside</aside>
        <footer>footer</footer>
      </div>

      <pre className="semantic-structure-demo__code">
        <code>{`<body>
  <header>...</header>
  <nav>...</nav>
  <main>...</main>
  <aside>...</aside>
  <footer>...</footer>
</body>`}</code>
      </pre>
    </section>
  );
}
