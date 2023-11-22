import { GetServerSideProps, Metadata } from "next";

import { highlight } from "@/lib/shiki";

import { Faq } from "./faq/Faq";
import { GetStarted } from "./get-started/GetStarted";
import { Hero } from "./hero/Hero";
import { TestDebugging } from "./test-debugging/TestDebugging";
import { Video } from "./video/Video";
import { VisualTesting } from "./visual-testing/VisualTesting";

export const metadata: Metadata = {
  title: "Supercharge your Playwright Tests with Argos",
};

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
