import clsx from "clsx";

export type StatsBlockStat = {
  value: React.ReactNode;
  label: React.ReactNode;
};

export type StatsBlockProps = {
  title: React.ReactNode;
  stats: StatsBlockStat[];
  className?: string;
};

/*
Example usage:

<StatsBlock
  title="Visual testing at real production scale"
  stats={[
    { value: "10M+", label: "screenshots processed" },
    { value: "30k+", label: "CI builds validated" },
    { value: "~300", label: "screenshots per build" },
    { value: "12+ months", label: "continuous usage" },
  ]}
/>
*/
export function StatsBlock({ title, stats, className }: StatsBlockProps) {
  return (
    <section className={clsx("not-prose my-10", className)}>
      <div className="relative overflow-hidden rounded-xl border bg-linear-to-b from-(--neutral-1) via-(--neutral-1) to-(--neutral-2) p-6 md:p-10">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--neutral-6) to-transparent" />
        <div className="flex flex-col gap-8">
          <h3 className="font-accent text-xl font-semibold text-balance md:text-2xl">
            {title}
          </h3>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={`${stat.value}-${index}`}
                className="bg-app rounded-lg border px-4 py-5 shadow-xs"
              >
                <dt className="text-low text-xs font-medium tracking-wide uppercase">
                  {stat.label}
                </dt>
                <dd className="font-accent mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
