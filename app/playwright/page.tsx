import { GetServerSideProps, Metadata } from "next";

import { highlight } from "@/lib/shiki";

import { GetStarted } from "./get-started/GetStarted";
import { Hero } from "./hero/Hero";
import { TestDebugging } from "./test-debugging/TestDebugging";
import { VisualTesting } from "./visual-testing/VisualTesting";

export const metadata: Metadata = {
  title: "Supercharge your Playwright Tests with Argos",
};

export default function Page() {
  return (
    <div style={{ textWrap: "balance" } as any}>
      <Hero />
      <TestDebugging />
      <VisualTesting />
      <GetStarted />
    </div>
  );
}
