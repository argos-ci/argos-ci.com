import { th, createGlobalStyle, Preflight } from "@xstyled/styled-components";

const ArgosGlobalStyle = createGlobalStyle`
  html, body {
    font-family: ${th.font("default")};
  }

  @keyframes x-slide {
    from {
      transform: translateX(0%);
    }
    to {
      transform: translateX(-100%);
    }
  }
`;

export const GlobalStyle: React.FC<{}> = () => (
  <>
    <ArgosGlobalStyle />
    <Preflight />
  </>
);
