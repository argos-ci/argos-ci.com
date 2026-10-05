import { Metadata } from "next";

import { ComparePricingSlider } from "@/app/common/PricingSlider";
import { getMetadata } from "@/lib/metadata";

import {
  FAQSection,
  HeroSection,
  PricingSection,
  SourcesNote,
  TableSection,
  TrySection,
  VerdictSection,
} from "../common";
import { ComparisonTable } from "../comparison-table";
import { comparison } from "./comparison";
import { FAQ } from "./faq";

export const metadata: Metadata = getMetadata({
  title: "Argos vs Happo",
  absoluteTitle: "Argos vs Happo · An open-source Happo alternative",
  description:
    "Argos vs Happo for visual testing: where screenshots are rendered, browsers, pricing and integrations. Argos is an open-source alternative to Happo.",
  pathname: "/compare/happo",
});

const emblemProps = { emblemAlt: comparison.fullName };

export default function Page() {
  return (
    <>
      <HeroSection
        title={comparison.title}
        description={comparison.description}
        {...emblemProps}
      />

      <VerdictSection comparison={comparison} />

      <TableSection>
        <ComparisonTable comparison={comparison} />
        <SourcesNote comparison={comparison} />
      </TableSection>

      <PricingSection title="Estimate your savings">
        <ComparePricingSlider competitor="happo" />
        {comparison.pricingNote ? (
          <p className="mt-4 text-center text-sm text-low">
            {comparison.pricingNote}
          </p>
        ) : null}
      </PricingSection>

      <FAQSection>
        <FAQ />
      </FAQSection>

      <TrySection {...emblemProps} />
    </>
  );
}
