import {
  ActionGroupProps,
  ActionType,
  ICallableActionConfig,
} from "@yuyi919/antdv1-plus-action";
import { Component, Prop, PropsMixins } from "@yuyi919/antdv1-plus-helper";
import { ButtonProps } from "@yuyi919/antdv1-plus-shared";
import {} from "@yuyi919/antdv1-type-enhance";
import { Types } from "@yuyi919/shared-types";
import { IColProps } from "ant-design-vue";
import { NormalizeModalProps } from "./NormalizeModalProps";
import { ClassesProps } from "./styles";

@Component({})
export class ModalProps extends PropsMixins(NormalizeModalProps, ClassesProps) {
  static defaultGridProp = {
    xl: 16,
    lg: 19,
    md: 20,
  };

  @Prop()
  okText?: any;

  @Prop()
  cancelText?: any;

  @Prop({ type: String, default: "primary" })
  okType?: ButtonProps["type"] | Types.DynamicString;

  @Prop({ type: Object, default: () => ModalProps.defaultGridProp })
  gridProps?: IColProps;

  /**
   * @type IActionConfig<ActionType.提交, "handler">
   */
  @Prop({ type: Object })
  okButtonProps?: ICallableActionConfig<ActionType.提交>;

  /**
   * @type IActionConfig<ActionType.取消, "handler">
   */
  @Prop({ type: Object })
  cancelButtonProps?: ICallableActionConfig<ActionType.取消>;

  /**
   * 启用footer配置
   */
  @Prop({ type: Object })
  actionProps?: Omit<ActionGroupProps, "actions"> & {
    /**
     * @override
     * 若为true，则无视placement带来的reserve默认属性
     */
    flex?: boolean;
  };

  /**
   * 单独配置footer.actions
   * 启用时，[okButtonProps/cancelButtonProps/okText/cancelText/okType]将会失效
   */
  @Prop({ type: null })
  actions?: ActionGroupProps["actions"];

  /**
   * 模态框加载中状态
   * @default false
   */
  @Prop({ type: Boolean, default: false })
  loading?: boolean;
}

export { ModalProps as IModalProps };
