import { defineConfig, tsupConfig } from "tsup-config";

// export default defineBundlessConfig(
//   ["src/**/*.ts(x|)", "!src/**/*.(spec|test).*", "src/**/__test__/**"],
//   {
//     ...defineComponentConfig(tsupConfig),
//     treeshake: "smallest"
//   },
// );

export default defineConfig({
  ...tsupConfig,
  // minify: true,
});
