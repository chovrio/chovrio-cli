import type { RollupOptions } from 'rollup'

export interface Config {
  rollupOptions?: RollupOptions
  deploy?: {
    position: string
  }
}
