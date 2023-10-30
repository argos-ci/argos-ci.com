import { ReviewChanges } from "./ReviewChanges";
import { ColoredCard } from "../common/ColoredCard";
import { Feature } from "../common/Feature";
import { CodeAnimation } from "./CodeAnimation";

export function VisualTesting() {
  return (
    <Feature surtitle="Visual Testing" title="Don't fix bugs, avoid them.">
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
    </Feature>
  );
}
