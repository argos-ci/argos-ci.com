import { BlocksIcon, GaugeIcon, SparklesIcon } from "lucide-react";

import { Container } from "@/components/Container";
import { Feature, FeatureRow, FeatureSeparator } from "@/components/Feature";
import { H2 } from "@/components/H2";

export function Why() {
  return (
    <Container className="py-16 md:py-20" asChild>
      <section>
        <H2 className="mb-6 text-center">Why using Argos?</H2>
        <div className="mb-6 text-center text-lg text-low md:text-xl">
          Testing frameworks like Playwright and Cypress offer basic visual
          testing capabilities, but they fall short for team workflows. For
          robust and reliable visual testing, teams need a dedicated tool like
          Argos.
        </div>
        <div className="flex flex-col md:gap-6">
          <FeatureRow>
            <Feature
              title="Visual testing that scales"
              icon={GaugeIcon}
              text="Argos does not require you to commit screenshots, making visual testing a seamless part of your CI flow."
            />
            <FeatureSeparator orientation="vertical" />
            <Feature
              title="The best review UI"
              icon={SparklesIcon}
              text="Argos provides a clean and intuitive UI for reviewing visual changes, making it easy to spot regressions."
            />
            <FeatureSeparator orientation="vertical" />
            <Feature
              title="Git Integrations"
              icon={BlocksIcon}
              text="Argos is perfectly integrated with GitHub and GitLab, making it easy to see visual changes in your PRs."
            />
          </FeatureRow>
        </div>
      </section>
    </Container>
  );
}
