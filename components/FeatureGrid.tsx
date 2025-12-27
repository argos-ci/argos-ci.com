import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

import { Button } from "./Button";
import { Container } from "./Container";
import { Link } from "./Link";

export function FeatureGrid(props: {
  children: React.ReactNode;
  cols?: 2 | 3;
}) {
  const { children, cols = 2 } = props;
  return (
    <Container
      noGutter
      className={clsx(
        "relative grid grid-cols-1 border-x border-b max-md:divide-y md:divide-x",
        {
          2: "md:grid-cols-2",
          3: "md:grid-cols-3",
        }[cols],
      )}
    >
      {children}
    </Container>
  );
}

export function FeatureGridFeature(props: {
  title: React.ReactNode;
  description: React.ReactNode;
  href: string;
  illustration: React.ReactNode;
}) {
  const { title, description, href, illustration } = props;
  return (
    <div className="relative flex flex-col gap-10 px-4 py-6 sm:px-6 sm:py-14">
      <div
        className="relative flex h-72 items-center justify-center select-none"
        role="presentation"
      >
        {illustration}
      </div>
      <div className="sm:px-4">
        <h3 className="mb-1 font-semibold">{title}</h3>
        <p className="text-low font-[450]">{description}</p>
        <Button className="mt-4" variant="outline" asChild>
          <Link href={href}>Learn more</Link>
        </Button>
      </div>
    </div>
  );
}

export function FeatureGridFeatureSmall(props: {
  title: React.ReactNode;
  description: React.ReactNode;
  href: string;
  icon: LucideIcon;
}) {
  const { title, description, href, icon: Icon } = props;
  return (
    <div className="flex flex-col items-start gap-2 p-8 text-left text-sm lg:px-9 lg:py-10">
      <Icon className="size-4 text-(--primary-10)" />
      <div>
        <h3 className="mb-1 font-semibold">{title}</h3>
        <p className="text-low font-[450]">{description}</p>
        <Button className="mt-4" variant="outline" asChild>
          <Link href={href}>Learn more</Link>
        </Button>
      </div>
    </div>
  );
}
