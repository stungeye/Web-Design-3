export class ModuleParseError extends Error {
  constructor(message) {
    super(message);
    this.name = "ModuleParseError";
  }
}

export function parseModuleSource(source) {
  const normalizedSource = normalizeLineEndings(source);
  const lines = normalizedSource.split("\n");
  const headingTokens = findTopLevelHeadingTokens(lines);

  validateHeadingStructure(lines, headingTokens);

  const titleToken = headingTokens.find((token) => token.depth === 1);
  const sectionTokens = headingTokens.filter((token) => token.depth === 2);
  const openingContent = readBodyBetween(lines, titleToken.lineIndex, sectionTokens[0]?.lineIndex);

  const sections = sectionTokens.map((token, index) => {
    const nextToken = sectionTokens[index + 1];
    const body = readBodyBetween(lines, token.lineIndex, nextToken?.lineIndex);

    return {
      kind: "section",
      title: token.title,
      headingDepth: 2,
      body,
      source: buildSegmentSource(token.rawHeading, body),
      startLine: token.lineNumber,
    };
  });

  const titleSlide = {
    kind: "title",
    title: titleToken.title,
    headingDepth: 1,
    body: openingContent,
    source: buildSegmentSource(titleToken.rawHeading, openingContent),
    startLine: titleToken.lineNumber,
  };

  return {
    title: titleToken.title,
    openingContent,
    sections,
    slides: [titleSlide, ...sections],
  };
}

function findTopLevelHeadingTokens(lines) {
  const headingTokens = [];
  let fenceMarker;

  lines.forEach((line, lineIndex) => {
    const fence = line.match(/^(\s*)(`{3,}|~{3,})/);

    if (fence) {
      const marker = fence[2];
      const markerCharacter = marker[0];

      if (!fenceMarker) {
        fenceMarker = {
          character: markerCharacter,
          length: marker.length,
        };
      } else if (
        fenceMarker.character === markerCharacter &&
        marker.length >= fenceMarker.length
      ) {
        fenceMarker = undefined;
      }

      return;
    }

    if (fenceMarker) {
      return;
    }

    const malformedHeading = line.match(/^(#{1,6})(?!#)(?:\s*)$/);

    if (malformedHeading) {
      throw new ModuleParseError(`Malformed heading on line ${lineIndex + 1}.`);
    }

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);

    if (!heading) {
      return;
    }

    const depth = heading[1].length;

    if (depth <= 2) {
      headingTokens.push({
        depth,
        title: heading[2].trim(),
        rawHeading: line.trimEnd(),
        lineIndex,
        lineNumber: lineIndex + 1,
      });
    }
  });

  return headingTokens;
}

function validateHeadingStructure(lines, headingTokens) {
  const firstMeaningfulLine = lines.findIndex((line) => line.trim() !== "");
  const titleTokens = headingTokens.filter((token) => token.depth === 1);
  const firstTitleToken = titleTokens[0];
  const firstHeadingToken = headingTokens[0];

  if (!firstTitleToken) {
    throw new ModuleParseError("Missing # H1 in module source.");
  }

  if (titleTokens.length > 1) {
    throw new ModuleParseError(
      `Multiple # H1 headings are not allowed. Found another on line ${titleTokens[1].lineNumber}.`,
    );
  }

  if (firstHeadingToken.depth === 2 && firstHeadingToken.lineIndex < firstTitleToken.lineIndex) {
    throw new ModuleParseError(
      `Headerless slide before # H1 is not allowed. Found ## on line ${firstHeadingToken.lineNumber}.`,
    );
  }

  if (firstMeaningfulLine !== firstTitleToken.lineIndex) {
    throw new ModuleParseError(
      `Content before # H1 is not allowed. First content appears on line ${firstMeaningfulLine + 1}.`,
    );
  }
}

function readBodyBetween(lines, headingLineIndex, nextHeadingLineIndex) {
  const startIndex = headingLineIndex + 1;
  const endIndex = nextHeadingLineIndex ?? lines.length;

  return trimBlankLines(lines.slice(startIndex, endIndex)).join("\n");
}

function buildSegmentSource(rawHeading, body) {
  if (!body) {
    return rawHeading;
  }

  return `${rawHeading}\n\n${body}`;
}

function trimBlankLines(lines) {
  let startIndex = 0;
  let endIndex = lines.length;

  while (startIndex < endIndex && lines[startIndex].trim() === "") {
    startIndex += 1;
  }

  while (endIndex > startIndex && lines[endIndex - 1].trim() === "") {
    endIndex -= 1;
  }

  return lines.slice(startIndex, endIndex);
}

function normalizeLineEndings(source) {
  return source.replace(/\r\n?/g, "\n");
}
