# 一个流畅，简单好用的PC端音乐网站

<div align=center>
  
![vue](https://img.shields.io/badge/vue-2.6.11-%23007d65)
![element-ui](https://img.shields.io/badge/element--ui-2.15.3-%23009ad6)
![vue-router](https://img.shields.io/badge/vue--router-3.4.7-brightgreen)
![eslint](https://img.shields.io/badge/eslint-6.7.2-yellow)

</div>

<div align=center>

![axios](https://img.shields.io/badge/axios-0.20.0-blue)
![vuex](https://img.shields.io/badge/vuex-3.5.1-red)
![qrcodejs2](https://img.shields.io/badge/qrcodejs2-0.0.2-green)
![dplayer](https://img.shields.io/badge/dplayer-1.26.0-lightgrey)
![less](https://img.shields.io/badge/less-3.0.4-orange)

</div>


## 👂 前言

> 感谢 [binaryify](https://github.com/Binaryify) 大佬的 `NeteaseCloudMusicApi` 接口支持 😜

- [项目预览地址](http://116.62.13.54)
- [接口文档地址](https://binaryify.github.io/NeteaseCloudMusicApi)

## 📔 已有功能

- 网易云APP扫码登录 & 网易云账号登录
- 注册
- 骨架屏
- 音乐播放器
- 歌单 & 详情
- 歌手 & 详情
- MV & 详情mv播放
- 排行榜
- 搜索
- 评论
- 歌词

## 🚀 运行项目

- clone该项目：[music-website](https://github.com/wp993080086/music-website.git)
- 安装：npm install
- 运行：npm run serve
- 测试环境打包：npm run test
- 正式环境打包：npm run build
- 同时打包正式环境 & 测试环境：npm run all
- 修复：npm run lint

## ⚡️ 本地开发准备

- 本地开发请先下载 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi.git) 项目

- 下载完成后，进入`NeteaseCloudMusicApi`文件夹，打开`cmd`终端，`npm install`安装依赖，使用`node app.js`命令启动

- 将`music-website`项目根目录下`.env.development`文件里`VUE_APP_BASE_URL`字段修改为`NeteaseCloudMusicApi`项目启动后的地址，并重启`music-website`项目

## 📦️ 目录结构

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
    ├─store => vuex
    ├─utils => 工具类
    └─views => 页面
```
