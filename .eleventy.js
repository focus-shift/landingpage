const metadata = require("./src/_data/metadata.json");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "./src/static": "." });
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");

  eleventyConfig.addFilter("title", (title) =>
    title ? metadata.title + " " + title : metadata.title,
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
