import { Types } from "@yuyi919/shared-types";
import {
  ComponentComputedOptions,
  ComponentCustomProperties,
  ComponentMethodOptions,
  ExtractPropTypes,
  VueConstructor,
} from "vue";
import {
  ComponentOptionsBase,
  ComponentOptionsMixin,
} from "vue/types/v3-component-options";
import {
  ComponentPublicInstanceConstructor,
  Vue3Instance,
} from "vue/types/v3-component-public-instance";
import { EmitsOptions } from "vue/types/v3-setup-context";
import { ScopedSlotReturnValue } from "vue/types/vnode";
import { TsxOnEvents } from "./TsxOnEvents";
import { TypedPropGroup, TypedPropsMap } from "./TypedPropGroup";

type InnerScopedSlots<T> = {
  [K in keyof T | (string & {})]?: (
    props: K extends keyof T ? T[K] : any,
  ) => ScopedSlotReturnValue;
};

type InternalVueComponent2<
  IProps,
  Emits,
  ScopedSlotArgs,
  Public,
  DProps = TypedPropsMap<IProps>,
  EProps = Readonly<ExtractPropTypes<DProps>>,
  E extends EmitsOptions = Emits extends string[]
    ? Emits
    : Emits extends Record<string, any>
    ? {
        [K in keyof Emits]: (args: Emits[K]) => any;
      }
    : any,
> = ComponentPublicInstanceConstructor<
  Vue3Instance<
    {},
    EProps,
    EProps & TsxOnEvents<E>,
    E,
    {},
    true,
    ComponentOptionsMixin
  > &
    Readonly<EProps & Public & ComponentCustomProperties>,
  any,
  any,
  any,
  ComponentComputedOptions,
  ComponentMethodOptions
> &
  ComponentOptionsBase<
    EProps,
    Public,
    {},
    {},
    {},
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    E,
    string,
    {}
  > & {
    props: DProps;
  };

export type VueComponent2<
  IProps,
  Emits = {},
  ScopedSlots = {},
  Public = {},
  VueType = {},
> = InternalVueComponent2<IProps, Emits, ScopedSlots, Public> &
  Omit<VueType, keyof VueConstructor>;
// type o = unknown extends keyof {} ? true : false;
// type p = InstanceType<
//   VueComponent2<{ noEnter?: (a: any, b: () => any) => any }>
// >["$props"];
// type p2 = VueComponent2<{ noEnter?: (a: any, b: () => any) => any }>['props']

export type { TypedPropGroup };

export type EventHandler<E> = [E] extends [(...args: any[]) => any]
  ? E
  : (payload: E) => any;

export type EventHandlers<E> = {
  [K in keyof E]?: EventHandler<E[K]> | EventHandler<E[K]>[];
};

export type TypeTsxProps<
  Props extends Types.Recordable,
  Events extends Types.Recordable = Types.Recordable,
  ScopedSlots extends Types.Recordable = Types.Recordable,
  Attributes extends Types.Recordable = Types.Recordable,
> = InnerTypeTsxProps<Props, EventHandlers<Events>, ScopedSlots, Attributes>;

// type a = TypeTsxProps<Types.Recordable, { a: 1 }>["onA"];
// type b = EventHandler<1> | EventHandler<1>[];

type InnerTypeTsxProps<
  Props extends Types.Recordable,
  Events extends Types.Recordable = Types.Recordable,
  ScopedSlots extends Types.Recordable = Types.Recordable,
  Attributes extends Types.Recordable = Types.Recordable,
> = Attributes &
  Props &
  TsxOnEvents<Events> & {
    attrs?: Attributes;
    on?: Events;
    props?: Partial<Props> & { [key: string]: any };
    model?: {
      value?: any;
      callback?: (...args: any) => any;
    };
    vModel?: {
      value?: any;
      callback?: (...args: any) => any;
    };
    scopedSlots?: InnerScopedSlots<ScopedSlots>;
  };
