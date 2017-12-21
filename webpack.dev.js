/*
 * react-hot-loader3.0使用介绍  http://www.jianshu.com/p/b7accbae3a1c( Babel ES2015 preset配置成不使用Babel来编译ES2015的Module特性 ["es2015", { "modules": false }] )
 * webpack-dev-server信息提示  http://www.imooc.com/qadetail/240317?lastmedia=1
 * 配置sublime的IDE https://www.douban.com/note/613763618/   http://blog.csdn.net/wxl1555/article/details/69941451
 * 配置sublime的IDE自动补全  http://www.cnblogs.com/huangtailang/p/4499988.html  (enter || shift+enter || ctrl+enter)
 * react-router-dom   http://blog.csdn.net/u013938465/article/details/78604434
 * 路由变化，资源不会重新加载   使用NavLink或者官方的push()   禁止使用a标签
 * head -n 1 app.js || tail -n 2 app.js || grep 'react' app.js || cp app.ja apptest.js || mv app.js ../mock/appp.js
 *  react-router-dom 使用 http://www.jianshu.com/p/e3adc9b5f75c/  h ttp://www.jianshu.com/p/56dce67b8b13 
 *  
 * 
 * constructor super(props)?  高清图？dpr？图压缩？ nuxt？
 * location.search  location.hash？nodeType nodeName? ios safari隐藏模式下localStorage.getItem()报错
 * http-server http-server -p 9999?装饰器&&注解？热加载失败(componentDidMount)? export
 * toString ?
 *
 * es6课程结束掉？react开发webapp，美团  https://www.imooc.com/learn/868
 * 7天微信项目，聊天项目，node部署上线，nginx，rn(https://coding.imooc.com/class/56.html#Anchor)
 * scott微信小程序(vue+node+mongo https://coding.imooc.com/class/119.html#Anchor  https://coding.imooc.com/class/113.html)
 */

const webpack = require('webpack');
const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')
const webpackDevServer = require('webpack-dev-server')
const babelPolyfill = require('babel-polyfill')
const openBrowserWebpackPlugin = require('open-browser-webpack-plugin')

// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const extractCSS = new ExtractTextPlugin('style/styleCss.css');
// const extractLESS = new ExtractTextPlugin('style/styleLess.css');

let childProcess = require('child_process')
let devPort = '8000'

const commonDevModules = [
    'babel-polyfill',
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${devPort}`,
    'webpack/hot/only-dev-server'
]

let { port:mockPort } = require('./mock/config')
childProcess.exec('nodemon ./mock/nodeExpressMock.js')

module.exports = {
    entry: {
        common: commonDevModules,
        index: './index.js',
        appTest: './apptest.js'
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/'
    },
    devtool: 'inline-source-map', //里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
    resolve:{
        extensions: ['.js','.web.js','.jsx','.json', '.scss'],
        alias: {
            style: __dirname + '/src/style/',
            component: __dirname + '/src/component/'
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

            // {
            //     test: /\.css$/,
            //     use: extractCSS.extract(['css-loader?importLoaders=1','postcss-loader']) ///对于css中@import进来的css同样做前缀处理
            // },
            // {
            //     test: /\.less$/,
            //     use: extractLESS.extract(['css-loader?importLoaders=1','postcss-loader','less-loader']) //less-loader需要依赖less才能实现。如果用的npm3.0+，less是不会随着less-loader自动安装的，需要手动安装
            // }
            
            {
                test: /\.css$/,
                use: ['style-loader','css-loader?importLoaders=1','postcss-loader'] ///对于css中@import进来的css同样做前缀处理
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader?importLoaders=1','postcss-loader','less-loader'] //less-loader需要依赖less才能实现。如果用的npm3.0+，less是不会随着less-loader自动安装的，需要手动安装
            }
        ]
    },
    externals: {
        jquery: "window.jQuery" //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
             name: "common"
        }),

        // new ExtractTextPlugin('styles.css'),
        // extractCSS,
        // extractLESS,

        new openBrowserWebpackPlugin({
            url: `http://localhost:${devPort}`
        }),
        new webpack.ProgressPlugin(function(percentage, msg) {
            let percent = Math.floor(percentage * 100) + '%'
            process.stdout.write(percent+'\r')  // 实时更新编译进度?\r) (\r表示return，光标回到当前行首。所以能实现单行刷新的进度条效果。)
        }),
        new HtmlWebPlugin({
            filename: 'index.html',
            template: './index.html',
            thunks: ['common','index', 'appTest'],
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
        historyApiFallback: true,  //??     ??http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu
        // compress: true,
        inline: true,
        disableHostCheck: true,
        proxy: {
            /** 联调环境下 **/
            // '/api/*': {
            //     target: 'http://localhost:4000'
            // }

            /** 开发环境下 **/
            '/api/*': {
                target: `http://localhost:${mockPort}`
            }
        }
    }
}