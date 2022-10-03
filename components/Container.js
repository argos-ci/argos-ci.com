import { x } from "@xstyled/styled-components";

export const Container = (props) => (
  <x.div maxW={1024} mx="auto" px={{ _: 4, sm: 8 }} {...props} />
);
