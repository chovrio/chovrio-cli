import fs from 'fs';
import path from 'path';
export default function lookupFile(
  directory: string,
  fileName: string
): string | null {
  let currentPath = directory;
  let flag = true;
  while (flag) {
    const filePath = path.join(currentPath, fileName);
    if (fs.existsSync(filePath)) {
      flag = false;
      return filePath;
    }
    const parentPath = path.dirname(currentPath);
    if (parentPath === currentPath) {
      // 已经达到根目录了，未找到指定文件
      flag = false;
      return null;
    }
    currentPath = parentPath;
  }
  return null;
}
