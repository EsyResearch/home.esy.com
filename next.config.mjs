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
      // Redirect /essays/visual/etymology to /essays/etymology/
      {
        source: '/essays/visual/the-word-dick',
        destination: '/essays/etymology/the-word-dick',
        permanent: true,
      },
      {
        source: '/essays/visual/the-origin-of-the-word-dick',
        destination: '/essays/etymology/the-origin-of-the-word-dick',
        permanent: true,
      },
      // Redirect other /essays/visual/* to /essays/*
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
      // Etymology essays redirects - moved from /essays/ to /essays/etymology/
      {
        source: '/essays/the-word-essay',
        destination: '/essays/etymology/the-word-essay',
        permanent: true,
      },
      {
        source: '/essays/the-word-robot',
        destination: '/essays/etymology/the-word-robot',
        permanent: true,
      },
      {
        source: '/essays/the-word-dick',
        destination: '/essays/etymology/the-word-dick',
        permanent: true,
      },
      {
        source: '/essays/the-word-pussy',
        destination: '/essays/etymology/the-word-pussy',
        permanent: true,
      },
      {
        source: '/essays/the-word-han',
        destination: '/essays/etymology/the-word-han',
        permanent: true,
      },
      {
        source: '/essays/the-word-animal',
        destination: '/essays/etymology/the-word-animal',
        permanent: true,
      },
      {
        source: '/essays/the-origin-of-animal',
        destination: '/essays/etymology/the-origin-of-animal',
        permanent: true,
      },
      {
        source: '/essays/the-origin-of-sex',
        destination: '/essays/etymology/the-origin-of-sex',
        permanent: true,
      },
      {
        source: '/essays/the-origin-of-toy',
        destination: '/essays/etymology/the-origin-of-toy',
        permanent: true,
      },
      {
        source: '/essays/the-origin-of-the-word-dick',
        destination: '/essays/etymology/the-origin-of-the-word-dick',
        permanent: true,
      },
      {
        source: '/essays/the-origin-of-the-word-porn',
        destination: '/essays/etymology/the-origin-of-the-word-porn',
        permanent: true,
      },
      {
        source: '/essays/pornography-etymology',
        destination: '/essays/etymology/pornography-etymology',
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
