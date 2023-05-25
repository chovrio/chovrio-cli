import fs from 'fs';
import type { Config } from '../types';
// 获得模板文件并解析成对象
export default function parse() {
  const config = fs
    .readFileSync(`${process.cwd()}/chovrio.config.js`, 'utf-8')
    .replace(/[\s|\n]/g, '');
  const reg = /\{(.*)\}/;
  if (reg.test(config)) {
    const arr = reg.exec(config);
    if (arr !== null) {
      const config: Config = new Function('return ' + arr[0])();
      return config;
    }
  }
}
