import { tsupConfig, defineConfig } from "tsup-config";

export default defineConfig({
  ...tsupConfig,
  noExternal: [/^@yuyi919/]
});
