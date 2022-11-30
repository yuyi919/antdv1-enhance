## API Report File for "@yuyi919/vue-shared-decorators"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
import { arrayOf } from "vue-types";
import type { CSSProperties } from "@yuyi919/shared-types";
import { custom } from "vue-types";
import { ExtendProps } from "vue-types/dist/types";
import { instanceOf } from "vue-types";
import { objectOf } from "vue-types";
import { oneOf } from "vue-types";
import { oneOfType } from "vue-types";
import { PropOptions } from "vue-types/dist/types";
import { PropType } from "vue-demi";
import { shape } from "vue-types";
import { TypedPropGroup } from "@yuyi919/vue2.7-helper";
import { Types } from "@yuyi919/shared-types";
import { VCProps } from "@yuyi919/vue2.7-helper";
import type { VNode } from "vue";
import { VueInstanceKeys } from "@yuyi919/vue2.7-helper";
import type { VueTypeDef } from "vue-types";
import { VueTypesConfig } from "vue-types/dist/types";
import { VueTypesDefaults } from "vue-types/dist/types";
import type { VueTypeValidableDef } from "vue-types";

// @public (undocumented)
export function Component(options?: any): (target: any) => void;

// @public (undocumented)
export function createPropExtractor<T, R extends T>(
  source: TypedPropGroup<T>,
  configure?: (props: T) => R,
): (
  props: Partial<T>,
  walker: (
    propName: keyof T,
    propValue: T[keyof T] | null | undefined,
    options: ITypedPropOptions<any, boolean>,
  ) => any,
) => R;

// @public (undocumented)
export function extractProps<T, D = {}>(
  target: Types.Consturctor<T>,
  defaultProps?: D,
): TypedPropGroup<T, D>;

// @public (undocumented)
export function extractPropsWith<T>(
  target: Types.Consturctor<T>,
  walker?: (type: any, key: keyof T) => any,
): TypedPropGroup<T>;

// @public
export function extractUnsafeProps<T, R extends T>(
  target: Types.Consturctor<T>,
  configure?: (props: T) => R,
): readonly [TypedPropGroup<T>, WalkHandler<T, R>];

// @public (undocumented)
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

// @public (undocumented)
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
};

// @public (undocumented)
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
};

// @public (undocumented)
export const initDefaultProps: <T>(
  types: T,
  defaultProps: {
    [K in keyof T]?:
      | (T[K] extends VueTypeValidableDef<infer U>
          ? U
          : T[K] extends VueTypeDef<infer U_1>
          ? U_1
          : T[K] extends {
              type: PropType<infer U_2>;
            }
          ? U_2
          : any)
      | undefined;
  },
) => T;

// @public (undocumented)
export interface ITypedPropOptions<T, Required extends boolean> {
  // (undocumented)
  default?: T | (() => T) | null;
  // (undocumented)
  required?: Required | null;
  // (undocumented)
  type?: PropType<T> | null;
  // (undocumented)
  validator?: any;
}

// @public (undocumented)
export interface IVModelDefine<K extends string = string> {
  // (undocumented)
  event?: string;
  // (undocumented)
  prop?: K;
}

// @public (undocumented)
export function MergeProps<A>(
  ctorA: Types.ConstructorType<A>,
): Types.ConstructorType<A>;

// @public (undocumented)
export function MergeProps<A, B>(
  ctorA: Types.ConstructorType<A>,
  ctorB: Types.ConstructorType<B>,
): Types.ConstructorType<A & B>;

// @public (undocumented)
export function MergeProps<A, B, C>(
  ctorA: Types.ConstructorType<A>,
  ctorB: Types.ConstructorType<B>,
  ctorC: Types.ConstructorType<C>,
): Types.ConstructorType<A & B & C>;

// @public (undocumented)
export function MergeProps<A, B, C, D>(
  ctorA: Types.ConstructorType<A>,
  ctorB: Types.ConstructorType<B>,
  ctorC: Types.ConstructorType<C>,
  ctorD: Types.ConstructorType<D>,
): Types.ConstructorType<A & B & C & D>;

// @public (undocumented)
export function MergeProps<A, B, C, D, E>(
  ctorA: Types.ConstructorType<A>,
  ctorB: Types.ConstructorType<B>,
  ctorC: Types.ConstructorType<C>,
  ctorD: Types.ConstructorType<D>,
  ctorE: Types.ConstructorType<E>,
): Types.ConstructorType<A & B & C & D & E>;

