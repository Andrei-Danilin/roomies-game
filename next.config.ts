import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Next's static file serving doesn't auto-resolve a directory's index.html the way a
      // plain static host does — map the conventional Decap CMS URLs to the actual file.
      { source: '/admin', destination: '/admin/index.html' },
      { source: '/admin/', destination: '/admin/index.html' },
    ];
  },
};

export default nextConfig;
