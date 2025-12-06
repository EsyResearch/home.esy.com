import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true
    }
  }),
  images: {
    domains: ['images.unsplash.com', 'upload.wikimedia.org'],
    ...(process.env.NODE_ENV === 'production' && {
      unoptimized: true
    })
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
  },
  // Disable the "N" dev indicator in bottom-left corner
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
})(nextConfig);
