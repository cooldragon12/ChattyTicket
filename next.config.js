/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
    },
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            // Trailing slash is optional, see below
            destination: `${process.env.NEXT_PUCLIC_AWS_URL_API}/api/:path*/`
          }
        ]
      },
}

module.exports = nextConfig
