import clsx from "clsx";
import { MapPinIcon, MessageSquareCodeIcon, VoteIcon } from "lucide-react";
import Link from "next/link";

import { leMondeReviewsQuote } from "@/app/assets/customers/library/le-monde";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { QuoteBlock } from "@/components/QuoteBlock";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";
import { SectionGlow } from "@/components/feature-section/SectionGlow";
import { SUBTLE_BG_COLORS } from "@/components/feature-section/colors";

import { ReviewCanvas } from "./ReviewCanvas";

const POINTS = [
  {
    icon: MapPinIcon,
    title: "Pinned to what changed",
    text: "Attach a thread to a precise point on a screenshot, or to a line range inside a Markdown or JSON snapshot.",
  },
  {
    icon: VoteIcon,
    title: "Every verdict counts",
    text: "Request the reviewers you need and keep each decision, instead of overwriting it with the most recent click.",
  },
  {
    icon: MessageSquareCodeIcon,
    title: "From comment to fix",
    text: "Your agent pulls the comments and the screenshots they point to from the CLI, and comes back with the fix in the next build.",
  },
];

export function CollaborativeReviews() {
  return (
    // Tint and glow span the section and its story together, so the chapter is
    // one ground and closes once — the story is part of it, not a block of its
    // own. Both are clipped to the rails, as in `FeatureSection`, so the margins
    // stay neutral.
    <div className="relative">
      {/* `px-4` to match the gutter the sections below carry, since `inset-0`
          resolves against the padding box and would otherwise run wider than
          their rails at viewports narrower than the max content width. */}
      <div className="pointer-events-none absolute inset-0 px-4">
        <Container noGutter className="relative h-full overflow-hidden">
          <div className={clsx("absolute inset-0", SUBTLE_BG_COLORS.pink)} />
          <SectionGlow color="pink" />
        </Container>
      </div>
      <ReviewsSection />
      <QuoteBlock quote={leMondeReviewsQuote} pattern className="separator-b" />
    </div>
  );
}

function ReviewsSection() {
  return (
    <section className="relative px-4">
      <Container noGutter className="border-x pb-12">
        <SectionHeader className="container-gutter pb-8 md:pb-10">
          <SectionHeaderTexts>
            <FeatureIndicator color="pink">
              Collaborative Reviews
            </FeatureIndicator>
            <SectionTitle>Review it together, right on the pixel</SectionTitle>
            <SectionDescription className="max-w-2xl">
              Pin a comment to the exact point that changed, request every
              reviewer you need, and keep each verdict instead of only the last
              click. Your team and your agents settle it in one thread, before
              anything ships.
            </SectionDescription>
          </SectionHeaderTexts>
          <Button variant="outline" asChild>
            <Link href="/collaborative-reviews">
              Explore Collaborative Reviews
            </Link>
          </Button>
        </SectionHeader>
        {/* Same as the feature sections: a rule against the header, another
            below against the points row. The ground is the section's, not this
            block's. */}
        <div className="border-t border-b px-4 py-10 md:px-10 md:py-16">
          <ReviewCanvas />
        </div>
        {/* Closed by its own rule rather than the section's: the story below
            belongs to this chapter, so the section must not end here. */}
        <ul className="grid divide-y border-b md:grid-cols-3 md:divide-x md:divide-y-0">
          {POINTS.map((point) => (
            <li key={point.title} className="flex gap-4 p-6 md:p-8">
              <point.icon
                className="mt-0.5 size-5 shrink-0 text-(--pink-11)"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="font-accent font-medium">{point.title}</h3>
                <p className="text-low text-sm">{point.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
