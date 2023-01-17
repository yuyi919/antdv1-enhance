import { Component, Prop, PropsMixins, VueComponent2 } from "../../helper";
import { Button, ButtonProps } from "../../shared";
import { ILocale } from "../ILocale";
import { ConfirmButtonProps } from "../interface";

@Component({})
export class ActionProps extends PropsMixins(ButtonProps) {
  /**
   * 显式指定展示的action
   */
  @Prop({ type: String })
  public name?: string;

  /**
   * 显式指定按钮文案
   */
  @Prop({ type: String })
  public title?: string;

  /**
   * action具体内容，可以是函数，或传入事件的响应
   */
  @Prop({ type: [Function] })
  public handle?: () => void | Promise<any>;

  /**
   * 指定默认使用的按钮组件
   * @default Button
   */
  @Prop({ type: null, default: () => Button })
  public component?: VueComponent2<ButtonProps>;

  /**
   * 是否需要确认？可传入配置对象
   */
  @Prop({ type: [Boolean, Object] })
  public confirm?:
    | boolean
    | {
        title?: string | JSX.Element;
        props?: ConfirmButtonProps;
      };

  /**
   * 隐藏按钮
   */
  @Prop({ type: Boolean })
  public hidden?: boolean;

  /**
   * 按钮文案Record
   * @examples
   * ```ts
   * {
   *   ok: "确认",
   *   cancel: "取消",
   *   submit: "提交"
   * }
   * ```
   */
  @Prop({
    type: Object,
  })
  public locale?: ILocale;
}

// console.log(AutoOperationBarProps)

export default ActionProps;
