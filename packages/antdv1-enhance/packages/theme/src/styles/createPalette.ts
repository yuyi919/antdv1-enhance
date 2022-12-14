import { Color, PaletteMode } from "..";
import { deepmerge, deepmergeCls } from "./system/utils";
// import MuiError from "@material-ui/utils/macros/MuiError.macro";
import { hasOwnKey } from "@yuyi919/shared-types";
import blue from "../colors/blue";
import common from "../colors/common";
import green from "../colors/green";
import grey from "../colors/grey";
import lightBlue from "../colors/lightBlue";
import orange from "../colors/orange";
import purple from "../colors/purple";
import red from "../colors/red";
import { MuiError } from "../MuiError";
import { darken, getContrastRatio, lighten } from "./system";
// use standalone interface over typeof colors/commons
// to enable module augmentation
export interface CommonColors {
  black: string;
  white: string;
}

export type ColorPartial = Partial<Color>;

export interface TypeText {
  primary: string;
  secondary: string;
  disabled: string;
  icon?: string;
}

export interface TypeAction {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  selectedOpacity: number;
  disabled: string;
  disabledOpacity: number;
  disabledBackground: string;
  focus: string;
  focusOpacity: number;
  activatedOpacity: number;
}

export interface TypeBackground {
  default: string;
  paper: string;
}

export type TypeDivider = string;

export type PaletteColorOptions = SimplePaletteColorOptions | ColorPartial;

export interface SimplePaletteColorOptions {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
  [key: string]: string | undefined;
}

export interface PaletteColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

export interface TypeObject {
  text: TypeText;
  action: TypeAction;
  divider: TypeDivider;
  background: TypeBackground;
}

export type PaletteTonalOffset = number | PaletteTonalOffsetObject;
export interface PaletteTonalOffsetObject {
  light: number;
  dark: number;
}

export interface PaletteAugmentColorOptions {
  color: PaletteColorOptions;
  mainShade?: number | string;
  lightShade?: number | string;
  darkShade?: number | string;
  name?: number | string;
}
export type PartialTypeObject = {
  [P in keyof TypeObject]?: Partial<TypeObject[P]>;
};

export const light: TypeObject = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: "rgba(0, 0, 0, 0.87)",
    // Secondary text.
    secondary: "rgba(0, 0, 0, 0.6)",
    // Disabled text have even lower visual prominence.
    disabled: "rgba(0, 0, 0, 0.38)",
  },
  // The color used to divide different elements.
  divider: "rgba(0, 0, 0, 0.12)",
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: common.white,
    default: common.white,
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: "rgba(0, 0, 0, 0.54)",
    // The color of an hovered action.
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: "rgba(0, 0, 0, 0.26)",
    // The background color of a disabled action.
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
};

export const dark: TypeObject = {
  text: {
    primary: common.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)",
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212",
  },
  action: {
    active: common.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24,
  },
};
const modes = { dark, light };

