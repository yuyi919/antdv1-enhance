/* eslint-disable no-redeclare */
import {
  ITreeSelectEvents,
  ITreeSelectProps,
  ITreeSelectPublicMembers,
  TreeSelect,
} from "ant-design-vue";
import { TypeTsxProps, VCProps } from "../../helper";
import { ITreeEvents, ITreeScopedSlots } from "../Tree";

declare module "ant-design-vue/types/ant-design-vue.d" {
  export interface ITreeSelectProps
    extends Omit<VCProps<TreeSelect, false>, "blur" | "focus"> {}
  export interface ITreeSelectEvents extends ITreeEvents {}
  export interface ITreeSelectScopedSlots extends ITreeScopedSlots {}
  export interface ITreeSelectPublicMembers {}
}

declare module "ant-design-vue/types/tree-select.d" {
  interface TreeSelect extends ITreeSelectPublicMembers {
    $props: TypeTsxProps<ITreeSelectProps, ITreeSelectEvents>;
  }
}

export { TreeSelect };
