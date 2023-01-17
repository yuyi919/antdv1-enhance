import { Types } from "@yuyi919/shared-types";
import { UNSAFE_STORE_PROPS_KEY } from "@yuyi919/vue-shared-decorators";
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

export type PropClass<T> = new () => T;
export function PropsMixins<A>(ctorA: PropClass<A>): PropClass<A>;
export function PropsMixins<A, B>(
  ctorA: PropClass<A>,
  ctorB: PropClass<B>,
): PropClass<A & B>;
export function PropsMixins<A, B, C>(
  ctorA: PropClass<A>,
  ctorB: PropClass<B>,
  ctorC: PropClass<C>,
): PropClass<A & B & C>;
export function PropsMixins<A, B, C, D>(
  ctorA: PropClass<A>,
  ctorB: PropClass<B>,
  ctorC: PropClass<C>,
  ctorD: PropClass<D>,
): PropClass<A & B & C & D>;
export function PropsMixins<A, B, C, D, E>(
  ctorA: PropClass<A>,
  ctorB: PropClass<B>,
  ctorC: PropClass<C>,
  ctorD: PropClass<D>,
  ctorE: PropClass<E>,
): PropClass<A & B & C & D & E>;
export function PropsMixins<T>(...ctors: PropClass<any>[]): PropClass<T>;
export function PropsMixins(...ctors: PropClass<any>[]) {
  //@ts-ignore
  return Vue.extend({ mixins: ctors }) as PropClass<T>;
}
