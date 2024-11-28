import { Metadata } from "next";
import * as React from "react";

import { ArgosEmblem } from "@/components/ArgosEmblem";
import { CallToActionSection } from "@/components/CallToActionSection";
import { RedirectIfCookie } from "@/components/RedirectIfCookie";
import { defaultDescription, defaultTitle, getMetadata } from "@/lib/metadata";

import { Customers } from "./home/Customers";
import { DemoVideo } from "./home/demo-video/demoVideo";
import { DeveloperExperience } from "./home/developer-experience/DeveloperExperience";
import { FeaturedSDKs } from "./home/featured-sdk/FeaturedSDKs";
import { Features } from "./home/features/Features";
import { Hero } from "./home/hero/Hero";
import { TestDebugging } from "./home/test-debugging/TestDebugging";
import { Users } from "./home/users/Users";
import { VisualTesting } from "./home/visual-testing/VisualTesting";
import { Why } from "./home/why/Why";

export const metadata: Metadata = getMetadata({
  absoluteTitle: defaultTitle,
  description: defaultDescription,
  pathname: "/",
});

export default function Page() {
  return (
    <div style={{ textWrap: "balance" } as any}>
      <RedirectIfCookie />
      <Hero />
      <Customers />
      <DemoVideo />
      <Users />
      <Why />
      <VisualTesting />
      <DeveloperExperience />
      <TestDebugging />
      <Features />
      <FeaturedSDKs />
      <CallToActionSection
        supercharge="your visual testing experience"
        description="Discover why Argos is the preferred visual testing tool of developers."
      >
        <ArgosEmblem className="mx-auto aspect-square size-24" />
      </CallToActionSection>
    </div>
  );
}
