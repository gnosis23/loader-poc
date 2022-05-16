const path = require('path')

const getEntry = () => {
  return `
    import { loader as loader0 } from '${path.resolve('src/Greet.jsx')}'
    import { loader as loader1 } from '${path.resolve('src/Hello.jsx')}'
    Promise.all([
      loader0(),
      loader1(),
    ]).then(results => {
      console.log(results)
    })
  `
}

const reactShim = path.resolve(__dirname, "react.ts");

require('esbuild').build({
  stdin: {
    contents: getEntry(),
    resolveDir: 'dist'
  },
  inject: [reactShim],
  format: 'esm',
  mainFields: ['module', 'main'],
  bundle: true,
  sourcemap: false,
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  outfile: 'dist/loader.js',
  plugins: []
}).catch(() => process.exit(1))
