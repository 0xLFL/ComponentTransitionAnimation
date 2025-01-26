import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import PeerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import dts from "rollup-plugin-dts";
import terser from '@rollup/plugin-terser';

const packageJson = require('./package.json')

export default [
  {
    input:'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      }, {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      }
    ],
    plugins: [
      PeerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
    ],
    external: [ "react", "react-dom" ],
  },
  {
    input:'src/index.ts',
    output: [{ file: packageJson.types }],
    plugins: [
      dts.default()
    ]
  }
]