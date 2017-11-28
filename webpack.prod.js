/*
 * 添加支持es3的配置
 * https://github.com/zuojj/fedlab/issues/5
 * 代码分割?UglifyJsPlugin兼容IE8?CommonsChunkPlugin公共模块抽取
 */

const webpack = require('webpack');
const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')
const webpackDevServer = require('webpack-dev-server')

module.exports = {
    entry: {
        common: 'babel-polyfill',
        app: './app.js',
        appTest: './apptest.js'
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.[hash].js',
        publicPath: '/'
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
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons"
        }),
        new webpack.ProgressPlugin(function(percentage, msg) {
            let percent = Math.floor(percentage * 100) + '%'
            process.stdout.write(percent+'\r')  // 实时更新编译进度?\r
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                properties: false,
                warnings: false,
            },
            output: {
                comments: false,
                beautify: true, //美化输出
                quote_keys: true
            },
            sourceMap: false  //生成SourceMap文件，会导致编译过程变慢，默认true (将错误信息的位置映射到模块)
        }),
        new HtmlWebPlugin({
            filename: 'detail.html',
            template: './index.html',
            thunks: ['common','commons','app', 'appTest'],
            inject: 'body',
            minify: {
                collapseInlineTagWhitespace: false,
                removeComments:true, //移除HTML中的注释
                collapseWhitespace: true  //压缩html模板(生产)
            }
        })
    ]
}