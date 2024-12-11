import withPWA from "next-pwa";

const nextConfig = {
  images: {
    domains: ["ik.imagekit.io"],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
