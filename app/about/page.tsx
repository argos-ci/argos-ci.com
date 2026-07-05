import { Metadata } from "next";

import { CallToActionSection } from "@/components/CallToActionSection";
import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroDescription, HeroHeading } from "@/components/Hero";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { ThemeImage } from "@/components/ThemeImage";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { XIcon } from "@/components/icons/XIcon";
import { getMetadata } from "@/lib/metadata";

import { gregEmployee, jeremyEmployee } from "../assets/people/library";
import { app } from "../assets/product/library";
import { TrustedBy } from "../common/TrustedBy";

export const metadata: Metadata = getMetadata({
  title: "About",
  absoluteTitle: "About Argos | Our Mission and Approach to Product Quality",
  description:
    "Discover the story behind Argos, our mission, and how we help engineering teams keep product quality high, and merge with confidence, in the age of AI agents.",
  pathname: "/about",
});

const people = [gregEmployee, jeremyEmployee];

export default function AboutPage() {
  return (
    <>
      <section className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-90 md:py-24">
          <FullPageGrid height="h-200 md:h-90" />
          <Hero align="center" className="relative">
            <HeroHeading>
              Keep product quality high while shipping faster
            </HeroHeading>
            <HeroDescription>
              Argos shows your team and your agents exactly what a pull request
              changes, from pixels to Markdown and JSON, so you can review with
              confidence and merge faster.
            </HeroDescription>
          </Hero>
        </Container>
      </section>
      <TrustedBy />
      <section className="border-b px-4">
        <Container className="border-x py-14 text-center md:py-16">
          <SectionTitle className="mb-8">What is Argos?</SectionTitle>
          <p className="my-4 text-xl font-medium text-balance">
            Argos is the platform that keeps product quality high in the age of
            AI agents. It shows your team and your agents exactly what every
            change does, so you can merge with confidence.
          </p>
          <ThemeImage
            src={app}
            alt=""
            aria-hidden
            className="relative mx-auto mt-10 w-[90%] max-w-200 -rotate-5 skew-3 rounded border shadow-lg transform-3d md:mt-20 md:rounded-lg"
          />
        </Container>
      </section>
      <section className="border-b px-4">
        <Container className="flex flex-col border-x py-12 md:flex-row md:gap-8 md:py-16">
          <SectionTitle className="md:mt-4">
            We’re crafting the tool to make your product better
          </SectionTitle>
          <div>
            <p className="my-4">
              We believe teams and agents should see exactly what changes before
              they merge, not guess. As agents ship faster than anyone can review
              by eye, that visibility is what keeps quality high.
            </p>
            <p className="my-4">
              Argos detects changes deterministically and explains them
              precisely, whether it is a pixel in a screenshot or a line in a
              Markdown or JSON file. No probabilities. No heuristics. No guessing
              whether a change matters.
            </p>
            <p className="my-4">
              Instead of hiding flakiness behind tolerance thresholds or AI
              guesses, we focus on eliminating it at the source. Stable
              baselines. Clear signals. Reviews your team and your agents can
              make with confidence.
            </p>
            <p className="my-4">
              We build tools that keep maintenance low and CI healthy over time.
              <br />
              No silent failures. No mystery diffs. Just a clear picture of every
              change, that teams rely on every day.
            </p>
            <p className="my-4">
              Flakiness is not noise to ignore. It is technical debt to fix.
            </p>
          </div>
        </Container>
      </section>
      <section className="px-4">
        <Container className="border-x pb-16">
          <SectionHeader align="center" className="max-w-2xl">
            <SectionHeaderTexts>
              <SectionTitle>
                Built for teams that care about quality
              </SectionTitle>
              <SectionDescription>
                Argos is built by a small team of engineers who ship fast and
                still care deeply about correctness.
              </SectionDescription>
            </SectionHeaderTexts>
          </SectionHeader>
          <div className="mx-auto flex max-w-100 flex-col items-center justify-between gap-12 whitespace-nowrap sm:flex-row">
            {people.map((person) => (
              <div
                key={person.name}
                className="flex flex-col max-sm:items-center"
              >
                <ThemeImage
                  src={person.avatar}
                  alt={`Photo of ${person.name}`}
                  className="mb-4 size-28 rounded-lg"
                />
                <div>{person.name}</div>
                <div className="text-low text-sm">{person.title}</div>
                <div className="mt-2 flex gap-4">
                  <a
                    href={person.github}
                    className="text-low hover:text-default transition"
                  >
                    <GitHubIcon className="size-4" />
                  </a>
                  <a
                    href={person.x}
                    className="text-low hover:text-default transition"
                  >
                    <XIcon className="size-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CallToActionSection />
    </>
  );
}
