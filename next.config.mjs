import withPWA from "next-pwa";

import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
};

const analyzeBundleConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default analyzeBundleConfig(
  withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    maximumFileSizeToCacheInBytes: 5000000,
  })(nextConfig)
);
