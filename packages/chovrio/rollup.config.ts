import path from 'path'
import ts from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'rollup'
const __dirname = fileURLToPath(new URL('.', import.meta.url))

const clentConfig = defineConfig({
  input: './src/core/chovrio.ts',
  output: [
    {
      file: path.resolve(__dirname, './dist/cli.js')
    }
  ],
  plugins: [
    ts({ tsconfig: path.resolve(__dirname, 'src/core/tsconfig.json') }),
    json(),
    terser({ toplevel: true })
  ]
})
export default defineConfig([clentConfig])
