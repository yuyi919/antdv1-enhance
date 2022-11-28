import { tsupConfig, defineConfig } from "tsup-config";

export default defineConfig({
  ...tsupConfig,
  dts: true
});
