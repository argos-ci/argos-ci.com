import React, { forwardRef } from "react";
import * as Ariakit from "@ariakit/react";

interface RadioFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  children: React.ReactNode;
}

export const RadioField = forwardRef<HTMLInputElement, RadioFieldProps>(
  ({ label, value, children, ...props }, ref) => (
    <label className="flex gap-4 items-baseline text-left">
      <Ariakit.Radio ref={ref} value={value} {...props} />
      <div className="px-2 border-l border-border hover:border-on">
        <div className="font-semibold text-lg">{label}</div>
        <p>{children}</p>
      </div>
    </label>
  )
);
