import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { dynamicImport } from '../nodeVariable';
import build from '../RollupFunc/build';

export default async function bundleConfigFile(
  filepath: string,
  isESM = false,
  isTS = false
): Promise<{ code: string; dependencies: string[] }> {
  const workDir = process.cwd();
  const file = 'out';
  await build(workDir, filepath, file, isESM, isTS);
  const fileURL = pathToFileURL(`${workDir}/${file}`);
  const userConfig = await dynamicImport(`${fileURL}.js`);
  fs.rmSync(path.resolve(workDir, `${file}.js`));
  console.log(userConfig);
  return userConfig.default;
}
