// export { adaptV4Theme, DeprecatedThemeOptions } from "./adaptV4Theme";
export type {
  Palette,
  PaletteColor,
  PaletteColorOptions,
  PaletteOptions,
  SimplePaletteColorOptions,
} from "./createPalette";
export {
  createMuiStrictModeTheme as unstable_createMuiStrictModeTheme,
  createMuiTheme,
  createTheme,
} from "./createTheme";
export type { Theme, ThemeOptions } from "./createTheme";
export { duration, easing } from "./createTransitions";
export type {
  Duration,
  Easing,
  Transitions,
  TransitionsOptions,
} from "./createTransitions";
// export { default as createStyles } from "./createStyles";
export type {
  Typography as TypographyVariants,
  TypographyOptions as TypographyVariantsOptions,
  TypographyStyle,
  Variant as TypographyVariant,
} from "./createTypography";
export type { ComponentsOverrides } from "./overrides";
export type { ComponentsProps, ComponentsPropsList } from "./props";
export { default as responsiveFontSizes } from "./responsiveFontSizes";
export {
  alpha,
  darken,
  decomposeColor,
  emphasize,
  getContrastRatio,
  getLuminance,
  // color manipulators
  hexToRgb,
  hslToRgb,
  lighten,
  recomposeColor,
  rgbToHex,
} from "./system";
export type {
  Breakpoint,
  BreakpointOverrides,
  Breakpoints,
  BreakpointsOptions,
  // color manipulators
  ColorFormat,
  ColorObject,
  // CreateMUIStyled,
  CSSObject,
  Direction,
} from "./system";
export type { ComponentsVariants } from "./variants";
// export { StyledEngineProvider } from "@material-ui/system";

export type ClassNameMap<ClassKey extends string = string> = Record<
  ClassKey,
  string
>;

export interface StyledComponentProps<ClassKey extends string = string> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ClassNameMap<ClassKey>>;
}

// export { default as makeStyles } from "./makeStyles";
// export { default as withStyles } from "./withStyles";
// export { default as withTheme } from "./withTheme";
