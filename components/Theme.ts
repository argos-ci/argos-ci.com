import {
  defaultTheme,
  DefaultTheme,
  th,
  FontSize,
  LineHeight,
  createGlobalStyle,
  generateHexAlphaVariants,
} from "@xstyled/styled-components";


export const GlobalStyles = createGlobalStyle`
  @keyframes x-slide {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`


export interface Theme extends DefaultTheme {
  fonts: DefaultTheme["fonts"] & {
    default: string;
  };
  texts: DefaultTheme["texts"] & {
    h1: {
      fontSize: FontSize,
      fontWeight: string,
      color:string,
    }
    h2: {
      fontSize: FontSize,
      fontWeight: string,
      color:string,
      lineHeight: LineHeight,
    }
    "hero-paragraph": {
      fontWeight: string,
      lineHeight: number;
      color: string,
    }
    paragraph: {
      fontWeight: string,
      lineHeight: number;
      color: string,
    }
    testimonial: {
      fontSize:string,
      fontStyle:string,
      fontWeight:number,
      lineHeight:number,
    }
  };
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

    "fuchsia-50": string;
    "fuchsia-100": string;
    "fuchsia-200": string;
    "fuchsia-300": string;
    "fuchsia-400": string;
    "fuchsia-500": string;
    "fuchsia-600": string;
    "fuchsia-700": string;
    "fuchsia-800": string;
    "fuchsia-900": string;

    "sky-50": string;
    "sky-100": string;
    "sky-200": string;
    "sky-300": string;
    "sky-400": string;
    "sky-500": string;
    "sky-600": string;
    "sky-700": string;
    "sky-800": string;
    "sky-900": string;

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
    "text-emphasis": any,
    "text-primary": any,
    "text-title": any,
    border: any,
    "footer-border": any,
  };
  animations: DefaultTheme["animations"] & {
    slide: string,
  }
}

export const theme: Theme = {
  ...defaultTheme,
  fonts: {
    ...defaultTheme.fonts,
    default: "Lato, sans-serif",
  },
  texts: {
    h1: {
      fontSize: "5xl",
      fontWeight: "bold",
      color: "text-title"
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
      lineHeight: 1.25,
      color: "text-title",
    },
    "hero-paragraph": {
      fontWeight: "medium",
      lineHeight: 1.5,
      color: "paragraph"
    },
    paragraph: {
      fontWeight: "medium",
      lineHeight: 1.5,
      color: "text-primary"
    },
    testimonial: {
      fontSize:"3xl",
      fontStyle:"italic",
      fontWeight:500,
      lineHeight:1.15,
    }
  },
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

    ...generateHexAlphaVariants({
      "fuchsia-50": "#fdf4ff",
      "fuchsia-100": "#fae8ff",
      "fuchsia-200": "#f5d0fe",
      "fuchsia-300": "#f0abfc",
      "fuchsia-400": "#e879f9",
      "fuchsia-500": "#d946ef",
      "fuchsia-600": "#c026d3",
      "fuchsia-700": "#a21caf",
      "fuchsia-800": "#86198f",
      "fuchsia-900": "#701a75",

      "sky-50": "#f0f9ff",
      "sky-100": "#e0f2fe",
      "sky-200": "#bae6fd",
      "sky-300": "#7dd3fc",
      "sky-400": "#38bdf8",
      "sky-500": "#0ea5e9",
      "sky-600": "#0284c7",
      "sky-700": "#0369a1",
      "sky-800": "#075985",
      "sky-900": "#0c4a6e",
    }),
    on: th.color("slate-900"),
    "button-contained-text": th.color("white"),
    "button-outline-text": th.color("on"),
    "text-emphasis": th.color("slate-600"),
    "text-primary": th.color("slate-500"),
    "text-title": th.color("slate-900"),
    border: th.color("purple-200"),
    "footer-border": th.color("slate-200"),
  },
  animations: {
    slide: 'x-slide 50s linear infinite',
  }
};
