import { Metadata } from "next";

import { getMetadata } from "@/lib/metadata";

import { Faq } from "./faq/Faq";
import { GetStarted } from "./get-started/GetStarted";
import { Hero } from "./hero/Hero";
import { TestDebugging } from "./test-debugging/TestDebugging";
import { Video } from "./video/Video";
import { VisualTesting } from "./visual-testing/VisualTesting";

export const metadata: Metadata = getMetadata({
  absoluteTitle: "Supercharge your Playwright Tests with Argos",
  description:
    "Elevate testing: One-click CI debugging and enhanced visual testing with Argos for streamlined, efficient Playwright workflows.",
  pathname: "/playwright",
});

export default function Page() {
  return (
    <div style={{ textWrap: "balance" } as any}>
      <Hero />
      <Video />
      <TestDebugging />
      <VisualTesting />
      <GetStarted />
      <Faq />
    </div>
  );
}
