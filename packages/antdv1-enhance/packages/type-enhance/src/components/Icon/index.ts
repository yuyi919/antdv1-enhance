import {
  Icon,
  IIconEvents,
  IIconProps,
  IIconPublicMembers,
} from "ant-design-vue";
import { getPropsClass, TypeTsxProps, VCProps } from "../../helper";

declare module "ant-design-vue/types/ant-design-vue.d" {
  export interface IIconProps extends VCProps<Icon, false> {}
  export interface IIconEvents {}
  export interface IIconScopedSlots {}
  export interface IIconPublicMembers {}
}

declare module "ant-design-vue/types/icon.d" {
  export interface Icon extends IIconPublicMembers {
    $props: TypeTsxProps<IIconProps, IIconEvents>;
  }
}

export const AntIconProps = getPropsClass(Icon);
