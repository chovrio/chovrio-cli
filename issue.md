## 问题记录

### 解析 ts 语法错误

描述：通过 rollup 函数打包配置文件，报错无法识别 js 以外的语法，但是使用了@rollup/plugin-typescript 的插件，且在 demo 中能正常运行

原因：未知，额外 demo 中使用相同配置打包成功。这个难绷

解决方案：在@rollup/plugin-typescript 执行前多使用两个插件

- @rollup/plugin-node-resolve
- @rollup/plugin-commonjs
