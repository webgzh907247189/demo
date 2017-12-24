/*
 * react-hot-loader3.0使用介绍  http://www.jianshu.com/p/b7accbae3a1c( Babel ES2015 preset配置成不使用Babel来编译ES2015的Module特性 ["es2015", { "modules": false }] )
 * webpack-dev-server信息提示  http://www.imooc.com/qadetail/240317?lastmedia=1
 * 配置sublime的IDE https://www.douban.com/note/613763618/   http://blog.csdn.net/wxl1555/article/details/69941451
 * 配置sublime的IDE自动补全  http://www.cnblogs.com/huangtailang/p/4499988.html  (enter || shift+enter || ctrl+enter)
 * react-router-dom   http://blog.csdn.net/u013938465/article/details/78604434
 * 路由变化，资源不会重新加载   使用NavLink或者官方的push()   禁止使用a标签
 * head -n 1 app.js || tail -n 2 app.js || grep 'react' app.js || cp app.ja apptest.js || mv app.js ../mock/appp.js
 * react-router-dom 使用 http://www.jianshu.com/p/e3adc9b5f75c/  h ttp://www.jianshu.com/p/56dce67b8b13 
 * export   https://www.zhihu.com/question/26621212   http://blog.csdn.net/zhou_xiao_cheng/article/details/52759632  https://www.cnblogs.com/fayin/p/6831071.html
 * 系统自动给nodejs 文件增加2个变量 exports 和 module, module 又有一个属性 exports, 这个exports 属性指向一个空对象 {}; 同时 exports这个变量也指向了这个空对象{}  ( exports => {} <=module.exports )
 * require方能看到的只有module.exports这个对象，看不到exports对象
 * dev环境下使用热加载&CommonsChunkPlugin,出现打印的日志丢失情况 
 * react-route-dom的嵌套路由  http://www.cnblogs.com/fengly0503/p/7823167.html
 * http-server  http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html  https://www.npmjs.com/package/http-server
 * constructor super(props)  <在ES6中的class语法中，只要你的class是子类，那必须得调用super，换句话说，有constructor就得有super> https://segmentfault.com/a/1190000008165717
 * 仅当你想在constructor内使用props才将props传入super(把props传入super，为了在constructor中访问props)  https://segmentfault.com/a/1190000008165717
 * layout中的meta设置   https://www.jianshu.com/p/739d7ce9c6fe  https://segmentfault.com/a/1190000002407912  http://blog.csdn.net/rogerjava/article/details/17123593  https://www.zhihu.com/question/22431667
 * ios将网页添加到主屏title,icon  https://www.cnblogs.com/jaxu/p/5007823.html   https://www.zhihu.com/question/19572446  
 * 
 * 高清图 dpr  http://www.cocoachina.com/webapp/20150715/12585.html (保证图片显示的精细，物理像素点正常的需要多)
 * 对于retina屏幕(如: dpr=2)，为了达到高清效果，视觉稿的画布大小会是基准的2倍，也就是说像素点个数是原来的4倍（对iphone6而言：原先的375×667，就会变成750×1334）。
 * window.devicePixelRatio获取到当前设备的dpr   
 * dpr(设备像素比) = 物理像素(css像素) / 设备独立像素   默认prd为750
 * 高清图   oss存储(缩放)   根据不同的dpr来显示不同的图片         安装两个loader(url & file)  在文件大于limit时，交于file处理 
 *  
 * chunkHash     https://segmentfault.com/a/1190000012469443#articleHeader14       http://www.cnblogs.com/ihardcoder/p/5623411.html
 * chunkHash      hash在js和css中不实用，所以在项目中所有的js都准备用chunkHash,img、font中是没有chunkHash的，仍然需要用到hash
 * js和js引入的css的chunkhash是相同的,css是使用ExtractTextPlugin插件引入的，这时候可以使用到这个插件提供的contenthash
 *
 * 图压缩吕大豹  合并？  打包之后查看添加网页(拷贝图片)?调整express路由？
 * nodeType nodeName? ios safari隐藏模式下localStorage.getItem()报错
 * 装饰器&&注解？nuxt？
 * toString ?
 *
 * es6课程结束掉？react开发webapp，美团(12h)  https://www.imooc.com/learn/868
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
            component: __dirname + '/src/component/',
            util: __dirname + '/src/util/'
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
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: './assets/imgs/[name].[hash].[ext]'
                    }
                }
            }
        ]
    },
    externals: {
        jquery: "window.jQuery" //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

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

        // *表示任意文件名，**表示任意一层子目录
        // proxy: [{
        //     context: ['**', '!**/*.html', '!**/*.js', '!**/*.css'],
        //     target: 'http://localhost:7001'
        // }]
    }
}