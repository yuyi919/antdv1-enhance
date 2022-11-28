import EsbuildPluginAlias from "esbuild-plugin-alias";
import { defineConfig, Options } from "tsup";

export const tsupConfig: Options = defineConfig({
  entry: ["src/index.ts"],
  clean: ["dist"],
  sourcemap: true,
  skipNodeModulesBundle: true,
  outDir: "dist",
  format: ["cjs", "esm"],
  outExtension: (ctx) => ({
    js: ctx.format === "cjs" ? ".js" : `.${ctx.format}.js`,
  }),
  minify: false,
  minifyIdentifiers: false,
  minifySyntax: false,
  platform: "browser",
  noExternal: ["lodash"],
  esbuildOptions: options => {
    options.jsxImportSource
  },
  // treeshake: true,
  // onSuccess: "npm run bulid:api",
  // name: "logger",
  target: ["es2020"],
  plugins: [],
  esbuildPlugins: [
    EsbuildPluginAlias({
      lodash: require.resolve("../../../node_modules/lodash-es"),
      // "@yuyi919/shared-types": require.resolve(
      //   "@yuyi919/shared-types/src/index.ts",
      //   {
      //     paths: [process.cwd()],
      //   },
      // ),
    }),
  ],
}) as Options;


export { defineConfig };