function addLightOrDark(
  intent: SimplePaletteColorOptions,
  direction: PaletteMode,
  shade: string | number,
  tonalOffset: PaletteTonalOffset,
) {
  const tonalOffsetLight =
    (tonalOffset as PaletteTonalOffsetObject).light || (tonalOffset as number);
  const tonalOffsetDark =
    (tonalOffset as PaletteTonalOffsetObject).dark ||
    (tonalOffset as number) * 1.5;

  if (!intent[direction]) {
    if (hasOwnKey(intent, shade + "") as boolean) {
      intent[direction] = intent[shade as string];
    } else if (direction === "light") {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}

function getDefaultPrimary(mode = "light"): PaletteColorOptions {
  if (mode === "dark") {
    return {
      main: blue[200],
      light: blue[50],
      dark: blue[400],
    };
  }
  return {
    main: blue[700],
    light: blue[400],
    dark: blue[800],
  };
}

function getDefaultSecondary(mode = "light"): PaletteColorOptions {
  if (mode === "dark") {
    return {
      main: purple[200],
      light: purple[50],
      dark: purple[400],
    };
  }
  return {
    main: purple[500],
    light: purple[300],
    dark: purple[700],
  };
}

function getDefaultError(mode = "light"): PaletteColorOptions {
  if (mode === "dark") {
    return {
      main: red[500],
      light: red[300],
      dark: red[700],
    };
  }
  return {
    main: red[700],
    light: red[400],
    dark: red[800],
  };
}

function getDefaultInfo(mode = "light"): PaletteColorOptions {
  if (mode === "dark") {
    return {
      main: lightBlue[400],
      light: lightBlue[300],
      dark: lightBlue[700],
    };
  }
  return {
    main: lightBlue[700],
    light: lightBlue[500],
    dark: lightBlue[900],
  };
}

function getDefaultSuccess(mode = "light"): PaletteColorOptions {
  if (mode === "dark") {
    return {
      main: green[400],
      light: green[300],
      dark: green[700],
    };
  }
  return {
    main: green[800],
    light: green[500],
    dark: green[900],
  };
}

function getDefaultWarning(mode = "light"): PaletteColorOptions {
  if (mode === "dark") {
    return {
      main: orange[400],
      light: orange[300],
      dark: orange[700],
    };
  }
  return {
    main: "#ED6C02", // closest to orange[800] that pass 3:1.
    light: orange[500],
    dark: orange[900],
  };
}

const isSimple = (
  color: PaletteColorOptions,
): color is SimplePaletteColorOptions => {
  return !(color as SimplePaletteColorOptions).main;
};

const inOptions = (
  color: SimplePaletteColorOptions,
  shade?: number | string,
): shade is keyof SimplePaletteColorOptions => {
  return !!(color as SimplePaletteColorOptions)[
    shade as keyof SimplePaletteColorOptions
  ];
};

const __Dev__ = process.env.NODE_ENV !== "production";
function checkMode(mode: string) {
  if (__Dev__) {
    if (!(mode in modes)) {
      console.error(
        `Material-UI: The palette mode \`${mode}\` is not supported.`,
      );
    }
  }
}

export interface PaletteOptions {
  primary?: PaletteColorOptions;
  secondary?: PaletteColorOptions;
  error?: PaletteColorOptions;
  warning?: PaletteColorOptions;
  info?: PaletteColorOptions;
  success?: PaletteColorOptions;
  mode?: PaletteMode;
  tonalOffset?: PaletteTonalOffset;
  contrastThreshold?: number;
  common?: Partial<CommonColors>;
  grey?: ColorPartial;
  text?: Partial<TypeText>;
  divider?: string;
  action?: Partial<TypeAction>;
  background?: Partial<TypeBackground>;
  getContrastText?: (background: string) => string;
}

export class Palette {
  common: CommonColors = common;
  mode: PaletteMode = this._options.mode || "light";
  contrastThreshold: number = this._options.contrastThreshold ?? 3;
  tonalOffset: PaletteTonalOffset = this._options.tonalOffset ?? 0.2;
  primary: PaletteColor = this.augmentColor({
    color: this._primary,
    name: "primary",
  });
  secondary: PaletteColor = this.augmentColor({
    color: this._secondary,
    name: "secondary",
    mainShade: "A400",
    lightShade: "A200",
    darkShade: "A700",
  });
  error: PaletteColor = this.augmentColor({
    color: this._error,
    name: "error",
  });
  warning: PaletteColor = this.augmentColor({
    color: this._warning,
    name: "warning",
  });
  info: PaletteColor = this.augmentColor({ color: this._info, name: "info" });
  success: PaletteColor = this.augmentColor({
    color: this._success,
    name: "success",
  });
  grey: Color = grey;
  text: TypeText = Palette.getDefaultModeText(this.mode); // modes[this.mode].text;
  divider: TypeDivider = Palette.getDefaultDivider(this.mode); // modes[this.mode].divider;
  action: TypeAction = Palette.getDefaultAction(this.mode); //modes[this.mode].action;
  background: TypeBackground = Palette.getDefaultBackground(this.mode); // modes[this.mode].background;

  augmentColor(options: PaletteAugmentColorOptions): PaletteColor {
    const {
      name,
      mainShade = 500,
      lightShade = 300,
      darkShade = 700,
      color: { ...color },
    } = options;
    if (isSimple(color) && inOptions(color, mainShade)) {
      color.main = color[mainShade]!;
    }

    if (!hasOwnKey(color, "main")) {
      throw new MuiError(
        "Material-UI: The color%s provided to augmentColor(color) is invalid.\n" +
          "The color object needs to have a `main` property or a `%s` property.",
        name ? ` (${name})` : "",
        mainShade,
      );
    }

    if (typeof color.main !== "string") {
      throw new MuiError(
        "Material-UI: The color%s provided to augmentColor(color) is invalid.\n" +
          "`color.main` should be a string, but `%s` was provided instead.\n" +
          "\n" +
          "Did you intend to use one of the following approaches?\n" +
          "\n" +
          'import { green } from "@material-ui/core/colors";\n' +
          "\n" +
          "const theme1 = createTheme({ palette: {\n" +
          "  primary: green,\n" +
          "} });\n" +
          "\n" +
          "const theme2 = createTheme({ palette: {\n" +
          "  primary: { main: green[500] },\n" +
          "} });",
        name ? ` (${name})` : "",
        JSON.stringify(color.main),
      );
    }

    addLightOrDark(color, "light", lightShade, this.tonalOffset);
    addLightOrDark(color, "dark", darkShade, this.tonalOffset);
    if (!color.contrastText) {
      color.contrastText = this.getContrastText(color.main);
    }

    return color as PaletteColor;
  }

  getContrastText(background: string): string {
    const contrastText =
      getContrastRatio(background, dark.text.primary) >= this.contrastThreshold
        ? dark.text.primary
        : light.text.primary;

    if (__Dev__) {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error(
          [
            `Material-UI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`,
            "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.",
            "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast",
          ].join("\n"),
        );
      }
    }

    return contrastText;
  }

  static getDefaultModeText(mode: PaletteMode) {
    if (__Dev__) {
      checkMode(mode);
    }
    return modes[mode] && modes[mode].text;
  }
  static getDefaultDivider(mode: PaletteMode) {
    if (__Dev__) {
      checkMode(mode);
    }
    return modes[mode] && modes[mode].divider;
  }
  static getDefaultAction(mode: PaletteMode) {
    if (__Dev__) {
      checkMode(mode);
    }
    return modes[mode] && modes[mode].action;
  }
  static getDefaultBackground(mode: PaletteMode) {
    if (__Dev__) {
      checkMode(mode);
    }
    return modes[mode] && modes[mode].background;
  }

  constructor(private _options: PaletteOptions) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mode, contrastThreshold, tonalOffset, ...other } = _options;
    if (__Dev__) {
      checkMode(this.mode);
    }
    deepmergeCls(this, other);
    this.getContrastText = this.getContrastText.bind(this);
    this.augmentColor = this.augmentColor.bind(this);
  }

  private get _primary() {
    return this._options.primary || getDefaultPrimary(this.mode);
  }
  private get _secondary() {
    return this._options.secondary || getDefaultSecondary(this.mode);
  }
  private get _error() {
    return this._options.error || getDefaultError(this.mode);
  }
  private get _info() {
    return this._options.info || getDefaultInfo(this.mode);
  }
  private get _success() {
    return this._options.success || getDefaultSuccess(this.mode);
  }
  private get _warning() {
    return this._options.warning || getDefaultWarning(this.mode);
  }
}

