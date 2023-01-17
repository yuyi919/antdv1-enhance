import type { VueComponent2 } from "@yuyi919/vue2.7-helper";
import { TThemeProps } from "./provider";

export type TemplateArg<TProps, Theme> =
  | VueComponent2<any>
  | ((props: TThemeProps<TProps>, theme?: Theme) => any)
  | TemplateArg<TProps, Theme>[]
  | string
  | number
  | undefined
  | null;

export type TemplateArgs<TProps, Theme> = [
  TemplateStringsArray,
  ...TemplateArg<TProps, Theme>[],
];
