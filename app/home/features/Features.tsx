import clsx from "clsx";
import {
  ChromeIcon,
  GalleryHorizontal,
  GitBranchIcon,
  GitPullRequestIcon,
  MonitorCheckIcon,
  ScanSearchIcon,
  TabletSmartphoneIcon,
  TowerControlIcon,
  Wand2Icon,
} from "lucide-react";

import { Container } from "@/components/Container";
import { Feature, FeatureRow, FeatureSeparator } from "@/components/Feature";
import { H2 } from "@/components/H2";

export function Features() {
  return (
    <Container asChild className="py-16 md:py-20">
      <section>
        <H2 className="mb-6 md:mb-12">Meet the future of Visual Testing.</H2>
        <div className="flex flex-col md:gap-6">
          <FeatureRow>
            <Feature
              title="Cross-browser testing"
              icon={ChromeIcon}
              text="Capture visuals seamlessly across every browser for thorough
            cross-platform testing."
            />
            <FeatureSeparator orientation="vertical" />
            <Feature
              title="Responsive design"
              icon={TabletSmartphoneIcon}
              text="Test across various resolutions: ensuring every detail is captured without missing a thing."
            />
            <FeatureSeparator orientation="vertical" />
            <Feature
              title="Test context"
              icon={MonitorCheckIcon}
              text="From a single screenshot, obtain resolution, link to test file, browser, and every other detail you need."
            />
          </FeatureRow>
          <FeatureSeparator orientation="horizontal" />
          <FeatureRow>
            <Feature
              title="Screenshot stabilization"
              icon={Wand2Icon}
              text="Argos' stabilization tech halts animations to reduce false-positives and ensure consistent rendering."
            />
            <FeatureSeparator orientation="vertical" />
            <Feature
              title="Natural zoom"
              icon={ScanSearchIcon}
              text="Experience a seamless, Figma-style zoom transition between diffs for intuitive visual comparisons."
            />
            <FeatureSeparator orientation="vertical" />
            <Feature
              title="Difference grouping"
              icon={GalleryHorizontal}
              text="Similar differences are grouped together for streamlined and efficient review."
            />
          </FeatureRow>
          <FeatureSeparator orientation="horizontal" />
          <FeatureRow>
            <Feature
              title="Smart baseline detection"
              icon={GitBranchIcon}
              text="Argos selects the optimal baseline branch for precise screenshot comparisons."
            />
            <FeatureSeparator orientation="vertical" />
            <Feature
              title="Pull request comments"
              icon={GitPullRequestIcon}
              text="Pull request comments display summaries of visual differences directly in your workflow."
            />
            <FeatureSeparator orientation="vertical" />
            <Feature
              title="Monitoring Mode"
              icon={TowerControlIcon}
              text="Check visual changes to detect issues early, validate releases, and ensure integration consistency."
            />
          </FeatureRow>
        </div>
      </section>
    </Container>
  );
}
