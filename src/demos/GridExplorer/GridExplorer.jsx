import "./GridExplorer.css";

export default function GridExplorer() {
  return (
    <section className="grid-explorer" role="group" aria-label="Grid Explorer demo">
      <div className="grid-explorer__controls" aria-label="Grid controls">
        <label>
          Columns
          <select defaultValue="1fr 1fr 1fr">
            <option>1fr 1fr 1fr</option>
            <option>12rem minmax(0, 1fr)</option>
            <option>repeat(4, minmax(0, 1fr))</option>
          </select>
        </label>

        <label>
          Gap
          <input type="range" min="0" max="32" defaultValue="16" />
        </label>
      </div>

      <div className="grid-explorer__preview" aria-label="Grid preview">
        <div>Header</div>
        <div>Navigation</div>
        <div>Main content</div>
        <div>Related links</div>
      </div>

      <div className="grid-explorer__code" aria-label="Generated code">
        <pre>
          <code>{`.layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}`}</code>
        </pre>
      </div>
    </section>
  );
}
