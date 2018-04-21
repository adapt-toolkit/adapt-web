const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ['./src/client.js', 'webpack-hot-middleware/client'],
    devtool: 'source-map',
    output: {
        path: path.resolve('dist'),
        filename: 'index_bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 2,
                            camelCase: true,
                            sourceMap: true,
                            localIdentName: '[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg|svg)$/,
                loader: 'file-loader',
                options: {
                    limit: 10240
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}