module.exports = {
	plugins: [
		require('precss'), // 囊括了许多插件来支持类似 Sass 的特性，比如 CSS 变量，套嵌，mixins 等
		require('autoprefixer')({browsers: ['last 10 versions',"Firefox >= 20"]}),
    	require('postcss-pxtorem')({
    		rootValue: 75,propWhiteList: []
    	})
	]
}