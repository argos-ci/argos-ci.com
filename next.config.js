/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  redirects: async () => {
    return [
      {
        source: "/docs",
        destination: "/docs/getting-started",
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
    ];
  },
  rewrites: async () => {
    return [
      {
        source: "/docs/:path*",
        destination: "https://argos-docs.vercel.app/:path*", // The :path parameter is used here so will not be automatically passed in the query
      },
    ];
  },
  experimental: {
    mdxRs: true,
  },
  transpilePackages: ["next-mdx-remote"],
};

const withMDX = require("@next/mdx")();

module.exports = withMDX(nextConfig);
