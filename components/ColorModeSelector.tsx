"use client";
import * as React from "react";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Tooltip } from "./Tooltip";

enum ColorMode {
  Dark = "dark",
  Light = "light",
}

const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button
      ref={ref}
      className="p-2 aria-pressed:bg-active hover:bg-hover rounded-full transition"
      type="button"
      {...props}
    />
  );
});

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
            onClick={() => setTheme("system")}
          >
            <MonitorIcon className="h-4 w-4" />
          </ColorModeButton>
        </Tooltip>
        <Tooltip content="Dark mode">
          <ColorModeButton
            aria-pressed={theme === ColorMode.Dark}
            onClick={() => setTheme(ColorMode.Dark)}
          >
            <MoonIcon className="h-4 w-4" />
          </ColorModeButton>
        </Tooltip>
        <Tooltip content="Light mode">
          <ColorModeButton
            aria-pressed={theme === ColorMode.Light}
            onClick={() => setTheme(ColorMode.Light)}
          >
            <SunIcon className="h-4 w-4" />
          </ColorModeButton>
        </Tooltip>
      </>
    </div>
  );
};
