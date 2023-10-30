import Image from "next/image";
import { ColoredCard } from "../common/ColoredCard";
import { Feature } from "../common/Feature";
import failureScreenshotLight from "./failure-screenshot-light.svg";
import failureScreenshotDark from "./failure-screenshot-dark.svg";
import replayDoloLight from "./replay-dolo-light.svg";
import replayDoloDark from "./replay-dolo-dark.svg";

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
        <Image
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
        />
      </ColoredCard>
    </Feature>
  );
}
