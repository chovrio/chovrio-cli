// import { Config } from '../../types';
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
  let userConfig: any;
  // 1.确定配置文件的格式
  const flags = judgeFileFormat(configRoot, configFile);
  if (flags === null) return {};
  const { isESM, isTS, resolvedPath } = flags;
  // 2.加载配置文件，根据不同的格式，有不同的加载方法
  // 对配置文件进行打包，输出 code 代码文本和 dependcies 该文件的依赖
  userConfig = await bundleConfigFile(resolvedPath, isESM, isTS);
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
    path: resolvedPath,
    config
  };
};
