#### 重邮帮小程序开发脚手架

#### 脚手架使用方法

+   cnpm install 安装相关依赖
+   npm run watch 开启监视 刷新
+   npm run generate 生成一个新的 page (并且在顶层的 app.json 中添加这个 page) 有命令行交互
+   npm run build
+   小程序项目文件夹选中 dist 文件夹就 OK （需要先打包 dist 文件夹）

#### 开发流程

+	fork 这个仓库到自己的 github repo，clone 到本地
+	开发时将 upstream 设置为原仓库

````
git remote add upstream https://github.com/RedrockTeam/bang
````
+	原仓库有更新

````
git fetch upstream
git checkout master 
// 建议开发的时候在本地新开一个 dev 分支，合并 master
git merge upstream/master 
// merge 如果提示冲突，就需要手动解决
````

+	功能开发阶段性完成且没有与原仓库冲突，向原仓库发起一个 pull request
+ 	[commit 规范](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

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

#### 项目进度
| 功能 | 说明 | 进度 | 开发者 |
| --- | --- | --- | --- |
| 验证、登录状态 | 登录状态 | 在切 (预计 17-02-14 完成) | 刘文栖、王良 |
| 电费 | 查询功能：电费 | 切图已完成、在对接口 | 李立平、蒋天星 |
| 没课约 | 查询功能：没课约 | 在切 (预计 17-02-12 完成) | 曾玉 |
| 报修 | 查询功能：报修 | 对接口 | 韩戈弋、蒋天星 |
| 首页 | 小程序首页 | 切完在调逻辑 (预计 17-02-10 完成) | -- |
| 活动 | 活动发布平台 | 切图 80% | -- 刘荣博 |
| 图书馆 | 查询功能：图书馆 | 在切 (预计 17-02-12 完成) | 李立平 |
| <del>失物招领</del> | 失物招领平台 | 已出图 | 待定 |
| <del>成绩查询</del> | 查询功能：成绩查询 | 二期添加 | 无 |
| 后台接口 | 活动、以及验证等 | 后台部分 | 王良、叶成林、蒋天星 |

+ 前端具体进度以及开发记录可在 src/pages/ 相应 README 中查阅

#### 其它
+ 2017-01-23
  - 更新页面组织方式
+ 2017-02-03
  - 更新进度

[@Hangeer](https://github.com/Hangeer)
