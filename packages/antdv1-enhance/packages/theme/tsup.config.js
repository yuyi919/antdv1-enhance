import {
  defineBundlessConfig,
  defineComponentConfig,
  tsupConfig,
} from "tsup-config";

export default defineBundlessConfig(
  [
    "src/**",
    "!src/**/*.less",
    "!src/**/*.(spec|test).*",
    "!src/**/*.d.ts",
    "!src/**/__test__/**",
  ],
  {
    ...defineComponentConfig(tsupConfig),
    treeshake: "smallest",
  },
);
