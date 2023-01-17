import { getCurrentInstance, ref, SetupContext } from "vue-demi";

export function useAttrsStyles() {
  const ins = getCurrentInstance()!.proxy;
  const styles = () => {
    return (
      {
        ...ins.$vnode.data?.staticStyle,
        ...(ins.$vnode.data as any)?.normalizedStyle,
      } || ins.$vnode.data?.style
    );
  };
  const classes = () => {
    return ins.$vnode.data?.staticClass || ins.$vnode.data?.class;
  };
  const attrs = () => {
    return ins.$vnode.data?.attrs;
  };
  return { classes, styles, attrs };
}

export function useEventSourceHandle<
  Events extends string[],
  K extends Events[number],
>(name: K, context?: SetupContext<Events>): (...args: any[]) => any;
/**
 * 取得组件监听事件的源句柄
 * @param name - 事件名称
 * @param context - SetupContext（可选）不传则使用getCurrentInstance查找监听器
 * @returns 监听事件的源句柄（函数）
 */
export function useEventSourceHandle<
  Events extends Record<string, any>,
  K extends keyof Events,
>(name: K, context?: SetupContext<Events>): Events[K];
export function useEventSourceHandle(
  name: string,
  context?: SetupContext<any>,
): (...args: any[]) => any;
export function useEventSourceHandle(
  name: string,
  context?: SetupContext<any>,
) {
  if (context) {
    return (...args: any[]) => {
      // @ts-ignore
      return context.listeners?.[name]?.fns?.(...args);
    };
  }
  const ins = getCurrentInstance()!.proxy;
  return getListenerHandle(ins, name);
}

/**
 * 取得组件监听事件的源句柄
 * @param ins - 组件实例
 * @param name - 事件名称
 * @returns 监听事件的源句柄（函数）
 */
export function getListenerHandle(ins: Vue, name: string) {
  return (...args: any[]) => {
    // hack，ins
    const fn = ins.$vnode.componentOptions?.listeners?.[name]?.fns;
    return fn ? fn(...args) : ins.$emit(name, ...args);
  };
}

function makeHandlePromise(cb?: () => void) {
  let _resolve: (value: void | PromiseLike<void>) => void;
  function next() {
    _resolve?.();
    cb?.();
  }
  return Object.assign(
    new Promise<void>((resolve) => {
      _resolve = resolve;
    }),
    { next },
  );
}

export function useHandlePromise() {
  const wait = ref<ReturnType<typeof makeHandlePromise> | null>(null);
  async function handle() {
    await (wait.value = makeHandlePromise());
    wait.value = null;
  }
  handle.next = () => {
    wait.value?.next();
  };
  return handle;
}
