import { Badge } from "@/components/Badge";
import { Terminal } from "@/components/Terminal";

/**
 * The command and what it prints, in the CLI's real output format — name,
 * facts line, URL, Markdown. The Markdown line carries a tint because it is
 * the point of the exercise: the one line you paste somewhere.
 */
export function MediaUploadTerminal() {
  return (
    <Terminal
      title="Terminal · @argos-ci/cli"
      right={<Badge className="font-mono text-xxs">exit 0</Badge>}
      className="w-full"
    >
      <div className="space-y-1 font-mono text-xxs leading-relaxed">
        <div className="flex gap-1.5">
          <span aria-hidden className="shrink-0 text-(--plum-11)">
            $
          </span>
          <span>argos media upload after.png</span>
        </div>
        <div className="pt-1 text-default">after.png</div>
        <Field>image/webp · 25 KB · 1440x900 · team · ready</Field>
        <Field>
          URL:{" "}
          <span className="text-(--plum-11)">
            https://app.argos-ci.com/m/kQ8vN2pXr4tY…
          </span>
        </Field>
        <div className="-mx-1.5 rounded bg-(--plum-2) px-1.5 py-1 dark:bg-(--plum-3)">
          <Field>
            <span className="text-(--plum-12)">
              Markdown: ![after.png](https://app.argos-ci.com/m/kQ8vN2pXr4tY…)
            </span>
          </Field>
        </div>
        <div className="pt-1 text-low italic">
          252 KB PNG compressed to a 25 KB WebP before upload
        </div>
      </div>
    </Terminal>
  );
}

function Field(props: { children: React.ReactNode }) {
  return <div className="truncate pl-3 text-low">{props.children}</div>;
}
