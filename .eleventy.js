const formatDate = require("date-fns/format");
const metadata = require("./src/_data/metadata.json");

const paths = {
  input: "src",
  output: process.env.npm_package_config_outdir,
};

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats(["njk", "md", "html"]);
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/js");
  eleventyConfig.addPassthroughCopy("./src/assets/**/*.png");

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

  eleventyConfig.addWatchTarget("src/assets/js/**/*.js");
  eleventyConfig.addWatchTarget("src/assets/css/**/*.css");

  return {
    dir: {
      input: paths.input,
      output: paths.output,
    },
  };
};
