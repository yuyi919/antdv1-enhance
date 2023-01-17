/* eslint-disable no-useless-constructor */
import { isFn } from "@yuyi919/shared-types";
import { fade, ITheme } from "@yuyi919/vue2-make-styled";
import { component, useComponent } from "../exports/component";
import { usePalette } from "../exports/palette";
import { usePaletteColors } from "../exports/palette.colors";

export class ThemeUtils {
  constructor(public theme: ITheme) {}
  prefixCls(name: string): string {
    return (this.theme?.component?.prefixCls || component.prefixCls) + name;
  }
  static getComponent = useComponent;
  static getPalette = usePalette;
  static defaultTo<T, Prop>(
    value: T | ((props: Prop, theme?: ITheme) => T),
    getter: (props: { theme?: ITheme }, theme?: ITheme) => T,
  ): (props: Prop & { theme?: ITheme }, theme?: ITheme) => T {
    return (props) => (isFn(value) ? value(props) : value) ?? getter(props);
  }
  static compose<T, Prop>(
    getter: (props: { theme?: ITheme }, theme?: ITheme) => T,
    ...pipe: ((
      value: T,
    ) => T | ((props: { theme?: ITheme }, theme?: ITheme) => T))[]
  ): (props: Prop & { theme?: ITheme }, theme?: ITheme) => T {
    return (props, theme) =>
      pipe.reduce((r, pipe) => {
        const pipeResult = pipe(r);
        return pipeResult instanceof Function
          ? pipeResult(props, theme)
          : pipeResult;
      }, getter(props, theme));
  }
  static pipe<T, R, Prop>(
    getter: (props: { theme?: ITheme }, theme?: ITheme) => T,
    pipe: (value: T) => R,
  ): (props: Prop & { theme?: ITheme }, theme?: ITheme) => R {
    return (props, theme) => pipe(getter(props, theme));
  }
  static fade<T extends string>(amount: string | number) {
    return (props: T) => fade(props, amount);
  }
  static getPaletteColors = usePaletteColors;
}
