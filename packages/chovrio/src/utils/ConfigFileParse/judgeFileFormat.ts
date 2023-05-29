import lookupFile from '../lookupFile';
import fs from 'fs';
import path from 'path';
import { require } from '../nodeVariable';
export default function judgeFileFormat(
  configRoot: string,
  configFile?: string
): {
  isTS: boolean;
  isESM: boolean;
  resolvedPath: string;
} | null {
  let resolvedPath = ''; // 配置文件的真实路径
  let isTS = false; // 标记配置文件是否为 ts
  let isESM = false; // 标记配置文件是否为 ESM
  // 1.1 沿着运行目录网上查找，找到最近的 package.json，确定是否为 ESM
  try {
    const path = lookupFile(configRoot, 'package.json');
    if (!path) {
      console.log('运行目录不合法');
      return null;
    }
    const pkg = require(path);
    if (pkg && pkg.type === 'module') {
      isESM = true;
    }
  } catch (e) {
    console.log('发生错误了');
  }
  // 1.2 有指定的配置文件
  if (configFile) {
    resolvedPath = path.resolve(configFile);
    // 根据后缀判断是否为ts
    isTS = configFile.endsWith('.ts');
    // 根据后缀判断是否为ESM
    if (configFile.endsWith('.mjs')) {
      isESM = true;
    }
  }
  // 1.3 没有指定配置文件
  else {
    // 1.3.1 尝试使用 chovrio.config.js
    const jsconfigFile = path.resolve(configRoot, 'chovrio.config.js');
    if (fs.existsSync(jsconfigFile)) {
      resolvedPath = jsconfigFile;
    }
    // 1.3.2 尝试使用 chovrio.config.mjs
    if (!resolvedPath) {
      const mjsconfigFile = path.resolve(configRoot, 'chovrio.config.mjs');
      if (fs.existsSync(mjsconfigFile)) {
        resolvedPath = mjsconfigFile;
        isESM = true;
      }
    }
    // 1.3.3 尝试使用 chovrio.config.ts
    if (!resolvedPath) {
      const tsconfigFile = path.resolve(configRoot, 'chovrio.config.ts');
      if (fs.existsSync(tsconfigFile)) {
        resolvedPath = tsconfigFile;
        isTS = true;
      }
    }
    // 1.3.4 尝试使用 chovrio.config.cjs
    if (!resolvedPath) {
      const cjsConfigFile = path.resolve(configRoot, 'chovrio.config.cjs');
      if (fs.existsSync(cjsConfigFile)) {
        resolvedPath = cjsConfigFile;
        isESM = false;
      }
    }
  }
  return {
    resolvedPath,
    isTS,
    isESM
  };
}
