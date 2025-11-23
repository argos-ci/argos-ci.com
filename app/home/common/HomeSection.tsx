import clsx from "clsx";

import { Container } from "@/components/Container";

export function HomeSection(props: {
  children: React.ReactNode;
  className?: string;
}) {
  const { className, children } = props;
  return (
    <Container
      className={clsx(
        "relative after:absolute after:bottom-0 after:left-1/2 after:w-screen after:-translate-x-1/2 after:border-t after:content-['']",
        className,
      )}
      asChild
    >
      <section>{children}</section>
    </Container>
  );
}
