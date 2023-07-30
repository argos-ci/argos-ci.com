import * as React from "react";

export const Burger = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button ref={ref} className="burger-menu" {...props}>
      <span />
      <span />
      <span />
    </button>
  );
});
