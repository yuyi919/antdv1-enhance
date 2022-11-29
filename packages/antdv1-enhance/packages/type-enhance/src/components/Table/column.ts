/* eslint-disable no-redeclare */
import { Table as AntTable } from "ant-design-vue";
import type {
  Column as AntColumn,
  SortOrder,
} from "ant-design-vue/types/table/column";
import { VCProps, VueComponent2 } from "../../helper";

export interface IColumnProps<T = any>
  extends Pick<
    VCProps<AntColumn>,
    Exclude<keyof VCProps<AntColumn>, "customRender">
  > {
  customRender?: (value?: any, row?: T, index?: number) => any;
  sorter?: boolean | ((a: T, b: T, type?: SortOrder) => number);
  scopedSlots?: {
    customRender?: string;
  };
}

export const Column = AntTable.Column as unknown as VueComponent2<
  IColumnProps,
  {},
  {},
  {},
  typeof AntTable.Column
>;
export interface Column extends InstanceType<typeof Column> {}

export { AntColumn };
