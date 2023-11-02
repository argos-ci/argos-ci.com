import { Metadata } from "next";

import { StaticPage } from "@/components/StaticPage";

import PrivacyMd from "./privacy.mdx";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function Page() {
  return (
    <StaticPage>
      <PrivacyMd />
    </StaticPage>
  );
}
