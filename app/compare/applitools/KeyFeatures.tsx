import {
  Blocks,
  BookOpenText,
  LockKeyhole,
  MessageSquareText,
  PencilRuler,
  Users2,
} from "lucide-react";
import Link from "next/link";

import { BlueLink } from "../../../components/Link";
import { Feature, Row, Separator } from "../../home/features/Features";

export const KeyFeatures = () => (
  <div>
    <Row>
      <Feature
        title="Well-crafted UI"
        icon={PencilRuler}
        text="Crafted to satisfy exigent developers. Inspired by Figma, Linear, and Stripe."
      />
      <Separator orientation="vertical" />
      <Feature
        title="Community driven"
        icon={Users2}
        text="We are close to our users, that the roadmap is driven by their feedback."
      />
      <Separator orientation="vertical" />
      <Feature
        title="Open source"
        icon={BookOpenText}
        text={
          <>
            We <BlueLink href="https://x.com/argos_ci">#buildInPublic</BlueLink>{" "}
            to improve state of the art and support impactful projects.
          </>
        }
      />
    </Row>
    <Separator orientation="horizontal" />
    <Row>
      <Feature
        title="Integrate with your stack"
        icon={Blocks}
        text="Argos integrate with your testing tool to capture stable screenshots."
      />
      <Separator orientation="vertical" />
      <Feature
        title="Fine-grain access control"
        icon={LockKeyhole}
        text="Control team members access and permissions for each project."
      />
      <Separator orientation="vertical" />
      <Feature
        title="Dedicated support"
        icon={MessageSquareText}
        text="Get help from experimented developers to improve your tests."
      />
    </Row>
  </div>
);
