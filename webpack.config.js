const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getPath = (relativePath) => path.resolve(__dirname, relativePath);
const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: false,
    historyApiFallback: true
  },
  entry: [getPath("src/index.ts")],
  output: {
    path: getPath("dist"),
    clean: true,
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/[name][ext]",
    publicPath: "/"
  },
  resolve: {
    alias: {
      core: getPath("./src/core"),
      pages: getPath("./src/pages"),
      components: getPath("./src/components"),
      utils: getPath("./src/utils"),
      css: getPath("./src/css"),
      types: getPath("./src/types"),
      services: getPath("./src/services"),
      api: getPath("./src/api"),
      handlebars: "handlebars/dist/handlebars.js"
    },
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: getPath("tsconfig.json"),
            transpileOnly: true
          }
        }
      },

      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        generator: {
          filename: "img/[name][ext]"
        },
        type: "asset/resource"
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]"
        }
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-preset-env")]
              }
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve("src", "index.html")
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    })
  ]
};
