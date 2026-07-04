import { GlobeIcon, RocketIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";
import { SectionDescription, SectionTitle } from "@/components/Typography";

import { DeployPreview } from "./DeployPreview";

const POINTS = [
  {
    icon: RocketIcon,
    title: "A live preview on every PR",
    text: "Run argos deploy ./storybook-static and get a unique, shareable URL for each pull request, with no extra infra to maintain.",
  },
  {
    icon: GlobeIcon,
    title: "Preview and production, built in",
    text: "PRs ship to immutable preview URLs; merges promote to a stable production domain, all reported in the PR comment.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Access protection",
    text: "Keep previews private to your team while leaving production public, or lock everything behind Argos login.",
  },
];

export function Deployments() {
  return (
    <section className="separator-b relative px-4">
      <Container noGutter className="border-x">
        <SectionHeader className="container-gutter">
          <SectionHeaderTexts>
            <FeatureIndicator color="teal">Deployments</FeatureIndicator>
            <SectionTitle>Deploy Storybook on every PR</SectionTitle>
            <SectionDescription className="max-w-2xl">
              Turn Argos into a host for your static builds. Storybook, Vite,
              Next.js exports, or plain HTML, deployed to a live URL and wired
              straight into your pull request.
            </SectionDescription>
          </SectionHeaderTexts>
          <Button variant="outline" asChild>
            <Link href="/deployments">Explore Deployments</Link>
          </Button>
        </SectionHeader>
        <div className="grid border-t md:grid-cols-2">
          <div className="relative flex cursor-default items-center justify-center border-b p-6 md:border-r md:border-b-0 md:p-10">
            <DeployPreview />
          </div>
          <ul className="flex flex-col divide-y">
            {POINTS.map((point) => (
              <li key={point.title} className="flex gap-4 p-6 md:p-8">
                <point.icon
                  className="mt-0.5 size-5 shrink-0 text-(--teal-11)"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="font-accent font-medium">{point.title}</h3>
                  <p className="text-low text-sm">{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
