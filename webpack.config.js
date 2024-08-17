const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

delete process.binding("natives").punycode;

module.exports = {
  mode: 'development',
  output: {
    filename: 'bundle.[hash].js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource'
      },
      {
        test: /\.svg$/,
        use: [
            "svg-url-loader"
        ],
      },
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: port,
    historyApiFallback: true,
    // disableHostCheck: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    })
  ],
  resolve: {
    alias: {
      punycode: require.resolve(`punycode/`),
    },
  },
};
