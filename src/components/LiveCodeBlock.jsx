import { highlightCode } from "../lib/liveCodeHighlighting.js";
import "./LiveCodeBlock.css";

export default function LiveCodeBlock({
  code,
  codeProps = {},
  copyLabel,
  label,
  language,
}) {
  return (
    <figure className="live-code-block" data-live-code-block data-live-language={language}>
      <figcaption className="live-code-block__header">
        <span className="live-code-block__label">{label}</span>
        {copyLabel ? (
          <button
            className="live-code-block__copy"
            type="button"
            data-live-code-copy
            aria-label={copyLabel}
          >
            Copy
          </button>
        ) : null}
      </figcaption>
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
