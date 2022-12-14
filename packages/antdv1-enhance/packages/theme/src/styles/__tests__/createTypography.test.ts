import { createPalette, Palette } from "../createPalette";
import { createTypography } from "../createTypography";

describe("createTypography", () => {
  let palette: Palette;

  beforeEach(() => {
    palette = createPalette({});
  });

  it("should create a material design typography according to spec", () => {
    const typography = createTypography(palette, {});
    expect(typography.fontSize).toBe(14);
  });

  it("should create a typography with custom fontSize", () => {
    const typography = createTypography(palette, { fontSize: 15 });
    expect(typography.fontSize).toBe(15);
  });

  it("should accept a function", () => {
    const typography = createTypography(palette, (paletteCurrent) => {
      expect(palette).toBe(paletteCurrent);

      return { fontSize: 15 };
    });
    expect(typography.fontSize).toBe(15);
  });

  it("should accept a custom font size", () => {
    const typography = createTypography(palette, { fontSize: 16 });
    expect(typography.body2.fontSize).toBe("1rem");
  });

  it("should create a typography with a custom baseFontSize", () => {
    const typography = createTypography(palette, { htmlFontSize: 10 });
    expect(typography.h2.fontSize).toBe("6rem");
  });

  it("should create a typography with custom h1", () => {
    const customFontSize = "18px";
    const typography = createTypography(palette, {
      h1: { fontSize: customFontSize },
    });
    expect(typography.h1.fontSize).toBe(customFontSize);
  });

  it("should apply a CSS property to all the variants", () => {
    const typography = createTypography(palette, {
      allVariants: { marginLeft: 0 },
    });
    const allVariants = [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "subtitle1",
      "subtitle2",
      "body1",
      "body2",
      "button",
      "caption",
      "overline",
    ] as const;

    allVariants.forEach((variant) => {
      expect(typography[variant].marginLeft).toBe(0);
    });
  });

  it("only defines letter-spacing if the font-family is not overwritten", () => {
    expect(createTypography(palette, {}).h1.letterSpacing).not.toBe(undefined);
    expect(
      createTypography(palette, { fontFamily: "Gotham" }).h1.letterSpacing,
    ).toBe(undefined);
  });

  describe("warnings", () => {
    it("logs an error if `fontSize` is not of type number", () => {
      expect(() => {
        //@ts-expect-error
        createTypography({}, { fontSize: "1" });
      }).toErrorDev("Material-UI: `fontSize` is required to be a number.");
    });

    it("logs an error if `htmlFontSize` is not of type number", () => {
      expect(() => {
        //@ts-expect-error
        createTypography({}, { htmlFontSize: "1" });
      }).toErrorDev("Material-UI: `htmlFontSize` is required to be a number.");
    });
  });
});
