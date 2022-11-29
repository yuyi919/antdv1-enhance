import {
  defineBundlessConfig,
  defineComponentConfig,
  tsupConfig,
} from "tsup-config";

export default defineBundlessConfig(
  ["src/**/*.ts(x|)", "!src/**/*.(spec|test).*", "src/**/__test__/**"],
  {
    ...defineComponentConfig(tsupConfig),
    treeshake: "smallest"
  },
);