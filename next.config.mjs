import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["geist"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn2.thecatapi.com" }],
  },
};

export default withPlaiceholder(nextConfig);
