<div align="center">
<img height="360" src="ht

# chovrio-cli

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://chart-d9dive9p8-astrues.vercel.app/%E9%9D%99.png">
</picture>
<p align="center">
    <br> <a href="README.md">English</a> | 中文
</p>
<p align="center">
    <em>it's not just a scaffolding. - chovrio</em>
</p>

<p align="center">
<a href="LICENSE" target="_blank">
    <img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" />
</a>
<img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-blue?style=flat-square&logo=typescript&logoColor=white" />

<a href="https://github.com/yetone/openai-translator/releases" target="_blank">
<img alt="macOS" src="https://img.shields.io/badge/-macOS-black?style=flat-square&logo=apple&logoColor=white" />
</a>

<a href="https://github.com/yetone/openai-translator/releases" target="_blank">
<img alt="Windows" src="https://img.shields.io/badge/-Windows-blue?style=flat-square&logo=windows&logoColor=white" />
</a>

<a href="https://github.com/yetone/openai-translator/releases" target="_blank">
<img alt="Linux" src="https://img.shields.io/badge/-Linux-yellow?style=flat-square&logo=linux&logoColor=white" />
</a>

</p>
</div>

# 前言

好吧，它或许仅仅是一个脚手架。

本项目仅供学习交流使用。

# 安装

```shell
npm i -g chovrio # 全局安装
pnpm add chovrio -D # 局部安装，作为开发依赖
```

# 项目依赖

- rollup
- typescript
- commander
- dotenv
- node-ssh
- 以及一系列工程化工具

# 实现功能

目前只有两个命令可用`create`和`deploy`

create 用于创建项目模板(但是项目模板我没写，有空补上)

deploy 用于部署静态资源到服务器(部署`dist`文件)

# 配置文件

`chovrio.config.js`(目前只支持这个文件名)

```js
/**
 * @type {import('chovrio').Config}
 */
export default {
  deploy: {
    // 准备上传到服务器的目标位置
    position: 'xxxx'
  }
}
```

`.env`

```properties
host=xxx.xx.xx.xxx # 服务器ip地址
user=root # 登录服务器用户名
password=root # 对应用户密码
```

不配置也可，会以命令行输入输出的方式获取信息

# 碎碎念

这个教授架借鉴了 vite 的一些思路，目前实现的功能很少。本来想像 vite 一样在底层使用 rollup 或者 esbuild 封装一下，完善其它功能的。但是这几天`rspack`都出了，暂时没了这方面的想法了。后面获取会完善吧。
