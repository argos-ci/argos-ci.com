/* eslint-disable react/no-unescaped-entities */
import NextLink from "next/link";
import Image from "next/image";
import { x, useUp } from "@xstyled/styled-components";
import {
  SparklesIcon,
  EyeIcon,
  Square3Stack3DIcon,
  RocketLaunchIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
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
  FeatureList,
  Feature,
  FeatureIcon,
  FeatureTitle,
  FeatureText,
} from "@/components/Feature";
import { CompatibilityIllustration } from "@/components/CompatibilityIllustration";
import argosDiagramMobile from "@/images/argos-diagram-mobile.png";
import argosDiagramDesktop from "@/images/argos-diagram-desktop.png";
import tassinariProfile from "@/images/tassinari-profile.png";
import { Testimonials } from "@/components/Testimonials";
import { AntDesign } from "@/components/brands/AntDesign";
import { GitBook } from "@/components/brands/GitBook";
import { LeMonde } from "@/components/brands/LeMonde";
import { Doctolib } from "@/components/brands/Doctolib";
import { Mui } from "@/components/brands/Mui";
import { AppFooter } from "@/containers/AppFooter";
import { AppNavbar } from "@/containers/AppNavbar";
import { Container } from "@/components/Container";
import { RotateBackground } from "@/components/RotateBackground";
import Link from "next/link";

export default function Home() {
  return (
    <x.div overflow="hidden">
      <AppNavbar />

      <RotateBackground
        backgroundImage="gradient-to-b"
        gradientFrom="lighter"
        gradientTo="sky-100-a60"
        py={20}
      >
        <Container display="flex" gap={11} alignItems="center">
          <x.div display="flex" flexDirection="column" gap={6} flex={1}>
            <Link href="https://docs.argos-ci.com/puppeteer" passHref>
              <Chip icon={SparklesIcon} clickable as="a">
                <x.span fontWeight="700">New · </x.span>
                Puppeteer support
              </Chip>
            </Link>
            <x.h1 text="h1">Ship pixel perfect apps with no bug.</x.h1>
            <x.p text="teaser">
              Argos detects all visual changes in websites, components or
              applications and notifies in pull-requests.
            </x.p>
            <x.div display="flex" gap={{ _: 4, sm: 6 }}>
              <Link
                href="https://app.argos-ci.com/mui/material-ui/builds/3915"
                passHref
              >
                <Button as="a">View a demo build</Button>
              </Link>
              <Link href="https://docs.argos-ci.com" passHref>
                <Button color="secondary" variant="outline">
                  Documentation
                </Button>
              </Link>
            </x.div>
          </x.div>

          <x.div flex={1} display={{ _: "none", md: "block" }} mt={10}>
            <Image
              src={heroIllustration}
              alt="hero-illustration"
              width={1016}
              height={678}
              layout="responsive"
            />
          </x.div>
        </Container>
      </RotateBackground>

      <Container>
        <x.section
          display="flex"
          flexDirection="column"
          gap={6}
          alignItems="center"
          textAlign="center"
          mt={300}
        >
          <Chip icon={EyeIcon}>What is Argos?</Chip>
          <x.h2 text="h2">Get instant value from a simple screenshot</x.h2>
          <x.p text="teaser">
            Take screenshots, upload them and get instant value by being
            notified of changes.
          </x.p>
          <FeatureList>
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
                Get status on your pull-requests and use Argos to review and
                approve changes.
              </FeatureText>
            </Feature>
          </FeatureList>
        </x.section>

        <x.section
          display="flex"
          flexDirection={{ _: "column", md: "row" }}
          alignItems="center"
          gap={16}
          mt={200}
        >
          <x.div flex={1} display="flex" justifyContent="center">
            <CompatibilityIllustration />
          </x.div>
          <x.div display="flex" flexDirection="column" gap={6} flex={1}>
            <Chip icon={Square3Stack3DIcon}>Easy integration</Chip>
            <x.h2 text="h2">Compatible with your stack</x.h2>
            <x.p text="teaser">
              Argos offers SDK for most frameworks, testing libraries and CI
              providers. This is not mandatory, as long as you can take
              screenshots, you can use Argos.
            </x.p>
          </x.div>
        </x.section>

        <x.section
          display="flex"
          flexDirection={{ _: "column", md: "row" }}
          gap={20}
          mt={250}
          alignItems="center"
        >
          <x.div
            flex={1}
            display={{ _: "flex", md: "none" }}
            justifyContent="center"
            w={1}
          >
            <Image
              src={argosDiagramMobile}
              alt="argos-diagram"
              width={300}
              height={340}
              layout="fixed"
            />
          </x.div>

          <x.div flex={1} display="flex" flexDirection="column" gap={6}>
            <Chip icon={RocketLaunchIcon}>Unified platform</Chip>
            <x.h2 text="h2">Review websites, apps and components together</x.h2>
            <x.p text="teaser">
              Argos has no limit. Whether it's a single component or a website
              in multiple resolutions, everything is possible. Use a single tool
              for Visual Testing.
            </x.p>
          </x.div>

          <x.div flex={1} display={{ _: "none", md: "block" }}>
            <Image
              src={argosDiagramDesktop}
              alt="argos-diagram"
              width={884}
              height={529}
              layout="responsive"
            />
          </x.div>
        </x.section>
      </Container>

      <RotateBackground
        as="section"
        backgroundImage="gradient-to-b"
        gradientFrom="fuchsia-100-a30"
        gradientTo="sky-100-a30"
        pt={120}
        pb={150}
        mt={200}
      >
        <Container
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={8}
          textAlign="center"
          mb={8}
        >
          <x.div text="quote">
            "Argos helps us every day to avoid regression on all MUI
            components."
          </x.div>
          <x.div w={20} h={20} borderRadius="full">
            <Image
              src={tassinariProfile}
              alt="argos-diagram"
              layout="responsive"
            />
          </x.div>
          <x.div lineHeight={1.5} fontWeight="semibold">
            Olivier Tassinari
            <br />
            Founder & CEO of MUI
          </x.div>
          <x.hr borderBottom={1} borderColor="primary-border" w={1} />
          <x.div
            color="on"
            fontWeight="medium"
            fontSize="sm"
            lineHeight={1.4}
            letterSpacing="widest"
          >
            TRUSTED BY THE BEST FRONT-END TEAMS
          </x.div>
        </Container>
        <Testimonials gap={10} repeat={4}>
          <Mui />
          <AntDesign />
          <Doctolib />
          <LeMonde />
          <GitBook />
        </Testimonials>
      </RotateBackground>

      <Container>
        <x.section
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={6}
          textAlign="center"
          mt={200}
          mb={200}
        >
          <Chip icon={HeartIcon}>Open source</Chip>
          <x.h2 text="h2">Join the community</x.h2>
          <x.p text="teaser">
            Argos is open source and community driven. Supported by a network of
            early advocates, contributors, and champions.
          </x.p>
          <Link href="https://discord.gg/FNGFpJS9" passHref>
            <Button display="flex" gap={1} w="fit-content" as="a">
              <x.svg as={ChatBubbleLeftRightIcon} w={4} />
              Chat about Argos on Discord
            </Button>
          </Link>
        </x.section>
      </Container>
      <AppFooter />
    </x.div>
  );
}
