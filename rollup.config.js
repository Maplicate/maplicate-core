import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
import { plugin as analyze } from 'rollup-plugin-analyzer';

export default {
  input: 'src/index.js',
  output: {
    format: 'cjs'
  },
  treeshake: true,
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      preferBuiltins: true
    }),
    commonjs(),
    json(),
    replace({ 'process.browser': !!process.env.BROWSER }),
    babel({
      exclude: 'node_modules/**'
    }),
    analyze()
  ]
}