// @public (undocumented)
export function Prop<Required extends boolean>(
  options?:
    | null
    | ITypedPropOptions<any, Required>
    | Types.Consturctor<any>[]
    | Types.Consturctor<any>,
): (target: any, key: string) => void;

// @public (undocumented)
export const PropTypes: {
  new (): {};
  defaults: Partial<VueTypesDefaults>;
  sensibleDefaults: boolean | Partial<VueTypesDefaults>;
  config: VueTypesConfig;
  readonly any: VueTypeValidableDef<any>;
  readonly func: VueTypeValidableDef<(...args: any[]) => any> & {
    default: (...args: any[]) => any;
  };
  readonly bool: VueTypeValidableDef<boolean> & {
    default: boolean;
  };
  readonly string: VueTypeValidableDef<string> & {
    default: string;
  };
  readonly number: VueTypeValidableDef<number> & {
    default: number;
  };
  readonly array: VueTypeValidableDef<unknown[]> & {
    default: () => unknown[];
  };
  readonly object: VueTypeValidableDef<{
    [key: string]: any;
  }> & {
    default: () => {
      [key: string]: any;
    };
  };
  readonly integer: VueTypeDef<number> & {
    default: number;
  };
  readonly symbol: VueTypeDef<symbol>;
  readonly custom: custom;
  readonly oneOf: oneOf;
  readonly instanceOf: instanceOf;
  readonly oneOfType: oneOfType;
  readonly arrayOf: arrayOf;
  readonly objectOf: objectOf;
  readonly shape: shape;
  extend<
    T_3 extends {
      new (): {};
      defaults: Partial<VueTypesDefaults>;
      sensibleDefaults: boolean | Partial<VueTypesDefaults>;
      config: VueTypesConfig;
      readonly any: VueTypeValidableDef<any>;
      readonly func: VueTypeValidableDef<(...args: any[]) => any> & {
        default: (...args: any[]) => any;
      };
      readonly bool: VueTypeValidableDef<boolean> & {
        default: boolean;
      };
      readonly string: VueTypeValidableDef<string> & {
        default: string;
      };
      readonly number: VueTypeValidableDef<number> & {
        default: number;
      };
      readonly array: VueTypeValidableDef<unknown[]> & {
        default: () => unknown[];
      };
      readonly object: VueTypeValidableDef<{
        [key: string]: any;
      }> & {
        default: () => {
          [key: string]: any;
        };
      };
      readonly integer: VueTypeDef<number> & {
        default: number;
      };
      readonly symbol: VueTypeDef<symbol>;
      readonly custom: custom;
      readonly oneOf: oneOf;
      readonly instanceOf: instanceOf;
      readonly oneOfType: oneOfType;
      readonly arrayOf: arrayOf;
      readonly objectOf: objectOf;
      readonly shape: shape;
      extend<T extends unknown>(
        props: ExtendProps<any> | ExtendProps<any>[],
      ): T;
      utils: {
        validate<T_1, U>(value: T_1, type: U): boolean;
        toType<T_2 = unknown>(
          name: string,
          obj: PropOptions<T_2, T_2>,
          validable?: boolean | undefined,
        ): VueTypeDef<T_2> | VueTypeValidableDef<T_2>;
      };
    },
  >(
    props: ExtendProps<any> | ExtendProps<any>[],
  ): T_3;
  utils: {
    validate<T_1_1, U_1>(value: T_1_1, type: U_1): boolean;
    toType<T_2_1 = unknown>(
      name: string,
      obj: PropOptions<T_2_1, T_2_1>,
      validable?: boolean | undefined,
    ): VueTypeDef<T_2_1> | VueTypeValidableDef<T_2_1>;
  };
} & {
  readonly shapeSize: VueTypeValidableDef<`${number}${string}` | number>;
  readonly looseBool: VueTypeValidableDef<boolean>;
  readonly style: VueTypeValidableDef<CSSProperties>;
  readonly VNodeChild: VueTypeValidableDef<VNode>;
};

// @public (undocumented)
export type TPropProvider<T> = new () => T;

// @public (undocumented)
export const UNSAFE_STORE_PROPS_KEY = "@props";

// @public (undocumented)
export type WalkHandler<T, R extends T> = (
  props: Partial<T>,
  walker: (
    propName: keyof T,
    propValue: T[keyof T] | undefined | null,
    options: ITypedPropOptions<any, boolean>,
  ) => any,
) => R;

// (No @packageDocumentation comment for this package)
```