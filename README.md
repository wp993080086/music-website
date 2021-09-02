# pdd-music PC浏览器版的音乐网站

## 安装
npm install

## 运行
npm run serve

## 测试环境打包
npm run test

## 正式环境打包
npm run build

## 同时打包正式环境&&测试环境
npm run all

# 目录结构
```
│  .env.development
│  .env.production
│  .env.test      环境文件
│  .eslintignore
│  .eslintrc.js    eslint配置
│  .gitignore     git省略文件
│  babel.config.js
│  package-lock.json
│  package.json
│  README.md       说明文件
│  vue.config.js    脚手架配置
├─node_modules      依赖
├─public      根文件
└─src
    │  App.vue      根文件
    │  main.js      根文件
    │  
    ├─assets
    │  ├─css      公共样式
    │  │      base.css      全局通用样式
    │  │      globalColor.less      全局颜色
    │  │      init.css      初始化
    │  ├─icon     字体图标
    │  │      
    │  └─image      图片
    │      │  
    │      └─info 
    │              
    ├─components      公共组件
    │          
    ├─mixins
    │      path.js      常用方法
    │      
    ├─plugins
    │      elementUI.js   局部引入elementUi
    │      snowflake.js   雪花插件
    │      
    ├─request
    │  │  fetch.js - axios封装
    │  └─api    接口文件
    ├─store     vueX
    ├─utils     工具类
    └─view      页面
```
# 已有功能

- 网易云APP扫码登陆 & 网易云账号登录
- 注册
- 骨架屏
- 音乐播放器
- 歌单 & 详情
- 歌手 & 详情
- MV & 详情