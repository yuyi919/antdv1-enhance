/* eslint-disable no-redeclare */
import {
  IPasswordEvents,
  IPasswordProps,
  IPasswordPublicMembers,
} from "ant-design-vue";
import type { Password as AntPassword } from "ant-design-vue/types/input/password";
import { TypeTsxProps, VCProps } from "../../helper";

declare module "ant-design-vue/types/ant-design-vue.d" {
  export interface IPasswordProps extends VCProps<AntPassword, false> {}
  export interface IPasswordEvents {}
  export interface IPasswordScopedSlots {}
  export interface IPasswordPublicMembers {}
}
declare module "ant-design-vue/types/input/password.d" {
  interface Password extends IPasswordPublicMembers {
    $props: TypeTsxProps<IPasswordProps, IPasswordEvents>;
  }
}

export { AntPassword };
