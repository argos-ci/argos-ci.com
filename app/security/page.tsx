import { Metadata } from "next";

import { StaticPage } from "@/components/StaticPage";
import { getMetadata } from "@/lib/metadata";

import SecurityMd from "./security.mdx";

export const metadata: Metadata = getMetadata({
  title: "Security",
  description:
    "Discover our rigorous security measures: Learn about our comprehensive strategies for protecting data and ensuring system integrity.",
  pathname: "/security",
});

export default function Page() {
  return (
    <StaticPage>
      <SecurityMd />
    </StaticPage>
  );
}
