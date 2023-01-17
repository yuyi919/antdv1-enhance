/* eslint-disable no-redeclare */
import { unwrap, WrapValue } from "@yuyi919/vue-use";
import { computed, inject, provide } from "vue-demi";
import { ITheme } from "../theme";

export type ThemeProps<P = {}> = P & { theme?: ITheme };
export type HasTheme<P extends {}> = keyof P extends never
  ? false
  : Extract<keyof P, "theme"> extends never
  ? false
  : true;

export type TMixedProps<P> = P & {
  theme?: HasTheme<P> extends true
    ? "theme" extends keyof P
      ? P["theme"]
      : never
    : ITheme;
};

export type TThemeProps<P = {}> = ThemeProps<P>;
// type A = { theme };
// type B = HasTheme<A>;

export type ThemeGetter<T extends ITheme = ITheme> = WrapValue<T>;
/**
 * 通过context传递获取theme对象
 * @param theme
 * @param defaultTheme
 */
export function useTheme<T extends ITheme>(
  theme: ThemeGetter<T> = inject<any>("$theme", () => {}),
  defaultTheme?: ThemeGetter<T>,
) {
  return computed<T>(
    () => unwrap(theme) || (defaultTheme && unwrap(defaultTheme)),
  );
}
useTheme.provide = function useThemeProvide(getter: () => ITheme) {
  const theme = computed(getter);
  provide("$theme", () => theme.value);
  return theme;
};
