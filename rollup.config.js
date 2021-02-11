import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';


export default [
  {
    input: 'src/main.ts',
    output: [
      {
        dir: './dist/es/',
        format: 'es',
        preserveModules: true,
        sourcemap: false,
      },
      {
        dir: './dist/cjs/',
        format: 'cjs',
        preserveModules: true,
        sourcemap: false,
      },
    ],
    plugins: [
      json(),
      nodeResolve(),
      commonjs(),
      replace({
        'process.env.VERSION': process.env.npm_package_version,
      }),
      typescript({
        sourceMap: false,
      }),
    ],
  }
];
