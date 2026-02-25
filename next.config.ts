import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/:path((?!hml(?:/|$)|login(?:/|$)|list(?:/|$)|api(?:/|$)|_next(?:/|$)|.*\\..*).*)",
        destination: "/hml",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
