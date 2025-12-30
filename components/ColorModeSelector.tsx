"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Tooltip } from "./Tooltip";

enum ColorMode {
  Dark = "dark",
  Light = "light",
}

function ColorModeButton(props: React.ComponentPropsWithRef<"button">) {
  return (
    <button
      className="hover:bg-hover aria-pressed:bg-active grid size-6 place-items-center rounded-full transition"
      type="button"
      {...props}
    />
  );
}

export const ColorModeSelector = () => {
  const { theme, setTheme } = useTheme();
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setVisible(true);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="flex gap-1">
      <>
        <Tooltip content="System">
          <ColorModeButton
            aria-pressed={theme === "system"}
            aria-label="System"
            onClick={() => setTheme("system")}
          >
            <MonitorIcon className="size-3" />
          </ColorModeButton>
        </Tooltip>
        <Tooltip content="Dark mode">
          <ColorModeButton
            aria-label="Dark mode"
            aria-pressed={theme === ColorMode.Dark}
            onClick={() => setTheme(ColorMode.Dark)}
          >
            <MoonIcon className="size-3" />
          </ColorModeButton>
        </Tooltip>
        <Tooltip content="Light mode">
          <ColorModeButton
            aria-label="Light mode"
            aria-pressed={theme === ColorMode.Light}
            onClick={() => setTheme(ColorMode.Light)}
          >
            <SunIcon className="size-3" />
          </ColorModeButton>
        </Tooltip>
      </>
    </div>
  );
};
