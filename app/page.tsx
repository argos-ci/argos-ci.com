import { Metadata } from "next";
import * as React from "react";

import { RedirectIfCookie } from "@/components/RedirectIfCookie";
import { getMetadata } from "@/lib/metadata";

import { Customers } from "./home/Customers";
import { DemoVideo } from "./home/demo-video/demoVideo";
import { DeveloperExperience } from "./home/developer-experience/DeveloperExperience";
import { Features } from "./home/features/Features";
import { Hero } from "./home/hero/Hero";
import { Integrations } from "./home/integrations/Integrations";
import { Playwright } from "./home/playwright/Playwright";
import { TestDebugging } from "./home/test-debugging/TestDebugging";
import { Users } from "./home/users/Users";
import { VisualTesting } from "./home/visual-testing/VisualTesting";
import { Why } from "./home/why/Why";

export const metadata: Metadata = getMetadata({
  absoluteTitle: "Argos — Visual Testing for developers",
  description:
    "Argos provides the developer tools to debug tests and detect visual regressions.",
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
      <Playwright />
      <Integrations />
    </div>
  );
}
