import type { Highlighter, Lang, Theme } from "shiki";
import { getHighlighter, renderToHtml } from "shiki";

let highlighters: Record<string, Highlighter> = {};
export async function highlight(code: string, theme: Theme, lang: Lang) {
  if (!highlighters[theme]) {
    highlighters[theme] = await getHighlighter({
      langs: ["typescript", "shell"],
      theme: theme,
    });
  }

  const tokens = highlighters[theme].codeToThemedTokens(code, lang, theme, {
    includeExplanation: false,
  });
  const html = renderToHtml(tokens, { bg: "transparent" });

  return html;
}
