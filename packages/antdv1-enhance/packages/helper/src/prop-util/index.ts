import { Types } from "@yuyi919/shared-types";
import {
  TPropProvider,
  UNSAFE_STORE_PROPS_KEY,
} from "@yuyi919/vue-shared-decorators";
import { TypedPropGroup } from "@yuyi919/vue2.7-helper";
import Vue from "vue";
import {
  getCurrentInstance,
  onUnmounted,
  reactive,
  SetupContext,
} from "vue-demi";

export type {
  ITypedPropOptions,
  WalkHandler,
} from "@yuyi919/vue-shared-decorators";

export abstract class HookFactory<Props = Types.Recordable> {
  $instance = getCurrentInstance()!.proxy as Vue & Props;
  constructor(
    protected context: SetupContext,
    public props: Props = {} as Props,
  ) {}
  protected $emit(eventName: string, args?: any, ...other: any[]) {
    return this.context.emit(eventName, args, ...other);
  }
  get $slots() {
    return this.$instance.$slots;
  }
  get $scopedSlots() {
    return this.$instance.$scopedSlots;
  }
  get $refs() {
    return this.$instance.$refs;
  }
  $once(event: string | string[], callback: Types.Function.Base) {
    return this.$instance.$once(event, callback);
  }
  $on(event: string | string[], callback: Types.Function.Base) {
    return this.$instance.$on(event, callback);
  }
  public $install?(props: Props): void | (() => void);
}

export function useHookFactory<
  Props,
  F extends HookFactory<Props>,
  Args extends any[],
>(
  factory: Types.ConstructorType<
    F,
    [context: SetupContext, props: Props, ...args: Args]
  >,
  context: SetupContext,
  props: Props,
  ...args: Args
): F {
  const store = reactive(new factory(context, props, ...args)) as F;
  const disposer = store.$install?.(props);
  if (disposer && disposer instanceof Function) {
    onUnmounted(disposer);
  }
  return store;
}

export abstract class PropProvider<T> {
  public static [UNSAFE_STORE_PROPS_KEY]: TypedPropGroup<any>;
}

export function PropsMixins<A>(ctorA: TPropProvider<A>): TPropProvider<A>;
export function PropsMixins<A, B>(
  ctorA: TPropProvider<A>,
  ctorB: TPropProvider<B>,
): TPropProvider<A & B>;
export function PropsMixins<A, B, C>(
  ctorA: TPropProvider<A>,
  ctorB: TPropProvider<B>,
  ctorC: TPropProvider<C>,
): TPropProvider<A & B & C>;
export function PropsMixins<A, B, C, D>(
  ctorA: TPropProvider<A>,
  ctorB: TPropProvider<B>,
  ctorC: TPropProvider<C>,
  ctorD: TPropProvider<D>,
): TPropProvider<A & B & C & D>;
export function PropsMixins<A, B, C, D, E>(
  ctorA: TPropProvider<A>,
  ctorB: TPropProvider<B>,
  ctorC: TPropProvider<C>,
  ctorD: TPropProvider<D>,
  ctorE: TPropProvider<E>,
): TPropProvider<A & B & C & D & E>;
export function PropsMixins<T>(
  ...ctors: TPropProvider<any>[]
): TPropProvider<T>;
export function PropsMixins(...ctors: TPropProvider<any>[]) {
  //@ts-ignore
  return Vue.extend({ mixins: ctors }) as TPropProvider<T>;
}
