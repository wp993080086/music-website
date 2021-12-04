# Web-Music

> 感谢`binaryify`大佬的接口支持：`https://binaryify.github.io/NeteaseCloudMusicApi/#/`

一个很流畅，简单好用的PC浏览器版的音乐网站 ~

# 已有功能

- 网易云APP扫码登录 & 网易云账号登录
- 注册
- 骨架屏
- 音乐播放器
- 歌单 & 详情
- 歌手 & 详情
- MV & 详情mv播放
- 排行榜
- 搜索
- 评论（限登陆后）
- 歌词

# 技术栈

- Vue 2.6.11
- Vue-Router 3.4.7
- Vuex 3.5.1
- Axios 0.20.0
- Element-Ui 2.15.3
- dplayer 1.26.0
- qrcodejs2 0.0.2

# 使用

- Clone：https://github.com/pdd11997110103/web-Music.git
- 安装：npm install
- 运行：npm run serve
- 测试环境打包：npm run test
- 正式环境打包：npm run build
- 同时打包正式环境 & 测试环境：npm run all
- 修复：npm run lint

## Server准备

- 本地开发请`Clone`：https://binaryify.github.io/NeteaseCloudMusicApi/#/

- `Clone`完成后，进入文件夹。`npm install`安装依赖，使用`node app.js`命令启动，并将`.env`文件里`VUE_APP_BASE_URL`字段修改为启动后的地址

- `npm run serve` 重启该项目

- 详细文档地址：`https://neteasecloudmusicapi.vercel.app/#/?id=%e5%ae%89%e8%a3%85`

# 目录结构

```javascript
│  .env.development
│  .env.production
│  .env.test => .env环境文件
│  .eslintignore => eslint忽略配置
│  .eslintrc.js => eslint配置
│  .gitignore => git忽略配置
│  babel.config.js
│  package-lock.json
│  package.json
│  README.md => 说明文件
│  vue.config.js => 脚手架配置
├─node_modules => 依赖
├─public
└─src
    │  App.vue => 根容器
    │  main.js => 根文件
    │  
    ├─assets
    │  ├─css => 公共样式
    │  │      base.css => 基础样式
    │  │      globalColor.less => 全局颜色
    │  │      init.css => 初始化
    │  ├─icon => 字体图标
    │  │      
    │  └─image => 图片
    │      │  
    │      └─info 
    │              
    ├─components => 公共组件
    │          
    ├─mixins
    │      path.js => 常用方法
    │      
    ├─plugins
    │      elementUI.js => 局部引入elementUi
    │      snowflake.js => 雪花插件
    │      
    ├─request
    │  │  fetch.js => axios封装
    │  └─api => 接口定义
    ├─store => vueX
    ├─utils => 工具类
    └─views => 页面
```