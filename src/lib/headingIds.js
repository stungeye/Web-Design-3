export function buildSectionToc(sections) {
  const slugger = createHeadingIdSlugger();

  return sections.map((section) => ({
    title: section.title,
    id: slugger.slug(section.title),
  }));
}

export function createHeadingIdSlugger() {
  const seen = new Map();

  return {
    slug(value) {
      const baseSlug = slugifyHeadingText(value);
      const count = seen.get(baseSlug) ?? 0;
      seen.set(baseSlug, count + 1);

      if (count === 0) {
        return baseSlug;
      }

      return `${baseSlug}-${count}`;
    },
  };
}

export function slugifyHeadingText(value) {
  const slug = String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "section";
}
