import {
  GlobeIcon,
  LockIcon,
  RocketIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Link from "next/link";

import { storybook } from "@/app/assets/brands/library";
import { ArgosEmblem } from "@/components/ArgosEmblem";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DotIndicator } from "@/components/DotIndicator";
import { SectionHeader, SectionHeaderTexts } from "@/components/SectionHeader";
import { ThemeImage } from "@/components/ThemeImage";
import { FeatureIndicator } from "@/components/feature-section/FeatureSection";
import { SectionDescription, SectionTitle } from "@/components/Typography";

const POINTS = [
  {
    icon: RocketIcon,
    title: "A live preview on every PR",
    text: "Run argos deploy ./storybook-static and get a unique, shareable URL for each pull request — no extra infra to maintain.",
  },
  {
    icon: GlobeIcon,
    title: "Preview and production, built in",
    text: "PRs ship to immutable preview URLs; merges promote to a stable production domain, all reported in the PR comment.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Access protection",
    text: "Keep previews private to your team while leaving production public — or lock everything behind Argos login.",
  },
];

export function Deployments() {
  return (
    <section className="separator-b relative px-4">
      <Container noGutter className="border-x">
        <SectionHeader className="container-gutter">
          <SectionHeaderTexts>
            <FeatureIndicator color="teal">Deployments</FeatureIndicator>
            <SectionTitle>Deploy Storybook on every PR</SectionTitle>
            <SectionDescription className="max-w-2xl">
              Turn Argos into a host for your static builds. Storybook, Vite,
              Next.js exports, or plain HTML — deployed to a live URL and wired
              straight into your pull request.
            </SectionDescription>
          </SectionHeaderTexts>
          <Button variant="outline" asChild>
            <Link href="/deployments">Explore Deployments</Link>
          </Button>
        </SectionHeader>
        <div className="grid border-t md:grid-cols-2">
          <div className="relative flex items-center justify-center border-b p-6 md:border-r md:border-b-0 md:p-10">
            <DeployPreview />
          </div>
          <ul className="flex flex-col divide-y">
            {POINTS.map((point) => (
              <li key={point.title} className="flex gap-4 p-6 md:p-8">
                <point.icon
                  className="mt-0.5 size-5 shrink-0 text-(--teal-11)"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="font-accent font-medium">{point.title}</h3>
                  <p className="text-low text-sm">{point.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function DeployPreview() {
  return (
    <div className="bg-app animate-slide-up-fade motion-reduce:animate-fade-in animate-duration-500 fill-mode-both w-full max-w-md overflow-hidden rounded-xl border-[0.5px] shadow-md/7">
      <div className="flex items-center gap-2 border-b-[0.5px] px-3 py-2">
        <ArgosEmblem className="size-4 text-(--teal-11)" />
        <span className="text-xs font-medium">Argos Deployment</span>
        <Badge className="text-xxs ml-auto gap-1 border-(--success-7) text-(--success-11)">
          <DotIndicator variant="success" />
          Ready
        </Badge>
      </div>
      <div className="space-y-3 p-4">
        <EnvRow
          icon={
            <ThemeImage src={storybook.logo} alt="" className="size-4" />
          }
          label="Preview"
          url="pr-482.storybook.argos.app"
          tag="feat/checkout"
          tone="teal"
        />
        <EnvRow
          icon={<GlobeIcon className="size-4 text-(--primary-11)" />}
          label="Production"
          url="storybook.acme.com"
          tag="main"
          tone="primary"
        />
      </div>
      <div className="flex items-center gap-2 border-t-[0.5px] px-3 py-2">
        <LockIcon className="text-low size-3" />
        <span className="text-low text-xxs">
          Preview private to your team · Production public
        </span>
      </div>
    </div>
  );
}

function EnvRow(props: {
  icon: React.ReactNode;
  label: string;
  url: string;
  tag: string;
  tone: "teal" | "primary";
}) {
  const { icon, label, url, tag, tone } = props;
  const toneClass = {
    teal: "border-(--teal-7) text-(--teal-11)",
    primary: "border-(--primary-7) text-(--primary-11)",
  }[tone];
  return (
    <div className="flex items-center gap-3 rounded-lg border-[0.5px] p-2.5">
      <span className="bg-app grid size-8 shrink-0 place-items-center rounded-md border-[0.5px]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{label}</span>
          <Badge className={`text-xxs ${toneClass}`}>{tag}</Badge>
        </div>
        <div className="text-low truncate font-mono text-xs">{url}</div>
      </div>
    </div>
  );
}
