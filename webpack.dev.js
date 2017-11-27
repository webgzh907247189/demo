const webpack = require('webpack');
const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')
const webpackDevServer = require('webpack-dev-server')

module.exports = {
    entry: {
        app: ['webpack-dev-server/client?http://localhost:8080/', './app.js']
        // appTest: './apptest.js'
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/test/'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPlugin({
            filename: 'detail.html',
            template: './index.html',
            thunks: ['app', 'appTest'],
            inject: 'body',
            minify: {
                collapseInlineTagWhitespace: false,
                collapseWhitespace: true  //压缩html模板(生产)
            }
        })
    ]
}