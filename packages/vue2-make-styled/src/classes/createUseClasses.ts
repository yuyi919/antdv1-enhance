/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-spread */
import { KeyOf, WrapValue } from "@yuyi919/shared-types";
import { computed, defineComponent, PropType, reactive, Ref } from "vue-demi";
import { createBEM } from "../classes";
import { ThemeProps, useTheme } from "../styled";
import { ITheme } from "../theme";
// import { componentGetter } from "../exports/component";

/**
 *
 * @param wrapper
 */
export function unwrap<T, GetterArgs extends any[]>(
  wrapper?: WrapValue<T, GetterArgs>,
  args: GetterArgs = [] as any[] as GetterArgs,
): T {
  return (
    wrapper instanceof Function
      ? wrapper(...args)
      : wrapper instanceof Object && "value" in wrapper // && (wrapper as { value?: T }).value !== void 0
      ? (wrapper as { value?: T }).value
      : wrapper
  ) as T;
}
/**
 * 规则：
 * root => ClassName
 * name => ClassName__name
 * [name, NAME] => ClassName__name--NAME
 */
type TypedClassName<
  Name extends string,
  Classes extends {
    [K in string]: string | [string, string] | readonly [string, string];
  },
  K extends KeyOf<Classes> | "root",
> = K extends "root"
  ? Name
  : Classes[K] extends [infer T1, infer T2] | readonly [infer T1, infer T2]
  ? `${Name}__${Extract<T1, string>}--${Extract<T2, string>}`
  : Classes[K] extends infer T1
  ? `${Name}__${Extract<T1, string>}`
  : `${Name}${string}`;

type UseClasses<
  Props extends {},
  Name extends string,
  Classes extends {
    [K in string]: string | [string, string] | readonly [string, string];
  },
> = readonly [
  {
    [K in KeyOf<Classes> | "root"]: <Prefix extends string>(
      props: ThemeProps<Props>,
    ) => PrefixName<`.${Prefix}`, K, TypedClassName<Name, Classes, K>>;
  },
  {
    <Prefix extends string>(
      className?: WrapValue<string>,
      theme?: WrapValue<ITheme>,
    ): PrefixNameGroup<
      Prefix,
      {
        [K in KeyOf<Classes> | "root"]: TypedClassName<Name, Classes, K>;
      }
    >;
  },
  IClassesComponent<{ [K in KeyOf<Classes>]: string }>,
];

/**
 * 为class属性添加前缀
 */
type PrefixName<
  Prefix extends string,
  K extends string,
  Name extends string,
> = K extends "root" ? `${string | ""} ${Prefix}${Name}` : `${Prefix}${Name}`;

/**
 * 为一组class属性添加前缀
 */
type PrefixNameGroup<
  Prefix extends string,
  Classes extends {
    [K in string]: string;
  },
> = {
  [K in KeyOf<Classes>]: PrefixName<Prefix, K, Classes[K]>;
};

export interface UseClssesHook<Classes extends Record<string, string>> {
  <Prefix extends string>(
    className?: WrapValue<string>,
    theme?: WrapValue<ITheme>,
  ): PrefixNameGroup<Prefix, Classes>;
}

export function createUseClasses<
  Props extends {} = {},
  Name extends string = string,
  Classes extends {
    readonly [K in string]:
      | string
      | [string, string]
      | readonly [string, string];
  } = {
    readonly [K in string]:
      | string
      | [string, string]
      | readonly [string, string];
  },
>(
  name: Name,
  nameMap: Classes | Readonly<Classes>,
): UseClasses<Props, Name, Classes> {
  const _names = {
    root: (props: ThemeProps, theme?: ITheme) =>
      ("." + prefixClsWithTheme(theme || props.theme!, name)) as `.${Name}`,
  } as unknown as {
    [K in KeyOf<Classes> | "root"]: <Prefix extends string>(
      props: ThemeProps,
    ) => PrefixName<`.${Prefix}`, K, TypedClassName<Name, Classes, K>>;
  };
  for (const key in nameMap) {
    _names[key as unknown as KeyOf<Classes>] = ((
      props: ThemeProps,
      theme?: ITheme,
    ) => {
      const classKey = nameMap[key];
      const bem = createBEM(prefixClsWithTheme(theme || props.theme!, name));
      // console.log(
      //   "classKey",
      //   "." + (classKey instanceof Array ? bem.apply(null, classKey) : bem(classKey as string))
      // );
      return (
        "." +
        (classKey instanceof Array
          ? bem.apply(null, classKey as [string, string])
          : bem(classKey as string))
      );
    }) as (props: ThemeProps) => any;
  }
  return [
    _names,
    function <Prefix extends string>(
      className?: WrapValue<string>,
      themeProps?: WrapValue<ITheme>,
    ) {
      const theme = useTheme(themeProps);
      // const savedClasses =
      // if (savedClasses) return savedClasses;
      let classes: {
        [K in KeyOf<Classes> | "root"]: Ref<
          PrefixName<Prefix, K, TypedClassName<Name, Classes, K>>
        >;
      } = null!; // = theme.value.components![name as string];
      if (!classes) {
        const root = computed<string>(() => {
          return prefixClsWithTheme(theme.value, name);
        });
        classes = {
          root,
        } as any;
        for (const key in nameMap) {
          if (key !== "root") {
            classes[key as unknown as KeyOf<Classes>] = computed<any>(() => {
              const bem = createBEM(root.value);
              const classKey = nameMap[key];
              return classKey instanceof Array
                ? bem.apply(null, classKey as [string, string])
                : bem(classKey as string);
            });
          }
        }
        // theme.value.components![name as string] = classes;
      }
      return reactive({
        ...classes,
        root: computed(() => {
          const classNames = unwrap(className);
          // eslint-disable-next-line eqeqeq
          return (
            (classNames != void 0 ? classNames + " " : "") + classes.root.value
          );
        }),
      }) as any as {
        [K in KeyOf<Classes> | "root"]: PrefixName<
          Prefix,
          K,
          TypedClassName<Name, Classes, K>
        >;
      };
    },
    defineComponent({
      props: {
        classNames: {
          type: Object as PropType<
            Partial<Record<KeyOf<Classes> | "root", string>>
          >,
          default: () => ({}),
        },
      },
    }),
  ] as UseClasses<Props, Name, Classes>;
}

function prefixClsWithTheme<Name extends string>(theme: ITheme, name: Name) {
  return theme?.prefixCls ? theme.prefixCls + name : name;
}

export interface IClassesComponent<Classes extends Record<string, string>> {
  new (): {
    /**
     * 自定义className追加
     * @props
     */
    classNames?: { [K in KeyOf<Classes> | "root"]?: string };

    // $props: TypeTsxProps<{
    //   /**
    //    * 自定义className追加
    //    * @props
    //    */
    //   classNames?: { [K in KeyOf<Classes> | "root"]?: string };
    // }>;
  };
}
