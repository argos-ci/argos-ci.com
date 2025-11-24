import {
  BookTextIcon,
  GroupIcon,
  type LucideIcon,
  ScanEyeIcon,
  ThumbsUpIcon,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Pattern } from "@/components/Pattern";
import { ThemeImage } from "@/components/ThemeImage";

import fastApprovalFlowSvg from "./assets/fast-approval-flow.svg";
import mermaid from "./assets/mermaid.svg";
import sidharth from "./assets/sidharth.jpg";

export function VisualTesting() {
  return (
    <section className="separator-b relative px-4">
      <Container className="border-x" noGutter>
        <div className="flex flex-col gap-10 px-4 py-12 sm:px-10 md:py-18">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="h-1.5 w-3 rounded bg-(--blue-10)" />
              Visual Testing
            </div>
            <h2 className="font-accent text-3xl font-medium md:text-[2.625rem] md:leading-[1.1]">
              Spot every change
            </h2>
            <p className="text-low text-base font-medium md:text-lg md:leading-[1.4]">
              <span className="after:content-['_'] md:block">
                Catch, compare, and review visual changes.
              </span>
              Stay focused on real differences and skip the noise.
            </p>
          </div>
          <div>
            <Button variant="outline">Explore Visual Testing</Button>
          </div>
        </div>
        <div className="bg-subtle border-y">
          <ThemeImage src={fastApprovalFlowSvg} alt="Fast approval flow" />
          <div className="relative -ml-px flex flex-col items-start justify-center gap-10 py-8 md:ml-0 md:flex-row">
            <Feature
              icon={ScanEyeIcon}
              title="Smart detection"
              text="Built-in stabilization that filters out noise for cleaner, more reliable visual diffs."
            />
            <Feature
              icon={ThumbsUpIcon}
              title="Fast approval flow"
              text="A UX built for speed, review, approve, and ship confidently in seconds."
            />
            <Feature
              icon={GroupIcon}
              title="Grouped diffs"
              text="Similar changes are grouped, so you review once and move on."
            />
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-t from-(--blue-1)" />
          <div className="absolute inset-4 text-(--neutral-3)">
            <Pattern />
          </div>
          <div className="relative flex flex-col items-center gap-10 px-10 py-12 text-center md:flex-row md:items-start md:gap-30 md:text-left">
            <div className="flex flex-col items-center gap-6 md:items-start">
              <blockquote>
                <p className="font-accent bg-linear-to-b from-(--neutral-12) to-(--blue-12) bg-clip-text text-lg text-transparent md:text-2xl md:font-medium">
                  “Argos has been a game-changer for us. It catches even the
                  smallest visual changes in our diagram rendering, giving us
                  peace of mind before every release.”
                </p>
              </blockquote>
              <Button variant="outline-primary">
                <BookTextIcon />
                Read the story
              </Button>
            </div>
            <div className="flex flex-col items-center gap-6 text-center whitespace-nowrap md:items-end md:text-end">
              <Image src={mermaid} alt="Mermaid" className="h-5" />
              <div className="flex flex-col items-center gap-2.5 md:items-end">
                <div>
                  <div className="text-sm font-medium">Sidharth Vinod</div>
                  <div className="text-low text-xs font-medium">
                    CEO at Mermaid
                  </div>
                </div>
                <Image
                  src={sidharth}
                  className="size-10 rounded-full border"
                  alt="Sidharth Vinod"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Feature(props: { icon: LucideIcon; title: string; text: string }) {
  const { icon: Icon, title, text } = props;
  return (
    <div className="flex flex-col border-l pl-6 text-sm md:max-w-56">
      <Icon strokeWidth={1} className="size-5" />
      <h3 className="mt-2 mb-3 font-medium">{title}</h3>
      <p className="text-low">{text}</p>
    </div>
  );
}
