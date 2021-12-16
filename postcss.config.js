const prod = process.env.NODE_ENV === "production";

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    prod && require("cssnano")
  ].filter(Boolean),
};
