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
    domains: ['images.unsplash.com', 'upload.wikimedia.org', 'images.metmuseum.org'],
    ...(process.env.NODE_ENV === 'production' && {
      unoptimized: true
    })
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
  },
  // Redirect all scrollytelling stories to /essays/visual/
  async redirects() {
    return [
      // Catch-all redirect for scrollytelling stories
      {
        source: '/scrollytelling/:slug',
        destination: '/essays/visual/:slug',
        permanent: true,
      },
    ];
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
