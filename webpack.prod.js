/*
 * 添加支持es3的配置
 * https://github.com/zuojj/fedlab/issues/5
 * CommonsChunkPlugin公共模块抽取  https://segmentfault.com/a/1190000006808865
 * 抽取类库或框架(解决重复加载)  一开始通过先打包，在MD5形式判定文件(库或框架)有没有更改  http://cnodejs.org/topic/58396960c71e606e36aed1db   https://segmentfault.com/a/1190000006808865   https://github.com/zhenyong/Blog/issues/1
 * devtool  source-map  http://www.css88.com/doc/webpack2/configuration/devtool/
 * 打包完成之后的检验工作(打包是否正常) nginx验收或者npm run runDist -> 预发布<见 .md>  https://www.cnblogs.com/saysmy/p/6609796.html  https://www.cnblogs.com/tuojunjie/p/6229773.html
 *  
 * autoprefixer postcss  http://www.imooc.com/qadetail/242697?lastmedia=1   http://blog.csdn.net/hanshuoNB/article/details/77530035  https://segmentfault.com/a/1190000010934375#articleHeader1
 * css-loader  css移除注释，压缩  http://www.css88.com/doc/webpack2/loaders/css-loader/   http://www.jianshu.com/p/02380e5deb38
 * fastclick   http://blog.csdn.net/wxl1555/article/details/53128966  
 * nextcss  https://www.zhihu.com/question/28622861 
 * 对象的in对象检测属性 let obj = {name:'1',sex:'66666'}; Reflect.has(obj,'name'); 'sex' in obj
 *
 * 代码分割?UglifyJsPlugin兼容IE8? ?HtmlWebPlugin需不需要在prod？jq install报错 ？琪琪的脚手架???完整的移动端项目？?重复依赖的包？layout？
 * new webpack.DefinePlugin()? http://www.jianshu.com/p/40d3ebd47f79    dev合并master代码 git giyhub？热加载失败css？
 *  
 *
 * redux redux原理 setState()   css放在js里面
 */

const webpack = require('webpack');
const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')
const webpackDevServer = require('webpack-dev-server')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('style/styleCss.css');
const extractLESS = new ExtractTextPlugin('style/styleLess.css');啊

module.exports = {
    entry: {
        common: 'babel-polyfill',
        app: './app.js',
        appTest: './apptest.js',
        vendor: ['lodash']
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.[chunkHash].js', //https://github.com/zhenyong/Blog/issues/1
        publicPath: '/',
        chunkFilename: '[chunkHash].js'
    },
    devtool: 'nosources-source-map', //里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
    resolve:{
        extensions: ['.js','.web.js','.jsx','.json', '.scss'],
        alias: {
            style: __dirname + '/src/style/'
        },
        mainFiles: ['index','index.web'], //解析目录时要使用的文件名
        modules: [path.resolve(__dirname, "src"), "node_modules"], //如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索
        mainFields: ["browser", "module", "main"]
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            // {
            //     test: /\.css$/,   //这有个缺点，您将无法利用浏览器的异步和并行加载CSS的能力。这样，您的网页必须等待，直到您的整个JavaScript 包下载完成，然后重绘网页。
            //     use: 'css-loader' //并使用css-loader（它输出CSS作为JS模块） js是阻塞加载的，样式会出现很慢
            // },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", //编译后用什么loader来提取css文件
                    use: ['css-loader?importLoaders=1&minimize','postcss-loader']
               })
            },

            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", //编译后用什么loader来提取css文件
                    use: ['css-loader?importLoaders=1&minimize','postcss-loader','less-loader']  //loader会依次处理，上面的loader作废
               })
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

        // new ExtractTextPlugin('styles.css'),
        // extractCSS,
        // extractLESS,
        new ExtractTextPlugin('style/styleCss.css'),

        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV:JSON.stringify('production')
            }
        }),
        new webpack.ProgressPlugin(function(percentage, msg) {
            let percent = Math.floor(percentage * 100) + '%'
            process.stdout.write(percent+'\r')  // 实时更新编译进度?\r (\r表示return，光标回到当前行首。所以能实现单行刷新的进度条效果。)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                properties: false,
                warnings: false,
            },
            output: {
                comments: false,
                beautify: false, //美化输出(是否美化输出)
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