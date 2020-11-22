module.exports = {
  mount: {
    build: "/",
  },
  plugins: [
    "@snowpack/plugin-optimize",
    "@snowpack/plugin-postcss",
    ["@snowpack/plugin-run-script", { cmd: "eleventy", watch: "$1 --watch" }],
  ],
  devOptions: {
    port: 3000,
    open: "none",
    hmr: true,
  },
  buildOptions: {
    out: "dist",
  },
};
