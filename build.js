const path = require('path')
const fs = require('fs')

const loader = {
  '.aac': 'file',
  '.css': 'text',
  '.less': 'text',
  '.sass': 'text',
  '.scss': 'text',
  '.eot': 'file',
  '.flac': 'file',
  '.gif': 'file',
  '.ico': 'file',
  '.jpeg': 'file',
  '.jpg': 'file',
  '.js': 'jsx',
  '.jsx': 'jsx',
  '.json': 'json',
  '.md': 'jsx',
  '.mdx': 'jsx',
  '.mp3': 'file',
  '.mp4': 'file',
  '.ogg': 'file',
  '.otf': 'file',
  '.png': 'file',
  '.svg': 'file',
  '.ts': 'ts',
  '.tsx': 'tsx',
  '.ttf': 'file',
  '.wav': 'file',
  '.webm': 'file',
  '.webp': 'file',
  '.woff': 'file',
  '.woff2': 'file',
}

const entryExts = [".js", ".jsx", ".ts", ".tsx"]

function findEntry(dir, basename) {
  for (let ext of entryExts) {
    let file = path.resolve(dir, basename + ext)
    if (fs.existsSync(file)) return path.resolve(dir, file)
  }
  return undefined
}

const getEntry = () => {
  return `
    import { loader as loader0 } from '${path.resolve('src/Greet')}'
    import { loader as loader1 } from '${path.resolve('src/Hello')}'
    Promise.all([
      loader0(),
      loader1(),
    ]).then(results => {
      console.log(results)
    })
  `
}


require('esbuild').build({
  stdin: {
    contents: getEntry(),
    // resolveDir: path.resolve('src')
  },
  platform: 'browser',
  // inject: [reactShim],
  format: 'esm',
  mainFields: ['module', 'main'],
  bundle: true,
  sourcemap: false,
  target: 'esnext',
  outfile: 'dist/loader.js',
  loader,
  plugins: [
    {
      name: 'imports',
      setup(build) {
        build.onResolve({ filter: /.*/ }, (args) => {
          if (args.path.startsWith('.') || args.path.startsWith('/')) {
            return { path: findEntry(args.resolveDir, args.path) }
          }

          return {
            path: path.resolve(args.resolveDir, args.path),
            external: true,
            sideEffects: false,
          }
        })
      },
    }
  ]
}).catch(() => process.exit(1))
