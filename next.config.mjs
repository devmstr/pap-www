/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: 'perfectassesspro.com'
      },
      {
        protocol: 'https',
        hostname: 'api.perfectassesspro.com'
      },
      {
        protocol: 'http',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'placekitten.com'
      },
      {
        protocol: 'https',
        hostname: 'bumbeishvili.github.io'
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'pagedone.io'
      }
    ]
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'referrer-policy',
            value: 'no-referrer'
          }
        ]
      }
    ]
  }
}

export default nextConfig
