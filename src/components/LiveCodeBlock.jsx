import { highlightCode } from "../lib/liveCodeHighlighting.js";
import "./LiveCodeBlock.css";

export default function LiveCodeBlock({ code, codeProps = {}, label, language }) {
  return (
    <figure className="live-code-block" data-live-code-block data-live-language={language}>
      <figcaption className="live-code-block__label">{label}</figcaption>
      <pre>
        <code
          {...codeProps}
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
        />
      </pre>
    </figure>
  );
}
