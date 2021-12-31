const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
    assetModuleFilename: "images/[hash][ext][query]"
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.join(__dirname, "src"),
        exclude: /node_modules/,
        use: {
          loader: "swc-loader"
        }
      },
      {
        test: /\.(ico|gif|png|jpg|jpeg|mp3|mp4|ogg)$/,
        type: "asset/resource"
      },
      {
        test: /\.(woff(2)?|svg|ttf|eot|otf)$/,
        type: "asset/inline"
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      favicon: path.join(__dirname, "public", "favicon.ico")
    })
  ]
};
