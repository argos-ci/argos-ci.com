import clsx from "clsx";
import { ChevronRightIcon, LucideIcon } from "lucide-react";

import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";

export function Feature({
  surtitle,
  title,
  details,
  illustration,
  reverse,
}: {
  surtitle: React.ReactNode;
  title: React.ReactNode;
  details: React.ReactNode;
  illustration: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <Container
      className={clsx(
        "flex flex-col-reverse gap-8 py-16 md:gap-12 md:py-32",
        reverse ? "md:flex-row-reverse" : "md:flex-row",
      )}
      asChild
    >
      <section>
        <div className="flex-1">
          <div className="text-primary mb-4 text-lg font-medium text-violet-11">
            {surtitle}
          </div>
          <H2 className="mb-6">{title}</H2>
          <div className="flex flex-col gap-6">{details}</div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="relative flex items-center justify-center p-6 md:pt-14">
            {illustration}
          </div>
        </div>
      </section>
    </Container>
  );
}

export function FeatureDetail({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-1 flex items-center gap-2 text-lg font-medium">
        <Icon className="h-5 w-5" /> {title}
      </h3>
      <p className="text-low">{text}</p>
    </div>
  );
}

export function MoreLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      className="group inline-flex items-center gap-1 text-lg font-medium text-violet-10 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {children}
      <ChevronRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
    </a>
  );
}
