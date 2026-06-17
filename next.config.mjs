/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  distDir: './dist', // Changes the build output directory to `./dist/`.
};

export default nextConfig;
