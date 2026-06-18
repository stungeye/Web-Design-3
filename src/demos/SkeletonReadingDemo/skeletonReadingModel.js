export const skeletons = Object.freeze([
  {
    title: "Simple page shell",
    summary: "A basic page with one clear reading path.",
    tree: {
      tag: "body",
      children: [
        { tag: "header", label: "Site title" },
        {
          tag: "main",
          label: "Page content",
          children: [
            { tag: "h1", label: "Main heading" },
            { tag: "section", label: "Content section" },
          ],
        },
        { tag: "footer", label: "Site footer" },
      ],
    },
  },
  {
    title: "Navigation and sections",
    summary: "Header navigation supports a main content stack.",
    tree: {
      tag: "body",
      children: [
        {
          tag: "header",
          label: "Site header",
          children: [{ tag: "nav", label: "Primary navigation" }],
        },
        {
          tag: "main",
          label: "Main content",
          children: [
            { tag: "h1", label: "Page heading" },
            { tag: "section", label: "Overview" },
            { tag: "section", label: "Details" },
          ],
        },
        { tag: "footer", label: "Footer links" },
      ],
    },
  },
  {
    title: "Article with support content",
    summary: "An article carries the primary reading experience.",
    tree: {
      tag: "body",
      children: [
        {
          tag: "header",
          label: "Publication header",
          children: [{ tag: "nav", label: "Section links" }],
        },
        {
          tag: "main",
          label: "Article page",
          children: [
            {
              tag: "article",
              label: "Feature article",
              children: [
                { tag: "h1", label: "Article title" },
                { tag: "section", label: "Opening section" },
                { tag: "section", label: "Second section" },
              ],
            },
            { tag: "aside", label: "Related links" },
          ],
        },
        { tag: "footer", label: "Publication footer" },
      ],
    },
  },
  {
    title: "Brochure landing page",
    summary: "Several sections divide a promotional page.",
    tree: {
      tag: "body",
      children: [
        {
          tag: "header",
          label: "Brand header",
          children: [{ tag: "nav", label: "Main menu" }],
        },
        {
          tag: "main",
          label: "Landing page",
          children: [
            { tag: "section", label: "Hero message" },
            { tag: "section", label: "Feature cards" },
            { tag: "section", label: "Call to action" },
          ],
        },
        { tag: "footer", label: "Contact footer" },
      ],
    },
  },
  {
    title: "Deeper brochure page",
    summary: "A nested content area supports scanning and reading.",
    tree: {
      tag: "body",
      children: [
        {
          tag: "header",
          label: "Site header",
          children: [{ tag: "nav", label: "Primary navigation" }],
        },
        {
          tag: "main",
          label: "Destination guide",
          children: [
            {
              tag: "article",
              label: "Guide article",
              children: [
                { tag: "h1", label: "Guide title" },
                {
                  tag: "section",
                  label: "Plan your visit",
                  children: [
                    { tag: "h2", label: "Hours" },
                  ],
                },
                {
                  tag: "section",
                  label: "Highlights",
                  children: [{ tag: "h2", label: "Admission" }],
                },
              ],
            },
            { tag: "aside", label: "Quick facts" },
          ],
        },
        {
          tag: "footer",
          label: "Footer",
          children: [{ tag: "nav", label: "Footer navigation" }],
        },
      ],
    },
  },
]);

export const defaultSkeletonReadingState = Object.freeze({
  index: 0,
});

export function getSkeleton(index) {
  return skeletons[normalizeSkeletonIndex(index)];
}

export function getNextSkeletonIndex(index) {
  return normalizeSkeletonIndex(Number(index) + 1);
}

export function getPreviousSkeletonIndex(index) {
  return normalizeSkeletonIndex(Number(index) - 1);
}

export function normalizeSkeletonIndex(index) {
  if (!Number.isFinite(Number(index))) {
    return defaultSkeletonReadingState.index;
  }

  const count = skeletons.length;
  return ((Number(index) % count) + count) % count;
}
