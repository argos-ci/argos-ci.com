import { x } from "@xstyled/styled-components";

export const Features = (props) => (
  <x.div
    display="flex"
    flexDirection={{ _: "column", md: "row" }}
    gap={4}
    {...props}
  />
);

export const Feature = (props) => (
  <x.div
    display="flex"
    flexDirection="column"
    gap={4}
    textAlign="center"
    {...props}
  />
);

export const FeatureIcon = ({ icon: Icon, color = "primary", ...props }) => (
  <x.div
    borderRadius="full"
    w={10}
    h={10}
    display="flex"
    alignItems="center"
    justifyContent="center"
    margin="auto"
    backgroundColor={`${color}-50`}
    color={`${color}-600`}
    {...props}
  >
    <x.svg as={Icon} w={6} />
  </x.div>
);

export const FeatureTitle = ({ children, ...props }) => (
  <x.div fontWeight="semibold" color="text-title" lineHeight={1.5} {...props}>
    {children}
  </x.div>
);

export const FeatureText = ({ children, ...props }) => (
  <x.div text="text-primary" {...props}>
    {children}
  </x.div>
);
