import { StaticPage } from "@/components/StaticPage";
import SecurityMd from "./security.mdx";
import { Metadata } from "next";

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
