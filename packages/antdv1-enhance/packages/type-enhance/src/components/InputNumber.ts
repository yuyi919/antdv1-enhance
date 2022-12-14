/* eslint-disable no-redeclare */
import { InputNumber as AntInputNumber } from "ant-design-vue";
import { getPropsClass, VCProps, VueComponent2 } from "../helper";

export interface IInputNumberProps extends VCProps<AntInputNumber, false> {}
export interface IInputNumberEvents {
  click: MouseEvent;
}
export interface IInputNumberScopedSlots {}
export interface IInputNumberPublicMembers {}

export const InputNumber = AntInputNumber as unknown as VueComponent2<
  IInputNumberProps,
  IInputNumberEvents,
  IInputNumberScopedSlots,
  IInputNumberPublicMembers,
  typeof AntInputNumber
>;

export interface InputNumber extends InstanceType<typeof InputNumber> {}

export { AntInputNumber };

export const AntInputNumberProps = getPropsClass(AntInputNumber, {
  defaultValue: void 0,
});
