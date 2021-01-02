const formatDate = require("date-fns/format");
const metadata = require("./src/_data/metadata.json");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("title", (title) =>
    title ? metadata.title + " - " + title : metadata.title,
  );

  eleventyConfig.addFilter("date", function (date, format) {
    return formatDate(date, format);
  });

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
