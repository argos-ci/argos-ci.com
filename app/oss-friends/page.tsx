import { Metadata } from "next";

import { CallToActionSection } from "@/components/CallToActionSection";
import { Container } from "@/components/Container";
import { FullPageGrid } from "@/components/FullPageGrid";
import { Hero, HeroDescription, HeroHeading } from "@/components/Hero";
import { getMetadata } from "@/lib/metadata";

export const metadata: Metadata = getMetadata({
  title: "OSS Friends",
  description: "Open-source projects and tools for an open world.",
  pathname: "/oss-friends",
});

type Friend = {
  name: string;
  description: string;
  href: string;
};

export default async function Page() {
  const res = await fetch("https://formbricks.com/api/oss-friends");
  const { data: friends } = (await res.json()) as { data: Friend[] };
  return (
    <>
      <div className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-75 md:py-24">
          <FullPageGrid height="h-200 md:h-75" />
          <Hero align="center" className="relative">
            <HeroHeading>Our Open-source Friends</HeroHeading>
            <HeroDescription>
              In Argos, we are proud to collaborate with a diverse group of
              partners to promote open-source software and the values of
              transparency, collaboration, and community that it represents.
            </HeroDescription>
          </Hero>
        </Container>
      </div>
      <div className="px-4">
        <Container noGutter>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {friends.map(({ name, description, href }, index) => {
              return (
                <li
                  key={index}
                  className="border-x border-b sm:max-lg:not-nth-[2n]:border-r-transparent lg:not-nth-[3n]:border-r-transparent"
                >
                  <article className="flex h-full flex-col justify-between p-8">
                    <div>
                      <header>
                        <h3 className="font-accent text-2xl font-semibold">
                          {name}
                        </h3>
                      </header>
                      <p className="text-low mt-4 font-light">{description}</p>
                    </div>
                    <div className="mt-6">
                      <a
                        className="text-sm font-medium underline hover:no-underline"
                        href={href}
                        target="_blank"
                      >
                        Visit {name}
                      </a>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </Container>
        <div className="-mt-px border-t">
          <Container className="h-12 border-x" />
        </div>
      </div>
      <CallToActionSection />
    </>
  );
}
