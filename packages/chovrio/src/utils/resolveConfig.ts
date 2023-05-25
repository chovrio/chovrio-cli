import { Config } from '../types';
import { loadConfigFromFile } from './ConfigFileParse/loadConfigFromFile';

export default async function resolveConfig(
  inlineConfig: Config,
  command: 'build' | 'dev',
  defaultMode = 'development'
) {
  // 1.读取配置文件
  const config = inlineConfig;
  console.log(config, loadConfigFromFile);

  // const loadResult = await loadConfigFromFile();

  // 2.解析插件

  // 3.读取环境变量文件

  // 4.合成ResolvedConfig
  const resolved: Config = {};
  return resolved;
}
