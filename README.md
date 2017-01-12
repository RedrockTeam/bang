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
├── src                   		# 源码
│    ├── images
│    │	 └── xxx.png
│    ├── pages
│	 │   ├── index
│	 │   │	 ├── index.js		
│	 │	 │	 ├── index.json
│	 │	 │	 ├── index.xml		# 打包成 .wxml
│	 │	 │	 └── index.less		# 打包成 .wxss
│	 │   └── user
│	 │   	 └── 略
│    ├── utils					# 项目内部要用的工具函数
│	 │	 ├── bluebird.js			
│    │	 └── andSoOn.js
│	 ├── app.js					# 小程序顶层配置	
│	 ├── app.json				# 小程序顶层配置
│	 └── app.less				# 小程序顶层配置
└── utils                    	# 开发依赖但项目不依赖的库
    └── 略
```

#### 其它
+   改掉了原 repo 的 generate 页面方法
+   eslint 还没配置完
+   待续
[@Hangeer](https://github.com/Hangeer)