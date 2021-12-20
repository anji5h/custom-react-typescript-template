const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const dotenv = require("dotenv").config({ path: path.join(__dirname, ".env.development") });

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 4000,
    open: true,
    hot: true,
    client: {
      logging: "info",
      overlay: true,
      progress: true,
    },
    historyApiFallback: true,
    watchFiles: ["src/*/**", "public/*/**"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
    }),
  ],
});
