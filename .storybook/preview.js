import { ThemeProvider, Preflight } from "@xstyled/styled-components";
// import { GlobalStyle } from "../components/GlobalStyle";
import { GlobalStyles, theme } from "../components/Theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Preflight />
      <Story />
    </ThemeProvider>
  ),
];
