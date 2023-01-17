import { as, isFn, isThenable } from "@yuyi919/shared-types";
import { sleep } from "@yuyi919/shared-utils";
import { useInheritEvents } from "@yuyi919/vue-use";
import { computed, defineComponent, h, ref, watch } from "vue-demi";
import { extractProps } from "../../helper";
import {
  useAttrsStyles,
  useEventSourceHandle,
  useHandlePromise,
} from "../../use";
import { InternalActionMap } from "../ActionGroup/Props";
import { ILocale } from "../ILocale";
import {
  ActionType,
  IActionConfig,
  ICallableActionConfig,
  InternalActionType,
} from "../interface";
import { BaseAction } from "./BaseAction";
import { ActionProps } from "./Props";

/**
 * 取得按钮的展示文字
 * @param action 按钮动作配置
 * @param locale 文案配置
 * @param loading 加载中状态
 */
export function getActionTitle(
  action: IActionConfig,
  loading = false,
  locale?: ILocale,
): Exclude<IActionConfig["title"], Function> | undefined {
  if (action.title instanceof Function) {
    return action.title(loading);
  }
  if (loading) {
    if (locale?.[action.name!]) {
      return locale[action.name!].excuting;
    }
    if (action.type !== InternalActionType.CUSTOM$) {
      const returns =
        (action.type !== InternalActionType.CUSTOM$ &&
          InternalActionMap[action.type!]) ||
        action.title ||
        action.name;
      return locale?.[returns]?.excuting || returns;
    }
  }
  const returns = action.title
    ? action.title
    : action.type === InternalActionType.CUSTOM$
    ? action.name
    : InternalActionMap[action.type!] || action.name!;
  return locale?.[returns]?.title || returns;
}
/**
 * 取得动作执行中的文案
 * @param action 按钮动作配置
 * @param locale 文案配置
 */
export function getActionExcutingHint(action: IActionConfig, locale?: ILocale) {
  return (
    locale?.[action.name! || action.type!]?.confirm ||
    getActionTitle(action, false, locale)
  );
}

/**
 * 取得名称，无则使用action类型作为名称
 * @param name
 * @param type
 * @param action
 */
export function getActionName(
  name: IActionConfig["name"],
  type: IActionConfig["type"],
): string {
  return name || type || InternalActionType.CUSTOM$;
}

/**
 * 无指定类型时使用name推断，无法推断时则为自定义
 * @param type
 * @param name
 */
export function getActionType(
  type: IActionConfig["type"],
  name: IActionConfig["name"],
): ActionType {
  return (
    type || (isInternalActionType(name!) && name) || InternalActionType.CUSTOM$
  );
}

// console.log('DefaultActionMap', DefaultActionMap)
export function isInternalActionType(type: string): type is InternalActionType {
  return !!InternalActionMap[type as InternalActionType];
}

export const DELAY_SYMBOL = Symbol("DELAY_SYMBOL");
export const Action = defineComponent({
  props: extractProps(ActionProps),
  emits: {
    action(arg: any) {},
    click(arg: any) {},
    ok(arg: any) {},
    cancel() {},
    cancelConfirm() {},
  } as const,
  setup(props, context) {
    const $action = computed(() =>
      actionProps2Config(props, useEventSourceHandle("action", context)),
    );
    const [events, handles] = useInheritEvents(context, ["cancelConfirm"]);
    const spinningRef = ref(false);
    watch(
      () => props.loading,
      (loading) => {
        spinningRef.value = !!loading;
      },
      { immediate: true },
    );
    const wait = useHandlePromise();
    function handleClick() {
      const { action } = $action.value;
      if (isFn(action)) {
        const result = action();
        if (isThenable(result)) {
          return handleAsyncClick(result);
        }
        return result;
      }
    }
    async function handleAsyncClick(result: Promise<any>) {
      if (
        (await Promise.race([sleep(100, DELAY_SYMBOL), result])) ===
        DELAY_SYMBOL
      ) {
        spinningRef.value = true;
        return Promise.race([
          Promise.all([result, sleep(300)]),
          wait(),
        ]).finally(() => {
          spinningRef.value = false;
        });
      }
    }

    context.expose({
      next: wait.next,
    });
    function handleCancelConfirm() {
      wait.next();
      handles.cancelConfirm();
    }
    const attrStyle = useAttrsStyles();
    return () => {
      return h(BaseAction, {
        props: {
          ...$action.value,
          action: handleClick,
          buttonProps: $action.value.props,
          buttonStyle: attrStyle.styles(),
          buttonClass: attrStyle.classes(),
          buttonAttrs: attrStyle.attrs(),
          hidden: props.hidden,
          spinning: spinningRef.value,
        },
        on: {
          cancelConfirm: handleCancelConfirm,
          ...events(),
        },
      });
    };
  },
});
export interface Action extends InstanceType<typeof Action> {
  next(): void;
}
export default Action;

export const actionProps2Config = (
  props: ActionProps,
  listener?: Function,
): ICallableActionConfig => {
  const {
    handle,
    name,
    title,
    component,
    confirm,
    hidden,
    locale,
    ...buttonProps
  } = props;
  return {
    action: (handle ?? as<typeof handle>(listener))!,
    name: getActionName(name, name),
    type: getActionType(name, name),
    title,
    component,
    confirm,
    props: buttonProps,
    hidden,
  };
};
