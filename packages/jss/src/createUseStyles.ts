import Types from "@yuyi919/shared-types";
import {
  ComputedRef,
  isRef,
  onBeforeUnmount,
  Ref,
  shallowRef,
  watch,
  watchEffect,
} from "vue-demi";
import {
  CreateUseStylesHookOptions,
  createUseStylesHooks,
  DefaultTheme,
  StyleHooks,
} from "./createUseStylesHook";
import { Classes } from "./jss";
import { injectJssContext } from "./JssContext";
// import type { Styles } from '@material-ui/styles'
import { Styles } from "./styles";
import { Theming, useTheme as useDefaultTheme } from "./theming";

// interface Theming<Theme> {
//   context: React.Context<Theme>
//   withTheme: WithThemeFactory<Theme>
//   ThemeProvider: ThemeProviderFactory<Theme>
//   useTheme: UseThemeFactory<Theme>
// }

export interface CreateUseStylesOptions<Theme = DefaultTheme>
  extends CreateUseStylesHookOptions {
  theming?: Theming<Theme>;
}

export function createUseStylesWithHook<
  Theme = DefaultTheme,
  ClassKey extends string = string,
>(
  useHooks: <Data>(initialData: Data) => StyleHooks<Theme, Data, ClassKey>,
  theming?: Theming<Theme>,
): (data?: unknown) => ComputedRef<Classes<ClassKey>> {
  const useTheme = theming ? theming.useTheme : useDefaultTheme;
  return function useStyles(data?: any) {
    const hooks = useHooks(data);
    const theme = useTheme() as Ref<Theme>;
    const context = injectJssContext();
    const classes = shallowRef(hooks.getClasses());
    watch(
      [context, theme] as const,
      ([context, theme]) => {
        hooks.init(theme, context, isRef(data) ? data.value : data);
        classes.value = hooks.getClasses();
      },
      { immediate: true },
    );

    watchEffect(() => {
      hooks.update(isRef(data) ? data.value : data);
    });

    onBeforeUnmount(() => {
      hooks.dispose();
    });

    return classes as unknown as ComputedRef<Classes<ClassKey>>;
  };
}
export function createUseStyles<
  Theme = DefaultTheme,
  C extends string = string,
>(
  styles: Styles<Theme, Types.IObj, C>,
  options: CreateUseStylesOptions<Theme> = {},
): (data?: unknown) => ComputedRef<Classes<C>> {
  // const { index = getSheetIndex(), theming, name, ...sheetOptions } = options;
  const { theming } = options;
  // const useTheme =
  //   typeof styles === "function" ? (theming ? theming.useTheme : useDefaultTheme) : useDefaultTheme;
  const useHooks = createUseStylesHooks(styles, options);
  return createUseStylesWithHook(useHooks, theming);
  // return function useStyles(data?: any) {

  //   const hooks = useHooks(data);
  //   const theme = useTheme() as Ref<Theme>;
  //   const context = injectJssContext();
  //   const classes = shallowRef(hooks.getClasses());

  //   // /**
  //   //  * !important
  //   //  * ?????????????????? shallowRef???????????? `ref.value` ??????????????????proxy
  //   //  * ?????????meta?????????????????? StyleSheet ????????????????????????proxy???????????????????????????
  //   //  */
  //   // const sheet: Ref<StyleSheet> = shallowRef();
  //   // const dynamicRules: Ref<DynamicRules | null> = shallowRef(null);
  //   watch(
  //     [context, theme] as const,
  //     ([context, theme]) => {
  //       hooks.init(theme, context, isRef(data) ? data.value : data);
  //       // const sheetInstance = createStyleSheet({
  //       //   context,
  //       //   styles,
  //       //   name,
  //       //   theme,
  //       //   index,
  //       //   sheetOptions,
  //       // });

  //       // if (sheet.value && sheetInstance !== sheet.value) {
  //       //   unmanageSheet({
  //       //     index,
  //       //     context: pc,
  //       //     sheet: sheet.value,
  //       //     theme: pt,
  //       //   });

  //       //   if (sheet.value && dynamicRules.value) {
  //       //     removeDynamicRules(sheet.value, dynamicRules.value);
  //       //   }
  //       // }

  //       // const dys = sheetInstance
  //       //   ? addDynamicRules(sheetInstance, isRef(data) ? data.value : data)
  //       //   : null;

  //       // // console.log(dys)

  //       // if (sheetInstance) {
  //       //   manageSheet({
  //       //     index,
  //       //     context,
  //       //     sheet: sheetInstance,
  //       //     theme,
  //       //   });
  //       // }

  //       // sheet.value = sheetInstance;
  //       // dynamicRules.value = dys;
  //       classes.value = hooks.getClasses();
  //     },
  //     { immediate: true }
  //   );

  //   watchEffect(() => {
  //     hooks.update(isRef(data) ? data.value : data);
  //     // if (sheet.value && dynamicRules.value) {
  //     //   updateDynamicRules(isRef(data) ? data.value : data, sheet.value, dynamicRules.value);
  //     // }
  //   });
  //   // const classes: ComputedRef<Classes> = computed(() => {
  //   //   return sheet.value && dynamicRules.value
  //   //     ? getSheetClasses(sheet.value, dynamicRules.value!)
  //   //     : {};
  //   // });

  //   onBeforeUnmount(() => {
  //     hooks.dispose();
  //     // if (sheet.value) {
  //     //   unmanageSheet({
  //     //     index,
  //     //     context: context.value,
  //     //     sheet: sheet.value,
  //     //     theme: theme.value,
  //     //   });
  //     // }

  //     // if (sheet.value && dynamicRules.value) {
  //     //   removeDynamicRules(sheet.value, dynamicRules.value);
  //     // }
  //   });

  //   return classes;
  // };
}

// export default createUseStyles;
