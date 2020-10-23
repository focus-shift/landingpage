const production = process.env.NODE_ENV === "production";

module.exports = {
  future: "all",
  purge: {
    content: ["src/**/*.njk", "src/**/*.html", "src/**/*.md"],
    enabled: production,
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
