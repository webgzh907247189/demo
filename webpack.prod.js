/*
 * 添加支持es3的配置
 * https://github.com/zuojj/fedlab/issues/5
 * CommonsChunkPlugin公共模块抽取  https://segmentfault.com/a/1190000006808865
 * 抽取类库或框架(解决重复加载)  http://cnodejs.org/topic/58396960c71e606e36aed1db   https://segmentfault.com/a/1190000006808865
 * 代码分割?UglifyJsPlugin兼容IE8?devtool?
 */

const webpack = require('webpack');
const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')
const webpackDevServer = require('webpack-dev-server')

module.exports = {
    entry: {
        common: 'babel-polyfill',
        app: './app.js',
        appTest: './apptest.js',
        vendor: ['lodash']
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.[chunkHash].js',
        publicPath: '/',
        chunkFilename: '[chunkHash].js'
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
    externals: {
        jquery: "window.jQuery" //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            // name: 'common', //多入口，模块重复引用，分文件输出（将多次引用的模块打包到公共模块） 
            // minChunks: 2, //引用次数
            // chunks: ['app','appTest'] //只有在app.js和appTest.js中都引用的模块才会被打包的到公共模块（这里即common.js）

            names: ['vendor','runtime']
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
            thunks: ['common','app', 'appTest'],
            inject: 'body',
            minify: {
                collapseInlineTagWhitespace: false,
                removeComments:true, //移除HTML中的注释
                collapseWhitespace: true  //压缩html模板(生产)
            }
        })
    ]
}