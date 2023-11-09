import { clsx } from "clsx";
import {
  BugOffIcon,
  CheckCircleIcon,
  LucideIcon,
  RocketIcon,
  SparklesIcon,
} from "lucide-react";
import {
  ComponentProps,
  ComponentType,
  DetailedHTMLProps,
  HTMLAttributes,
  forwardRef,
} from "react";

import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";
import { twc } from "@/lib/twc";

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
              <p>
                While E2E testing confirms functionality, visual testing with
                Argos ensures the UI looks right to the user, acting as a
                specialized tool to maintain visual quality alongside E2E tests.
              </p>
            </div>
          </div>
          <div className="flex-[5]">
            <H3>The Benefits of Visual Testing with Argos</H3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <H4 icon={BugOffIcon} title="Detect Visual Regressions" />
                <p>
                  Detect and prevent UI issues that could negatively impact user
                  perception and experience.
                </p>
              </div>
              <div>
                <H4 icon={SparklesIcon} title="Enhance Quality Assurance" />
                <p>
                  Integrate visual checks to complement functional tests,
                  covering more ground with automated precision.
                </p>
              </div>
              <div>
                <H4 icon={CheckCircleIcon} title="Streamline Development" />
                <p>
                  Facilitate faster feedback and iteration by catching visual
                  issues early in the development process.
                </p>
              </div>
              <div>
                <H4 icon={RocketIcon} title="Scalability Refined" />
                <p>
                  With Argos, there's no need to commit screenshots. Visual
                  testing becomes a seamless part of your CI flow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
