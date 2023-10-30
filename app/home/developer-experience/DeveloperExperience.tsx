import { Container } from "@/components/Container";
import { DxCard } from "./DxCard";
import keyboardLight from "./keyboard-light.png";
import keyboardDark from "./keyboard-dark.png";
import zap from "./zap.png";
import openSource from "./open-source.png";
import neonDiscord from "./neon-discord.png";
import Image from "next/image";
import { H2 } from "../common/H2";

export function DeveloperExperience() {
  return (
    <Container className="py-20" asChild>
      <section>
        <H2 className="mb-6 text-center">First-class developer experience.</H2>
        <div className="text-low text-lg md:text-xl mb-12 text-center">
          Crafted by engineers for engineers, Argos seamlessly merges
          pixel-perfect design with unparalleled precision, embodying both
          aesthetic grace and peak performance.
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DxCard
            title="Natural keyboard navigation."
            text="Argos review app has keyboard shortcuts for every action you need. Don’t click, review."
          >
            <Image
              src={keyboardLight.src}
              width={325}
              height={341}
              alt=""
              className="py-6 dark:hidden"
            />
            <Image
              src={keyboardDark.src}
              width={325}
              height={341}
              alt=""
              className="py-6 hidden dark:block"
            />
          </DxCard>
          <DxCard
            title="Built to be fast."
            text="Nobody likes waiting for tests. With Argos, you won't have to. It is just fast."
          >
            <div className="flex flex-col gap-2 items-center">
              <Image src={zap.src} width={98} height={98} alt="" />
              <div className="font-accent text-xl md:text-4xl text-center select-none bg-gradient-to-r from-violet-11 to-pink-12 bg-clip-text text-transparent">
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
              alt=""
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
              alt=""
              quality={95}
            />
          </DxCard>
        </div>
      </section>
    </Container>
  );
}
