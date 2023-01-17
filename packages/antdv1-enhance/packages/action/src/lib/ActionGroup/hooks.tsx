import { isBool, isFn, isNum, isThenable, Types } from "@yuyi919/shared-types";
import { sleep } from "@yuyi919/shared-utils";
import { castArray, defaults, delay, isObject, merge } from "lodash";
import { h, SetupContext, watch } from "vue-demi";
import { HookFactory, useHookFactory } from "../../helper";
import { IButtonProps, utils } from "../../shared";
import { getListenerHandle } from "../../use";
import { extractFn } from "../../utils";
import { BaseAction } from "../Action/BaseAction";
import {
  DELAY_SYMBOL,
  getActionName,
  getActionTitle,
  getActionType,
  isInternalActionType,
} from "../Action/component";
import { injectLocale } from "../context";
import { ILocale } from "../ILocale";
import { convertArrayProps } from "./castProps";
import {
  IActionConfig,
  ICallableActionConfig,
  InternalActionType,
  InternalInjectProps,
} from "./interface";
import { ActionGroupProps } from "./Props";

const { useActionSpinning, useCodeFilter } = utils;

type InnerActionConfig<T extends InternalActionType = InternalActionType> =
  Types.RequiredTo<
    ICallableActionConfig<T>,
    "type" | "name" | "component" | "render"
  >;

// export type A = keyof AntProps<InstanceType<typeof actionNameListFilter>>;
// Mixins(
//   ActionNameListFilter,
//   CommonSpinningMixin,
//   ActionGroupProps
// )

/**
 * 封装过的操作按钮栏，包含异步操作等待时隐藏其它按钮、展示loading等实用功能
 * @displayName OperationBar
 */
export class ActionGroupHooks extends HookFactory<ActionGroupProps> {
  constructor(
    context: SetupContext,
    props: ActionGroupProps,
    public $actionSpinning: utils.ActionSpinningHook,
    private injectedLocale?: ILocale,
  ) {
    super(context, props);
    this.$actionSpinning.spinningWhiteList = [InternalActionType.CANCEL$];
    this.$filter = useCodeFilter(
      () => this.actionNameList,
      () => props.display,
      () => props.hidden,
    )[1];
    watch(
      () => this.$actionSpinning.actionSpinning,
      (spinning) => this.onActionSpinningChange(spinning),
    );
    // console.log(this.props.spinning);
    watch(
      () => this.props.spinning,
      (spinning) =>
        isBool(spinning) && this.$actionSpinning.setSpinning(spinning),
      { immediate: true },
    );
  }

  private $filter: utils.CodeFilter<string>;

  get locale() {
    return this.injectedLocale || this.props.locale;
  }

  get actionList() {
    const list = convertArrayProps(
      this.props.actions,
      (value, key) => {
        return this.getActionBase(
          key && value
            ? {
                title: value,
                name: key,
              }
            : value,
        );
      },
      1,
    ) as InnerActionConfig[];
    return this.props.reverse ? list.reverse() : list;
  }

  get localPrimaryConfig() {
    return castArray(this.props.primary);
  }

  get actionNameList(): string[] {
    return this.actionList.map((a) => a.name);
  }

  public getComponent(action: IActionConfig<any>) {
    return action.component || this.props.component;
  }

  public getRender(action: InnerActionConfig): IActionConfig["render"] {
    return (
      action.render ||
      (action.component
        ? (h, $emit, injectProps) => {
            const { component: Button, props } = action;
            const style = injectProps.style
              ? defaults(injectProps.style, action.style)
              : action.style;
            const buttonProps: IButtonProps = merge(
              {},
              this.props.defaultProps,
              props,
              injectProps,
              this.props.disabled ? { disabled: true } : {},
            );
            // console.log(action.name, buttonProps, action);
            return (
              <BaseAction
                key={action.name}
                props={action}
                action={this.getActionEvent(action)!}
                component={Button}
                spinning={!!injectProps.loading}
                flex={this.props.flex}
                hidden={!!injectProps.hidden}
                buttonProps={buttonProps}
                buttonClass={injectProps.className}
                buttonStyle={{
                  ...style,
                  ...(action.float
                    ? {
                        float: action.float,
                      }
                    : {}),
                }}
              />
            );
          }
        : ((() => false) as any))
    );
  }

