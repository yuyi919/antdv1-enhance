import type { Types } from "@yuyi919/shared-types";
import { VCProps, TypedPropGroup, VueInstanceKeys } from "@yuyi919/vue2.7-helper";
import { cloneDeep, omit } from "lodash";
import { UNSAFE_STORE_PROPS_KEY } from ".";
import { getFromVueComponent } from "./optionResolver";

export type TPropProvider<T> = new () => T;

export interface IVModelDefine<K extends string = string> {
  prop?: K;
  event?: string;
}
export function getPropsClass<
  T extends TPropProvider<Vue>,
  Props extends VCProps<InstanceType<T>, false>,
>(
  component: T,
  replaceInitProps?: Partial<VCProps<InstanceType<T>, false>>,
): (new () => Props) & {
  model: IVModelDefine<Types.KeyOf<Props>>;
  props: TypedPropGroup<Props>;
};
export function getPropsClass<
  T extends TPropProvider<Vue>,
  Props extends VCProps<InstanceType<T>, false>,
  PropKey extends Types.KeyOf<Props>,
  Resolver = Partial<Omit<InstanceType<T>, PropKey | VueInstanceKeys>>,
>(
  component: T,
  replaceInitProps?: VCProps<InstanceType<T>, false>,
  ...igronProps: PropKey[]
): (new () => Resolver) & {
  model: IVModelDefine<Exclude<Types.KeyOf<Props>, PropKey>>;
  props: TypedPropGroup<Resolver>;
  // [UNSAFE_STORE_PROPS_KEY]: TypedPropGroup<Resolver>;
};
export function getPropsClass<
  Props extends Types.Recordable,
  PropKey extends Types.KeyOf<Props>,
>(
  component: any,
  replaceInitProps?: Partial<Props>,
  ...igronProps: PropKey[]
): (new () => Props) & {
  model: IVModelDefine<PropKey>;
  props: TypedPropGroup<Props>;
  // [UNSAFE_STORE_PROPS_KEY]: TypedPropGroup<Props>;
};
export function getPropsClass<T extends Types.Recordable = any>(
  component: any,
  replaceInitProps?: Partial<T>,
  ...igronProps: (keyof T)[]
): (new () => T) & { model: any; props: TypedPropGroup<T> } {
  const props = cloneDeep(getFromVueComponent(component, "props"));
  const nextProps = _getPropsClass1(
    (igronProps.length > 0 && omit(props, igronProps)) || props,
    replaceInitProps,
  );
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function Props() {}
  Props.prototype = {};
  return Object.assign(Props, {
    props: nextProps,
    model: getFromVueComponent(component, "model"),
    [UNSAFE_STORE_PROPS_KEY]: nextProps,
  }) as any;
}

function _getPropsClass1<T extends Record<string, any>>(
  props: T,
  replaceInitProps?: any,
): T {
  if (props && replaceInitProps) {
    for (const key of Object.keys(replaceInitProps)) {
      const propsOptions = props[key];
      if (propsOptions) {
        const isObject = replaceInitProps[key] instanceof Object;
        props[key as keyof T] = {
          ...propsOptions,
          default: isObject
            ? () => replaceInitProps[key]
            : replaceInitProps[key],
        };
        // (propsOptions.def && propsOptions.def(replaceInitProps[key])) || (propsOptions.default = replaceInitProps[key])
      }
    }
  }
  return props;
}
