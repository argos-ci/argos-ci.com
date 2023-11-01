import { Container } from "@/components/Container";
import { AppSvg } from "./AppSvg";
import { AutomaticCheck } from "./AutomaticCheck";
import { Button } from "@/components/Button";

const BgGradient = () => {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute rounded-full bg-red-8 inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[100px]"
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
        <div className="flex items-center flex-col lg:flex-row py-24 gap-x-6 gap-y-12">
          <div className="flex flex-col items-center lg:items-start gap-6 text-center lg:text-left">
            <h1 className="font-accent text-[3.5rem] leading-tight lg:leading-none md:text-7xl bg-hero-text-gradient lg:bg-hero-text-gradient-lg bg-clip-text text-transparent">
              Visual Testing <br className="hidden lg:block" />
              for developers
            </h1>
            <div className="text-low text-xl">
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
          <div className="flex-1 relative flex items-center justify-end">
            <div className="relative w-[80vw] lg:w-[85%] z-10">
              <AppSvg />
              <AutomaticCheck className="mt-5 -ml-5" />
            </div>
            <BgGradient />
          </div>
        </div>
      </section>
    </Container>
  );
}
