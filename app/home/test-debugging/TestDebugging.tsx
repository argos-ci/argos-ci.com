import Image from "next/image";
import { ColoredCard } from "../common/ColoredCard";
import { Feature } from "../common/Feature";
import failureScreenshotLight from "./failure-screenshot-light.svg";
import failureScreenshotDark from "./failure-screenshot-dark.svg";
import replayLight from "./replay-light.svg";
import replayDark from "./replay-dark.svg";
import doloreanLight from "./dolorean-light.svg";
import doloreanDark from "./dolorean-dark.svg";
import { FailureScreenshotSvg } from "./FailureScreenshotSvg";

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
        <div className="w-full flex items-center h-full">
          <FailureScreenshotSvg />
        </div>
      </ColoredCard>
      <ColoredCard
        color="sky"
        surtitle={
          <>
            Test replays
            <div className="ml-2 text-xs px-1 py-0.5 bg-plum-1 border border-plum-6 text-plum-10 rounded inline-block">
              Coming soon
            </div>
          </>
        }
        title="Time travel in your tests."
        text="Playwright traces (replays) offer a comprehensive snapshot of your test's breakdown."
      >
        <div className="relative pt-10 flex justify-center">
          <div className="flex justify-end w-full md:w-2/3">
            <Image
              src={replayLight.src}
              width={310}
              height={214}
              alt=""
              className="dark:hidden w-full"
            />
            <Image
              src={replayDark.src}
              width={310}
              height={214}
              alt=""
              className="hidden dark:block w-full"
            />
          </div>
          <div className="absolute left-0 -bottom-[20%] w-2/3 animate-float">
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
      </ColoredCard>
    </Feature>
  );
}
