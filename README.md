#### 重邮帮小程序开发脚手架

#### 使用方法
+   cnpm install 安装相关依赖
+   npm run watch 开启监视 刷新
+   npm run generate 生成一个新的 page (并且在顶层的 app.json 中添加这个 page) 有命令行交互
+   npm run build
+   开发的时候小程序项目文件夹选中 dist 文件夹就 OK

#### 目录结构

```bash
.
├── README.md
├── .babelrc
├── .eslintrc
├── gulpfile.js
├── src                         # 源码
│   ├── images
│   │   └── xxx.png
│   ├── pages
│   │   ├── index
│   │   │   ├── index.js
│   │   │   ├── index.json
│   │   │   ├── index.xml       # 打包成 .wxml
│   │   │   └── index.less      # 打包成 .wxss
│   │   └── repair
│   │         ├── index         # 一个功能下的 page 组织方式，每个单页分成 4 部分，放到以功能命名的文件夹下
│   │         │   ├── index.js
│   │         │   ├── index.xml
│   │         │   ├── index.less
│   │         │   └── index.json
│   │         ├── apply
│   │         └── others
│   ├── utils                   # 项目内部要用的工具函数
│   │   ├── bluebird.js
│   │   └── andSoOn.js
│   ├── app.js                  # 小程序顶层配置
│   ├── app.json                # 小程序顶层配置
│   └── app.less                # 小程序顶层配置
└── utils                       # 开发依赖但项目不依赖的库
    └── 略
```

#### 其它
+ 2017-01-23
  - 更新页面组织方式

[@Hangeer](https://github.com/Hangeer)
