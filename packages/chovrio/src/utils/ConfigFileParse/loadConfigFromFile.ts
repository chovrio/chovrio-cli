import fs from 'fs';
import { pathToFileURL } from 'url';
// import { Config } from '../../types';
import { dynamicImport } from '../nodeVariable';
import bundleConfigFile from './bundleConfigFile';
import judgeFileFormat from './judgeFileFormat';

/**
 *
 * @param configEnv 运行的环境 prod | dev
 * @param configFile 配置文件的名称
 * @param configRoot 运行根目录
 */
export const loadConfigFromFile = async (
  configEnv: 'build' | 'dev',
  configFile?: string,
  configRoot: string = process.cwd()
) => {
  let dependencies: string[] = []; // 配置文件的依赖
  let userConfig: any;
  // 1.确定配置文件的格式
  const flags = judgeFileFormat(configRoot, configFile);
  if (flags === null) return {};
  const { isESM, isTS, resolvedPath } = flags;
  console.log(isESM, isTS, resolvedPath, 'test');
  // 2.加载配置文件，根据不同的格式，有不同的加载方法
  // 2.1 ESM 处理
  if (isESM) {
    // 生成配置文件的url
    const fileURL = pathToFileURL(resolvedPath);
    // 对配置文件进行打包，输出 code 代码文本和 dependcies 该文件的依赖
    const bundled = await bundleConfigFile(resolvedPath, true);
    dependencies = bundled.dependencies;

    // ts 文件处理
    if (isTS) {
      // 将编译的 code 文本，写到本地文件
      // 用 import 引用
      // 再删除文件
      fs.writeFileSync(resolvedPath + '.js', bundled.code);
      userConfig = await dynamicImport(`${fileURL}.js?t=${Date.now()}`).default;
      fs.unlinkSync(resolvedPath + '.js');
    } else {
      // 加载普通的 ESM 的配置文件
      // 直接 import 引入配置文件
      // 因为配置文件格式本身就是 ESM，可以直接 import
      // 再之前进行打包，是因为要获取 dependencies
      userConfig = await dynamicImport(`${fileURL}?t=${Date.now()}`).default;
    }
  } else {
    userConfig = {};
  }
  if (!userConfig) {
    // 加载普通的 CJS 格式的配置文件
    userConfig = {};
  }
  // 如果配置是函数，则调用，其返回值作为配置
  const config = await (typeof userConfig === 'function'
    ? userConfig(configEnv)
    : userConfig);

  // 3.返回配置文件信息
  return {
    // path: normalizePath(resolvedPath),
    config,
    dependencies
  };
};
