const path = require("path");

module.exports = {
  mode: "development",
  entry: "./build.js",
  target: "node",
  output: {
    filename: "build.bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", ["@babel/preset-react"]],
          },
        },
      },
    ],
  },
};
