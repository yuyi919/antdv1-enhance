import { Component, Prop } from "@yuyi919/antdv1-plus-helper";
import { AntPopoverProps } from "@yuyi919/antdv1-type-enhance";
import { ThemedIcon } from "../Icon";

@Component({})
export class HintFlagProps extends AntPopoverProps {
  /**
   * 展示提示标签的标题
   */
  @Prop({ type: String, default: "提示" })
  public title?: string;

  /**
   * 禁用展示
   */
  @Prop({ type: Boolean, default: false })
  public disabled?: boolean;

  /**
   * 提示文本
   */
  @Prop({ type: String, default: null })
  public hint?: string;

  // @Prop({ type: String, default: "hover" })
  // public trigger?: "hover" | "focus" | "click" | "contextmenu";
  // onMounted() {
  //   this.trigger
  // }

  // /**
  //  * 使用滚动
  //  */
  // @Prop({ type: Boolean, default: false })
  // public useRoll?: boolean;

  /**
   * 兼容用
   * @deprecated
   */
  @Prop({})
  public item?: { hint: string };

  /**
   * 提示图标
   */
  @Prop({
    type: Function,
    default() {
      return <ThemedIcon type="question-circle-o" />;
    },
  })
  public icon?: () => any;

  /**
   * 展示为按钮
   */
  @Prop({ type: Boolean, default: false })
  public button?: boolean;
}
