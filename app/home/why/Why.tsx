import {
  BlocksIcon,
  BugIcon,
  ChevronRightIcon,
  GaugeIcon,
  LucideIcon,
  SparklesIcon,
} from "lucide-react";
import { twc } from "react-twc";

import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";
import { Link } from "@/components/Link";

const H3 = twc.h3`mb-4 text-xl md:text-2xl font-medium`;

function H4({
  title,
  icon: Icon,
}: {
  title: React.ReactNode;
  icon: LucideIcon;
}) {
  return (
    <h4 className="mb-3 flex items-center gap-2 font-medium md:text-lg">
      <Icon className="h-5 w-5 text-violet-11" strokeWidth={1} /> {title}
    </h4>
  );
}

export function Why() {
  return (
    <Container className="py-16 md:py-20" asChild>
      <section>
        <H2 className="mb-12 text-center">Why do you need Argos?</H2>
        <div className="flex flex-col gap-12 md:flex-row">
          <div className="flex flex-[3] flex-col gap-8">
            <div>
              <H3>What is Visual Testing?</H3>
              <p className="mb-4">
                Visual testing ensures that a UI's appearance matches its
                intended design, capturing and highlighting any visual
                deviations from expected elements like layout, colors, and text.
              </p>
              <p className="mb-4">
                While E2E testing confirms functionality, visual testing with
                Argos ensures the UI looks right to the user, acting as a
                specialized tool to maintain visual quality alongside E2E tests.
              </p>
              <p>
                <Link
                  href="/blog/what-is-visual-testing"
                  className="group font-medium"
                >
                  Read more about what is visual testing
                  <ChevronRightIcon className="inline size-5 align-[-20%] transition group-hover:translate-x-1" />
                </Link>
              </p>
            </div>
          </div>
          <div className="flex-[5]">
            <H3>Why using Argos?</H3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <H4 icon={GaugeIcon} title="Visual testing that scales" />
                <p>
                  Argos does not require you to commit screenshots, making
                  visual testing a seamless part of your CI flow.
                </p>
              </div>
              <div>
                <H4 icon={SparklesIcon} title="The best review UI" />
                <p>
                  Argos provides a clean and intuitive UI for reviewing visual
                  changes, making it easy to spot regressions.
                </p>
              </div>
              <div>
                <H4 icon={BlocksIcon} title="Git Integrations" />
                <p>
                  Argos is perfectly integrated with GitHub and GitLab, making
                  it easy to see visual changes in your PRs.
                </p>
              </div>
              <div>
                <H4 icon={BugIcon} title="Debugging" />
                <p>
                  Argos helps you debug your tests with failure screenshots and
                  Playwright traces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
