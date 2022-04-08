   
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const WebpackShellPlugin = require("webpack-shell-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./front-end/clientes.js",
  devServer: {
    writeToDisk: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
        { 
            test: /\.css$/,
            include: /front-end/,
            sideEffects: true, 
            loader: "css-loader",
            options: {
              import: true,
            }
        },

    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      include: /\.min\.js$/
    }),  new CssMinimizerWebpackPlugin(),]
},
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ["json-server -p 8088 -w back-end/usuarios.json"]
    }),
    new HtmlWebPackPlugin({
      template: "./front-end/clientes.html",
      filename: "./clientes.html"
    }),
    new MiniCssExtractPlugin({
        filename: './css/style.css'
    }),
    new CopyWebpackPlugin({
      patterns: [ { from: "./front-end/css", to: "css"}]
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  }
};