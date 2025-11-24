import { Metadata } from "next";

import { RedirectIfCookie } from "@/components/RedirectIfCookie";
import { defaultDescription, defaultTitle, getMetadata } from "@/lib/metadata";

import { Hero } from "./home/hero/Hero";
import { TrustedBy } from "./home/trusted-by/TrustedBy";
import { VisualTesting } from "./home/visual-testing/VisualTesting";

export const metadata: Metadata = getMetadata({
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
    </>
  );
}
