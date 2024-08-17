const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


const port = process.env.PORT || 3000;

module.exports = {
    mode: 'production',
    output: {
        filename: 'bundle.[fullhash].js'
    },
    optimization: {
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
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
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
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
        }),
        new MiniCssExtractPlugin({
            filename: 'app.min.css',
        })
    ],

};
