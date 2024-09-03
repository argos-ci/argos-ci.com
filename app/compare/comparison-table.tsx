import { CircleXIcon, XIcon } from "lucide-react";

import {
  Check,
  THead,
  Table,
  Td,
  Th,
  ThMain,
  ThSub,
  ThSubLink,
  Tr,
  X,
} from "@/components/ComparisonTable";

type Feature = { argos: React.ReactNode; competitor: React.ReactNode };

export type Features = {
  pricing: Feature;
  playwrightDebugging: Feature;
  playwrightTestRetries: Feature;
  githubSso: Feature;
  openSource: Feature;
  githubLight: Feature;
  sensitivityThresholdPerScreenshot: Feature;
  githubActionsPartialReRuns: Feature;
  bestScreenshotQuality: Feature;
  monitoringMode: Feature;
  beautifulAndIntuitiveUi: Feature;
};

function FeatureTd(props: { value: React.ReactNode }) {
  return (
    <Td>
      {props.value === "✔️" ? (
        <Check />
      ) : props.value === "❌" ? (
        <X />
      ) : (
        props.value
      )}
    </Td>
  );
}

function Feature(props: { feature: Feature }) {
  return (
    <>
      <FeatureTd value={props.feature.argos} />
      <FeatureTd value={props.feature.competitor} />
    </>
  );
}

export function ComparisonTable(props: {
  title: string;
  logoSrc: string;
  logoSrcDark?: string;
  features: Features;
}) {
  return (
    <Table>
      <THead
        title={props.title}
        logoSrc={props.logoSrc}
        logoSrcDark={props.logoSrcDark}
      />

      <tbody>
        <Tr>
          <Th>
            <ThMain>Monthly pricing</ThMain>
            <ThSubLink href="/pricing">How much it costs per month</ThSubLink>
          </Th>
          <Feature feature={props.features.pricing} />
        </Tr>

        <Tr>
          <Th>
            <ThMain>Playwright debugging</ThMain>
            <ThSubLink href="/playwright">
              Playwright trace viewer and failure screenshots
            </ThSubLink>
          </Th>
          <Feature feature={props.features.playwrightDebugging} />
        </Tr>

        <Tr>
          <Th>
            <ThMain>Playwright test retries</ThMain>
            <ThSubLink href="/changelog/2024-04-29-retried-failures">
              Separate test retries to have a clear overview
            </ThSubLink>
          </Th>
          <Feature feature={props.features.playwrightTestRetries} />
        </Tr>

        <Tr>
          <Th>
            <ThMain>GitHub SSO</ThMain>
            <ThSubLink href="/changelog/2024-02-28-github-sso">
              Synchronize your GitHub users with Argos
            </ThSubLink>
          </Th>
          <Feature feature={props.features.githubSso} />
        </Tr>

        <Tr>
          <Th>
            <ThMain>Open Source</ThMain>
            <ThSubLink href="https://github.com/argos-ci" target="_blank">
              SDK and platform code available
            </ThSubLink>
          </Th>
          <Feature feature={props.features.openSource} />
        </Tr>

        <Tr>
          <Th>
            <ThMain>GitHub integration without code access</ThMain>
            <ThSubLink href="https://argos-ci.com/docs/github" target="_blank">
              Offer a mode without needing to read your code
            </ThSubLink>
          </Th>
          <Feature feature={props.features.githubLight} />
        </Tr>

        <Tr>
          <Th>
            <ThMain>Sensitivity threshold per screenshot</ThMain>
            <ThSubLink href="/changelog/2024-07-09-sensitivity-threshold">
              Set a threshold by screenshot to reduce flakiness
            </ThSubLink>
          </Th>
          <Feature feature={props.features.sensitivityThresholdPerScreenshot} />
        </Tr>

        <Tr>
          <Th>
            <ThMain>GitHub Actions partial re-runs</ThMain>
            <ThSubLink href="/changelog/2024-06-17-partial-re-runs-github-actions">
              Save time and resources with partial re-runs
            </ThSubLink>
          </Th>
          <Feature feature={props.features.githubActionsPartialReRuns} />
        </Tr>

        <Tr>
          <Th>
            <ThMain>High screenshot quality</ThMain>
            <ThSubLink href="/changelog/2024-06-13-enhanced-screenshot-quality">
              Don't miss any detail with enhanced quality
            </ThSubLink>
          </Th>
          <Feature feature={props.features.bestScreenshotQuality} />
        </Tr>

        <Tr>
          <Th>
            <ThMain>Monitoring mode</ThMain>
            <ThSubLink href="/changelog/2024-05-28-monitoring-mode">
              Run periodic checks on your website
            </ThSubLink>
          </Th>
          <Feature feature={props.features.monitoringMode} />
        </Tr>

        <Tr>
          <Th>
            <ThMain>Beautiful and intuitive UI</ThMain>
            <ThSub>Designed to be effective</ThSub>
          </Th>
          <Feature feature={props.features.beautifulAndIntuitiveUi} />
        </Tr>
      </tbody>
    </Table>
  );
}
