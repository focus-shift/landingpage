import {format} from "date-fns/format";
import metadata from "./src/_data/metadata.json" with { "type": "json" };

const paths = {
  input: "src",
  output: process.env.npm_package_config_outdir,
};

export default function (eleventyConfig) {
  eleventyConfig.setTemplateFormats(["njk", "md", "html"]);
  eleventyConfig.addPassthroughCopy("./src/assets/fonts");
  eleventyConfig.addPassthroughCopy("./src/assets/js");
  eleventyConfig.addPassthroughCopy("./src/assets/**/*.png");

  eleventyConfig.addFilter("title", (title) =>
    title ? metadata.title + " - " + title : metadata.title,
  );

  eleventyConfig.addFilter("date", function (date, formatFunction) {
    return format(date, formatFunction);
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
