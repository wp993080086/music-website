const baseURL = process.env.VUE_APP_BASE_URL
const webpack = require('webpack')
const path = require("path")

module.exports = {
	publicPath: './',
	outputDir: process.env.VUE_APP_BASE_OUTPUTDIR,
	assetsDir: 'assets',
	lintOnSave: true,
	productionSourceMap: false,
	chainWebpack: config => {
		const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
		types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
	},
	configureWebpack: {
		devServer: {
			open: false,
			overlay: {
				warning: true,
				errors: true,
			},
			host: 'localhost',
			port: '9000',
			hotOnly: false,
			proxy: {
				'/api': {
					target: baseURL,
					secure: false,
					changeOrigin: true,//开启代理
					pathRewrite: {
						'^/api': '/',
					},
				},
			}
		},
		plugins: [
			new webpack.ProvidePlugin({
        UTILS: [path.resolve(__dirname, './src/utils/Utils.js'), 'default'],
				TOAST: [path.resolve(__dirname, './src/utils/Toast.js'), 'default'],
				LOADING: [path.resolve(__dirname, './src/utils/Loading.js'), 'default']
      })
		]
	}
};
// 导入全局less
function addStyleResource(rule) {
	rule.use('style-resource')
	.loader('style-resources-loader')
	.options({
		patterns: [
			
			path.resolve(__dirname, './src/assets/css/globalStyle.less')
		],
	})
}