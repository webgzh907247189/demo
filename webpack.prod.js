/*
 * 添加支持es3的配置
 * https://github.com/zuojj/fedlab/issues/5
 * 抽取类库或框架(解决重复加载)  一开始通过先打包，在MD5形式判定文件(库或框架)有没有更改  http://cnodejs.org/topic/58396960c71e606e36aed1db   https://segmentfault.com/a/1190000006808865   https://github.com/zhenyong/Blog/issues/1
 * devtool  source-map  http://www.css88.com/doc/webpack2/configuration/devtool/
 * 打包完成之后的检验工作(打包是否正常) nginx验收或者npm run runDist -> 预发布<见 .md>  https://www.cnblogs.com/saysmy/p/6609796.html  https://www.cnblogs.com/tuojunjie/p/6229773.html
 *  
 * autoprefixer postcss  http://www.imooc.com/qadetail/242697?lastmedia=1   http://blog.csdn.net/hanshuoNB/article/details/77530035  https://segmentfault.com/a/1190000010934375#articleHeader1
 * css-loader  css移除注释，压缩  http://www.css88.com/doc/webpack2/loaders/css-loader/   http://www.jianshu.com/p/02380e5deb38
 * fastclick   http://blog.csdn.net/wxl1555/article/details/53128966  
 * nextcss  https://www.zhihu.com/question/28622861 
 * 对象的in对象检测属性 let obj = {name:'1',sex:'66666'}; Reflect.has(obj,'name'); 'sex' in obj
 * let a = 'aa' a.padStart(5,'0') // 000aa       a.padEnd(5,'0') // aa000
 * extract-text-webpack-plugin 没有css热替换  http://www.css88.com/doc/webpack2/plugins/extract-text-webpack-plugin/(优异对比)
 * extract-text-webpack-plugin https://segmentfault.com/q/1010000005031628    https://segmentfault.com/q/1010000008299770
 * git 回退到历史版本  git log命令查看所有的历史版本，获取某个历史版本的id    git reset --hard 139dcfaa558e3276b30b6
 *
 * chunkHash     https://segmentfault.com/a/1190000012469443#articleHeader14       http://www.cnblogs.com/ihardcoder/p/5623411.html
 * chunkHash      hash在js和css中不实用，所以在项目中所有的js都准备用chunkHash,img、font中是没有chunkHash的，仍然需要用到hash
 * js和js引入的css的chunkhash是相同的,css是使用ExtractTextPlugin插件引入的，这时候可以使用到这个插件提供的contenthash
 * 使用chunkHash来操作css，css更改之后，打包出来的css的chunkHash没变，使得线上模板依然引用的是这个[chunkHash].css(因为原来的css还在缓存里面，间接使得更改的css没有生效) 
 * 
 * webpack.DefinePlugin()  https://zhuanlan.zhihu.com/p/30248068 (设置它，就可以忘记开发和发布构建的规则)
 * 代码分割(code spliting 异步加载《首屏需要的同步加载，首屏过后才需要的则按需加载(异步)》。不分割，静态资源可能出现串行加载。)   https://www.jianshu.com/p/547aa7b92d8c  http://www.css88.com/doc/webpack2/guides/code-splitting-require
 *
 * webpack优化点  使用缓存   https://www.cnblogs.com/Leo_wl/p/5248954.html  
 * Http头对文件设置很大的max-age，例如1年。同时，给每个文件命名上带上该文件的版本号，例如把文件的hash值做为版本号，topic. ef8bed6c.js。即是让文件很长时间不过期。
 * 当文件没有更新时，使用缓存的文件自然不会出错；
 * 当文件已经有更新时，其hash值必然改变，此时文件名变了，自然不存在此文件的缓存，于是浏览器会去加载最新的文件。
 * 浏览器给这种缓存方式的缓存容量太少了，只有12Mb，且不分Host。所以更极致的做法是以文件名为Key，文件内容为value，缓存在localStorage里，命中则从缓存中取，不命中则去服务器取，虽然缓存容量也只有5Mb，但是每个Host是独享这5Mb的。
 *
 * HtmlWebPlugin(需要注意插入的顺序,特别是自动插入的情况)  https://www.cnblogs.com/wonyun/p/6030090.html
 * HtmlWebpackInlineSourcePlugin(合并小的js&css进入inline)  https://github.com/DustinJackson/html-webpack-inline-source-plugin
 * 编写自己的wepack插件  https://www.cnblogs.com/sampapa/p/6958166.html  http://www.css88.com/doc/webpack2/api/plugins/  https://segmentfault.com/a/1190000004279560 
 *
 * webpack-bundle-analyzer    https://segmentfault.com/a/1190000008151173
 * UglifyJsPlugin    https://zhuanlan.zhihu.com/p/27283107?utm_source=weibo&utm_medium=social
 *
 * 配置可以打第三方库和commons的包     https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk         https://www.zhihu.com/question/40503584?sort=created    
 * CommonsChunkPlugin公共模块抽取  https://segmentfault.com/a/1190000006808865
 *
 * UglifyJsPlugin兼容IE8   https://github.com/zuojj/fedlab/issues/5
 *
 * jq install报错 ？琪琪的脚手架???完整的移动端项目？?重复依赖的包
 *
 * setState()   co&   
 */



