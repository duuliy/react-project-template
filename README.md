# react-project-template

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

react+hooks+ES6+webpack@4.X+babel@7.x 

如需使用 TypeScript, 请使用 `typescript` 分支

Have Fun !


## 本地开发

```
git clone https://github.com/duuliy/react-project-template.git
npm install or yarn
npm start
访问(自动打开) http://localhost:8888/
```

## 基本的 npm scripts

* 开始 `npm start`
* 打包 `npm run build`
* 升级所有包 `npm run upgrade`
* 测试 `npm run test`
* `test:watch`

## 相关技术栈

* react@17
* webpack@4
* babel@7
* react-router-dom@5
* react-redux@7
* antd@4

## 关于 jest

单测接口mock


## 网络请求

> 基于 axios 封装
import request from "@/services"


## 项目目录

```
├── public  -----------------------  引用的静态资源文件
├── dist  -------------------------  打包后的静态资源文件夹
├── mock  -------------------------  mock 数据存放的地方
├── .babelrc  ---------------------  转码规则和插件配置文件
├── .eslintrc  --------------------  eslint代码规范配置文件
├── .gitignore  -------------------  gitlab忽略文件列表
├── package.json  -----------------  项目配置
├── postcss.config.js  ------------  加各浏览器前缀
├── README.md  --------------------  说明文件
├── webpack.config.js  ------------  webpack的配置文件
└── src  --------------------------  源码目录
    ├── component -----------------  自定义组件
    │   ├── index.js  -------------  组件入口文件，不需要异步
    │   ├── xxx.js  ---------------  组件视图逻辑
    │   └── xxx.styl  -------------  组件样式
    └── pages  --------------------  页面集合目录
    │    ├── index.js  -------------  页面入口文件,异步按需加载
    │    ├── xxx.jsxe  ---------------  页面视图逻辑
    │   └── xxx.styl  -------------  页面样式
    ├── component -----------------  自定义组件
    │   ├── index.js  -------------  组件入口文件，不需要异步
    │   ├── xxx.js  ---------------  组件视图逻辑
    │   └── xxx.styl  -------------  组件样式
    └── assets  --------------------  会打包的资源
    └── config  --------------------  全局门面配置
    └── layouts  -------------------  组件门面
    └── routers  -------------------  路由文件
    └── services  ------------------  接口文件
    └── stores  --------------------  参数通讯的一种方式
    └── utils  ---------------------  工具类方法
    ...


```

## 关于 ts


## 特别注意

随着webpack升级而维护，webpack5坑比较多


## License

[MIT](https://github.com/duuliy/react-project-template/blob/master/LICENCE)
