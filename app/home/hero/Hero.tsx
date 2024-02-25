import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

import { AppSvg } from "./AppSvg";
import { AutomaticCheck } from "./AutomaticCheck";

const BgGradient = () => {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-8 blur-[100px]"
        style={{
          width: "80%",
          height: "80%",
          background:
            "linear-gradient(180deg, rgba(205, 123, 255, 0.4) 0%, rgba(255, 197, 111, 0.3) 100%)",
        }}
      />
      <div
        className="absolute rounded-full bg-yellow-8 blur-[50px]"
        style={{
          width: "30%",
          height: "30%",
          top: "20%",
          left: "50%",
          background:
            "linear-gradient(180deg, rgba(242, 47, 176, 0.2) 0%, rgba(245, 138, 37, 0) 100%)",
        }}
      />
    </div>
  );
};

export function Hero() {
  return (
    <Container className="relative" asChild>
      <section>
        <div className="flex flex-col items-center gap-x-6 gap-y-12 py-8 md:py-24 lg:flex-row">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <Link
              className="rounded-lg border border-violet-6 bg-violet-2 px-2 py-1 text-sm transition hover:bg-violet-3"
              href="/playwright"
            >
              Introducing Playwright Test Debugging{" "}
              <ChevronRightIcon className="inline h-4 w-4" />
            </Link>
            <h1 className="bg-hero-text-gradient bg-clip-text font-accent text-[3.2rem] leading-tight text-transparent md:text-7xl lg:bg-hero-text-gradient-lg lg:leading-none">
              Visual Testing <br />
              for developers
            </h1>
            <div className="text-xl text-low">
              Argos provides the developer tools{" "}
              <br className="hidden lg:block" />
              to <strong className="font-medium text">debug tests</strong> and
              detect{" "}
              <strong className="font-medium text">visual regressions</strong>.
            </div>
            <div className="flex gap-4">
              <Button size="large" variant="primary" asChild>
                <a target="_blank" href="https://app.argos-ci.com/signup">
                  Start for free
                </a>
              </Button>
              <Button size="large" variant="outline" asChild>
                <a
                  target="_blank"
                  href="https://app.argos-ci.com/argos-ci/argos-ci.com/builds/20/31313699"
                >
                  See a demo build
                </a>
              </Button>
            </div>
          </div>
          <div className="relative mt-4 flex flex-1 items-center justify-end md:mt-0">
            <div className="relative z-10 w-[80vw] lg:w-[85%]">
              <a
                className="group relative block"
                target="_blank"
                href="https://app.argos-ci.com/argos-ci/argos-ci.com/builds/20/31313699"
              >
                <div className="absolute inset-0 overflow-hidden rounded bg-gradient-to-br from-violetA-11 to-plumA-10 opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 flex scale-50 transform items-center justify-center rounded opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100">
                  <div className="font-accent text-2xl text-mauve-1 drop-shadow-lg md:text-4xl">
                    See a demo build
                  </div>
                </div>
                <AppSvg />
              </a>
              <AutomaticCheck
                className="-ml-5 mt-5"
                data-visual-test="blackout"
              />
            </div>
            <BgGradient />
          </div>
        </div>
      </section>
    </Container>
  );
}
