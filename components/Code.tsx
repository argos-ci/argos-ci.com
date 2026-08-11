import clsx from "clsx";
import type { ComponentPropsWithRef } from "react";

/**
 * Inline code inside a sentence. The mono face alone doesn't say where a
 * snippet starts and stops, so it carries a faint tint and a hairline: enough
 * to read as one object, not enough to pull the eye off the line.
 *
 * Everything is sized in `em` so it fits whatever type it sits in, and the
 * `content-none` pair drops the backticks the typography plugin adds inside
 * `prose`.
 */
export function Code(props: ComponentPropsWithRef<"code">) {
  return (
    <code
      {...props}
      className={clsx(
        "rounded-[0.35em] border-[0.5px] border-(--neutral-a4) bg-(--neutral-a3) px-[0.35em] py-[0.1em] font-mono text-[0.9em] font-normal break-words box-decoration-clone before:content-none after:content-none",
        props.className,
      )}
    />
  );
}
