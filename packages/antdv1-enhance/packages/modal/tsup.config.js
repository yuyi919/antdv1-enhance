import { defineConfig, EsbuildPluginLess, tsupConfig } from "tsup-config";

// export default defineBundlessConfig(
//   ["src/**/*.ts(x|)", "!src/**/*.(spec|test).*", "src/**/__test__/**"],
//   {
//     ...defineComponentConfig(tsupConfig),
//     treeshake: "smallest"
//   },
// );

export default defineConfig({
  ...tsupConfig,
  esbuildPlugins: [EsbuildPluginLess({ javascriptEnabled: true })],
  // minify: true,
});
