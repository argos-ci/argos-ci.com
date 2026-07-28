import { Metadata } from "next";

import { CallToActionSection } from "@/components/CallToActionSection";
import { RedirectIfCookie } from "@/components/RedirectIfCookie";
import { defaultDescription, defaultTitle, getMetadata } from "@/lib/metadata";

import { TrustedBy } from "./common/TrustedBy";
import { AgentReady } from "./home/agent-ready/AgentReady";
import { CISignal } from "./home/ci-signal/CISignal";
import { CollaborativeReviews } from "./home/collaborative-reviews/CollaborativeReviews";
import { Cost } from "./home/cost/Cost";
import { Customers } from "./home/customers/Customers";
import { Hero } from "./home/hero/Hero";
import { Stack } from "./home/stack/Stack";
import { VisualTesting } from "./home/visual-testing/VisualTesting";

export const metadata: Metadata = getMetadata({
  title: "Argos",
  subtitle: "Product quality for the age of AI agents",
  absoluteTitle: defaultTitle,
  description: defaultDescription,
  pathname: "/",
});

export default function Page() {
  return (
    <>
      <RedirectIfCookie />
      {/* What Argos is */}
      <Hero />
      <TrustedBy />
      <VisualTesting />
      {/* Why it's better */}
      <CollaborativeReviews />
      <AgentReady />
      {/* Why switch */}
      <Cost />
      {/* Objections */}
      <CISignal />
      <Stack />
      {/* Proof and conversion */}
      <Customers />
      <CallToActionSection />
    </>
  );
}
