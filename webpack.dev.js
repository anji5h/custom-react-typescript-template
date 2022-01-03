const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const dotenv = require("dotenv").config();
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "src", "static"),
      publicPath: "/static"
    },
    compress: false,
    port: 3000,
    open: true,
    hot: true,
    devMiddleware: {
      stats: "minimal"
    },
    historyApiFallback: true,
    watchFiles: ["src/*/**", "public/*/**"]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed)
    }),
    new ReactRefreshWebpackPlugin()
  ]
});
