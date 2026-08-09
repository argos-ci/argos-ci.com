import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  allowedDevOrigins: ["127.0.0.1"],
  // The markdown-for-agents route reads MDX sources and curated markdown from
  // disk at request time; make sure they ship with the serverless function.
  outputFileTracingIncludes: {
    "/md/[[...slug]]": [
      "./articles/**/*.mdx",
      "./changelogs/**/*.mdx",
      "./app/markdown/**",
    ],
  },
  headers: async () => {
    // Responses of the pages that support markdown content negotiation
    // (see proxy.ts) vary on the Accept header.
    const varyAccept = [
      "/",
      "/pricing",
      "/privacy",
      "/terms",
      "/blog/:path*",
      "/changelog/:path*",
    ].map((source) => ({
      source,
      headers: [{ key: "Vary", value: "Accept" }],
    }));
    return [
      {
        // Agent discovery (RFC 8288 + RFC 9727 §3): advertise the API catalog
        // and the machine-readable descriptions of the site from the homepage.
        source: "/",
        headers: [
          {
            key: "Link",
            value: [
              '</.well-known/api-catalog>; rel="api-catalog"',
              '<https://api.argos-ci.com/v2/openapi.yaml>; rel="service-desc"; type="application/yaml"',
              '<https://argos-ci.com/docs/api-reference>; rel="service-doc"',
              '</llms.txt>; rel="describedby"; type="text/markdown"',
            ].join(", "),
          },
        ],
      },
      ...varyAccept,
    ];
  },
  redirects: async () => {
    return [
      {
        source: "/.well-known/:path*",
        destination: "https://app.argos-ci.com/.well-known/:path*",
        permanent: false,
      },
      {
        source: "/:organization/:repository/builds/:path*",
        destination:
          "https://app.argos-ci.com/:organization/:repository/builds/:path*",
        permanent: false,
      },
      {
        source: "/discord",
        destination: "https://discord.gg/WjzGrQGS4A",
        permanent: false,
      },
      {
        source: "/trust-center",
        destination:
          "https://app.eu.vanta.com/argos/trust/8z3w834xz9a4snga4obms",
        permanent: false,
      },
      {
        source: "/changelog/2025-08-20-ignore-changes",
        destination: "/changelog/2025-07-20-ignore-changes",
        permanent: false,
      },
      {
        source: "/playwright",
        destination: "/visual-testing",
        permanent: true,
      },
      {
        source: "/security/soc-2",
        destination: "/security#soc-2",
        permanent: true,
      },
      {
        source: "/security/gdpr",
        destination: "/security#gdpr",
        permanent: true,
      },
      {
        source: "/mui-org/material-ui",
        destination: "/customers/mui",
        permanent: true,
      },
      {
        source: "/callemall/material-ui",
        destination: "/customers/mui",
        permanent: true,
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: "/docs",
        destination: "https://proxy.gitbook.site/sites/site_S9wzD",
      },
      {
        source: "/docs/:path*",
        destination: "https://proxy.gitbook.site/sites/site_S9wzD/:path*",
      },
    ];
  },
  transpilePackages: ["next-mdx-remote", "geist"],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
