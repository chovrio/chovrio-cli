import type { RollupOptions } from 'rollup'

export interface config {
  rollupOptions?: RollupOptions
  deploy?: {
    position: string
  }
}
