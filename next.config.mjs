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
  // Redirect legacy paths to /essays/
  async redirects() {
    return [
      // Redirect /essays/visual/* to /essays/*
      {
        source: '/essays/visual/:slug',
        destination: '/essays/:slug',
        permanent: true,
      },
      // Redirect /essays/the-manhattan-project to /essays/history/the-manhattan-project
      {
        source: '/essays/the-manhattan-project',
        destination: '/essays/history/the-manhattan-project',
        permanent: true,
      },
      // Redirect /essays/fentanyl-timeline to /essays/history/fentanyl-crisis-timeline
      {
        source: '/essays/fentanyl-timeline',
        destination: '/essays/history/fentanyl-crisis-timeline',
        permanent: true,
      },
      // Redirect /essays/fentanyl-crisis-timeline to /essays/history/fentanyl-crisis-timeline
      {
        source: '/essays/fentanyl-crisis-timeline',
        destination: '/essays/history/fentanyl-crisis-timeline',
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
