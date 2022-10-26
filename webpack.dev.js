const path = require("path")
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")

module.exports = merge([
  common,
  {
    mode: "development",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      port: 3000,
      historyApiFallback: true,
      watchContentBase: true,
      hot: true, // optional, but you must not set both hot and liveReload to true
      liveReload: true,
    },
  },
])
