# chovrio-cli

<p align="center">
    <br> English | <a href="README-CN.md">中文</a>
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

# Foreword

Well, it might just be a scaffolding.

This project is for learning exchange only.

# Install

```shell
npm install -g chovrio # Global installation
pnpm add chovrio -D # Partial installation, as a development dependency
```

# Project Dependencies

- rollup
- typescript
- commander
- dotenv
- node-ssh
- 以及一系列工程化工具

# Realize Function

Currently only two commands are available `create` and `deploy`

create is used to create a project template (but I didn't write the project template, and I will fill it up when I have time)

deploy is used to deploy static resources to the server (deploy `dist` files)

# Configuration File

`chovrio.config.js`(currently only this filename is supported)

```js
/**
 * @type {import('chovrio').Config}
 */
export default {
  deploy: {
    // Destination location ready to upload to server
    position: 'xxxx'
  }
}
```

`.env`

```properties
host=xxx.xx.xx.xxx # server ip address
user=root # login server username
password=root # Corresponding user password
```

It is also possible not to configure, and the information will be obtained through command line input and output.

# Broken Thoughts

This professor frame borrows some ideas from vite, and currently realizes few functions. Originally, I wanted to use rollup or esbuild to encapsulate it at the bottom layer like vite to improve other functions. But `rspack` has been released these days, and I have no idea about this for the time being. It will be perfected later.

# Notice

This document may be different from Chinese when using Google Translate.
