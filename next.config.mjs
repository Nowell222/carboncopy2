/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // 👇 Add this line to disable the bottom-left Next.js Dev Tools icon
  devIndicators: false,

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle database packages on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@neondatabase/serverless': false,
        'pg': false,
        'pg-pool': false,
      }
    }

    // Ignore native modules
    config.externals = config.externals || []
    config.externals.push({
      'bufferutil': 'bufferutil',
      'utf-8-validate': 'utf-8-validate',
    })

    return config
  },
}

export default nextConfig
