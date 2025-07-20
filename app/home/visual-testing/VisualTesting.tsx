import { ColoredCard } from "../common/ColoredCard";
import { FeatureSection } from "../common/FeatureSection";
import { CodeAnimation } from "./CodeAnimation";
import { ReviewChanges } from "./ReviewChanges";

export function VisualTesting() {
  return (
    <FeatureSection
      surtitle="Visual Testing"
      title="Prevent UI bugs before they reach production with Argos."
    >
      <ColoredCard
        color="amber"
        surtitle="Integrate"
        title="Setup Visual Testing, now."
        text="Integrate Argos in your Testing Framework using our SDK, you are ready to go!"
      >
        <CodeAnimation />
      </ColoredCard>
      <ColoredCard
        color="crimson"
        surtitle="Review"
        title="Review changes"
        text="Get status on your pull request in GitHub and GitLab. Approve or reject changes in Argos."
      >
        <div className="pt-10 pb-2">
          <ReviewChanges />
        </div>
      </ColoredCard>
    </FeatureSection>
  );
}
