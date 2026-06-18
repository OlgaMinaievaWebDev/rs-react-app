/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
      },
    ],
  },
  distDir: './dist', // Changes the build output directory to `./dist/`.
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
