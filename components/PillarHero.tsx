import Link from "next/link";

import { trackDemoClick, trackSignupClick } from "@/app/google-ads";

import { Button } from "./Button";
import { Container } from "./Container";
import type { FeatureColor } from "./feature-section/colors";
import { FeatureIndicator } from "./feature-section/FeatureSection";
import { FullPageGrid } from "./FullPageGrid";
import { Hero, HeroActions, HeroDescription, HeroHeading } from "./Hero";

/**
 * The hero every pillar page opens with: the page's colour as a tint on the
 * grid, the pillar name in a pill, the promise, and the two calls to action.
 * Shared so the four pillars (and the agents hub) stay in lockstep.
 */
export function PillarHero(props: {
  color: FeatureColor;
  label: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}) {
  const { color, label, title, description } = props;
  return (
    <div className="overflow-hidden border-b px-4">
      <Container className="relative py-16 md:min-h-120 md:py-24">
        <FullPageGrid height="h-200 md:h-120" tint={color} />
        <Hero align="center" className="relative">
          <div className="rounded-full border px-3 py-1.5">
            <FeatureIndicator color={color}>{label}</FeatureIndicator>
          </div>
          <HeroHeading>{title}</HeroHeading>
          <HeroDescription>{description}</HeroDescription>
          <HeroActions>
            <Button size="large" asChild>
              <Link
                href="https://app.argos-ci.com/signup"
                onClick={trackSignupClick}
              >
                Start for free
              </Link>
            </Button>
            <Button size="large" variant="outline" asChild>
              <Link href="https://cal.com/gregberge" onClick={trackDemoClick}>
                Get a demo
              </Link>
            </Button>
          </HeroActions>
        </Hero>
      </Container>
    </div>
  );
}
