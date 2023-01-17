import { AntPopconfirmProps } from "@yuyi919/antdv1-type-enhance";
import { OrCallback, Types } from "@yuyi919/shared-types";
import { IPopconfirmProps } from "ant-design-vue";
import { CreateElement } from "vue-demi";
import { Component, Prop } from "../helper";
import { ButtonProps } from "../shared";

@Component({})
export class ConfirmButtonProps extends AntPopconfirmProps {
  /**
   * `content`
   * 需要确认的文案或任何内容
   */
  @Prop(null)
  confirm?: any;

  /**
   * 同`getPopupContainer`
   */
  @Prop(Function)
  getContainer?: IPopconfirmProps["getPopupContainer"];

  /**
   * 加载中状态
   */
  @Prop([Boolean, Object])
  loading?: ButtonProps["loading"];

  /**
   * `content`和确认按钮同步展示加载中状态
   */
  @Prop(Boolean)
  contentSpinning?: boolean;

  /**
   * resolve成功后自动关闭
   */
  @Prop({ type: Boolean, default: true })
  closeOnSuccess?: boolean;
}

export enum InternalActionType {
  /** 内置取消请求按钮 */
  CANCEL$ = "cancel$",
  CUSTOM$ = "custom",
}

export type ActionType = InternalActionType | Types.DynamicString;
export type InternalInjectProps = ButtonProps &
  Pick<IActionConfig, "title" | "style" | "hidden" | "className">;

export interface IActionConfig<Action extends ActionType = ActionType> {
  type?: Action;
  name?: string;
  title?: OrCallback<string | object | any[], [loading: boolean]>;
  render?: (
    h: CreateElement,
    $emit: (name: string, ...args: any[]) => any,
    injectProps: InternalInjectProps,
  ) => JSX.Element;
  component?: any;
  props?: ButtonProps;
  hiddenProps?: ButtonProps;
  spinningProps?: ButtonProps;
  confirm?:
    | boolean
    | {
        title?: string | JSX.Element;
        props?: ConfirmButtonProps;
      };
  float?: "left" | "right";
  style?: any;
  className?: string | any[];
  hidden?: boolean;
  action?: (() => Promise<any> | void) | any[];
}
export interface ICallableActionConfig<Action extends ActionType = ActionType>
  extends Omit<IActionConfig<Action>, "action"> {
  action?: () => Promise<any> | void;
}
