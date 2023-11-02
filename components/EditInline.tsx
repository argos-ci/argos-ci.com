"use client";

import clsx from "clsx";
import * as React from "react";

const identity = (x: string) => x;

export const EditInline = React.memo(
  ({
    value,
    placeholder,
    onChange,
    className,
    renderValue = identity,
  }: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    className?: string;
    renderValue?: (value: string) => string;
  }) => {
    const [editing, setEditing] = React.useState(false);
    const renderedValue = renderValue(value);
    const empty = renderedValue === "";
    return (
      <div
        className={clsx(
          className,
          "text-primary-100 relative inline-block rounded bg-ui px-2 transition",
          "cursor-text focus-within:bg-active hover:bg-hover hover:focus-within:bg-active",
        )}
        onClick={() => {
          setEditing(true);
        }}
      >
        <span
          aria-hidden={editing || undefined}
          className={clsx(
            "whitespace-pre",
            editing && "invisible",
            empty && "text-grey-on",
          )}
        >
          {empty ? placeholder : renderedValue}
        </span>
        {editing && (
          <input
            type="number"
            autoFocus
            placeholder={placeholder}
            className={clsx(
              className,
              "absolute left-0 top-0 w-full border-0 bg-transparent px-2 text-current placeholder:text-low focus:outline-none",
            )}
            value={value}
            onChange={(event) => {
              onChange(event.currentTarget.value);
            }}
            onBlur={() => {
              setEditing(false);
            }}
            onKeyDown={(event) => {
              switch (event.key) {
                case "Escape": {
                  event.preventDefault();
                  setEditing(false);
                  return;
                }
                case "Enter": {
                  event.preventDefault();
                  setEditing(false);
                  return;
                }
              }
            }}
          />
        )}
      </div>
    );
  },
);
