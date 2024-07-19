import clsx from "clsx";
import {
  ChromeIcon,
  GalleryHorizontal,
  GitBranchIcon,
  GitPullRequestIcon,
  LucideIcon,
  MonitorCheckIcon,
  ScanSearchIcon,
  TabletSmartphoneIcon,
  TowerControlIcon,
  Wand2Icon,
} from "lucide-react";

import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";

export function Feature({
  title,
  icon: Icon,
  text,
}: {
  title: React.ReactNode;
  icon: LucideIcon;
  text: React.ReactNode;
}) {
  return (
    <section className="max-w-sm flex-1 py-6 md:max-w-none md:py-12">
      <h3 className="mb-4 flex items-center gap-3 text-xl font-medium">
        <Icon className="h-7 w-7 text-violet-11" strokeWidth={1} /> {title}
      </h3>
      <p>{text}</p>
    </section>
  );
}

export function Separator({
  orientation,
}: {
  orientation: "horizontal" | "vertical";
}) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={clsx(
        "hidden self-stretch border-dashed border-violet-6 md:block",
        orientation === "vertical" && "border-l",
        orientation === "horizontal" && "border-b",
      )}
    />
  );
}

export function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col md:flex-row md:items-center md:gap-12">
      {children}
    </div>
  );
}

export function Features() {
  return (
    <Container asChild className="py-16 md:py-20">
      <section>
        <H2 className="mb-6 md:mb-12">Meet the future of Visual Testing.</H2>
        <div className="flex flex-col md:gap-6">
          <Row>
            <Feature
              title="Cross-browser testing"
              icon={ChromeIcon}
              text="Capture visuals seamlessly across every browser for thorough
            cross-platform testing."
            />
            <Separator orientation="vertical" />
            <Feature
              title="Responsive design"
              icon={TabletSmartphoneIcon}
              text="Test across various resolutions: ensuring every detail is captured without missing a thing."
            />
            <Separator orientation="vertical" />
            <Feature
              title="Test context"
              icon={MonitorCheckIcon}
              text="From a single screenshot, obtain resolution, link to test file, browser, and every other detail you need."
            />
          </Row>
          <Separator orientation="horizontal" />
          <Row>
            <Feature
              title="Screenshot stabilization"
              icon={Wand2Icon}
              text="Argos' stabilization tech halts animations to reduce false-positives and ensure consistent rendering."
            />
            <Separator orientation="vertical" />
            <Feature
              title="Natural zoom"
              icon={ScanSearchIcon}
              text="Experience a seamless, Figma-style zoom transition between diffs for intuitive visual comparisons."
            />
            <Separator orientation="vertical" />
            <Feature
              title="Difference grouping"
              icon={GalleryHorizontal}
              text="Similar differences are grouped together for streamlined and efficient review."
            />
          </Row>
          <Separator orientation="horizontal" />
          <Row>
            <Feature
              title="Smart baseline detection"
              icon={GitBranchIcon}
              text="Argos selects the optimal baseline branch for precise screenshot comparisons."
            />
            <Separator orientation="vertical" />
            <Feature
              title="Pull request comments"
              icon={GitPullRequestIcon}
              text="Pull request comments display summaries of visual differences directly in your workflow."
            />
            <Separator orientation="vertical" />
            <Feature
              title="Monitoring Mode"
              icon={TowerControlIcon}
              text="Check visual changes to detect issues early, validate releases, and ensure integration consistency."
            />
          </Row>
        </div>
      </section>
    </Container>
  );
}
