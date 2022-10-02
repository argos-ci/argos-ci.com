import { x } from "@xstyled/styled-components";

export const FeatureList = ({ children }) => (
  <x.div display="flex" flexDirection={{ _: "column", md: "row" }} gap={4}>
    {children}
  </x.div>
);

export const Feature = ({ children }) => (
  <x.div display="flex" flexDirection="column" gap={4} textAlign="center">
    {children}
  </x.div>
);

export const FeatureIcon = ({ icon: Icon, color = "primary" }) => (
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
  >
    <x.svg as={Icon} w={6} />
  </x.div>
);

export const FeatureTitle = ({ children }) => (
  <x.div text="feature-title">{children}</x.div>
);

export const FeatureText = ({ children }) => (
  <x.div text="teaser">{children}</x.div>
);
