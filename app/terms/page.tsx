import { Metadata } from "next";

import { StaticPage } from "@/components/StaticPage";

import TermsMd from "./terms.mdx";

export const metadata: Metadata = {
  title: "Terms",
};

export default function Page() {
  return (
    <StaticPage>
      <TermsMd />
    </StaticPage>
  );
}
