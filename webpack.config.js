const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: { path: path.join(__dirname, "build"), filename: "bundle.js" },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".tsx", ".ts"],
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    port: 4000,
    open: true,
    hot: true,
    stats: "errors-only",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{ loader: "react-hot" }, { loader: "ts-loader", options: { transpileOnly: true } }],
      },
      {
        test: /\.(scss|css)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
};
