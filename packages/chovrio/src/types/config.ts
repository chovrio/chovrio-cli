import type { RollupOptions } from 'rollup';

export interface Config extends RollupOptions {
  rollupOptions?: RollupOptions;
  deploy?: {
    position: string;
  };
}
export const defineConfig = (option: Config) => option;
