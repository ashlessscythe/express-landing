const path = require("path");

module.exports = {
  entry: "./public/js/main.js", // Path to your main JS file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
};
