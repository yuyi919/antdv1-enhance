import EsbuildPluginAlias from "esbuild-plugin-alias";
import { copy } from "esbuild-plugin-copy";
import { lessLoader } from "esbuild-plugin-less";

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
  // noExternal: ["lodash"],
  external: [/\.less$/],
  // loader: {
  //   ".less": "copy"
  // },
  // treeshake: true,
  // onSuccess: "npm run bulid:api",
  // name: "logger",
  target: ["es2020"],
  plugins: [],
  esbuildOptions: (options) => {
    options.drop = ["console", "debugger"];
  },
  esbuildPlugins: [
    // lessLoader({
    //   javascriptEnabled: true
    // }),
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

export function defineComponentConfig(option: Partial<Options>, to = ["dist"]) {
  return {
    ...option,
    external: [/\.less$/],
    esbuildPlugins: [
      copy({
        // this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
        // if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
        resolveFrom: "cwd",
        assets: {
          from: ["./src/**/*.less"],
          to,
        },
      }),
      ...(option.esbuildPlugins || []),
    ],
  } as Options;
}
export function defineBundlessConfig(
  entry: string[],
  option: Partial<Options>,
) {
  return [
    {
      ...option,
      entry,
      outDir: "esm",
      format: ["esm"],
      platform: "neutral",
      clean: ["esm"],
      outExtension: (ctx) => ({
        js: ".js",
      }),
      bundle: false,
    },
    {
      ...option,
      entry,
      outDir: "dist",
      platform: "neutral",
      clean: ["dist"],
      format: ["cjs"],
      bundle: false,
    },
  ] as [Options, Options];
}

export { defineConfig };
export { lessLoader as EsbuildPluginLess };
export { copy as EsbuildPluginCopy };