const webpack = require('webpack');
const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')
const webpackDevServer = require('webpack-dev-server')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const DeleteChunksPlugin = require('./webpack.delete.chunks.plugin.js')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('style/styleCss.css');
const extractLESS = new ExtractTextPlugin('style/styleLess.css');

module.exports = {
    entry: {
        common: 'babel-polyfill',
        index: './index.js',
        appTest: './apptest.js',
        vendor: ['react','lodash']
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.[chunkHash].js', //https://github.com/zhenyong/Blog/issues/1
        publicPath: '/',
        chunkFilename: 'js/[name].[chunkHash].js'
    },
    devtool: 'nosources-source-map', //('inline-source-map') 里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
    resolve:{
        extensions: ['.js','.web.js','.jsx','.json', '.scss'],  //默认解析扩展路径
        alias: {
            style: __dirname + '/src/style/',
            component: __dirname + '/src/component/'
        },
        mainFiles: ['index','index.web'], //解析目录时要使用的文件名
        modules: [path.resolve(__dirname, "src"), "node_modules"], //如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索
        mainFields: ["browser","main","jsnext:main","module"]  //webpack先使用jsnext:main字段，在没有时使用main字段。这样就可以优化支持tree-shaking的库
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
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 2048,
                        name: './assets/imgs/[name].[hash:7].[ext]'
                    }
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true,
                    }
                }]
            }
        ]
    },
    externals: {
        jquery: "window.jQuery" //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
    },
    plugins: [
        // new BundleAnalyzerPlugin(),  //webpack打包分析

        new webpack.BannerPlugin('this is react demo'),
        new webpack.optimize.CommonsChunkPlugin({
            // name: 'common', //多入口，模块重复引用，分文件输出（将多次引用的模块打包到公共模块） 
            // minChunks: 2, //引用次数
            // chunks: ['index','appTest'] //只有在index.js和appTest.js中都引用的模块才会被打包的到公共模块（这里即common.js）

            // names: ['vendor','runtime']

            names: ['commonss','vendor','runtime'],
            minChunks: 2
            // minChunks: Infinity  //防止其他代码被打包进来(只是框架代码,业务的公共代码不会进来)
        }),


        // new ExtractTextPlugin('styles.css'),
        // extractCSS,
        // extractLESS,  
        new ExtractTextPlugin('style/[name]-[contenthash].css',{allChunks: true}),

        new webpack.DefinePlugin({   //可在production环境下帮助删除重复或相似文件，可以有效减少文件大小（用于打包文件优化，建议使用在生产环境）
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
                properties: false,  /* 兼容IE8 */
                warnings: false,   // 在UglifyJs删除没有用到的代码时不输出警告
                reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
                drop_console: true // 删除所有的 `console` 语句  还可以兼容ie浏览器
            },
            mangle: {
                screw_ie8: false,    /* 兼容IE8(把支持IE8的代码clear掉) */
                keep_fnames: true
            },
            output: {
                quote_keys: true,   /* 兼容IE8 */
                comments: false,   // 删除所有的注释
                beautify: false    // 最紧凑的输出(是否 最紧凑的输出  ->  美化输出)
            },
            sourceMap: false  //生成SourceMap文件，会导致编译过程变慢，默认true (将错误信息的位置映射到模块)
        }),
        new HtmlWebPlugin({
            filename: 'detail.html',
            template: './index.html',
            chunks: ['common','index', 'appTest','vendor','runtime','commonss'],   //允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
            inject: 'body',  // body等同true的效果   (所有JavaScript资源插入到body元素的底部)
            minify: {
                collapseInlineTagWhitespace: false,
                removeComments:true, //移除HTML中的注释
                collapseWhitespace: true  //压缩html模板(生产)
            },
            inlineSource: 'runtime.bundle.[a-z0-9]{20}.js$'
        }),
        new HtmlWebpackInlineSourcePlugin(),   // https://github.com/DustinJackson/html-webpack-inline-source-plugin
        new DeleteChunksPlugin({
            chunks: ['runtime']
        })
    ]
}