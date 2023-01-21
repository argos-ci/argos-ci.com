import { useEffect } from "react";
import Prism from "prismjs";

require("prismjs/components/prism-javascript");
require("prismjs/components/prism-css");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-yaml");

import Head from "next/head";
import { Container } from "@/components/Container";

export const StaticPage: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ children, title }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <article
        className="prose prose-invert mx-auto max-w-none mt-14 mb-24"
        style={{ contain: "none" }}
      >
        <Container>{children}</Container>
      </article>
    </>
  );
};
