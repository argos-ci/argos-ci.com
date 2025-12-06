import clsx from "clsx";

import { Container, type ContainerProps } from "@/components/Container";

export function HomeSection(
  props: {
    children: React.ReactNode;
    className?: string;
  } & Pick<ContainerProps, "noGutter">,
) {
  const { className, children, ...rest } = props;
  return (
    <Container {...rest} className={clsx("relative", className)} asChild>
      <section>{children}</section>
    </Container>
  );
}
