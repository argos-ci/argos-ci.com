import {
  BugPlayIcon,
  CircleDotIcon,
  ImageOffIcon,
  ScanSearchIcon,
  SparkleIcon,
  Wand2Icon,
} from "lucide-react";
import Image from "next/image";

import { Feature, FeatureDetail, MoreLink } from "../common/Feature";
import illuDark from "./illu-dark.svg";
import illuLight from "./illu-light.svg";

export function VisualTesting() {
  return (
    <Feature
      reverse
      surtitle="Enhanced Visual Testing"
      title="Scale Visual Testing to the next level."
      details={
        <>
          <FeatureDetail
            icon={CircleDotIcon}
            title="Visual Testing on CI"
            text="No need to run tests locally or commit screenshots. Argos runs visual tests on CI, so you don’t have to."
          />
          <FeatureDetail
            icon={ScanSearchIcon}
            title="Precision at First Glance"
            text="Dive into a crystal-clear UI that gives a complete overview of visual changes to review diffs instantly."
          />
          <FeatureDetail
            icon={Wand2Icon}
            title="Eliminate Flakiness"
            text="Ensure stability and consistency in the screenshots captured. Fonts, images, animations, loaders, everything is just stable."
          />
          <div>
            <MoreLink href="https://app.argos-ci.com/argos-ci/playwright-demo/builds/28/64334445">
              See a demo build
            </MoreLink>
          </div>
        </>
      }
      illustration={
        <>
          <Image
            src={illuLight.src}
            width={538}
            height={381}
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="Argos UI showing a visual test diff"
            className="dark:hidden"
          />
          <Image
            src={illuDark.src}
            width={538}
            height={381}
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="Argos UI showing a visual test diff"
            className="hidden dark:block"
          />
        </>
      }
    />
  );
}
