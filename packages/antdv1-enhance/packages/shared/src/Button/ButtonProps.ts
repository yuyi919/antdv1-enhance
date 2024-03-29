/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-interface */

import { Component, getPropsClass, Prop } from "@yuyi919/antdv1-plus-helper";
import { Types } from "@yuyi919/shared-types";
import { Button, IButtonProps } from "ant-design-vue";

@Component({})
export class ButtonProps extends getPropsClass(Button, {}, "type") {
  /**
   * 自定义按钮颜色
   */
  @Prop({ type: String })
  color?: string;

  /**
   * 仅适用link-button；字体颜色继承上级元素，停用下划线
   **/
  @Prop({ type: Boolean })
  colorInherit?: boolean;

  /**
   * 隐藏自己
   */
  @Prop(Boolean)
  hidden?: boolean;

  /**
   * 提示信息
   */
  @Prop({ type: String })
  hint?: string;

  /**
   * 提示信息标题
   */
  @Prop({ type: String })
  hintTitle?: string;

  /**
   * 在ant button基础上新增第二主色
   * @default 'default'
   **/
  @Prop({ type: String, default: "default" })
  type?: IButtonProps["type"] | "second" | "link" | Types.DynamicString; //  (string & {});
}

export default ButtonProps;
