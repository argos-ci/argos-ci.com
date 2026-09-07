import {
  GitPullRequestIcon,
  MessagesSquareIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

import { gitbookAgentQuote } from "@/app/assets/customers/library/gitbook";
import { GitHubChecks } from "@/app/review/features/GitHubChecks";
import { Reviewers } from "@/app/review/features/Reviewers";
import { Button } from "@/components/Button";
import { FeatureSection } from "@/components/feature-section/FeatureSection";

import { ReviewCanvas } from "./features/ReviewCanvas";

export function Review() {
  return (
    <FeatureSection
      features={[
        {
          key: "canvas",
          icon: <MessagesSquareIcon />,
          title: "Pin it, discuss it",
          text: "Pin a comment to the exact pixel or line, discuss it in a thread, and resolve it when it's settled, all in real time.",
          main: <ReviewCanvas />,
          href: "/review#together",
        },
        {
          key: "reviewers",
          icon: <UsersIcon />,
          title: "Every verdict counts",
          text: "Request reviewers and track each verdict on its own. One rejection blocks; otherwise one approval passes, whether a person or an agent submitted it.",
          main: <Reviewers />,
          href: "/review#together",
        },
        {
          key: "pr-check",
          icon: <GitPullRequestIcon />,
          title: "Lands on the pull request",
          text: "A commit status you can require in branch protection, one PR comment kept current, and a Slack, Teams, or Discord message when it matters.",
          main: <GitHubChecks />,
          href: "/review#ship",
        },
      ]}
      color="pink"
      featureName="Review"
      title="Approve what changed, together"
      description={`Side-by-side diffs, pinned comments, one verdict per reviewer.\nHumans and agents review in the same thread, and the result lands on the PR.`}
      story={{
        quote: gitbookAgentQuote,
        href: "/customers/gitbook",
      }}
      cta={
        <Button variant="outline" asChild>
          <Link href="/review">Explore Review</Link>
        </Button>
      }
    />
  );
}
