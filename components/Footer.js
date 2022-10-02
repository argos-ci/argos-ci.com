import { x } from "@xstyled/styled-components";
import { Link } from "./Link";

export const FooterSections = (props) => (
  <x.div
    display="flex"
    justifyContent="space-between"
    flexWrap="wrap"
    rowGap={10}
    columnGap={2}
    {...props}
  />
);

export const FooterSection = ({ children, ...props }) => (
  <x.div
    display="flex"
    flexDirection="column"
    gap={2}
    flexGrow={1}
    flexBasis="140px"
    {...props}
  >
    {children}
  </x.div>
);

export const FooterSectionTitle = ({ children, ...props }) => (
  <x.div mb={1} fontWeight="semibold" color="title" {...props}>
    {children}
  </x.div>
);

export const FooterLink = ({ children, ...props }) => (
  <div>
    <Link color={{ _: "accent", hover: "text-primary" }} {...props}>
      {children}
    </Link>
  </div>
);
