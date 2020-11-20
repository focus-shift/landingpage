const defaultConfig = require("tailwindcss/defaultConfig");

const production = process.env.NODE_ENV === "production";

module.exports = {
  future: "all",
  purge: {
    content: ["src/**/*.njk", "src/**/*.html", "src/**/*.md"],
    enabled: production,
  },
  theme: {
    extend: {
      boxShadow: {
        ...defaultConfig.boxShadow,
        text: "inset 0 -0.175em white, inset 0 -0.2em black;",
      },
    },
  },
  variants: {},
  plugins: [],
};
