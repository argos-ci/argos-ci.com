"use client";

import {
  type TooltipProvider as BaseTooltipProvider,
  type TooltipPositioner,
  Tooltip as TooltipPrimitive,
  type TooltipRoot,
  type TooltipTrigger,
} from "@base-ui/react/tooltip";
import * as React from "react";

export type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  delayDuration?: TooltipTrigger.Props["delay"];
} & Omit<TooltipRoot.Props, "children"> &
  Pick<TooltipPositioner.Props, "side" | "sideOffset">;

export function TooltipProvider(props: BaseTooltipProvider.Props) {
  return <TooltipPrimitive.Provider {...props} />;
}

export function Tooltip(props: TooltipProps) {
  const {
    children,
    content,
    delayDuration,
    side,
    sideOffset = 4,
    ...rest
  } = props;

  return (
    <TooltipPrimitive.Root disableHoverablePopup {...rest}>
      <TooltipPrimitive.Trigger
        delay={delayDuration}
        render={
          React.isValidElement(children) ? children : <span>{children}</span>
        }
      />
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner side={side} sideOffset={sideOffset}>
          <TooltipPrimitive.Popup className="bg-app text-default animate-in fade-in-0 zoom-in-95 data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 pointer-events-none z-50 overflow-hidden rounded-md border px-2 py-1 text-sm shadow-md">
            {content}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
