import { ApplicationSVG } from "@/components/ApplicationSVG";
import { Card } from "@/components/Card";

export function ChangeHistoryStackIllustration() {
  return (
    <div className="relative m-auto size-2/3">
      <Card
        className="absolute top-8 left-8 w-full overflow-hidden"
        shadow="high"
      >
        <ApplicationSVG withChanges />
      </Card>
      <Card
        className="absolute top-4 left-4 w-full overflow-hidden"
        shadow="high"
      >
        <ApplicationSVG withChanges />
      </Card>
      <Card
        className="absolute top-0 left-0 w-full overflow-hidden"
        shadow="high"
      >
        <ApplicationSVG withChanges />
      </Card>
      <Card
        className="absolute -top-4 -left-4 w-full overflow-hidden"
        shadow="high"
      >
        <ApplicationSVG withChanges />
      </Card>
      <Card
        className="absolute -top-8 -left-8 w-full overflow-hidden"
        shadow="high"
      >
        <ApplicationSVG withChanges />
      </Card>
    </div>
  );
}
