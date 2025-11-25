const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",

    entry: "./src/index.js",

    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    devServer: {
        static: "./dist",
        open: true,
        hot: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },

    optimization: {
        minimizer: [
            ({ minimizerContext }) => ({
                ...minimizerContext.options.terserOptions,
                compress: {
                    ...minimizerContext.options.terserOptions.compress,
                    drop_console: true,
                },
            }),
        ],
    },
};
