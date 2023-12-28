import Image from "next/image";

import { Dolorean } from "@/components/dolorean/Dolorean";

import { ColoredCard } from "../common/ColoredCard";
import { Feature } from "../common/Feature";
import { FailureScreenshotSvg } from "./FailureScreenshotSvg";
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
        surtitle="Online Trace Viewer"
        title="Time travel in your tests."
        text="Playwright traces offer a comprehensive snapshot of your test's breakdown."
      >
        <div className="relative flex justify-center pt-10">
          <div className="flex w-full justify-end md:w-2/3">
            <Image
              src={replayLight.src}
              width={310}
              height={214}
              alt="User interface showing a Playwright trace"
              className="w-full dark:hidden"
            />
            <Image
              src={replayDark.src}
              width={310}
              height={214}
              alt="User interface showing a Playwright trace"
              className="hidden w-full dark:block"
            />
          </div>
          <Dolorean className="absolute -bottom-[20%] left-0 w-[80%] animate-float md:w-[60%]" />
        </div>
      </ColoredCard>
    </Feature>
  );
}
