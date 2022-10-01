import Image from "next/image";
import { x } from "@xstyled/styled-components";
import {
  SparklesIcon,
  EyeIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import {
  CameraIcon,
  ArrowUpOnSquareStackIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import heroIllustration from "@/images/hero-illustration.png";
import {
  Features,
  Feature,
  FeatureIcon,
  FeatureTitle,
  FeatureText,
} from "../components/Feature";
import { Compatibility } from "@/components/Compatibility";

const main = {
  title: "Home Sections",
};

export default main;

export const AboveTheFold = () => (
  <x.div display="flex" gap={11} alignItems="center">
    <x.div display="flex" flexDirection="column" gap={6} flex={1}>
      <Chip link>
        <x.div as={SparklesIcon} w={4} />
        <x.span fontWeight="700">New · </x.span>
        Storybook support
      </Chip>
      <x.h1 text="h1">Ship pixel perfect apps with no bug.</x.h1>
      <x.p text="hero-paragraph">
        Argos detects all visual changes in websites, components or applications
        and notifies in pull-requests.
      </x.p>
      <x.div display="flex" gap={{ _: 4, sm: 6 }}>
        <Button>View a demo build</Button>
        <Button color="secondary" variant="outline">
          Documentation
        </Button>
      </x.div>
    </x.div>

    <x.div flex={1} display={{ _: "none", md: "block" }}>
      <x.img src={heroIllustration} alt="hero-illustration" w={1} />
    </x.div>
  </x.div>
);

export const HowDoesItWorks = () => (
  <x.div display="flex" flexDirection="column" gap={6} alignItems="center">
    <Chip link>
      <x.div as={EyeIcon} w={4} />
      What is Argos?
    </Chip>
    <x.h2 text="h2" textAlign="center">
      Get instant value from a simple screenshot
    </x.h2>
    <x.p text="paragraph" textAlign="center">
      Take screenshots, upload them and get instant value by being notified of
      changes.
    </x.p>
    <Features>
      <Feature>
        <FeatureIcon icon={CameraIcon} />
        <FeatureTitle>Take screenshots</FeatureTitle>
        <FeatureText>
          Use one of Argos’ many integrations to take screenshots or do it
          yourself.
        </FeatureText>
      </Feature>
      <Feature>
        <FeatureIcon icon={ArrowUpOnSquareStackIcon} color="orange" />
        <FeatureTitle>Upload screenshots</FeatureTitle>
        <FeatureText>
          Add one command in your CI to upload screenshots to Argos.
        </FeatureText>
      </Feature>
      <Feature>
        <FeatureIcon icon={CheckCircleIcon} color="green" />
        <FeatureTitle>Review changes</FeatureTitle>
        <FeatureText>
          Get status on your pull-requests and use Argos to review and approve
          changes.
        </FeatureText>
      </Feature>
    </Features>
  </x.div>
);

export const CompatibilitySection = () => (
  <x.div
    display="flex"
    flexDirection={{ _: "column", md: "row" }}
    gap={16}
    alignItems="center"
  >
    <x.div flex={1} display="flex" justifyContent="center">
      <Compatibility />
    </x.div>
    <x.div display="flex" flexDirection="column" gap={6} flex={1}>
      <Chip>
        <x.div as={Square3Stack3DIcon} w={4} />
        Easy integration
      </Chip>
      <x.h2 text="h2">Compatible with your stack</x.h2>
      <x.p text="paragraph">
        Argos offers SDK for most frameworks, testing libraries and CI
        providers. This is not mandatory, as long as you can take screenshots,
        you can use Argos.
      </x.p>
    </x.div>
  </x.div>
);
