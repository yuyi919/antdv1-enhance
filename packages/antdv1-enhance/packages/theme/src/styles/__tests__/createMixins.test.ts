import { createMixins } from "../createMixins";
import { createBaseTheme } from "../system";

describe("createMixins", () => {
  it("should be able add other mixins", () => {
    const theme = createBaseTheme();
    const mixins = createMixins(theme.breakpoints, theme.spacing, {
      test: { display: "block" },
    });

    expect(mixins.test).toEqual({
      display: "block",
    });
  });
});
