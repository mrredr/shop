/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1ax460061ulao.cloudfront.net",
        port: "",
        pathname: "/140x150/**/**/**.webp",
      },
    ],
  },
};

module.exports = nextConfig;
