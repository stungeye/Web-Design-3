export function preserveInstructorModeLinks(root = document, locationRef = window.location) {
  preserveQueryParamOnLinks("instructor", root, locationRef);
}

export function preserveQueryParamOnLinks(paramName, root = document, locationRef = window.location) {
  const params = new URLSearchParams(locationRef.search);

  if (!params.has(paramName)) {
    return;
  }

  const value = params.get(paramName) || "1";
  const selector = `[data-preserve-${paramName}]`;

  root.querySelectorAll(selector).forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) {
      return;
    }

    const url = new URL(href, locationRef.href);
    url.searchParams.set(paramName, value);

    link.setAttribute("href", formatHref(url, locationRef));
  });
}

function formatHref(url, locationRef) {
  if (url.origin === locationRef.origin) {
    return `${url.pathname}${url.search}${url.hash}`;
  }

  return url.href;
}
