import { Metadata } from "next";

import { StaticPage } from "../../../components/StaticPage";
import { getMetadata } from "../../../lib/metadata";
import GdprMdxPage from "../../markdown/gdpr.mdx";

export const metadata: Metadata = getMetadata({
  title: "GDPR",
  description:
    "Argos is committed to the security and privacy of our customers' data",
  pathname: "/security",
});

export default function Page() {
  return (
    <StaticPage>
      <GdprMdxPage />
    </StaticPage>
  );
}
