#### 报修功能页面
src/pages/repair

#### 目录结构
```bash
repair
 ├── index            # 报修首页
 │   ├── index.js
 │   ├── index.xml
 │   ├── index.less
 │   └── index.json
 │
 ├── apply            # 报修申请
 │   └── 略
 │
 ├── feedback         # 投诉与建议
 │   └── 略
 │
 ├── detail           # 报修详情
 │   └── 略
 │
 └── info             # 告知界面
    └── 略
```

#### 开发记录
+ 2017-01-23 (本页面进度 70%)
  - 基本写完界面逻辑
  - 首页接口 OK 能获取数据

#### 待填坑
+ 登录状态和用户信息
+ 接口没有对完
+ 因为样式功能相近，准备合并 apply 和 feedback 两个页面
+ 静态资源（图片）用的外链
+ 样式有坑，css 细节还需修改，textarea iOS 默认 padding 问题没有解决

[@Hangeer](https://github.com/Hangeer)
