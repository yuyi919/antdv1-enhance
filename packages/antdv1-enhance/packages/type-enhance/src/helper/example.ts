import { ExcludeVueTypes } from "./ExcludeVueTypes";
import { VueComponent2 } from "./helper";

type P = VueComponent2<
  { a?: number },
  {
    input1: 1;
    input2: 2;
  },
  { slot1: string },
  { handle(): void }
>;
export type pe = InstanceType<P>["$emit"];
export type pp = InstanceType<P>["$props"];
export type ps = InstanceType<P>["$scopedSlots"];

export type pins = {
  [K in keyof ExcludeVueTypes<InstanceType<P>>]: InstanceType<P>[K];
};
// type pp2 = P['props']['a']
// export const App = {} as P;

export const App = {} as P;
