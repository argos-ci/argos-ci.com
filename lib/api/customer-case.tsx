import fg from "fast-glob";
import Image, { StaticImageData } from "next/image";
import { dirname, join } from "node:path";
import { z } from "zod";

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

  customer: z.object({
    name: z.string(),
    logo: z.string(),
    website: z.string(),
    about: z.string(),
    industry: z.string(),
    companySize: z.string(),
    founded: z.coerce.string(),
    argosPlan: z.string(),
  }),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export type CustomerCase = Omit<Frontmatter, "image" | "customer"> & {
  image: StaticImageData;
  filepath: string;
  slug: string;
  customer: Omit<Frontmatter["customer"], "logo"> & {
    logo: StaticImageData;
  };
};

/**
 * Read the image from the file.
 */
async function readImage(filepath: string, imagepath: string) {
  const dir = dirname(filepath).replace(/^.\/customers\//, "");
  const fullImagePath = join(dir, imagepath);
  const { default: image } = await import(`../../customers/${fullImagePath}`);
  return image as StaticImageData;
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
  const image = await readImage(filepath, frontmatter.image);
  const customerLogo = await readImage(filepath, frontmatter.customer.logo);
  const slug = filepath
    .replace(/^.\/customers\//, "")
    .replace(/\/index.mdx$/, "");

  return {
    ...frontmatter,
    filepath,
    image,
    slug,
    customer: {
      ...frontmatter.customer,
      logo: customerLogo,
    },
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
    },
  });
}

function Blockquote(props: {
  authorAvatar: string;
  authorName: string;
  authorPosition: string;
  companyLogo: string;
  companyName: string;
  quote: React.ReactNode;
}) {
  return (
    <div className="not-prose relative my-10 flex flex-col items-center gap-6 rounded-lg border p-6 md:gap-8">
      <div className="rounded-full bg-linear-to-r from-(--pink-8) to-(--violet-8) p-2">
        <Image
          className="shrink-0 rounded-full"
          src={props.authorAvatar}
          width={80}
          height={80}
          alt={props.authorName}
        />
      </div>
      <blockquote className="text-center text-balance md:text-lg">
        <p>{props.quote}</p>
      </blockquote>
      <div className="flex items-center gap-4">
        <Image
          className="rounded-sm"
          src={props.companyLogo}
          width={48}
          height={48}
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
