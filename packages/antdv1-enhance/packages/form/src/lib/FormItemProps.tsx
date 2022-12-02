import {
  Component,
  extractUnsafeProps,
  Prop,
} from "@yuyi919/antdv1-plus-helper";
import { isNum } from "@yuyi919/antdv1-plus-shared";
import { autoSizer } from "@yuyi919/antdv1-plus-theme";
import { is, RequiredTo, Types } from "@yuyi919/shared-types";
import { Icon } from "ant-design-vue";
import { CSSProperties } from "vue/types/jsx";
import { LayoutItemProps } from "./Layout";

type Renderer = any;
function clone(target: any) {
  if (is.primitive(target)) {
    return target;
  }
  if (is.arr<any>(target)) {
    return [...target];
  }
  if (is.obj(target)) {
    return { ...target };
  }
  return { ...target };
}

@Component()
export class FormItemProps extends LayoutItemProps {
  @Prop(String)
  prefixCls?: string;
  /**
   * 展示标签
   */
  @Prop()
  label?: Renderer;
  /**
   * 问号提示
   */
  @Prop()
  tooltip?: Renderer;
  /**
   * 标签样式
   */
  @Prop(Object)
  labelStyle?: CSSProperties;
  /**
   * 组件容器样式
   */
  @Prop(Object)
  wrapperStyle?: CSSProperties;
  /**
   * 组件容器样式
   */
  @Prop()
  addonBefore?: Renderer;
  /**
   * 组件容器样式
   */
  @Prop()
  addonAfter?: Renderer;
  /**
   * 组件容器样式
   */
  @Prop()
  extra?: Renderer;
  /**
   * 组件容器样式
   */
  @Prop()
  feedbackText?: Renderer;
  /**
   * 组件容器样式
   */
  @Prop(String)
  feedbackStatus?:
    | "error"
    | "warning"
    | "success"
    | "pending"
    | Types.DynamicString;
  /**
   * 组件容器样式
   */
  @Prop()
  feedbackIcon?: Renderer;
  /**
   * 组件容器样式
   */
  @Prop(Boolean)
  asterisk?: boolean;
}
export default FormItemProps;

export const [FormItemPropConfig, useFormLayoutItemProps] = extractUnsafeProps(
  FormItemProps as typeof FormItemProps,
  (props) => {
    const {
      feedbackStatus,
      labelCol,
      wrapperCol,
      labelStyle: { ...labelStyle } = {},
      labelWidth,
      wrapperWidth,
      wrapperStyle: { ...wrapperStyle } = {},
    } = props;
    const feedbackIcon =
      props.feedbackIcon ??
      (feedbackStatus === "pending" ? (
        <Icon type="loading" theme="outlined" style={{ color: "#1890ff" }} />
      ) : (
        void 0
      ));

    // 是否启用了栅格
    const enableCol =
      props.enableCol !== false ? isNum(labelCol) || isNum(wrapperCol) : false;
    if (labelWidth) {
      labelStyle.width =
        labelWidth === "auto" ? undefined : autoSizer(labelWidth);
      labelStyle.maxWidth =
        labelWidth === "auto" ? undefined : autoSizer(labelWidth);
    }
    if (wrapperWidth) {
      wrapperStyle.width =
        wrapperWidth === "auto" ? undefined : autoSizer(wrapperWidth);
      wrapperStyle.maxWidth =
        wrapperWidth === "auto" ? undefined : autoSizer(wrapperWidth);
    }
    return {
      ...props,
      feedbackIcon,
      wrapperStyle,
      labelStyle,
      enableCol,
    } as RequiredTo<
      FormItemProps,
      "feedbackIcon" | "wrapperStyle" | "enableCol" | "labelStyle"
    >;
  },
);
