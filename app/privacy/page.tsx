import { StaticPage } from "@/components/StaticPage";
import PrivacyMd from "./privacy.mdx";
import { Metadata } from "next";

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
