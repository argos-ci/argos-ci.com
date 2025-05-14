import clsx from "clsx";

import { Container } from "@/components/Container";

export const StaticPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={clsx(
        "prose dark:prose-invert mx-auto mt-14 mb-24 max-w-none",
        "prose-h1:font-accent prose-h1:text-5xl prose-h1:md:text-6xl prose-h1:text-center prose-h1:text-balance",
        "prose-lead:text-low prose-lead:mx-auto prose-lead:max-w-2xl prose-lead:text-lg prose-lead:text-center prose-lead:text-balance prose-lead:-mt-8",
        "prose-h2:mt-12 prose-h2:mb-3 prose-h2:scroll-mt-20 prose-h2:text-2xl prose-h2:font-semibold",
        "prose-a:hover:text-low prose-a:font-medium prose-a:underline",
      )}
      style={{ contain: "none" }}
    >
      <Container>{children}</Container>
    </div>
  );
};
