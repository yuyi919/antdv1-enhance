/* eslint-disable @typescript-eslint/ban-types */
import warning from "tiny-warning";
import { computed, defineComponent, inject, PropType, provide, Ref, ref } from "vue-demi";
import isObject from "./utils/is-object";
type ThemeFunction<Theme> = (outerTheme: Theme) => Theme;

type ThemeOrThemeFunction<Theme> = Theme | ThemeFunction<Theme>;

const defaultTheme = {};

export interface Theming<Theme> {
  ThemeProvider: any;
  useTheme: () => Ref<Theme>;
  contextKey: string | Symbol;
}

export function createTheming<Theme>(
  contextKey: Symbol | string,
  defaultTheme: Theme
): Theming<Theme> {
  const ThemeProvider = defineComponent({
    props: {
      theme: {
        type: Object as PropType<ThemeOrThemeFunction<Theme>>,
        required: true,
      },
      // children: {} as any
    },
    setup(props, { slots }) {
      const outerTheme: Ref<Theme> | undefined = inject(contextKey, undefined);

      const theme = computed(() => {
        const pt = props.theme;
        let theme: Theme;

        if (typeof pt === "function") {
          theme = (pt as any)(outerTheme);

          warning(
            isObject(theme),
            "[ThemeProvider] Please return an object from your theme function"
          );
        } else {
          theme =
            outerTheme && outerTheme!.value
              ? { ...(outerTheme!.value as any), ...(pt as any) }
              : pt;
          warning(isObject(theme), "[ThemeProvider] Please make your theme prop a plain object");
        }

        return theme;
      });

      provide(contextKey, theme);

      return () => slots.default && slots.default();
    },
  });

  const useTheme = (): Ref<Theme> => {
    const theme: Ref<Theme> = inject(contextKey, ref(defaultTheme) as Ref<Theme>);
    console.log("useTheme", theme)
    return theme;
  };

  return {
    ThemeProvider,
    useTheme,
    contextKey,
  };
}

export const { ThemeProvider, useTheme } = createTheming<any>(
  "__vue_jss_provide_key__",
  defaultTheme
);
