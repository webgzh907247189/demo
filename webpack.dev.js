const webpack = require('webpack');
const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')
const webpackDevServer = require('webpack-dev-server')
const babelPolyfill = require('babel-polyfill')
const openBrowserWebpackPlugin = require('open-browser-webpack-plugin')

let devPort = '8000'

const commonDevModules = [
    'babel-polyfill',
    `webpack-dev-server/client?http://localhost: ${devPort}`,
    'webpack/hot/only-dev-server'
]

module.exports = {
    entry: {
        common: commonDevModules,
        app: './app.js',
        appTest: './apptest.js'
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/'
    },
    devtool: 'inline-source-map',
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
             name: "common"
        }),
        new openBrowserWebpackPlugin({
            url: `http://localhost:${devPort}`
        }),
        new webpack.ProgressPlugin(function(percentage, msg) {
            let percent = Math.floor(percentage * 100) + '%'
            process.stdout.write(percent+'\r')  // 实时更新编译进度?\r
        }),
        new HtmlWebPlugin({
            filename: 'index.html',
            template: './index.html',
            thunks: ['common','app', 'appTest'],
            inject: true,
            minify: {
                collapseInlineTagWhitespace: false,
                collapseWhitespace: true  //压缩html模板(生产)
            }
        })
    ],
    devServer: {
        host: 'localhost',
        port: devPort,
        hot: true,
        // historyApiFallback: true,
        // compress: true,
        inline: true,
        disableHostCheck: true,
        proxy: {}
    }
}