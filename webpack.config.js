const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const plugins = [
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
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js",
    },
    experiments: {
        asset: true,
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: ['style-loader', "css-loader", "sass-loader"],
            },
            {
                test:/\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "./dist"),
        open: true,
        compress: true,
        hot: true,
        port: 8082,
    },
    plugins,
};
