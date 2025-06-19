import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  allowedDevOrigins: ["127.0.0.1"],
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
      {
        source: "/trust-center",
        destination:
          "https://app.eu.vanta.com/argos/trust/8z3w834xz9a4snga4obms",
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
  transpilePackages: ["next-mdx-remote"],
};

const withMDX = createMDX();

export default withMDX(nextConfig);
