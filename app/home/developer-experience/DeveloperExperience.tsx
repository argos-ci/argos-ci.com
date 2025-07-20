import Image from "next/image";

import { Container } from "@/components/Container";
import { H2 } from "@/components/H2";

import { DxCard } from "./DxCard";
import keyboardDark from "./keyboard-dark.png";
import keyboardLight from "./keyboard-light.png";
import neonDiscord from "./neon-discord.png";
import openSource from "./open-source.png";
import zap from "./zap.png";

export function DeveloperExperience() {
  return (
    <Container className="py-16 md:py-20" asChild>
      <section>
        <H2 className="mb-6 text-center">
          Built for developers and QA engineers.
        </H2>
        <div className="text-low mb-12 text-center text-lg md:text-xl">
          Crafted by engineers for engineers, Argos seamlessly merges
          pixel-perfect design with unparalleled precision, embodying both
          aesthetic grace and peak performance.
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <DxCard
            title="Natural keyboard navigation."
            text="Argos review app has keyboard shortcuts for every action you need. Don’t click, review."
          >
            <Image
              src={keyboardLight.src}
              width={1024}
              height={707}
              style={{
                height: "100%",
                width: "auto",
              }}
              alt="Keyboard with Argos logo"
              className="py-6 dark:hidden"
            />
            <Image
              src={keyboardDark.src}
              width={1024}
              height={707}
              style={{
                height: "100%",
                width: "auto",
              }}
              alt="Keyboard with Argos logo"
              className="hidden py-6 dark:block"
            />
          </DxCard>
          <DxCard
            title="Built to be fast."
            text="Nobody likes waiting for tests. With Argos, you won't have to. It is just fast."
          >
            <div className="flex h-full min-h-0 flex-col items-center gap-2 py-6">
              <div className="relative min-h-0 flex-1">
                <Image
                  src={zap.src}
                  width={98}
                  height={98}
                  style={{
                    height: "100%",
                    width: "auto",
                  }}
                  alt="Bolt"
                />
              </div>
              <div className="font-accent bg-linear-to-r from-(--violet-11) to-(--pink-12) bg-clip-text text-center text-xl text-transparent select-none md:text-4xl">
                2236 screenshots
                <br />
                compared in 243ms.
              </div>
            </div>
          </DxCard>
          <DxCard
            title="Open source, pure and true."
            text="Embracing community collaboration and transparency, Argos is 100% open source."
          >
            <Image
              src={openSource.src}
              width={200}
              height={200}
              style={{
                width: "auto",
                height: "85%",
              }}
              alt="Open Source logo"
              quality={95}
            />
          </DxCard>
          <DxCard
            title="A community of developers."
            text="Join our vibrant developer community to share your feedback, get help or submit a feature!"
          >
            <Image
              src={neonDiscord.src}
              width={340}
              height={284}
              style={{
                height: "auto",
                width: "auto",
              }}
              alt="Discord logo"
              quality={95}
            />
          </DxCard>
        </div>
      </section>
    </Container>
  );
}
