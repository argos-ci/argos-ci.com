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
          "text-primary-100 bg-ui relative inline-block rounded-sm px-2 leading-normal transition",
          "focus-within:bg-active hover:bg-hover hover:focus-within:bg-active cursor-text",
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
              "placeholder:text-low absolute top-0 left-0 w-full border-0 bg-transparent px-2 text-current focus:outline-hidden",
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
