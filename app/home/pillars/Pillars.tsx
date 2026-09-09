import { ArrowUpRightIcon } from "lucide-react";

import { Container } from "@/components/Container";

import { PillarFlow } from "./PillarFlow";

/**
 * The table of contents for the homepage: the four pillars as four cards in
 * the order a pull request goes through them. It sits under the customer
 * logos rather than in the hero, so the hero can show the product itself.
 */
export function Pillars() {
  return (
    <section className="separator-b relative px-4">
      <Container className="border-x">
        <div className="flex flex-col items-center gap-6 px-4 py-12 md:px-8 md:py-16">
          <p className="text-xs font-medium tracking-wide text-low uppercase">
            Four steps for every pull request
          </p>
          <PillarFlow />
          <a
            href="https://app.argos-ci.com/argos-ci/snkr-shop/builds/11"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-sm font-medium text-low transition hover:text-default"
          >
            See it on a real pull request
            <ArrowUpRightIcon className="size-4 transition group-hover:translate-x-px group-hover:-translate-y-px" />
          </a>
        </div>
      </Container>
    </section>
  );
}
