import { StaticPage } from "@/components/StaticPage";
import TermsMd from "./terms.mdx";
import { Metadata } from "next";

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
