/** Static export for GitHub Pages (user site, served from the domain root). */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
