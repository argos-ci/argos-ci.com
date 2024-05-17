import clsx from "clsx";
import { TerminalIcon } from "lucide-react";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";
import { Link } from "@/components/Link";
import { TypeScriptLogo } from "@/components/TypeScriptLogo";
import { BundledLanguage, highlight } from "@/lib/shiki";

async function CodeBlock({
  code,
  lang,
  title,
}: {
  code: string;
  lang: BundledLanguage;
  title: React.ReactNode;
}) {
  const html = await highlight(code, lang);
  return (
    <div className="overflow-hidden rounded border bg-violet-1">
      <div className="flex items-center gap-2 overflow-auto border-b bg-ui p-2 text-xs font-medium">
        {title}
      </div>
      <div className="overflow-auto p-4 font-mono text-sm">
        <div
          className="inline-block"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

function Section({
  children,
  num,
  last,
}: {
  children: React.ReactNode;
  num: number;
  last?: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex shrink-0 flex-col items-center">
        <div className="box-border flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-mauve-1 bg-mauve-4 text-lg tabular-nums">
          {num}
        </div>
        <div
          className={clsx(
            "h-full w-px",
            last
              ? "bg-gradient-to-b from-mauve-4 to-transparent"
              : "bg-mauve-4",
          )}
        />
      </div>
      <div className={clsx("min-w-0 flex-1", last ? "mb-20" : "mb-10")}>
        {children}
      </div>
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return <div className="mb-4 mt-1.5 text-lg font-medium">{children}</div>;
}

export async function GetStarted() {
  return (
    <Container className="py-16 md:py-20" asChild>
      <section>
        <H2 className="mb-12 text-center">Get started fast.</H2>
        <div className="mx-auto max-w-2xl">
          <Section num={1}>
            <Title>Install package</Title>
            <CodeBlock
              title={
                <>
                  <TerminalIcon className="h-3 w-3" />
                  Terminal
                </>
              }
              code={`npm install --save-dev @argos-ci/playwright`}
              lang="shell"
            />
          </Section>
          <Section num={2}>
            <Title>Setup Argos in your Playwright config</Title>
            <CodeBlock
              title={
                <>
                  <TypeScriptLogo className="h-3 w-3" />
                  playwright.config.ts
                </>
              }
              code={`
import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: [
    // Use "dot" reporter on CI, "list" otherwise (Playwright default).
    process.env.CI ? ["dot"] : ["list"],
    // Add Argos reporter. Upload on CI only.
    ["@argos-ci/playwright/reporter", { uploadToArgos: !!process.env.CI }],
  ],

  // Setup test debugging on CI.
  use: {
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
  },
});
          `.trim()}
              lang="typescript"
            />
            <div className="mt-4">
              Checkout{" "}
              <Link href="https://argos-ci.com/docs/quickstart/playwright">
                our quickstart guide
              </Link>{" "}
              for more information.
            </div>
          </Section>
          <Section num={3} last>
            <Title>Signup to Argos and import your project</Title>
            <Button size="large" variant="primary" asChild>
              <a target="_blank" href="https://app.argos-ci.com/signup">
                Import my project in Argos
              </a>
            </Button>
          </Section>
        </div>
      </section>
    </Container>
  );
}
