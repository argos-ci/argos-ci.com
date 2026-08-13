import { Metadata } from "next";

import { StaticPage } from "@/components/StaticPage";
import { getMetadata } from "@/lib/metadata";

import DpaMdxPage from "../markdown/dpa.mdx";

export const metadata: Metadata = getMetadata({
  title: "Data Processing Agreement",
  description:
    "The Argos Data Processing Agreement: how we process personal data on your behalf, our subprocessors, security measures, international transfers, and audit rights.",
  pathname: "/dpa",
});

export default function Page() {
  return (
    <StaticPage>
      <DpaMdxPage />
    </StaticPage>
  );
}
