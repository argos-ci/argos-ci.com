import * as React from "react";

export function Burger(props: React.ComponentPropsWithRef<"button">) {
  return (
    <button className="burger-menu" aria-label="Show navigation" {...props}>
      <span />
      <span />
      <span />
    </button>
  );
}
