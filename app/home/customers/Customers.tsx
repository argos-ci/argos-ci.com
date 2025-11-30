import clsx from "clsx";
import { ArrowRightIcon } from "lucide-react";
import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

import clickhouse from "@/app/assets/customers/140x48/clickhouse.svg";
import mermaid from "@/app/assets/customers/140x48/mermaid.svg";
import meta from "@/app/assets/customers/140x48/meta.svg";
import qonto from "@/app/assets/customers/140x48/qonto.svg";
import gitbook from "@/app/assets/customers/adjusted/gitbook.svg";
import mui from "@/app/assets/customers/adjusted/mui.svg";
import olivierTassinari from "@/app/assets/people/olivier-tassinari.jpg";
import samyPesse from "@/app/assets/people/samy-pesse.jpg";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";

import { SectionHeader, SectionHeaderTexts } from "../common/SectionHeader";
import { SectionDescription, SectionTitle } from "../common/Typography";

export function Customers() {
  return (
    <section className="separator-b relative px-4">
      <Container noGutter className="border-x">
        <div className="border-b">
          <SectionHeader
            align="center"
            className="container-gutter text-center text-balance"
          >
            <SectionHeaderTexts>
              <SectionTitle>
                Chosen by fast-moving startups and enterprise teams
              </SectionTitle>
              <SectionDescription>
                Hundreds of companies rely on Argos to catch visual bugs early,
                speed up reviews and ship UI changes with confidence.
              </SectionDescription>
            </SectionHeaderTexts>
            <Button variant="outline">View all customers</Button>
          </SectionHeader>
        </div>
        <div className="grid grid-cols-2 gap-px bg-(--neutral-6) md:grid-cols-4">
          <CustomerLogo company={{ name: "Meta", logo: meta }} />
          <CustomerLogo company={{ name: "Qonto", logo: qonto }} />
          <CustomerCase
            company={{
              name: "GitBook",
              logo: gitbook,
            }}
            quote={
              <>
                Argos has become a cornerstone of our testing process. Its
                ability to catch visual issues early has{" "}
                <strong>saved us countless hours of manual QA</strong> and
                protected the integrity of our product for millions of users.
              </>
            }
            author={{
              avatar: samyPesse,
              name: "Samy Pessé",
              title: "CTO at GitBook",
            }}
          />
          <CustomerCase
            company={{
              name: "MUI",
              logo: mui,
            }}
            quote={
              <>
                Argos gives us a stable visual baseline for MUI. It lets us
                refactor confidently, catch layout drifts early, and{" "}
                <strong>ship changes faster</strong> without adding noise to our
                workflow. It is the kind of tooling that{" "}
                <strong>
                  scales with a component library as large as ours
                </strong>
                .
              </>
            }
            author={{
              avatar: olivierTassinari,
              name: "Olivier Tassinari",
              title: "CEO at MUI",
            }}
          />
          <CustomerLogo company={{ name: "Mermaid", logo: mermaid }} />
          <CustomerLogo company={{ name: "Clickhouse", logo: clickhouse }} />
        </div>
      </Container>
    </section>
  );
}

type Company = {
  name: string;
  logo: ThemeImageProps["src"];
};

function CustomerLogo(props: { company: Company; className?: string }) {
  const { company, className } = props;
  return (
    <div
      className={clsx(
        "bg-app relative flex items-center justify-center px-2 py-4",
        className,
      )}
    >
      <div className="mx-auto h-10 md:h-16">
        <ThemeImage src={company.logo} alt={company.name} className="h-full" />
      </div>
    </div>
  );
}

function CustomerCase(props: {
  company: Company;
  quote: ReactNode;
  author: {
    name: string;
    title: string;
    avatar: ImageProps["src"];
  };
  className?: string;
}) {
  const { company, quote, author, className } = props;
  return (
    <a
      className={clsx(
        "bg-app hover:bg-subtle group col-span-2 flex flex-col gap-8 p-6 transition duration-200 md:p-10",
        className,
      )}
    >
      <ThemeImage src={company.logo} alt={company.name} className="h-7" />
      <p className="[&_strong]:font-semibold">{quote}</p>
      <div className="flex items-center justify-end md:justify-between">
        <div className="text-low flex items-center gap-1 text-sm max-md:hidden">
          Read the full story
          <ArrowRightIcon className="size-4 transition duration-200 group-hover:translate-x-1" />
        </div>
        <div className="flex items-center gap-2.5 self-end text-right">
          <div>
            <div className="text-sm font-medium">{author.name}</div>
            <div className="text-low text-xs font-medium">{author.title}</div>
          </div>
          <Image
            src={author.avatar}
            className="size-10 rounded-full border"
            alt=""
          />
        </div>
      </div>
    </a>
  );
}
