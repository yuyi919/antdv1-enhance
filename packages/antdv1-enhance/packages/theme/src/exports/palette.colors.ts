/**
 * @package PaletteColors
 */
/* eslint-disable no-redeclare */
import {
  blue as _blue,
  cyan as _cyan,
  geekblue as _geekblue,
  gold as _gold,
  green as _green,
  lime as _lime,
  magenta as _magenta,
  orange as _orange,
  pink as _pink,
  purple as _purple,
  red as _red,
  volcano as _volcano,
  yellow as _yellow,
} from "../../exports/palette.colors.module.less";
import type { Theme } from "../styled/provider";
import { Getter } from "./interface";

export interface IPaletteColors {
  /**
   * @name @blue
   */
  blue: string[];
  /**
   * @name @purple
   */
  purple: string[];
  /**
   * @name @cyan
   */
  cyan: string[];
  /**
   * @name @green
   */
  green: string[];
  /**
   * @name @magenta
   */
  magenta: string[];
  /**
   * @name @pink
   */
  pink: string[];
  /**
   * @name @red
   */
  red: string[];
  /**
   * @name @orange
   */
  orange: string[];
  /**
   * @name @yellow
   */
  yellow: string[];
  /**
   * @name @volcano
   */
  volcano: string[];
  /**
   * @name @geekblue
   */
  geekblue: string[];
  /**
   * @name @lime
   */
  lime: string[];
  /**
   * @name @gold
   */
  gold: string[];
}

/**
 * @name @blue
 */
export const blue: IPaletteColors["blue"] = _blue
  .split(",")
  .map((v) => v.trim());
/**
 * @name @purple
 */
export const purple: IPaletteColors["purple"] = _purple
  .split(",")
  .map((v) => v.trim());
/**
 * @name @cyan
 */
export const cyan: IPaletteColors["cyan"] = _cyan
  .split(",")
  .map((v) => v.trim());
/**
 * @name @green
 */
export const green: IPaletteColors["green"] = _green
  .split(",")
  .map((v) => v.trim());
/**
 * @name @magenta
 */
export const magenta: IPaletteColors["magenta"] = _magenta
  .split(",")
  .map((v) => v.trim());
/**
 * @name @pink
 */
export const pink: IPaletteColors["pink"] = _pink
  .split(",")
  .map((v) => v.trim());
/**
 * @name @red
 */
export const red: IPaletteColors["red"] = _red.split(",").map((v) => v.trim());
/**
 * @name @orange
 */
export const orange: IPaletteColors["orange"] = _orange
  .split(",")
  .map((v) => v.trim());
/**
 * @name @yellow
 */
export const yellow: IPaletteColors["yellow"] = _yellow
  .split(",")
  .map((v) => v.trim());
/**
 * @name @volcano
 */
export const volcano: IPaletteColors["volcano"] = _volcano
  .split(",")
  .map((v) => v.trim());
/**
 * @name @geekblue
 */
export const geekblue: IPaletteColors["geekblue"] = _geekblue
  .split(",")
  .map((v) => v.trim());
/**
 * @name @lime
 */
export const lime: IPaletteColors["lime"] = _lime
  .split(",")
  .map((v) => v.trim());
/**
 * @name @gold
 */
export const gold: IPaletteColors["gold"] = _gold
  .split(",")
  .map((v) => v.trim());

/**
 * @name ????????????blue
 */
export function usePaletteColors(name: "blue"): Getter<IPaletteColors["blue"]>;
/**
 * @name ????????????purple
 */
export function usePaletteColors(
  name: "purple",
): Getter<IPaletteColors["purple"]>;
/**
 * @name ????????????cyan
 */
export function usePaletteColors(name: "cyan"): Getter<IPaletteColors["cyan"]>;
/**
 * @name ????????????green
 */
export function usePaletteColors(
  name: "green",
): Getter<IPaletteColors["green"]>;
/**
 * @name ????????????magenta
 */
export function usePaletteColors(
  name: "magenta",
): Getter<IPaletteColors["magenta"]>;
/**
 * @name ????????????pink
 */
export function usePaletteColors(name: "pink"): Getter<IPaletteColors["pink"]>;
/**
 * @name ????????????red
 */
export function usePaletteColors(name: "red"): Getter<IPaletteColors["red"]>;
/**
 * @name ????????????orange
 */
export function usePaletteColors(
  name: "orange",
): Getter<IPaletteColors["orange"]>;
/**
 * @name ????????????yellow
 */
export function usePaletteColors(
  name: "yellow",
): Getter<IPaletteColors["yellow"]>;
/**
 * @name ????????????volcano
 */
export function usePaletteColors(
  name: "volcano",
): Getter<IPaletteColors["volcano"]>;
/**
 * @name ????????????geekblue
 */
export function usePaletteColors(
  name: "geekblue",
): Getter<IPaletteColors["geekblue"]>;
/**
 * @name ????????????lime
 */
export function usePaletteColors(name: "lime"): Getter<IPaletteColors["lime"]>;
/**
 * @name ????????????gold
 */
export function usePaletteColors(name: "gold"): Getter<IPaletteColors["gold"]>;
export function usePaletteColors<K extends keyof IPaletteColors>(
  name: K,
): Getter<IPaletteColors[K]>;
export function usePaletteColors(name: string) {
  return (paletteColorsGetter[name as keyof typeof paletteColorsGetter] ||
    (() => void 0)) as any;
}
export const paletteColorsGetter = Object.freeze({
  blue(props: any, theme?: Theme) {
    return (theme || props.theme)?.palette?.colors?.blue || paletteColors.blue;
  },
  purple(props: any, theme?: Theme) {
    return (
      (theme || props.theme)?.palette?.colors?.purple || paletteColors.purple
    );
  },
  cyan(props: any, theme?: Theme) {
    return (theme || props.theme)?.palette?.colors?.cyan || paletteColors.cyan;
  },
  green(props: any, theme?: Theme) {
    return (
      (theme || props.theme)?.palette?.colors?.green || paletteColors.green
    );
  },
  magenta(props: any, theme?: Theme) {
    return (
      (theme || props.theme)?.palette?.colors?.magenta || paletteColors.magenta
    );
  },
  pink(props: any, theme?: Theme) {
    return (theme || props.theme)?.palette?.colors?.pink || paletteColors.pink;
  },
  red(props: any, theme?: Theme) {
    return (theme || props.theme)?.palette?.colors?.red || paletteColors.red;
  },
  orange(props: any, theme?: Theme) {
    return (
      (theme || props.theme)?.palette?.colors?.orange || paletteColors.orange
    );
  },
  yellow(props: any, theme?: Theme) {
    return (
      (theme || props.theme)?.palette?.colors?.yellow || paletteColors.yellow
    );
  },
  volcano(props: any, theme?: Theme) {
    return (
      (theme || props.theme)?.palette?.colors?.volcano || paletteColors.volcano
    );
  },
  geekblue(props: any, theme?: Theme) {
    return (
      (theme || props.theme)?.palette?.colors?.geekblue ||
      paletteColors.geekblue
    );
  },
  lime(props: any, theme?: Theme) {
    return (theme || props.theme)?.palette?.colors?.lime || paletteColors.lime;
  },
  gold(props: any, theme?: Theme) {
    return (theme || props.theme)?.palette?.colors?.gold || paletteColors.gold;
  },
});

export const paletteColors: IPaletteColors = Object.freeze({
  blue,
  purple,
  cyan,
  green,
  magenta,
  pink,
  red,
  orange,
  yellow,
  volcano,
  geekblue,
  lime,
  gold,
});
