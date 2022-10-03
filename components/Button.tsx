import { forwardRef } from "react";
import { Button as AriakitButton } from "ariakit/button";
import styled, { css, th, system } from "@xstyled/styled-components";

import type { As, Options, SystemComponent } from "./types";

export type ButtonOptions<T extends As = "button"> = Options<T> & {
  color?: "primary" | "secondary";
  variant?: "contained" | "outline";
  children: React.ReactNode;
};

interface ButtonStyledProps {
  $color?: ButtonOptions["color"];
  $variant?: ButtonOptions["variant"];
}

const InnerButton = styled.buttonBox(
  ({ $color = "primary", $variant }: ButtonStyledProps) => {
    return css`
      padding: 2 4;
      font-family: default;
      font-size: sm;
      font-weight: 500;
      line-height: 1;
      transition: default;
      transition-duration: instant;
      text-decoration: none;
      white-space: nowrap;
      border-radius: lg;
      cursor: default;
      text-align: center;

      &:is(a) {
        cursor: pointer;
      }

      &:disabled {
        opacity: 0.38;
      }

      &:focus {
        outline: 0;
      }

      &:focus-visible {
        ${system.apply({
          ring: 3,
          ringColor: `${$color}-300`,
        })}
      }

      ${$variant === "contained" &&
      css`
        color: button-contained-text;
        background-color: ${th.color(`${$color}-600`)};

        &:hover:not(:disabled) {
          background-color: ${th.color(`${$color}-700`)};
        }
      `}

      ${$variant === "outline" &&
      css`
        color: ${th.color(`${$color}-600`)};
        background-color: transparent;
        border: 1;
        border-color: ${th.color(`${$color}-400`)};

        &:hover:not(:disabled) {
          border-color: ${th.color(`${$color}-600`)};
        }
      `}
    `;
  }
);

export const Button: SystemComponent<ButtonOptions> = forwardRef(
  (
    { color = "primary", variant = "contained", children, as, ...props },
    ref
  ) => {
    return (
      <AriakitButton ref={ref} {...props}>
        {(buttonProps) => (
          <InnerButton
            {...buttonProps}
            $color={color}
            $variant={variant}
            as={as}
          >
            {children}
          </InnerButton>
        )}
      </AriakitButton>
    );
  }
);
