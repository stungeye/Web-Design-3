import Prism from "prismjs";
import "prismjs/components/prism-css.js";
import "prismjs/components/prism-markup.js";

const prismLanguageNames = {
  html: "markup",
  css: "css",
};

export function highlightCode(code, language) {
  const prismLanguage = prismLanguageNames[language] ?? language;
  const grammar = Prism.languages[prismLanguage];

  if (!grammar) {
    return escapeHtml(code);
  }

  return Prism.highlight(code, grammar, prismLanguage);
}

export function setHighlightedCode(codeElement, code, language) {
  codeElement.textContent = "";
  codeElement.className = `language-${language}`;
  codeElement.innerHTML = highlightCode(code, language);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
