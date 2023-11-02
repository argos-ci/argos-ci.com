import { Metadata } from "next";

import { StaticPage } from "@/components/StaticPage";

import SecurityMd from "./security.mdx";

export const metadata: Metadata = {
  title: "Security",
};

export default function Page() {
  return (
    <StaticPage>
      <SecurityMd />
    </StaticPage>
  );
}
