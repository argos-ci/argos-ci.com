import { FileCode2Icon } from "lucide-react";

import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { CodeBlock } from "@/components/CodeBlock";
import { SmallTitle } from "@/components/Typography";

/**
 * The three steps from docs/learn/deployments/use-deployments-in-ci: build the
 * Storybook, run the visual tests, deploy it. The bottom fades so the card
 * reads as an excerpt of the job, not the whole workflow file.
 */
const WORKFLOW = `steps:
  - uses: actions/checkout@v6
  - uses: actions/setup-node@v6
  - run: npm ci
  - run: npm run build-storybook
  - run: npm run test:visual
    env:
      ARGOS_TOKEN: \${{ secrets.ARGOS_TOKEN }}
  - run: npx --no-install argos deploy ./storybook-static
    env:
      ARGOS_TOKEN: \${{ secrets.ARGOS_TOKEN }}`;

export function DeployWorkflow() {
  return (
    <Card
      shadow="high"
      className="w-full max-w-md animate-slide-up-fade overflow-hidden animate-duration-500 fill-mode-both motion-reduce:animate-fade-in"
    >
      <div className="flex items-center gap-2 border-b-[0.5px] px-4 py-2.5">
        <FileCode2Icon className="size-4 shrink-0 text-(--teal-11)" />
        <SmallTitle className="min-w-0">
          <span className="truncate font-mono text-xxs">
            .github/workflows/argos.yml
          </span>
        </SmallTitle>
        <Badge className="ml-auto shrink-0">GitHub Actions</Badge>
      </div>
      <div className="mask-r-from-90% mask-b-from-80% text-xxs [&_pre]:overflow-hidden [&_pre]:p-4 [&_pre]:leading-normal">
        <CodeBlock code={WORKFLOW} lang="yaml" />
      </div>
    </Card>
  );
}
