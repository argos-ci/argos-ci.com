import {
  BugPlayIcon,
  CircleDotIcon,
  EyeIcon,
  ImageOffIcon,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";

import playwrightLogo from "./playwright-logo.svg";

function FeatureDetail({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <Icon className="h-12 w-12" strokeWidth={1} />
      <h3 className="mb-1 flex items-center gap-2 text-lg font-medium">
        {title}
      </h3>
      <div className="text-low">{text}</div>
    </div>
  );
}

export function Playwright() {
  return (
    <Container
      className="flex flex-col items-center gap-20 py-16 md:py-20"
      asChild
    >
      <section>
        <H2 className="text-center">
          Upgrade{" "}
          <span className="inline-flex items-center gap-4">
            Playwright
            <Image
              className="mt-[0.2em] h-[1em] w-[1em]"
              alt="Playwright logo"
              src={playwrightLogo.src}
              width={20}
              height={20}
            />
          </span>{" "}
          with Argos
        </H2>
        <div className="grid grid-cols-1 gap-x-4 gap-y-12 md:grid-cols-3">
          <FeatureDetail
            icon={ImageOffIcon}
            title="Failure Screeenshots"
            text="Check failure screenshots from your CI tests directly in Argos."
          />
          <FeatureDetail
            icon={BugPlayIcon}
            title="Online Trace Viewer"
            text="“Time travel” through your failing tests with Playwright Traces."
          />
          <FeatureDetail
            icon={EyeIcon}
            title="Visual Testing on CI"
            text="Upgrade Playwright Visual Testing by running them on CI."
          />
        </div>
        <Link
          className="rounded border p-4 px-8 text-center text-xl font-medium transition hover:border-hover"
          href="/playwright"
        >
          Discover the future of Playwright testing
        </Link>
      </section>
    </Container>
  );
}
