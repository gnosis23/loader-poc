const path = require('path')

const getEntry = () => {
  return `
    import { loader as loader0 } from '${('./Greet.jsx')}'
    import { loader as loader1 } from '${('./Hello.jsx')}'
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
    resolveDir: 'src'
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
        let entry;
        build.onResolve({ filter: /.*/ }, (args) => {
          if (args.path.startsWith('.') || args.path.startsWith('/')) {
            console.log('args.path', args.path);
            return { path: path.resolve(args.resolveDir, args.path) };
          }
          return {
            path:
              !args.path.startsWith('.') && !args.path.startsWith('/')
                ? args.path
                : path.resolve(args.resolveDir, args.path),
            external: true,
            sideEffects: false,
          };
        });
      },
    }
  ]
}).catch(() => process.exit(1))

var loader = {
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
};