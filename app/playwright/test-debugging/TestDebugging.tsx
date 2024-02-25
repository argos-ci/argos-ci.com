import { BugPlayIcon, ImageOffIcon } from "lucide-react";
import Image from "next/image";

import { Link } from "@/components/Link";

import { Feature, FeatureDetail, MoreLink } from "../common/Feature";
import illuDark from "./illu-dark.svg";
import illuLight from "./illu-light.svg";

export function TestDebugging() {
  return (
    <Feature
      surtitle="CI Test Debugging"
      title="Debug your test failures in one click."
      details={
        <>
          <FeatureDetail
            icon={ImageOffIcon}
            title="Failure Screeenshots"
            text="Check failure screenshots from your CI tests directly in Argos. No extra steps, just immediate clarity where you need it most."
          />
          <FeatureDetail
            icon={BugPlayIcon}
            title="Online Trace Viewer"
            text={
              <>
                “Time travel” through your failing tests with{" "}
                <Link
                  href="https://playwright.dev/docs/trace-viewer-intro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Playwright Traces
                </Link>
                . Explore what happened in a test in one click.
              </>
            }
          />
          <div>
            <MoreLink href="https://app.argos-ci.com/argos-ci/playwright-demo/builds/29/64334639">
              See a demo build
            </MoreLink>
          </div>
        </>
      }
      illustration={
        <>
          <Image
            src={illuLight.src}
            width={546}
            height={336}
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="User interface showing a Playwright trace"
            className="dark:hidden"
          />
          <Image
            src={illuDark.src}
            width={546}
            height={336}
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="User interface showing a Playwright trace"
            className="hidden dark:block"
          />
        </>
      }
    />
  );
}
