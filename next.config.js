/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: 'http://192.168.0.127:3001',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.0.127:3001/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 