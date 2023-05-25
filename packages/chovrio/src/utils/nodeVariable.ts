import { fileURLToPath } from 'url';
import { createRequire } from 'module';
export const __dirname = fileURLToPath(new URL('.', import.meta.url));
export const require = createRequire(import.meta.url);
export const dynamicImport = new Function('file', 'return import(file)');
