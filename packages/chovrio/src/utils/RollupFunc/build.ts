import { rollup, defineConfig, OutputOptions } from 'rollup';

export default async function build(
  workDir: string,
  filename: string,
  isESM: boolean
) {
  let bundle;
  let buildFailed = false;
  try {
    // 常用 inputOptions 配置
    const inputOptions = defineConfig({
      input: '',
      external: [],
      plugins: [
        // 对裸模式，进行 external 处理，即不打包到 bundle
      ]
    });
    // 常用 outputOptions 配置
    const outputOptionsList: OutputOptions[] = [
      {
        dir: `${workDir}/out.js`,
        // 编译输出格式
        format: isESM ? 'esm' : 'cjs',
        sourcemap: 'inline'
      }
      // 省略其它的输出配置
    ];
    // 1.调用 rollup 生成 bundle 对象
    bundle = await rollup(inputOptions);
    for (const outputOptions of outputOptionsList) {
      // 2.拿到 bundle 对象，根据每一份输出配置，调用 generate 和 write 方法分别生成和写入产物
      const { output } = await bundle.generate(outputOptions);
      await bundle.write(outputOptions);
    }
  } catch (error) {
    buildFailed = true;
    console.error(error);
  }
  if (bundle) {
    // 最后调用bundle.close 方法结束打包
    await bundle.close();
  }
  process.exit(buildFailed ? 1 : 0);
}
