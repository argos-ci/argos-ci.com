import Image from "next/image";
import { ColoredCard } from "../common/ColoredCard";
import { Feature } from "../common/Feature";
import failureScreenshotLight from "./failure-screenshot-light.svg";
import failureScreenshotDark from "./failure-screenshot-dark.svg";
import replayLight from "./replay-light.svg";
import replayDark from "./replay-dark.svg";
import doloreanLight from "./dolorean-light.svg";
import doloreanDark from "./dolorean-dark.svg";

export function TestDebugging() {
  return (
    <Feature
      surtitle="End-to-end tests debugging"
      title={
        <>
          See, Replay, Resolve.
          <br />
          Debug CI failures instantly.
        </>
      }
    >
      <ColoredCard
        color="red"
        surtitle="Failure screenshots"
        title="Troubleshoot tests effortlessly."
        text="Screenshots of test failures happening on CI are automatically captured and visible in Argos."
      >
        <Image
          src={failureScreenshotLight.src}
          width={460}
          height={295}
          alt=""
          className="dark:hidden"
        />
        <Image
          src={failureScreenshotDark.src}
          width={460}
          height={295}
          alt=""
          className="hidden dark:block"
        />
      </ColoredCard>
      <ColoredCard
        color="sky"
        surtitle="Test replays"
        title="Time travel in your tests."
        text="Playwright traces (replays) offer a comprehensive snapshot of your test's breakdown."
      >
        <div className="relative pt-6">
          <div className="flex justify-end mr-[10%]">
            <Image
              src={replayLight.src}
              width={310}
              height={214}
              alt=""
              className="dark:hidden"
            />
            <Image
              src={replayDark.src}
              width={310}
              height={214}
              alt=""
              className="hidden dark:block"
            />
          </div>
          <div className="absolute -mt-[15%] animate-float">
            <Image
              src={doloreanLight.src}
              width={296}
              height={130}
              alt=""
              className="dark:hidden"
            />
            <Image
              src={doloreanDark.src}
              width={296}
              height={130}
              alt=""
              className="hidden dark:block"
            />
          </div>
        </div>
        {/* <Image
          src={replayDoloLight.src}
          width={440}
          height={295}
          alt=""
          className="pt-6 dark:hidden"
        />
        <Image
          src={replayDoloDark.src}
          width={440}
          height={295}
          alt=""
          className="pt-6 hidden dark:block"
        /> */}
      </ColoredCard>
    </Feature>
  );
}
