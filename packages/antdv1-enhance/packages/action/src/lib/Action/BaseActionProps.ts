import { IButtonEvents } from "ant-design-vue";
import { CSSProperties } from "vue/types/jsx";
import { Component, Prop, VueComponent2 } from "../../helper";
import { ButtonProps } from "../../shared";
import { ILocale } from "../ILocale";
import { ConfirmButtonProps } from "../interface";

@Component({})
export class BaseActionProps {
  /**
   * ActionType
   */
  @Prop({ type: String })
  public type?: string;

  /**
   * 等待中标志
   */
  @Prop(Boolean)
  public spinning?: boolean;

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
  public action?: () => void | Promise<any>;

  /**
   * 指定默认使用的按钮组件
   * @default Button
   */
  @Prop(Object)
  public component!: VueComponent2<ButtonProps, IButtonEvents>;

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
  @Prop(Boolean)
  public hidden?: boolean;

  /**
   * 采用flex布局
   */
  @Prop(Boolean)
  public flex?: boolean;

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

  /**
   * 指定默认按钮组件的默认props
   * @default {}
   */
  @Prop(Object)
  public buttonProps?: ButtonProps;

  @Prop(Object)
  public buttonAttrs?: any;

  @Prop(null)
  public buttonStyle?: CSSProperties;

  @Prop(null)
  public buttonClass?: any;
}
