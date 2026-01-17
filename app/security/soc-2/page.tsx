import { Metadata } from "next";

import { StaticPage } from "../../../components/StaticPage";
import { getMetadata } from "../../../lib/metadata";
import Soc2MdxPage from "../../markdown/soc-2.mdx";

export const metadata: Metadata = getMetadata({
  title: "SOC 2 Type II Compliance and Security",
  description:
    "Argos is SOC 2 Type II compliant, with audited security controls protecting customer data across infrastructure, access, and operations.",
  pathname: "/security/soc-2",
});

export default function Page() {
  return (
    <StaticPage>
      <Soc2MdxPage />
    </StaticPage>
  );
}
