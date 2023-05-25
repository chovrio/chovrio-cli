import path from 'path';
import ts from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'rollup';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const clentConfig = defineConfig({
  input: './src/core/chovrio.ts',
  output: [
    {
      file: path.resolve(__dirname, './dist/cli.js')
    }
  ],
  external: [
    'commander',
    'inquirer',
    'picocolors',
    'ora',
    'fs-extra',
    'path',
    'node-ssh',
    'readline-sync',
    'url',
    'fs',
    'dotenv'
  ],
  plugins: [
    ts({ tsconfig: path.resolve(__dirname, './tsconfig.json') }),
    json(),
    terser({ toplevel: true })
  ]
});
const typeConfig = defineConfig({
  input: './src/types/index.ts',
  output: {
    file: path.resolve(__dirname, './dist/type.d.ts')
  },
  plugins: [dts()]
});
export default defineConfig([clentConfig, typeConfig]);
