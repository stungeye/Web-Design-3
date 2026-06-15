const nextKeys = new Set(["ArrowRight", "ArrowDown", "PageDown"]);
const previousKeys = new Set(["ArrowLeft", "ArrowUp", "PageUp"]);
const interactiveSelector = "a, button, input, select, textarea, summary, [contenteditable]";

export function getNextSlideIndexForKey(event, currentIndex, slideCount) {
  const lastIndex = slideCount - 1;

  if (slideCount <= 0) {
    return currentIndex;
  }

  if (event.key === "Home") {
    return 0;
  }

  if (event.key === "End") {
    return lastIndex;
  }

  if (isSpaceKey(event)) {
    return event.shiftKey
      ? clampSlideIndex(currentIndex - 1, lastIndex)
      : clampSlideIndex(currentIndex + 1, lastIndex);
  }

  if (nextKeys.has(event.key)) {
    return clampSlideIndex(currentIndex + 1, lastIndex);
  }

  if (previousKeys.has(event.key)) {
    return clampSlideIndex(currentIndex - 1, lastIndex);
  }

  return currentIndex;
}

export function buildSlideSections(sourceElement, documentRef = document) {
  const sourceNodes = Array.from(sourceElement.childNodes);
  const headingNodes = sourceNodes.filter(isSlideHeading);
  const deckElement = documentRef.createElement("div");

  deckElement.className = "slide-deck";
  deckElement.id = sourceElement.id;
  deckElement.setAttribute("data-slide-deck", "");

  headingNodes.forEach((heading, index) => {
    const section = documentRef.createElement("section");
    const slideId = `slide-${index + 1}`;
    const headingId = heading.id || `${slideId}-heading`;
    const nextHeading = headingNodes[index + 1];

    heading.id = headingId;
    section.className = "slide";
    section.id = slideId;
    section.setAttribute("aria-labelledby", headingId);
    section.setAttribute("data-slide", "");

    let currentNode = heading;

    while (currentNode && currentNode !== nextHeading) {
      const nextNode = currentNode.nextSibling;
      section.append(currentNode);
      currentNode = nextNode;
    }

    deckElement.append(section);
  });

  sourceElement.replaceWith(deckElement);

  return Array.from(deckElement.querySelectorAll("[data-slide]"));
}

export function setActiveSlide(slides, nextIndex, statusElement) {
  const lastIndex = slides.length - 1;
  const activeIndex = clampSlideIndex(nextIndex, lastIndex);

  slides.forEach((slide, index) => {
    const isActive = index === activeIndex;

    slide.hidden = !isActive;
    slide.setAttribute("aria-hidden", String(!isActive));
    slide.toggleAttribute("data-active", isActive);
  });

  if (statusElement) {
    statusElement.textContent = `${activeIndex + 1} / ${slides.length}`;
    statusElement.setAttribute("aria-label", `Slide ${activeIndex + 1} of ${slides.length}`);
  }

  return activeIndex;
}

export function setupSlideDeck(root = document) {
  const sourceElement = root.querySelector("[data-slide-source]");
  const statusElement = root.querySelector("[data-slide-status]");

  if (!sourceElement) {
    return undefined;
  }

  const slides = buildSlideSections(sourceElement, root);
  let activeIndex = setActiveSlide(slides, 0, statusElement);

  root.body?.classList.add("slides-ready");

  root.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || isFromInteractiveElement(event)) {
      return;
    }

    const nextIndex = getNextSlideIndexForKey(event, activeIndex, slides.length);

    if (nextIndex === activeIndex) {
      return;
    }

    event.preventDefault();
    activeIndex = setActiveSlide(slides, nextIndex, statusElement);
  });

  return {
    get activeIndex() {
      return activeIndex;
    },
    slides,
  };
}

function isSlideHeading(node) {
  return node.nodeType === Node.ELEMENT_NODE && ["H1", "H2"].includes(node.tagName);
}

function isSpaceKey(event) {
  return event.key === " " || event.key === "Spacebar";
}

function isFromInteractiveElement(event) {
  return event.target instanceof Element && Boolean(event.target.closest(interactiveSelector));
}

function clampSlideIndex(index, lastIndex) {
  if (lastIndex < 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), lastIndex);
}
