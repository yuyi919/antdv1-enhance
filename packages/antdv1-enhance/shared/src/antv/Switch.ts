/* eslint-disable no-redeclare */
// @ts-nocheck
import { Switch as AntSwitch } from "ant-design-vue";
import { VCProps, VueComponent2 } from "@yuyi919/antdv1-plus-helper";

export interface ISwitchProps extends VCProps<AntSwitch, false> {}
export interface ISwitchEvents {
  change: boolean;
}
export interface ISwitchScopedSlots {}
export interface ISwitchPublicMembers {}

export const Switch = AntSwitch as unknown as VueComponent2<
  ISwitchProps,
  ISwitchEvents,
  ISwitchScopedSlots,
  ISwitchPublicMembers,
  typeof AntSwitch
>;
export interface Switch extends InstanceType<typeof Switch> {}

export { AntSwitch };
