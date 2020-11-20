const path = require("path");
const MiniCssExrtactPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const plugins = [
    new MiniCssExrtactPlugin({
        filename: "[name].style.css",
    }),
    new HtmlWebpackPlugin({
        title: "TV+",
        template: path.resolve(__dirname, "./src/template.html"),
        filename: "index.html",
    }),
];

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, "./src/index.js"),
    }, 
    // entry: ['./app.scss', './src/index.js'],
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    MiniCssExrtactPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: "asset/resource",
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "./dist"),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    plugins,
};
