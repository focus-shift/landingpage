module.exports = {
  mount: {
    build: "/",
    static: "/",
  },
  plugins: [
    "@snowpack/plugin-optimize",
    "@snowpack/plugin-postcss",
    ["@snowpack/plugin-run-script", { cmd: "eleventy", watch: "$1 --watch" }],
    "snowpack-plugin-cache-bust",
  ],
  devOptions: {
    port: 3000,
    open: "none",
    hmr: true,
    hmrDelay: 300,
  },
  buildOptions: {
    out: "dist",
  },
};
