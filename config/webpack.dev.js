const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const dotenv = require("dotenv").config();
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(common(true), {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "static/js/bundle.js",
    chunkFilename: "static/js/[name].chunk.js",
    pathinfo: true,
    publicPath: "/",
    assetModuleFilename: "static/media/[name].[hash][ext]"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "..", "public"),
      publicPath: "/"
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    client: {
      logging: "error",
      overlay: true
    },
    devMiddleware: {
      stats: "minimal"
    },
    historyApiFallback: true
  },

  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed)
    })
  ]
});
