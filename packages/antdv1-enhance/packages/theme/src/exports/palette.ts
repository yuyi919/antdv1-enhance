/**
 * @package Palette
 */
/* eslint-disable no-redeclare */
import {
  black as _black,
  errorColor as _errorColor,
  highlightColor as _highlightColor,
  infoColor as _infoColor,
  normalColor as _normalColor,
  primary as _primary,
  primaryColor as _primaryColor,
  processingColor as _processingColor,
  second as _second,
  secondColor as _secondColor,
  successColor as _successColor,
  warningColor as _warningColor,
  white as _white,
} from "../../exports/palette.module.less";
import type { Theme } from "../styled/provider";
import { Getter } from "./interface";

export interface IPalette {
  /**
   * @name @primary-color
   */
  primaryColor: string;
  /**
   * @name @info-color
   */
  infoColor: string;
  /**
   * @name @success-color
   */
  successColor: string;
  /**
   * @name @processing-color
   */
  processingColor: string;
  /**
   * @name @error-color
   */
  errorColor: string;
  /**
   * @name @highlight-color
   */
  highlightColor: string;
  /**
   * @name @warning-color
   */
  warningColor: string;
  /**
   * @name @normal-color
   */
  normalColor: string;
  /**
   * @name @white
   */
  white: string;
  /**
   * @name @black
   */
  black: string;
  /**
   * @name @second-color
   */
  secondColor: string;
  /**
   * @name @primary
   */
  primary: string[];
  /**
   * @name @second
   */
  second: string[];
}

/**
 * @name @primary-color
 */
export const primaryColor: IPalette["primaryColor"] = _primaryColor;
/**
 * @name @info-color
 */
export const infoColor: IPalette["infoColor"] = _infoColor;
/**
 * @name @success-color
 */
export const successColor: IPalette["successColor"] = _successColor;
/**
 * @name @processing-color
 */
export const processingColor: IPalette["processingColor"] = _processingColor;
/**
 * @name @error-color
 */
export const errorColor: IPalette["errorColor"] = _errorColor;
/**
 * @name @highlight-color
 */
export const highlightColor: IPalette["highlightColor"] = _highlightColor;
/**
 * @name @warning-color
 */
export const warningColor: IPalette["warningColor"] = _warningColor;
/**
 * @name @normal-color
 */
export const normalColor: IPalette["normalColor"] = _normalColor;
/**
 * @name @white
 */
export const white: IPalette["white"] = _white;
/**
 * @name @black
 */
export const black: IPalette["black"] = _black;
/**
 * @name @second-color
 */
export const secondColor: IPalette["secondColor"] = _secondColor;
/**
 * @name @primary
 */
export const primary: IPalette["primary"] = _primary
  .split(",")
  .map((v) => v.trim());
/**
 * @name @second
 */
export const second: IPalette["second"] = _second
  .split(",")
  .map((v) => v.trim());

/**
 * @name ????????????primary-color
 */
export function usePalette(
  name: "primaryColor",
): Getter<IPalette["primaryColor"]>;
/**
 * @name ????????????info-color
 */
export function usePalette(name: "infoColor"): Getter<IPalette["infoColor"]>;
/**
 * @name ????????????success-color
 */
export function usePalette(
  name: "successColor",
): Getter<IPalette["successColor"]>;
/**
 * @name ????????????processing-color
 */
export function usePalette(
  name: "processingColor",
): Getter<IPalette["processingColor"]>;
/**
 * @name ????????????error-color
 */
export function usePalette(name: "errorColor"): Getter<IPalette["errorColor"]>;
/**
 * @name ????????????highlight-color
 */
export function usePalette(
  name: "highlightColor",
): Getter<IPalette["highlightColor"]>;
/**
 * @name ????????????warning-color
 */
export function usePalette(
  name: "warningColor",
): Getter<IPalette["warningColor"]>;
/**
 * @name ????????????normal-color
 */
export function usePalette(
  name: "normalColor",
): Getter<IPalette["normalColor"]>;
/**
 * @name ????????????white
 */
export function usePalette(name: "white"): Getter<IPalette["white"]>;
/**
 * @name ????????????black
 */
export function usePalette(name: "black"): Getter<IPalette["black"]>;
/**
 * @name ????????????second-color
 */
export function usePalette(
  name: "secondColor",
): Getter<IPalette["secondColor"]>;
/**
 * @name ????????????primary
 */
export function usePalette(name: "primary"): Getter<IPalette["primary"]>;
/**
 * @name ????????????second
 */
export function usePalette(name: "second"): Getter<IPalette["second"]>;
export function usePalette<K extends keyof IPalette>(
  name: K,
): Getter<IPalette[K]>;
export function usePalette(name: string) {
  return (paletteGetter[name as keyof typeof paletteGetter] ||
    (() => void 0)) as any;
}
export const paletteGetter = Object.freeze({
  primaryColor(props: any, theme?: Theme) {
    return (
      (theme || props.theme)?.palette?.primaryColor || palette.primaryColor
    );
  },
  infoColor(props: any, theme?: Theme) {
    return (theme || props.theme)?.palette?.infoColor || palette.infoColor;
  },
  successColor(props: any, theme?: Theme) {
    return (
      (theme || props.theme)?.palette?.successColor || palette.successColor
    );
  },
  processingColor(props: any, theme?: Theme) {
    return (
      (theme || props.theme)?.palette?.processingColor ||
      palette.processingColor
    );
  },
  errorColor(props: any, theme?: Theme) {
    return (theme || props.theme)?.palette?.errorColor || palette.errorColor;
  },
  highlightColor(props: any, theme?: Theme) {
    return (
      (theme || props.theme)?.palette?.highlightColor || palette.highlightColor
    );
  },
  warningColor(props: any, theme?: Theme) {
    return (
      (theme || props.theme)?.palette?.warningColor || palette.warningColor
    );
  },
  normalColor(props: any, theme?: Theme) {
    return (theme || props.theme)?.palette?.normalColor || palette.normalColor;
  },
  white(props: any, theme?: Theme) {
    return (theme || props.theme)?.palette?.white || palette.white;
  },
  black(props: any, theme?: Theme) {
    return (theme || props.theme)?.palette?.black || palette.black;
  },
  secondColor(props: any, theme?: Theme) {
    return (theme || props.theme)?.palette?.secondColor || palette.secondColor;
  },
  primary(props: any, theme?: Theme) {
    return (theme || props.theme)?.palette?.primary || palette.primary;
  },
  second(props: any, theme?: Theme) {
    return (theme || props.theme)?.palette?.second || palette.second;
  },
});

export const palette: IPalette = Object.freeze({
  primaryColor,
  infoColor,
  successColor,
  processingColor,
  errorColor,
  highlightColor,
  warningColor,
  normalColor,
  white,
  black,
  secondColor,
  primary,
  second,
});
