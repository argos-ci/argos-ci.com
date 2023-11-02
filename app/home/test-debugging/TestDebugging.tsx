import Image from "next/image";

import { ColoredCard } from "../common/ColoredCard";
import { Feature } from "../common/Feature";
import { FailureScreenshotSvg } from "./FailureScreenshotSvg";
import doloreanDark from "./dolorean-dark.svg";
import doloreanLight from "./dolorean-light.svg";
import failureScreenshotDark from "./failure-screenshot-dark.svg";
import failureScreenshotLight from "./failure-screenshot-light.svg";
import replayDark from "./replay-dark.svg";
import replayLight from "./replay-light.svg";

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
        <FailureScreenshotSvg />
      </ColoredCard>
      <ColoredCard
        color="sky"
        surtitle={
          <>
            Test replays
            <div className="ml-2 inline-block rounded border border-plum-6 bg-plum-1 px-1 py-0.5 text-xs text-plum-10">
              Coming soon
            </div>
          </>
        }
        title="Time travel in your tests."
        text="Playwright traces (replays) offer a comprehensive snapshot of your test's breakdown."
      >
        <div className="relative flex justify-center pt-10">
          <div className="flex w-full justify-end md:w-2/3">
            <Image
              src={replayLight.src}
              width={310}
              height={214}
              alt=""
              className="w-full dark:hidden"
            />
            <Image
              src={replayDark.src}
              width={310}
              height={214}
              alt=""
              className="hidden w-full dark:block"
            />
          </div>
          <div className="absolute -bottom-[20%] left-0 w-[80%] animate-float md:w-[60%]">
            <Image
              src={doloreanLight.src}
              width={296}
              height={130}
              style={{
                width: "100%",
                height: "auto",
              }}
              alt=""
              className="dark:hidden"
            />
            <Image
              src={doloreanDark.src}
              width={296}
              height={130}
              style={{
                width: "100%",
                height: "auto",
              }}
              alt=""
              className="hidden dark:block"
            />
          </div>
        </div>
      </ColoredCard>
    </Feature>
  );
}
