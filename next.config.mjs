/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    // Modern formats are served automatically when the browser supports them.
    formats: ['image/avif', 'image/webp'],
    // Widths the optimizer is allowed to generate. Keep the list small: every
    // extra width is another image variant to build and cache.
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Add your CDN / storage host here when you move images off /public.
    // Example for Cloudinary, S3+CloudFront, Bunny, ImageKit, Supabase, etc.
    remotePatterns: [
      // { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      // { protocol: 'https', hostname: 'cdn.exploreroots.in', pathname: '/**' },
    ],
  },

  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
