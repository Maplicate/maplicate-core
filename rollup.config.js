import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  entry: './src/index.ts',

  plugins: [
    replace({ 'process.browser': !!process.env.BROWSER }),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      browser: true
    })
  ]
}
