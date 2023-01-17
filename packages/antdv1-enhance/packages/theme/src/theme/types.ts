import type { IComponent } from "../exports/component";
import type { IPalette } from "../exports/palette";
import type { IPaletteColors } from "../exports/palette.colors";
import { ThemeUtils } from "./utils";

export interface ThemePalette extends Readonly<IPalette> {
  colors: IPaletteColors;
}
export interface ComponentTheme {}

declare module "@yuyi919/vue2-make-styled" {
  interface ITheme {
    palette: ThemePalette;
    component: Readonly<IComponent>;
    components: ComponentTheme;
    utils: ThemeUtils;
  }
}

export type { ITheme } from "@yuyi919/vue2-make-styled";
export type { IPalette, IPaletteColors };
