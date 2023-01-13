const webpack = require("webpack");
const rules = require("./webpack.rules");
// const path = require("path");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

rules.push({
  test: /\.(scss)$/, // all scss files will be handled
  // Use loaders in that specific reverse order
  use: [
    {
      loader: "style-loader",
    },
    {
      loader: "css-loader",
    },
    {
      loader: "sass-loader",
    },
  ],
});

// rules
// .push
// {
//   test: /\.(png|jpe?g|gif|ico|svg)$/,
//   use: [
//     {
//       loader: "file-loader",
//       options: {
//         publicPath: "./../",
//         name: "./img/[hash].[ext]",
//         //outputPath: ''
//       },
//     },
//   ],
// },
// {
//   test: /\.(png|svg|jpe?g|gif|webm)$/,
//   use: [
//     {
//       loader: "file-loader",
//       options: {
//         name: "[hash]-[name].[ext]",
//       },
//     },
//   ],
// },
// {
//   test: /\.(woff|woff2|ttf|otf|eot)$/,
//   use: [
//     {
//       loader: "file-loader",
//       options: {
//         publicPath: "./../",
//         name: "./fonts/[hash].[ext]",
//         //outputPath: ''
//       },
//     },
//   ],
// }
// ();

module.exports = {
  module: {
    rules: rules,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
};