  public getActionEvent(action: InnerActionConfig<InternalActionType>) {
    const { name } = action;
    if (isFn(action.action)) {
      // 事件句柄直接返回
      return () => {
        const result = extractFn(action.action)!();
        if (isThenable(result)) {
          return (async () => {
            if (
              (await Promise.race([sleep(100, DELAY_SYMBOL), result])) ===
              DELAY_SYMBOL
            ) {
              this.$actionSpinning.spinningStart(name);
              return Promise.race([
                Promise.all([result, sleep(300)]),
                this.waitingCancel(),
              ]).finally(() => {
                this.$actionSpinning.spinningEnd(name);
              });
            }
          })();
        }
      };
    }
    // 事件传递，传递name对应的事件，并将action作为参数
    return async () =>
      this.handleEmitAction(action as InnerActionConfig<InternalActionType>);
  }

  /**
   * 传递action事件
   */
  public handleEmitAction({
    name,
    action,
  }: InnerActionConfig<InternalActionType>) {
    console.error("call", name);
    // const handler = this.$listeners[name] as any
    const args = castArray(action);
    this._handleEmitOneAction(name, args);
    this._handleEmitAllAction(name, args);
  }

  private _handleEmitOneAction(name: string, args: any[]) {
    /**
     * 当action不为函数，点击按钮时传递[<(Action.)name>]事件
     * @event <Action.name>
     * @param {...any[]} args config中的action（数组的情况会展开）
     */
    this.$emit(name, ...args);
  }

  private _handleEmitAllAction(name: string, args: any[]) {
    /**
     * 集中处理的action事件
     * @event action
     * @param {string} name action名
     * @param {...any[]} args 参照[<Action.name>]
     */
    this.$emit("action", name, ...args);
  }

  public getActionHandler(
    config: IActionConfig<InternalActionType>,
  ): undefined | (() => void | Promise<any>) {
    const { action, type = config.name } = config;
    const { defaultActionHandler } = this.props;
    return isFn(action)
      ? action
      : (
          defaultActionHandler?.[type as Types.DynamicString] ||
          (type !== InternalActionType.CANCEL$
            ? getListenerHandle(this.$instance, type!)
            : undefined)
        )?.bind(this, ...castArray(action));
  }

  private getActionBase(
    config: string,
  ): InnerActionConfig<InternalActionType> | undefined;
  private getActionBase(
    config: IActionConfig<InternalActionType>,
  ): InnerActionConfig<InternalActionType> | undefined;
  private getActionBase(
    config: string | IActionConfig<InternalActionType>,
  ): InnerActionConfig | undefined {
    let action: InnerActionConfig | undefined;
    if (typeof config === "string") {
      action = {
        type: isInternalActionType(config)
          ? config
          : InternalActionType.CUSTOM$,
        name: config,
        component: this.props.component,
      } as InnerActionConfig;
    } else if (isObject(config)) {
      const { name, type } = config;
      const actionHandler = this.getActionHandler(config); // action是否配置为函数
      action = {
        ...config,
        action: actionHandler,
        name: getActionName(name, type),
        type: getActionType(type, name),
        component: this.getComponent(config),
      } as InnerActionConfig;
    }
    if (action!) {
      action.render = this.getRender(action)!;
    }
    return action!;
  }

  emitEvent(event: string, arg: any, ...args: any[]) {
    return this.$emit(event, arg, ...args);
  }

  get localDisplayActionList() {
    return this.actionList.filter((action) =>
      this.$filter.filtered.includes(action.name!),
    );
  }

