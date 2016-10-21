var SriPlugin = require("webpack-subresource-integrity");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");

var bundlesPath = "dist";
var bundlesOrigin = "http://localhost:3000";
var links = "links";
module.exports = {
  entry: {
    links: "./" + links + ".js",
    app: "./js/app.js",
    md5: "./js/md5.js",
  },
  output: {
    path: __dirname + "/" + bundlesPath,
    filename: "[name].bundle.js"
  },
  plugins: [
    new CleanWebpackPlugin([bundlesPath + "/*"], {
      root: __dirname
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "preIndex.ejs",
      filename: __dirname + "/index.html",
      bundlesPath: bundlesPath,
      bundlesOrigin: bundlesOrigin,
      linksBundle: links + ".bundle.js"
    }),
    new SriPlugin(["sha256"])
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff&name=../"
                + bundlesPath + "/[name].[ext]"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=../" + bundlesPath + "/[name].[ext]"
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: "file-loader?name=../" + bundlesPath + "/[name].[ext]"
      }
    ]
  }
};
