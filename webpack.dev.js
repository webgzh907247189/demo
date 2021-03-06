/* https://www.tuicool.com/articles/VNFZBbj   http://levy.work/2016-08-31-debug-react-key-with-performance-tool/  react性能问题
 * https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab (含有额外的超链接 -> 教程)
 * https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool
 *
 * react-hot-loader3.0使用介绍  http://www.jianshu.com/p/b7accbae3a1c( Babel ES2015 preset配置成不使用Babel来编译ES2015的Module特性 ["es2015", { "modules": false }] )
 * webpack-dev-server信息提示  http://www.imooc.com/qadetail/240317?lastmedia=1
 * 配置sublime的IDE https://www.douban.com/note/613763618/   http://blog.csdn.net/wxl1555/article/details/69941451
 * 配置sublime的IDE自动补全  http://www.cnblogs.com/huangtailang/p/4499988.html  (enter || shift+enter(space) || ctrl+enter)
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
 * 使用chunkHash来操作css，css更改之后，打包出来的css的chunkHash没变，使得线上模板依然引用的是这个[chunkHash].css(因为原来的css还在缓存里面，间接使得更改的css没有生效)
 *   
 * 使用node读文件并且指定字符编码，在写的时候也需要指定相同的字符编码  (未指定字符编码,则返回原始的 buffer)
 * 图压缩  http://blog.csdn.net/stanxl/article/details/78639608  https://github.com/tcoopman/image-webpack-loader  https://mp.weixin.qq.com/s?__biz=MzI5NjE1OTI1OA==&mid=2649452464&idx=1&sn=532f9b7733d914cf71af4205bead291f&chksm=f4575ec5c320d7d33c75a630e953fac7e77bb0e8b32a98fde7259acc48bc2d8c9658e09c6590&mpshare=1&scene=1&srcid=1220tnM5aIeZJOqN6wgPCNYN#rd
 *
 * webpack优化点  使用缓存   https://www.cnblogs.com/Leo_wl/p/5248954.html  
 * Http头对文件设置很大的max-age，例如1年。同时，给每个文件命名上带上该文件的版本号，例如把文件的hash值做为版本号，topic. ef8bed6c.js。即是让文件很长时间不过期。
 * 当文件没有更新时，使用缓存的文件自然不会出错；
 * 当文件已经有更新时，其hash值必然改变，此时文件名变了，自然不存在此文件的缓存，于是浏览器会去加载最新的文件。
 * 浏览器给这种缓存方式的缓存容量太少了，只有12Mb，且不分Host。所以更极致的做法是以文件名为Key，文件内容为value，缓存在localStorage里，命中则从缓存中取，不命中则去服务器取，虽然缓存容量也只有5Mb，但是每个Host是独享这5Mb的。
 *
 * tree shaking移除多余export代码(此概念兴起于 ES2015 模块打包工具 rollup)  https://zhuanlan.zhihu.com/p/30248068
 * 通过配置.babelrc的{ "modules": false }，只要在文件没有直接使用这个函数，就不会打包在bundle
 *
 * react的异步加载以及其他优化点  https://zhuanlan.zhihu.com/p/30248068      https://zhuanlan.zhihu.com/p/27283107
 *
 * 装饰器 && 注解   https://aotu.io/notes/2016/10/24/decorator/index.html   https://github.com/rccoder/blog/issues/23    https://my.oschina.net/wanjubang/blog/861913
 * 当装饰器作用于类本身的时候，我们操作的对象(target)  也是这个类本身
 * 而当装饰器作用于类的某个具体的属性的时候，我们操作的对象既不是类本身，也不是类的属性，而是它的描述符（descriptor）,descriptor记录着我们对这个属性的全部信息，所以，我们可以对它自由的进行扩展和封装，
 * Object.defineProperty(target, name, descriptor) 
 *
 * toString   https://www.cnblogs.com/imwtr/p/4392041.html   (“1” == true,true首先转换为1，然后再执行比较。接下来字符串“1”也转换成了数字1，相等，所以返回true  ->  转为数字比较)
 * 对于所有非日期对象来说，对象到原始值的转换基本上是对象到数字的转换   优先调用valueOf 
 * “+"运算符可以进行数学加法和字符串连接操作。如果他它的其中一个操作数是对象，则js将使用特殊的方法将对象转换成原始值  (valueOf)
 * "-“,”<",”==“ 把两个操作数都转换成数字 (优先valueOf)
 * 
 * redux  http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html    https://www.jianshu.com/p/7a71181a7aa0
 * http://byevil.com/2016/01/25/dive-into-redux/    https://segmentfault.com/a/1190000009626788    https://www.cnblogs.com/wy1935/p/7109701.html      https://segmentfault.com/q/1010000008163213
 *
 *
 * webpack-spritesmith
 * nodeType nodeName? ios safari隐藏模式下localStorage.getItem()报错
 * nuxt？缓存配置max-age?
 * 
 *
 * es6课程结束掉？react开发webapp，美团(12h)  https://www.imooc.com/learn/868
 * 7天微信项目，聊天项目，node部署上线，nginx，rn(https://coding.imooc.com/class/56.html#Anchor)
 * scott微信小程序(vue+node+mongo https://coding.imooc.com/class/119.html#Anchor(24)  https://coding.imooc.com/class/113.html(18))
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
        appTest: './apptest.js',
        vendor: ['react','lodash']
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/',
        chunkFilename: 'js/[name].chunk.js'
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
        // 针对Npm中的第三方模块优先采用jsnext:main中指向ES6模块化语法的文件
        mainFields: ["browser","main","jsnext:main", "module"]
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'         //'babel-loader?cacheDirectory'   babel的缓存编译结果
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
        new webpack.BannerPlugin('react demo'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        // new ExtractTextPlugin('styles.css'),  //重命名提取之后的css
        // extractCSS,
        // extractLESS,

        new openBrowserWebpackPlugin({
            url: `http://localhost:${devPort}`
        }),
        new webpack.ProgressPlugin(function(percentage, msg) {
            let percent = Math.floor(percentage * 100) + '%'
            process.stdout.write(percent+'\r')  // 实时更新编译进度?\r) (\r表示return，光标回到当前行首。所以能实现单行刷新的进度条效果。)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor','runtime'],
            minChunks: Infinity  //防止其他代码被打包进来
        }),
        new HtmlWebPlugin({
            filename: 'index.html',
            template: './index.html',
            chunks: ['common','index', 'appTest','vendor','runtime'],   //允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
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