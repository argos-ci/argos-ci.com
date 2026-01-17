import { Metadata } from "next";

import { StaticPage } from "../../../components/StaticPage";
import { getMetadata } from "../../../lib/metadata";
import GdprMdxPage from "../../markdown/gdpr.mdx";

export const metadata: Metadata = getMetadata({
  title: "GDPR Compliance and Privacy Policy",
  description:
    "Argos complies with GDPR requirements through strict data protection measures, secure infrastructure, and transparent privacy practices.",
  pathname: "/security/gdpr",
});

export default function Page() {
  return (
    <StaticPage>
      <GdprMdxPage />
    </StaticPage>
  );
}
