import { defineConfig, tsupConfig } from "tsup-config";

export default defineConfig({
  ...tsupConfig,
  // jsxFactory: "jsx_runtime.jsxEsbuild",
  // jsxFragment: "jsx_runtime.Fragment",
  // noExternal: ["@yuyi919/vue-jsx-factory"],
  external: [/\.less$/],
  esbuildOptions: (config) => {
    Object.assign(config, {
      jsx: "automatic",
      jsxFactory: "jsx_runtime.jsxEsbuild",
      jsxFragment: "jsx_runtime.Fragment",
      jsxImportSource: "@yuyi919/vue-jsx-factory",
    });
  },
});
