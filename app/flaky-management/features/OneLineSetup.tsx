import { Card } from "@/components/Card";
import { CodeBlock } from "@/components/CodeBlock";

const code = `
export default {
  // ... other configurations
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    "@argos-ci/playwright/reporter" // [!code highlight]
  ],
}
`.trim();

export function OneLineSetupIllustration() {
  return (
    <Card className="relative w-full max-w-lg overflow-hidden">
      <div className="text-xxs flex items-center gap-2 border-b-[0.5px] bg-(--neutral-1) px-3 py-2 font-mono font-medium text-(--neutral-11)">
        playwright.config.ts
      </div>
      <div className="text-xxs font-mono">
        <CodeBlock
          className="[&_.highlighted]:bg-(--primary-3)/60 [&_pre]:p-3"
          lang="ts"
          code={code}
        />
      </div>
    </Card>
  );
}
