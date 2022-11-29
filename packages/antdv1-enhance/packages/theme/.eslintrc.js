module.exports = {
  extends: ["custom"],
  parserOptions: { tsconfigRootDir: __dirname },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      rules: {
        "guard-for-in": "off"
      }
    }
  ]
};
