## 问题记录

### 解析 ts 语法错误

描述：通过 rollup 函数打包配置文件，报错无法识别 js 以外的语法，但是使用了@rollup/plugin-typescript 的插件，且在 demo 中能正常运行

原因：未知，额外 demo 中使用相同配置打包成功。这个难绷

解决方案：使用 rollup-plugin-typescript2 插件，并且在 inlcude 添加配置文件绝对路径
