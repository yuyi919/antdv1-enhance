module.exports = {
  entry: ["src/index.ts"],
  clean: ["dist"],
  sourcemap: true,
  skipNodeModulesBundle: false,
  outDir: "dist",
  format: ["cjs", "esm"],
  outExtension: (ctx) => ({
    js: ctx.format === "cjs" ? ".js" : `.${ctx.format}.js`,
  }),
  platform: "node",
  silent: true
};
