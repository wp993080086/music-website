module.exports = {
    publicPath: "./",
    outputDir: "dist",
    assetsDir: "assets",
    lintOnSave: true,
    configureWebpack: {
        devServer: {
            overlay: {
                warning: true,
                errors: true,
            },
            host: "localhost",
            port: "9000", //代理断就
            hotOnly: false, //热更新
            proxy: {
				"/api": {
					// target: "http://192.168.24.220:8080", //目标代理接口地址 - 本地
					// target: "https://www.whzhangtongbao.com", //目标代理接口地址 - 正式线
					target: "https://www.wuhanztb.com", //目标代理接口地址 - 测试线
					secure: false,
					changeOrigin: true, //开启代理，本地创建一个虚拟服务器
					//ws:true,//是否启用websockets
					pathRewrite: {
						"^/api": "/",
					},
				},
			}
        },
    }
};