const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (isDevelopment = false) => ({
  entry: path.join(__dirname, "..", "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    assetModuleFilename: "static/media/[name].[hash][ext]",
    publicPath: "/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.join(__dirname, "..", "src"),
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: true,
                dynamicImport: true
              },
              transform: {
                react: {
                  runtime: "automatic",
                  refresh: isDevelopment
                }
              },
              target: "es2015",
              loose: true
            }
          }
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
  cache: {
    type: "filesystem",
    store: "pack",
    buildDependencies: {
      defaultWebpack: ["webpack/lib/"],
      config: [__filename]
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(__dirname, "..", "public", "index.html"),
      favicon: path.join(__dirname, "..", "public", "favicon.ico")
    })
  ]
});
