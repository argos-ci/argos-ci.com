import { GitBranchIcon, LockKeyholeIcon, RocketIcon } from "lucide-react";
import Link from "next/link";

import { muiDeploymentsQuote } from "@/app/assets/customers/library/mui";
import { DeployUrlCard } from "@/app/deploy/features/DeployUrlCard";
import { EnvironmentPromotion } from "@/app/deploy/features/EnvironmentPromotion";
import { Button } from "@/components/Button";
import { FeatureSection } from "@/components/feature-section/FeatureSection";

import { DeployPreview } from "./features/DeployPreview";

export function Deploy() {
  return (
    <FeatureSection
      features={[
        {
          key: "preview-url",
          icon: <RocketIcon />,
          title: "One command, one URL",
          text: "argos deploy ./storybook-static uploads the build and prints an immutable URL. Share it with a reviewer or an agent: it always shows that exact build.",
          main: <DeployUrlCard />,
          href: "/deploy",
        },
        {
          key: "environments",
          icon: <GitBranchIcon />,
          title: "Preview and production",
          text: "Pull requests get previews. A merge to your production branch promotes the build to the production domain, or to a custom domain you own.",
          main: <EnvironmentPromotion />,
          href: "/deploy",
        },
        {
          key: "protection",
          icon: <LockKeyholeIcon />,
          title: "Private previews, public production",
          text: "Require an Argos login on preview URLs while production stays open, or lock every deployment behind a login on Team plans.",
          main: <DeployPreview />,
          href: "/deploy",
        },
      ]}
      color="teal"
      featureName="Deploy"
      title="A live preview for every pull request"
      description={`Run argos deploy on any static build: an immutable URL, a branch URL, and production on an Argos domain or your own.\nYour agents deploy their own previews with one command.`}
      story={{
        quote: muiDeploymentsQuote,
        href: "/customers/mui",
      }}
      cta={
        <Button variant="outline" asChild>
          <Link href="/deploy">Explore Deploy</Link>
        </Button>
      }
    />
  );
}
