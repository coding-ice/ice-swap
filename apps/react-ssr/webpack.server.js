const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: "./server.js",
  output: {
    filename: "index.server.js",
    path: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
    ],
  },
};
