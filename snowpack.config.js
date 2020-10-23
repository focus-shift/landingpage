module.exports = {
  mount: {
    build: "/",
  },
  plugins: [
    "@snowpack/plugin-postcss",
    ["@snowpack/plugin-run-script", { cmd: "eleventy", watch: "$1 --watch" }],
  ],
  devOptions: {
    out: "dist",
    port: 3000,
    open: "none",
    hmr: true,
  },
};
