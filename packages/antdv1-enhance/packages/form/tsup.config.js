import {
  defineBundlessConfig,
  defineComponentConfig,
  tsupConfig,
} from "tsup-config";

export default defineBundlessConfig(
  ["src/**/*.ts(x|)", "!src/**/*.(spec|test).*", "src/**/__test__/**"],
  {
    ...defineComponentConfig(tsupConfig, ["dist", "esm"]),
    minify: true,
    treeshake: {
      preset: "smallest",
      moduleSideEffects: (id) => /(\.(c|sc|le)ss|\.styls)$/.test(id)
    }
  },
);
