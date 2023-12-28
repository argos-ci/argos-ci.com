import { Metadata } from "next";

import { StaticPage } from "@/components/StaticPage";
import { getMetadata } from "@/lib/metadata";

import TermsMd from "./terms.mdx";

export const metadata: Metadata = getMetadata({
  title: "Terms of service",
  description:
    "Read our terms of service: Explore our policies on data protection, user rights, and secure information handling.",
  pathname: "/terms",
});

export default function Page() {
  return (
    <StaticPage>
      <TermsMd />
    </StaticPage>
  );
}
