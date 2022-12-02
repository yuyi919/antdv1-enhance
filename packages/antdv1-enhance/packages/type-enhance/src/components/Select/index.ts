/* eslint-disable no-redeclare */
import {
  ISelectEvents,
  ISelectProps,
  ISelectPublicMembers,
  ISelectScopedSlots,
  Select as AntSelect,
} from "ant-design-vue";
import { CSSProperties } from "vue/types/jsx";
import { getPropsClass, TypeTsxProps, VCProps } from "../../helper";
import "./Option";

declare module "ant-design-vue/types/ant-design-vue.d" {
  export interface ISelectProps
    extends VCProps<
      Omit<AntSelect, "blur" | "focus" | "dropdownStyle">,
      false
    > {
    dropdownStyle?: string | CSSProperties;
  }
  export interface ISelectEvents {
    change(value: any, option: any): void;
    /**
     * 失去焦点的时回调
     */
    blur: any;
    focus: any;
    search: undefined | string;
    dropdownVisibleChange: boolean;
    inputKeydown: KeyboardEvent;
    popupScroll: any;
    mouseenter: any;
    mouseleave: any;
    select(value: any, option: any): void;
    deselect(value: any, option: any): void;
  }
  export interface ISelectScopedSlots {}
  export interface ISelectPublicMembers
    extends Pick<AntSelect, "blur" | "focus"> {}
}
declare module "ant-design-vue/types/select/select.d" {
  interface Select extends ISelectPublicMembers {
    $props: TypeTsxProps<ISelectProps, ISelectEvents, ISelectScopedSlots>;
  }
}

export const AntSelectProps = getPropsClass<ISelectProps, "value">(AntSelect);

export * from "./OptGroup";
export * from "./Option";
export { AntSelect };
