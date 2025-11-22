/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: [
  //     "images.unsplash.com",
  //     "listing-storage.s3.eu-north-1.amazonaws.com",
  //     "flagpedia.net",
  //     ".s3.eu-north-1.amazonaws.com",
  //     "lh3.googleusercontent.com",
  //   ],
  // },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "listing-storage.s3.eu-north-1.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "flagpedia.net",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: ".s3.eu-north-1.amazonaws.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      // support all
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
  // URL Rewrites -  routing
  async rewrites() {
    return [
      {
        source: "/offplan/:slug",
        destination: "/properties-for-sale/:slug",
      },
      {
        source: "/:country/offplan/:slug",
        destination: "/:country/properties-for-sale/:slug",
      },
      {
        source: "/developers",
        destination: "/our-developers",
      },
      {
        source: "/:country/developers",
        destination: "/:country/our-developers",
      },
      {
        source: "/developers/:slug",
        destination: "/our-developers/:slug",
      },
      {
        source: "/:country/developers/:slug",
        destination: "/:country/our-developers/:slug",
      },
      {
        source: "/area-guides",
        destination: "/exclusive-areas",
      },
      {
        source: "/:country/area-guides",
        destination: "/:country/exclusive-areas",
      },
    ];
  },
};

export default nextConfig;
