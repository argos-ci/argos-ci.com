import * as React from "react";

export const Burger = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button
      ref={ref}
      className="burger-menu"
      aria-label="Show navigation"
      {...props}
    >
      <span />
      <span />
      <span />
    </button>
  );
});
