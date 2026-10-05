import { Code } from "@/components/Code";
import type { FAQQuestion } from "@/components/FAQAccordion";
import { Link } from "@/components/Link";

/**
 * Integration copy is plain text with two bits of inline markdown, `code`
 * and [links](/path), so the same string feeds the page and its markdown
 * twin. This renders those two; anything else stays text.
 */
const TOKEN = /(`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

export function InlineMarkdown(props: {
  children: string;
  /** Extra classes for inline code, e.g. to keep it on one line. */
  codeClassName?: string;
}) {
  return props.children.split(TOKEN).map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <Code key={index} className={props.codeClassName}>
          {part.slice(1, -1)}
        </Code>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      return (
        <Link key={index} href={link[2]}>
          {link[1]}
        </Link>
      );
    }
    return part;
  });
}

/**
 * The FAQ format the page and the FAQPage JSON-LD expect, from one text
 * answer (paragraphs separated by blank lines). The JSON-LD and the markdown
 * twin get links as `<a>` tags, which is how the other FAQs store them.
 */
export function faq(name: string, text: string): FAQQuestion {
  const paragraphs = text.split(/\n\n+/);
  return {
    name,
    answer: (
      <>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>
            <InlineMarkdown>{paragraph}</InlineMarkdown>
          </p>
        ))}
      </>
    ),
    textAnswer: paragraphs
      .join(" ")
      .replace(/`([^`]+)`/g, "$1")
      .replace(
        /\[([^\]]+)\]\(([^)\s]+)\)/g,
        (_, label: string, href: string) =>
          `<a href="${href.startsWith("/") ? `https://argos-ci.com${href}` : href}">${label}</a>`,
      ),
  };
}
