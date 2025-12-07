"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

export type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
} & TooltipPrimitive.TooltipProps &
  Pick<TooltipPrimitive.TooltipContentProps, "side" | "sideOffset">;

export const TooltipProvider = TooltipPrimitive.Provider;

export function Tooltip(props: TooltipProps) {
  const { children, content, side, sideOffset = 4, ...rest } = props;
  return (
    <TooltipPrimitive.Root disableHoverableContent {...rest}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        side={side}
        className="bg-app text-default animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 pointer-events-none z-50 overflow-hidden rounded-md border px-2 py-1 text-sm shadow-md"
      >
        {content}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Root>
  );
}
