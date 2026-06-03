/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: pure HTML/CSS/JS in `out/`, no server runtime.
  // See CLAUDE.md → "Static-export gotchas".
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Optional: serve under a subpath. Leave empty for a root domain.
  // basePath: '',
};

module.exports = nextConfig;
