import { MapPinIcon, SparklesIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";

import { leMondeReviewsQuote } from "@/app/assets/customers/library/le-monde";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { SectionDescription, SectionTitle } from "@/components/Typography";
import { CustomerStory } from "@/components/feature-section/CustomerStory";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";

import { ReviewCanvas } from "./ReviewCanvas";

const FEATURES = [
  {
    icon: MapPinIcon,
    title: "Pin your comment",
    text: "Click on a pixel and start the conversation right there. Everyone follows along.",
  },
  {
    icon: UserPlusIcon,
    title: "Bring the reviewers you need",
    text: "Add the designer, the feature owner, whoever you want. Every review counts.",
  },
  {
    icon: SparklesIcon,
    title: "Your agent takes it from there",
    text: "Hit Handle with AI to let your agent take over. The fix lands in the next commit.",
  },
];

export function CollaborativeReviews() {
  return (
    <div className="separator-b relative px-4">
      <Container className="border-x" noGutter>
        <SectionHeader className="container-gutter pb-8 md:pb-10">
          <SectionHeaderTexts>
            <FeatureIndicator color="pink">
              Collaborative Reviews
            </FeatureIndicator>
            <SectionTitle>Keep your team on the same page</SectionTitle>
            <SectionDescription className="max-w-2xl">
              Your team and your agents review together, right on the change.
            </SectionDescription>
          </SectionHeaderTexts>
          <Button variant="outline" asChild>
            <Link href="/collaborative-reviews">
              Explore Collaborative Reviews
            </Link>
          </Button>
        </SectionHeader>
        <div className="border-t border-b px-4 py-10 md:px-10 md:py-16">
          <ReviewCanvas />
        </div>
        <ul className="grid divide-y border-b md:grid-cols-3 md:divide-x md:divide-y-0">
          {FEATURES.map((point) => (
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
        <CustomerStory
          color="pink"
          story={{ quote: leMondeReviewsQuote, href: "/customers/lemonde" }}
        />
        <div className="h-12 border-t" />
      </Container>
    </div>
  );
}
