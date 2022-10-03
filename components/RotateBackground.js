import { x } from "@xstyled/styled-components";

export const RotateBackground = ({ children, ...props }) => (
  <x.div transform rotate={-6} mx={-10} {...props}>
    <x.div transform rotate={6}>
      {children}
    </x.div>
  </x.div>
);
