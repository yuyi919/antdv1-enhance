/* eslint-disable no-redeclare */
import {
  ISelectOptionGroupEvents,
  ISelectOptionGroupProps,
  ISelectOptionGroupPublicMembers,
  ISelectOptionGroupScopedSlots,
} from "ant-design-vue";
import type { OptionGroup as AntSelectOptionGroup } from "ant-design-vue/types/select/option-group";
import { TypeTsxProps, VCProps } from "../../helper";

declare module "ant-design-vue/types/ant-design-vue.d" {
  export interface ISelectOptionGroupProps
    extends VCProps<AntSelectOptionGroup, false> {}
  export interface ISelectOptionGroupEvents {
    change: any;
  }
  export interface ISelectOptionGroupScopedSlots {}
  export interface ISelectOptionGroupPublicMembers {}
}
declare module "ant-design-vue/types/select/option-group.d" {
  export interface OptionGroup extends ISelectOptionGroupPublicMembers {
    $props: TypeTsxProps<
      ISelectOptionGroupProps,
      ISelectOptionGroupEvents,
      ISelectOptionGroupScopedSlots
    >;
  }
}
// declare module "ant-design-vue/types/select/select.d" {
//   export module Select {
//     //@ts-ignore
//     export const OptGroup: VueComponent2<ISelectOptionGroupProps>;
//   }
// }
export type { AntSelectOptionGroup };
