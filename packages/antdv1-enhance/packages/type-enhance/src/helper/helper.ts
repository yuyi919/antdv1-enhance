import { Types } from "@yuyi919/shared-types";
import {
  ComponentComputedOptions,
  ComponentCustomProperties,
  ComponentMethodOptions,
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
import { TsxOnEvents } from "./TsxOnEvents";
import { TypedPropGroup } from "./TypedPropGroup";

type InnerScopedSlotReturnType = Vue["$scopedSlots"] extends {
  [name: string]: ((...args: any[]) => infer T) | undefined;
}
  ? T
  : never;
type InnerScopedSlots<T> = {
  [K in keyof T]: (
    props: Exclude<T[K], undefined>,
  ) => InnerScopedSlotReturnType;
};

type InternalVueComponent2<
  IProps,
  Emits,
  ScopedSlotArgs,
  Public,
  DProps = TypedPropGroup<IProps>,
  EProps = Readonly<IProps>,
  E extends EmitsOptions = Emits extends string[]
    ? Emits
    : Emits extends Record<string, any>
    ? {
        [K in keyof Emits]: (args: Emits[K]) => any;
      }
    : any,
> = ComponentPublicInstanceConstructor<
  Vue3Instance<
    Types.Recordable,
    EProps,
    EProps & TsxOnEvents<E>,
    E,
    Types.Recordable,
    true,
    ComponentOptionsMixin
  > &
    Readonly<
      EProps &
        Public &
        ComponentCustomProperties & {
          $scopedSlots: {
            [K in keyof ScopedSlotArgs]: InnerScopedSlots<ScopedSlotArgs>[K];
          };
        }
    >,
  any,
  any,
  any,
  ComponentComputedOptions,
  ComponentMethodOptions
> &
  ComponentOptionsBase<
    EProps,
    Public,
    Types.Recordable,
    Types.Recordable,
    Types.Recordable,
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    E,
    string,
    Types.Recordable
  > & {
    props: DProps;
  };

export type VueComponent2<
  IProps,
  Emits = Types.Recordable,
  ScopedSlots = Types.Recordable,
  Public = Types.Recordable,
  VueType extends VueConstructor = VueConstructor,
> = InternalVueComponent2<IProps, Emits, ScopedSlots, Public> & VueType;

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
