import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import { plugin as analyze } from 'rollup-plugin-analyzer';
import { terser } from "rollup-plugin-terser";
import replace from 'rollup-plugin-replace';
import globals from 'rollup-plugin-node-globals';

export default {
  input: 'src/index.js',
  output: {
    format: 'cjs'
  },
  treeshake: true,
  plugins: [
    resolve({
      jsnext: true,
      browser: true,
      preferBuiltins: true
    }),
    commonjs(),
    json(),
    replace({ 'process.browser': !!process.env.BROWSER }),
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
    globals(),
    terser(),
    analyze()
  ]
}