export function createPalette(options: PaletteOptions) {
  return new Palette(options);
}
/**
 * @deprecated unsafe
 * @param options -
 * @internal
 */
export function unsafe_createPalette(options: PaletteOptions): Palette {
  const {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2,
    ...other
  } = options;

  const primary = options.primary || getDefaultPrimary(mode);
  const secondary = options.secondary || getDefaultSecondary(mode);
  const error = options.error || getDefaultError(mode);
  const info = options.info || getDefaultInfo(mode);
  const success = options.success || getDefaultSuccess(mode);
  const warning = options.warning || getDefaultWarning(mode);

  // Use the same logic as
  // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
  // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
  function getContrastText(background: string) {
    const contrastText =
      getContrastRatio(background, dark.text.primary) >= contrastThreshold
        ? dark.text.primary
        : light.text.primary;

    if (__Dev__) {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error(
          [
            `Material-UI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`,
            "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.",
            "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast",
          ].join("\n"),
        );
      }
    }

    return contrastText;
  }

  const augmentColor = ({
    color,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700,
  }: PaletteAugmentColorOptions) => {
    color = { ...color };
    if (isSimple(color) && inOptions(color, mainShade)) {
      color.main = color[mainShade]!;
    }

    if (!hasOwnKey(color, "main")) {
      throw new MuiError(
        "Material-UI: The color%s provided to augmentColor(color) is invalid.\n" +
          "The color object needs to have a `main` property or a `%s` property.",
        name ? ` (${name})` : "",
        mainShade,
      );
    }

    if (typeof color.main !== "string") {
      throw new MuiError(
        "Material-UI: The color%s provided to augmentColor(color) is invalid.\n" +
          "`color.main` should be a string, but `%s` was provided instead.\n" +
          "\n" +
          "Did you intend to use one of the following approaches?\n" +
          "\n" +
          'import { green } from "@material-ui/core/colors";\n' +
          "\n" +
          "const theme1 = createTheme({ palette: {\n" +
          "  primary: green,\n" +
          "} });\n" +
          "\n" +
          "const theme2 = createTheme({ palette: {\n" +
          "  primary: { main: green[500] },\n" +
          "} });",
        name ? ` (${name})` : "",
        JSON.stringify(color.main),
      );
    }

    addLightOrDark(color, "light", lightShade, tonalOffset);
    addLightOrDark(color, "dark", darkShade, tonalOffset);
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }

    return color as PaletteColor;
  };

  if (__Dev__) {
    if (!modes[mode]) {
      console.error(
        `Material-UI: The palette mode \`${mode}\` is not supported.`,
      );
    }
  }

  const paletteOutput = deepmerge(
    {
      // A collection of common colors.
      common,
      // The palette mode, can be light or dark.
      mode,
      // The colors used to represent primary interface elements for a user.
      primary: augmentColor({ color: primary, name: "primary" }),
      // The colors used to represent secondary interface elements for a user.
      secondary: augmentColor({
        color: secondary,
        name: "secondary",
        mainShade: "A400",
        lightShade: "A200",
        darkShade: "A700",
      }),
      // The colors used to represent interface elements that the user should be made aware of.
      error: augmentColor({ color: error, name: "error" }),
      // The colors used to represent potentially dangerous actions or important messages.
      warning: augmentColor({ color: warning, name: "warning" }),
      // The colors used to present information to the user that is neutral and not necessarily important.
      info: augmentColor({ color: info, name: "info" }),
      // The colors used to indicate the successful completion of an action that user triggered.
      success: augmentColor({ color: success, name: "success" }),
      // The grey colors.
      grey,
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold,
      // Takes a background color and returns the text color that maximizes the contrast.
      getContrastText,
      // Generate a rich color object.
      augmentColor,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset,
      // The light and dark mode object.
      ...modes[mode],
    },
    other,
  ) as Palette;
  return paletteOutput;
}
