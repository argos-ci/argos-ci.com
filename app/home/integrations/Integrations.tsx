import clsx from "clsx";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Grid } from "@/components/Grid";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";
import { Tooltip } from "@/components/Tooltip";

import { SectionHeader, SectionHeaderTexts } from "../common/SectionHeader";
import { SectionDescription, SectionTitle } from "../common/Typography";
import githubDark from "./assets/github-dark.svg";
import githubLight from "./assets/github-light.svg";
import gitlab from "./assets/gitlab.svg";
import slack from "./assets/slack.svg";

export function Integrations() {
  return (
    <section className="separator-b bg-subtle relative px-4">
      <Container
        noGutter
        className="relative flex flex-col border-x md:h-[400px] md:flex-row md:items-center"
      >
        <SectionHeader className="container-gutter max-w-[500px]">
          <SectionHeaderTexts>
            <SectionTitle>Integrated with your everyday tools</SectionTitle>
            <SectionDescription>
              First class integrations with GitHub, GitLab, and Slack so your
              reviews happen where your team collaborates.
            </SectionDescription>
          </SectionHeaderTexts>
          <Button variant="outline">Explore Integrations</Button>
        </SectionHeader>
        <div
          className={clsx(
            "self-center mask-intersect text-(--border-color-default)",
            "relative h-[300px] [--grid-size:40px] max-md:w-[399px]",
            "md:absolute md:inset-y-0 md:-right-[180px] md:left-[calc(50%-10px)] md:h-full md:[--grid-size:50px]",
          )}
        >
          <div className="relative h-full mask-[linear-gradient(transparent,black_20%,black_80%,transparent),linear-gradient(90deg,transparent,black_20%,black_80%,transparent)] md:mask-[linear-gradient(90deg,transparent,black_20%,black_80%,transparent)]">
            <Grid x={-1} y={-1} size={50} className="hidden md:block" />
            <Grid x={-1} y={-1} size={40} className="md:hidden" />
          </div>
          <IntegrationButton
            className="[--x:2] [--y:1] md:[--x:2] md:[--y:2]"
            image={{ light: githubLight, dark: githubDark }}
            title="GitHub"
          />
          <IntegrationButton
            className="[--x:4] [--y:4] md:[--x:6] md:[--y:4]"
            image={slack}
            title="Slack"
          />
          <IntegrationButton
            className="[--x:6] [--y:1] md:[--x:10] md:[--y:2]"
            image={gitlab}
            title="GitLab"
          />
        </div>
      </Container>
    </section>
  );
}

function IntegrationButton(props: {
  image: ThemeImageProps["src"];
  title: string;
  className: string;
}) {
  const { image, title, className } = props;
  return (
    <Tooltip
      content={<span className="text-xs">Explore {title} integration</span>}
      delayDuration={0}
      side="bottom"
    >
      <div
        className={clsx(
          "bg-app absolute size-[calc(var(--grid-size)*2+1px)] rounded-lg border shadow",
          "top-[calc(var(--grid-size)*var(--y)-1px)] left-[calc(var(--grid-size)*var(--x)-1px)]",
          "transition duration-150 hover:scale-110 hover:shadow-lg",
          className,
        )}
      >
        <ThemeImage src={image} alt={title} className="size-full" />
      </div>
    </Tooltip>
  );
}
