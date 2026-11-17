import { Metadata } from "next";

import { StaticPage } from "@/components/StaticPage";
import { getMetadata } from "@/lib/metadata";

import TermsMdxPage from "../markdown/terms.mdx";

export const metadata: Metadata = getMetadata({
  title: "Terms of service",
  subtitle: "The terms that govern your use of Argos.",
  description:
    "Read our terms of service: Explore our policies on data protection, user rights, and secure information handling.",
  pathname: "/terms",
});

export default function Page() {
  return (
    <StaticPage>
      <TermsMdxPage />
    </StaticPage>
  );
}
