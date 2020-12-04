const metadata = require("./src/_data/metadata.json");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("title", (title) =>
    title ? metadata.title + " - " + title : metadata.title,
  );

  eleventyConfig.addFilter(
    "description",
    (description) => description || metadata.description,
  );

  return {
    dir: {
      input: "src",
      output: "build",
    },
  };
};
