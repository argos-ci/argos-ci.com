import { Card } from "@/components/Card";
import { CodeBlock } from "@/components/CodeBlock";

const code = `
import { argosScreenshot } from "@argos-ci/storybook/vitest";
  export const FormStory: Story = {
    play: async (ctx) => {
      await argosScreenshot(ctx, "before-fill"); // [!code highlight]
      await userEvent.type(
      
      within(ctx.canvasElement).getByLabelText("Email"),
        "example-email@email.com",
      );

      await argosScreenshot(ctx, "after-fill"); // [!code highlight]
  },
};
`.trim();

export function PlayFunctionScreenshot() {
  return (
    <Card className="max-h-80 overflow-hidden" shadow="high">
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2 text-xs font-semibold">
        <span
          aria-hidden
          className="flex items-center gap-1.5 text-(--neutral-10)"
        >
          <span className="block size-2.5 rounded-full bg-(--danger-8)" />
          <span className="block size-2.5 rounded-full bg-(--amber-8)" />
          <span className="block size-2.5 rounded-full bg-(--success-8)" />
        </span>
        Form.story.tsx
      </div>
      <div className="text-xxs mask-b-from-80% font-mono">
        <CodeBlock
          className="[&_.highlighted]:bg-(--primary-3)/60 [&_pre]:p-2"
          lang="tsx"
          code={code}
        />
      </div>
    </Card>
  );
}
