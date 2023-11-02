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
        <div className="flex flex-col items-center gap-x-6 gap-y-12 py-24 lg:flex-row">
          <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <h1 className="bg-hero-text-gradient bg-clip-text font-accent text-[3.5rem] leading-tight text-transparent md:text-7xl lg:bg-hero-text-gradient-lg lg:leading-none">
              Visual Testing <br className="hidden lg:block" />
              for developers
            </h1>
            <div className="text-xl text-low">
              Argos provides the developer tools{" "}
              <br className="hidden lg:block" />
              to <strong className="font-medium text">debug tests</strong> and
              detects{" "}
              <strong className="font-medium text">visual regressions</strong>.
            </div>
            <div className="flex gap-4">
              <Button size="large" variant="primary" asChild>
                <a target="_blank" href="https://app.argos-ci.com/signup">
                  Get started
                </a>
              </Button>
              <Button size="large" variant="outline" asChild>
                <a target="_blank" href="https://argos-ci.com/docs/">
                  Documentation
                </a>
              </Button>
            </div>
          </div>
          <div className="relative flex flex-1 items-center justify-end">
            <div className="relative z-10 w-[80vw] lg:w-[85%]">
              <AppSvg />
              <AutomaticCheck className="-ml-5 mt-5" />
            </div>
            <BgGradient />
          </div>
        </div>
      </section>
    </Container>
  );
}
