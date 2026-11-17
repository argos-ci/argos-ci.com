import { Metadata } from "next";

import { StaticPage } from "@/components/StaticPage";
import { getMetadata } from "@/lib/metadata";

import PrivacyMd from "../markdown/privacy.mdx";

export const metadata: Metadata = getMetadata({
  title: "Privacy policy",
  subtitle: "How Argos collects, uses, and protects your data.",
  description:
    "Explore our commitment to privacy: Read our policy on data protection, user rights, and secure information handling.",
  pathname: "/privacy",
});

export default function Page() {
  return (
    <StaticPage>
      <PrivacyMd />
    </StaticPage>
  );
}
