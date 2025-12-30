import { transformerNotationHighlight } from "@shikijs/transformers";
import { BundledLanguage, codeToHtml } from "shiki";

export type { BundledLanguage };

export async function highlight(code: string, lang: BundledLanguage) {
  return codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    transformers: [transformerNotationHighlight()],
  });
}
