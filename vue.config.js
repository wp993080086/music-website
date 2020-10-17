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
        },
    }
};