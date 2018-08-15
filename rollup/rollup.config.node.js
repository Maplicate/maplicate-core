import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import { plugin as analyze } from 'rollup-plugin-analyzer';
import { terser } from "rollup-plugin-terser";
import replace from 'rollup-plugin-replace';

const dependencies = Object.keys(require('../package.json').dependencies);

export default {
  input: 'src/index.js',
  output: {
    format: 'cjs'
  },
  treeshake: true,
  plugins: [
    resolve({
      preferBuiltins: true
    }),
    commonjs(),
    replace({ 'process.browser': !!process.env.BROWSER }),
    babel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false,
            targets: {
              node: 8
            }
          }
        ]
      ],
      plugins: ["external-helpers"],
      exclude: 'node_modules/**'
    }),
    terser(),
    analyze()
  ],
  external: dependencies
}
