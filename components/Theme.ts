import { defaultTheme, DefaultTheme, th } from "@xstyled/styled-components";

export interface Theme extends DefaultTheme {
  colors: DefaultTheme["colors"] & {
    "slate-50": string;
    "slate-100": string;
    "slate-200": string;
    "slate-300": string;
    "slate-400": string;
    "slate-500": string;
    "slate-600": string;
    "slate-700": string;
    "slate-800": string;
    "slate-900": string;

    "primary-50": any;
    "primary-100": any;
    "primary-200": any;
    "primary-300": any;
    "primary-400": any;
    "primary-500": any;
    "primary-600": any;
    "primary-700": any;
    "primary-800": any;
    "primary-900": any;

    "secondary-50": any;
    "secondary-100": any;
    "secondary-200": any;
    "secondary-300": any;
    "secondary-400": any;
    "secondary-500": any;
    "secondary-600": any;
    "secondary-700": any;
    "secondary-800": any;
    "secondary-900": any;

    on: any;
    "button-contained-text": any;
    "button-outline-text": any;
  };
}

export const theme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    "slate-50": "#f8fafc",
    "slate-100": "#f1f5f9",
    "slate-200": "#e2e8f0",
    "slate-300": "#cbd5e1",
    "slate-400": "#94a3b8",
    "slate-500": "#64748b",
    "slate-600": "#475569",
    "slate-700": "#334155",
    "slate-800": "#1e293b",
    "slate-900": "#0f172a",

    "purple-50": "#faf5ff",
    "purple-100": "#f3e8ff",
    "purple-200": "#e9d5ff",
    "purple-300": "#d8b4fe",
    "purple-400": "#c084fc",
    "purple-500": "#a855f7",
    "purple-600": "#9333ea",
    "purple-700": "#7e22ce",
    "purple-800": "#6b21a8",
    "purple-900": "#581c87",

    "primary-50": th.color("purple-50"),
    "primary-100": th.color("purple-100"),
    "primary-200": th.color("purple-200"),
    "primary-300": th.color("purple-300"),
    "primary-400": th.color("purple-400"),
    "primary-500": th.color("purple-500"),
    "primary-600": th.color("purple-600"),
    "primary-700": th.color("purple-700"),
    "primary-800": th.color("purple-800"),
    "primary-900": th.color("purple-900"),

    "secondary-50": th.color("slate-50"),
    "secondary-100": th.color("slate-100"),
    "secondary-200": th.color("slate-200"),
    "secondary-300": th.color("slate-300"),
    "secondary-400": th.color("slate-400"),
    "secondary-500": th.color("slate-500"),
    "secondary-600": th.color("slate-600"),
    "secondary-700": th.color("slate-700"),
    "secondary-800": th.color("slate-800"),
    "secondary-900": th.color("slate-900"),

    on: th.color("slate-900"),
    "button-contained-text": th.color("white"),
    "button-outline-text": th.color("on"),
  },
};
