import { Container } from "@/components/Container";
import { H2 } from "../common/H2";
import {
  ChromeIcon,
  GalleryHorizontal,
  GhostIcon,
  GitBranchIcon,
  GitPullRequestIcon,
  LucideIcon,
  MonitorCheckIcon,
  ScanSearchIcon,
  TabletSmartphoneIcon,
  VibrateIcon,
} from "lucide-react";
import clsx from "clsx";

function Feature({
  title,
  icon: Icon,
  text,
}: {
  title: React.ReactNode;
  icon: LucideIcon;
  text: React.ReactNode;
}) {
  return (
    <section className="py-8 md:py-12 flex-1 max-w-sm md:max-w-none">
      <h3 className="flex items-center gap-3 text-xl font-medium mb-4">
        <Icon className="text-violet-11 w-7 h-7" /> {title}
      </h3>
      <p>{text}</p>
    </section>
  );
}

function Separator({
  orientation,
}: {
  orientation: "horizontal" | "vertical";
}) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={clsx(
        "self-stretch border-violet-6 border-dashed hidden md:block",
        orientation === "vertical" && "border-l",
        orientation === "horizontal" && "border-b",
      )}
    />
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-12 relative">
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
              title="Cross browsers testing"
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
              text="From one screenshot: get resolution, link to test file, browser — every detail you need."
            />
          </Row>
          <Separator orientation="horizontal" />
          <Row>
            <Feature
              title="Screenshot stabilisation"
              icon={VibrateIcon}
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
              text="Pull request comments display a summary of visual differences right in your workflow."
            />
            <Separator orientation="vertical" />
            <Feature
              title="Flaky test detection"
              icon={GhostIcon}
              text="Instantly identify flaky screenshots, alerting you to potential inconsistencies in your tests."
            />
          </Row>
        </div>
      </section>
    </Container>
  );
}
