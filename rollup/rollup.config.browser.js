import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import { plugin as analyze } from 'rollup-plugin-analyzer';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.js',
  output: {
    format: 'cjs'
  },
  treeshake: true,
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    commonjs(),
    json(),
    babel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false
          }
        ]
      ],
      plugins: ["external-helpers"],
      exclude: 'node_modules/**'
    }),
    terser(),
    analyze()
  ]
}
