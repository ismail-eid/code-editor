import * as esbuild from 'esbuild-wasm';
 
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // Handle root entry file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/}, () => {
        return { path: 'index.js', namespace: 'a' };
      })
      // Handle relative paths in a module
      build.onResolve({ filter: /^\.+\//}, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
        }
      })
      // Hanlde main file of module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return { 
          path: `http://unpkg.com/${args.path}`,
          namespace: 'a' 
        }
      });

    },
  };
};