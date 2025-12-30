import { Metadata } from "next";

import { StaticPage } from "../../../components/StaticPage";
import { getMetadata } from "../../../lib/metadata";
import Soc2MdxPage from "../../markdown/soc-2.mdx";

export const metadata: Metadata = getMetadata({
  title: "SOC 2",
  description:
    "Argos is committed to the security and privacy of our customers' data",
  pathname: "/security/soc-2",
});

export default function Page() {
  return (
    <StaticPage>
      <Soc2MdxPage />
    </StaticPage>
  );
}
