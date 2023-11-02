import NextLink from "next/link";

export const FooterSections = (props: { children: React.ReactNode }) => (
  <div className="flex flex-wrap justify-between gap-x-10 gap-y-2">
    {props.children}
  </div>
);

export const FooterSection = (props: { children: React.ReactNode }) => (
  <div className="my-2 flex flex-1 flex-grow basis-36 flex-col gap-2 whitespace-nowrap">
    {props.children}
  </div>
);

export const FooterSectionTitle = (props: { children: React.ReactNode }) => (
  <div className="mb-1 font-medium">{props.children}</div>
);

export const FooterLink = (props: {
  children: React.ReactNode;
  href: string;
}) => (
  <div>
    <NextLink
      className="text-low no-underline transition hover:text"
      href={props.href}
    >
      {props.children}
    </NextLink>
  </div>
);
