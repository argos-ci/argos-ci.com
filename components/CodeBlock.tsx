import clsx from "clsx";

import { type BundledLanguage, highlight } from "@/lib/shiki";

export async function CodeBlock(props: {
  code: string;
  lang: BundledLanguage;
  className?: string;
}) {
  const { code, lang, className } = props;
  const html = await highlight(code, lang);
  return (
    <div
      className={clsx(
        "[&_.highlighted]:inline-block [&_.highlighted]:w-full",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
