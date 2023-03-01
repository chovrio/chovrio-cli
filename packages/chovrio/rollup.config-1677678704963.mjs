import path from 'path';
import ts from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'rollup';

const __dirname = fileURLToPath(new URL('.', 'file:///E:/web/only/chovrio-cli/packages/chovrio/rollup.config.ts'));
const clentConfig = defineConfig({
    input: './src/core/chovrio.ts',
    output: [
        {
            file: path.resolve(__dirname, './dist/cli.js')
        }
    ],
    plugins: [
        ts({ tsconfig: path.resolve(__dirname, 'src/core/tsconfig.json') }),
        json()
    ]
});
var rollup_config = defineConfig([clentConfig]);

export { rollup_config as default };
