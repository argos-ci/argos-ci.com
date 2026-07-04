import { Metadata } from "next";

import { CallToActionSection } from "@/components/CallToActionSection";
import { RedirectIfCookie } from "@/components/RedirectIfCookie";
import { FeaturedSDKsSection } from "@/components/featured-sdk/FeaturedSDKs";
import { defaultDescription, defaultTitle, getMetadata } from "@/lib/metadata";

import { TrustedBy } from "./common/TrustedBy";
import { AgentReady } from "./home/agent-ready/AgentReady";
import { Cost } from "./home/cost/Cost";
import { Customers } from "./home/customers/Customers";
import { Deployments } from "./home/deployments/Deployments";
import { FlakyManagement } from "./home/flaky-management/FlakyManagement";
import { Hero } from "./home/hero/Hero";
import { Integrations } from "./home/integrations/Integrations";
import { TestDebugging } from "./home/test-debugging/TestDebugging";
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
      <Hero />
      <TrustedBy />
      <VisualTesting />
      <AgentReady />
      <Deployments />
      <Integrations />
      <FlakyManagement />
      <TestDebugging />
      <Cost />
      <FeaturedSDKsSection />
      <Customers />
      <CallToActionSection />
    </>
  );
}
