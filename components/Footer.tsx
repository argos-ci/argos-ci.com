import NextLink from "next/link";

export const FooterSections = (props: { children: React.ReactNode }) => (
  <div className="flex justify-between flex-wrap gap-x-10 gap-y-2">
    {props.children}
  </div>
);

export const FooterSection = (props: { children: React.ReactNode }) => (
  <div className="flex flex-col flex-grow flex-1 whitespace-nowrap basis-36 my-2 gap-2">
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
      className="transition no-underline text-low hover:text"
      href={props.href}
    >
      {props.children}
    </NextLink>
  </div>
);
