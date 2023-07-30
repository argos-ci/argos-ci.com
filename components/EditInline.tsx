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
          "relative inline-block rounded transition bg-slate-700 px-2 text-primary-100",
          "hover:bg-primary-900 hover:focus-within:bg-primary-900 focus-within:bg-primary-900 cursor-text"
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
            empty && "text-grey-on"
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
              "absolute left-0 top-0 w-full border-0 bg-transparent text-current placeholder:text-on-light focus:outline-none px-2"
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
  }
);
