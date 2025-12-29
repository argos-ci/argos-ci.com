import { Code2, MessagesSquare, ShieldCheck } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import type { ComponentType } from "react";

import { Button } from "@/components/Button";
import { Container, SideBorder } from "@/components/Container";
import { Hero, HeroDescription, HeroHeading } from "@/components/Hero";
import { StatusWidget } from "@/components/StatusWidget";
import { DiscordIcon } from "@/components/icons/DiscordIcon";
import { getMetadata } from "@/lib/metadata";

type ContactCard = {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const cards: ContactCard[] = [
  {
    title: "Sales",
    description:
      "Speak with our sales team about features, plan pricing, or request a demo.",
    cta: "Talk to sales",
    href: "mailto:contact@argos-ci.com?subject=Sales%20inquiry",
    icon: ShieldCheck,
  },
  {
    title: "Support",
    description:
      "Chat with us about product support, resolve billing questions, or provide feedback.",
    cta: "Get support",
    href: "mailto:contact@argos-ci.com?subject=Support%20request",
    icon: MessagesSquare,
  },
  {
    title: "Discord",
    description:
      "Join the community of Argos users on Discord to get help and to speak with the team.",
    cta: "Join Discord",
    href: "/articles",
    icon: DiscordIcon,
  },
  {
    title: "Developer Docs",
    description:
      "Read about Argos platform development and API usage documentation.",
    cta: "Read docs",
    href: "/docs",
    icon: Code2,
  },
];

export const metadata: Metadata = getMetadata({
  title: "Contact",
  description:
    "Contact the Argos team to discuss visual testing, CI stability, and product quality. Get help with setup, scaling, or enterprise needs and ship faster with confidence.",
  pathname: "/contact",
});

export default function SecurityPage() {
  return (
    <>
      <section className="overflow-hidden border-b px-4">
        <Container className="relative py-16 md:h-90 md:py-24">
          <div className="absolute inset-0">
            <SideBorder />
          </div>
          <Hero align="center" className="relative">
            <HeroHeading>How can we help?</HeroHeading>
            <HeroDescription>
              Get in touch for sales and support, or dive into our product docs.
            </HeroDescription>
            <StatusWidget />
          </Hero>
        </Container>
      </section>
      <section className="px-4">
        <Container noGutter className="border-x">
          <div className="grid max-md:divide-y md:grid-cols-2">
            {cards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="flex flex-col gap-4 px-6 py-10 md:px-12 md:odd:border-r md:nth-[-n+2]:border-b"
                >
                  <Icon className="size-10" aria-hidden />
                  <div>
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <p className="text-low mt-2 text-base leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <Button
                    asChild
                    size="large"
                    variant="outline"
                    className="mt-2 self-start"
                  >
                    <Link href={card.href}>{card.cta}</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
