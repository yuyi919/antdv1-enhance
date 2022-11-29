import {
  defineBundlessConfig,
  defineComponentConfig,
  tsupConfig,
} from "tsup-config";

export default defineBundlessConfig(
  [
    "src/**/*.(t|j)s(x|)",
    "!src/**/*.(spec|test|d).(t|j)s(x|)",
    "src/**/__test__/**",
  ],
  {
    ...defineComponentConfig(tsupConfig),
    treeshake: "smallest",
  },
);
