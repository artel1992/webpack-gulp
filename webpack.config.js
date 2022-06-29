const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const WorkboxWebpackPlugin = require("workbox-webpack-plugin")
const {webpack} = require("webpack-stream");

const isProduction = process.env.NODE_ENV === "production"

const stylesHandler = isProduction
    ? MiniCssExtractPlugin.loader
    : "style-loader"

const config = {
    entry: {
        main: "./src/entry.ts",
        vendor: ['boxicons']
    },
    output:{assetModuleFilename: 'assets/[hash][ext][query]'},
    devServer: {
        open: true,
        host: "localhost",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: "ts-loader",
                exclude: ["/node_modules/"],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '/img/[name].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production"
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW())
    } else {
        config.mode = "development"
    }
    return config
}
