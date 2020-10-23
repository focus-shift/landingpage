module.exports = function (config) {
  config.addPassthroughCopy("./src/css");
  config.addPassthroughCopy("./src/js");

  return {
    dir: {
      input: "src",
      output: "build",
    },
  };
};
