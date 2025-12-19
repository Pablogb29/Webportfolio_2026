/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Ensure static assets are served correctly
  // If deploying to a subdirectory, uncomment and set basePath:
  // basePath: '/subdirectory',
  
  // If using a CDN or reverse proxy, set assetPrefix:
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://your-cdn-domain.com' : '',
  
  // Ensure images work in production
  images: {
    // For static export, use unoptimized: true
    // For Node.js hosting, keep optimization enabled
    unoptimized: process.env.NEXT_PUBLIC_UNOPTIMIZED_IMAGES === 'true',
    remotePatterns: [],
  },
  
  // Ensure proper trailing slash handling
  trailingSlash: false,
  
  // Output configuration - use 'standalone' for better Node.js deployment
  output: 'standalone',
  
  // Ensure proper static file serving
  experimental: {
    // Enable if you need server components optimization
  },
};

module.exports = nextConfig;

