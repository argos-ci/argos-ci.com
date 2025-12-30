import clsx from "clsx";

import type { FeatureColor } from "@/components/feature-section/colors";

import { Grid } from "./Grid";

export function FullPageGrid(props: {
  height: string;
  radial?: boolean;
  tint?: FeatureColor;
}) {
  return (
    <div>
      <div
        className={clsx(
          "pointer-events-none absolute inset-0 -mt-4 border-x",
          props.radial
            ? "mask-[linear-gradient(transparent,black_40%)]"
            : "mask-[linear-gradient(transparent,black)]",
        )}
      />
      {props.tint ? (
        <div
          className={clsx(
            "pointer-events-none absolute inset-x-px inset-y-0 -mt-4",
            {
              blue: "bg-linear-to-t from-(--blue-3)/20",
              amber: "bg-linear-to-t from-(--amber-3)/20",
              teal: "bg-linear-to-t from-(--teal-3)/20",
            }[props.tint],
          )}
        />
      ) : null}
      <div
        className={clsx(
          "pointer-events-none absolute top-0 left-1/2 w-450 -translate-x-1/2 mask-intersect text-(--neutral-5)",
          props.radial
            ? "mask-[linear-gradient(transparent,black,transparent)]"
            : "mask-[linear-gradient(transparent,black)] opacity-60",
          props.height,
        )}
      >
        <div className="absolute inset-x-90 inset-y-0">
          <Grid className="pointer-events-none absolute inset-[unset] top-0 right-full w-90 mask-[linear-gradient(90deg,transparent,black)]" />
          <Grid
            x={-1}
            className="pointer-events-none absolute inset-[unset] top-0 left-full w-90 mask-[linear-gradient(270deg,transparent,black)]"
          />
        </div>
      </div>
      <div
        className={clsx(
          "pointer-events-none absolute inset-x-px top-0 overflow-hidden mask-intersect text-(--neutral-5)",
          props.radial
            ? "mask-[linear-gradient(transparent,black,transparent),radial-gradient(80%_50%_at_50%_55%,rgba(0,0,0,0.2),black)]"
            : "mask-[linear-gradient(transparent,black)] opacity-60",
          props.height,
        )}
      >
        <Grid className="w-max-content pointer-events-none absolute inset-[unset] inset-y-0 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
}