  /** 取得按钮展示的类型Prop */
  getButtonType(action: InnerActionConfig) {
    const nativeType = action.props?.type;
    return (
      nativeType ||
      (this.$actionSpinning.isActionSpinning(action.name) &&
        (this.props.defaultSpinningProps?.type ||
          this.props.defaultProps?.type ||
          "primary")) ||
      this.props.defaultProps?.type ||
      ((this.localPrimaryConfig.includes(action.name) ||
        this.localPrimaryConfig.includes(action.type)) &&
        "primary") ||
      undefined
    );
  }

  get actionCancelBtn() {
    return (
      (this.props.allowCancel &&
        this.getActionBase({
          type: InternalActionType.CANCEL$,
          name: InternalActionType.CANCEL$,
        })) ||
      false
    );
  }

  showActionCancel = false;

  protected __cancelConfirmDelay!: number;
  protected __cancelPromise!: Promise<any> | null;

  waitingCancel() {
    if (!this.__cancelPromise) {
      this.__cancelPromise = new Promise<void>((resolve) => {
        // console.log('waitingCancel')
        this.$once(InternalActionType.CANCEL$, () => {
          // console.log('waitingCancel')
          resolve();
          this.__cancelPromise = null;
        });
      });
    }
    return this.__cancelPromise;
  }

  // @Watch("actionSpinning")
  onActionSpinningChange(spinning: boolean) {
    clearTimeout(this.__cancelConfirmDelay);
    this.__cancelConfirmDelay = delay(
      (allow: boolean) => {
        this.showActionCancel = allow;
      },
      spinning ? [this.props.allowCancel].find(isNum) || 1000 : 0,
      spinning,
    );
  }

  setupActionProps<T extends InternalActionType>(
    config: InnerActionConfig<T>,
  ): InternalInjectProps {
    if (this.isCommonAction<T>(config)) {
      return { type: this.getButtonType(config) };
    } else if (this.$actionSpinning.isActionSpinning(config.name)) {
      // console.error('display', a.title, this.isSpinning, cloneDeep(this.spinningActionMap))
      return {
        loading: true,
        type: this.getButtonType(config),
        ghost:
          !config.props ||
          config.props.ghost ||
          config.props.type !== "primary",
        title: getActionTitle(config, true, this.locale)!,
        ...this.props.defaultSpinningProps,
        ...config.spinningProps,
      };
    } else {
      // console.error('hidden', a.title, this.isSpinning, cloneDeep(this.spinningActionMap))
      return {
        ...this.props.hiddenProps,
        ...config.hiddenProps,
        ...this.props.defaultProps,
        ...config.props,
      };
    }
  }

  private isCommonAction<T extends InternalActionType>(
    config: Types.RequiredTo<
      IActionConfig<T>,
      "type" | "name" | "component" | "render"
    >,
  ) {
    return (
      (!this.$actionSpinning.actionSpinning &&
        config.type !== InternalActionType.CANCEL$) ||
      (this.showActionCancel &&
        this.$actionSpinning.actionSpinning &&
        config.type === InternalActionType.CANCEL$)
    );
  }

  get renderer() {
    let actionList = this.localDisplayActionList;
    const r: any[] = [];
    if (this.actionCancelBtn) {
      actionList = [...actionList];
      actionList[
        this.props.align === "left" && !this.props.flex ? "push" : "unshift"
      ](this.actionCancelBtn);
    }
    // console.error(actionList);
    // console.error(this.isSpinning, cloneDeep(this.spinningActionMap), this.actionCancelBtn)
    for (const action of actionList) {
      r[r.length] =
        // (this.isOtherAction(action) || this.$actionSpinning.isActionSpinning(action.name)) &&
        action.render(h, this.emitEvent, this.setupActionProps(action));
    }
    return r;
  }

  getSpinningContentSlot(name: string) {
    return (
      this.$slots[name]?.length && (
        <a-spin spinning={this.$actionSpinning.isSpinning}>
          {
            /** @slot Use this slot to have a header */
            this.$slots[name]
          }
        </a-spin>
      )
    );
  }
}

export function useActionGroup(context: SetupContext, props: ActionGroupProps) {
  return useHookFactory(
    ActionGroupHooks,
    context,
    props,
    useActionSpinning(props, context),
    injectLocale(undefined),
  );
}
