import fg from "fast-glob";
import Image, { StaticImageData } from "next/image";
import { dirname, join } from "node:path";
import { z } from "zod";

import {
  finviz,
  finvizGintnerQuote,
  finvizMarosQuote,
} from "@/app/assets/customers/library/finviz";
import { gitbook, gitbookQuote } from "@/app/assets/customers/library/gitbook";
import {
  leMonde,
  leMondeMariusQuote,
  leMondeQuote,
} from "@/app/assets/customers/library/le-monde";
import { mermaid, mermaidQuote } from "@/app/assets/customers/library/mermaid";
import { mui, muiQuote } from "@/app/assets/customers/library/mui";
import {
  pivot,
  pivotAlexQuote,
  pivotQuote,
} from "@/app/assets/customers/library/pivot";
import type {
  CustomerCompany,
  CustomerQuote,
} from "@/app/assets/customers/types";
import { StatsBlock } from "@/components/StatsBlock";
import { ThemeImage, type ThemeImageProps } from "@/components/ThemeImage";
import { Zoom } from "@/components/Zoom";

import { assertAllItems, getDocMdxSource, readMatterData } from "./common";

const FrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date().transform((d) => d.toISOString()),
  updatedAt: z
    .date()
    .optional()
    .transform((d) => d?.toISOString() ?? null),
  author: z.string(),
  image: z.string(),

  customer: z.enum(["leMonde", "finviz", "gitbook", "mui", "mermaid", "pivot"]),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

type CustomerCompanyStoryReady = CustomerCompany &
  Required<
    Pick<
      CustomerCompany,
      "storyUrl" | "about" | "founded" | "argosPlan" | "industry" | "size"
    >
  > & {
    logo: Required<CustomerCompany["logo"]>;
  };

const customers: Record<Frontmatter["customer"], CustomerCompanyStoryReady> = {
  leMonde,
  mermaid,
  finviz,
  mui,
  gitbook,
  pivot,
};

export type CustomerCase = Omit<Frontmatter, "image" | "customer"> & {
  image: { svg: StaticImageData; jpg: StaticImageData };
  filepath: string;
  slug: string;
  customer: CustomerCompanyStoryReady;
};

/**
 * Read the image from the file.
 */
async function readImage(filepath: string, imagepath: string) {
  const dir = dirname(filepath).replace(/^.\/customers\//, "");
  const svgImagePath = join(dir, imagepath);
  const jpgImagePath = svgImagePath.replace(/\.svg$/, ".jpg");
  const [{ default: svgImage }, { default: jpgImage }] = await Promise.all([
    import(`../../customers/${svgImagePath}`),
    import(`../../customers/${jpgImagePath}`),
  ]);
  return {
    svg: svgImage as StaticImageData,
    jpg: jpgImage as StaticImageData,
  };
}

/**
 * Get the customer case data from the file path.
 */
async function getCustomerCaseData(
  filepath: string,
): Promise<CustomerCase | null> {
  const frontmatter = readMatterData(filepath, FrontmatterSchema);
  if (!frontmatter) {
    return null;
  }
  const customer = customers[frontmatter.customer];
  const image = await readImage(filepath, frontmatter.image);
  const slug = filepath
    .replace(/^.\/customers\//, "")
    .replace(/\/index.mdx$/, "");

  return {
    ...frontmatter,
    filepath,
    image,
    slug,
    customer,
  };
}

/**
 * Get all the customer cases.
 */
export async function getCustomerCases(): Promise<CustomerCase[]> {
  const files = await fg("./customers/**/*.mdx");
  const cases = await Promise.all(files.map(getCustomerCaseData));
  assertAllItems(cases);
  return cases.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
  );
}

/**
 * Get the customer case by the slug.
 */
export async function getCustomerCaseBySlug(
  slug: string,
): Promise<CustomerCase | null> {
  const filepath = `./customers/${slug}/index.mdx`;
  return getCustomerCaseData(filepath);
}

/**
 * Get the MDX source of a customer case.
 */
export async function getCustomerCaseMdxSource(customerCase: CustomerCase) {
  return getDocMdxSource(customerCase.filepath, {
    scope: {
      finvizGintnerQuote,
      finvizMarosQuote,
      leMondeQuote,
      leMondeMariusQuote,
      muiQuote,
      mermaidQuote,
      gitbookQuote,
      pivotQuote,
      pivotAlexQuote,
    },
    components: {
      img: ({ src, height, width, alt }) => {
        return (
          <Zoom>
            <Image
              className="rounded-md border"
              src={src as string}
              height={height as number}
              width={width as number}
              alt={alt as string}
              sizes="(max-width: 900px) 100vw, 832px"
            />
          </Zoom>
        );
      },
      Blockquote,
      CustomerBlockQuote,
      StatsBlock,
    },
  });
}

function CustomerBlockQuote(props: { quote: CustomerQuote }) {
  const { quote } = props;
  return (
    <Blockquote
      quote={quote.text}
      authorAvatar={quote.author.avatar}
      authorName={quote.author.name}
      authorPosition={quote.author.title}
      companyLogo={quote.company.logo.emblem ?? quote.company.logo.adjusted}
      companyName={quote.company.name}
    />
  );
}

function Blockquote(props: {
  authorAvatar: ThemeImageProps["src"];
  authorName: string;
  authorPosition: string;
  companyLogo: ThemeImageProps["src"];
  companyName: string;
  quote: React.ReactNode;
}) {
  return (
    <div className="not-prose relative my-10 flex flex-col items-center gap-6 rounded-lg border p-6 md:gap-8">
      <div className="rounded-full bg-linear-to-r from-(--pink-8) to-(--violet-8) p-2">
        <ThemeImage
          className="size-20 shrink-0 rounded-full"
          width={80}
          height={80}
          src={props.authorAvatar}
          alt={props.authorName}
        />
      </div>
      <blockquote className="text-center text-balance md:text-lg [&_strong]:font-semibold">
        <p>{props.quote}</p>
      </blockquote>
      <div className="flex items-center gap-4">
        <ThemeImage
          className="size-12 rounded-sm"
          width={48}
          height={48}
          src={props.companyLogo}
          alt={props.companyName}
        />
        <div>
          <div className="leading-tight font-medium md:text-lg">
            {props.authorName}
          </div>
          <div className="text-low text-sm md:text-base">
            {props.authorPosition}
          </div>
        </div>
      </div>
    </div>
  );
}
