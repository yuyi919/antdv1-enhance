import { defineComponent, ExtractPropTypes } from "vue";
import { ExcludeVueTypes } from "./ExcludeVueTypes";
import { TypedPropGroup, VueComponent2 } from "./helper";
import { TypedPropsMap } from "./TypedPropGroup";

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

type props = TypedPropGroup<
  {
    value: boolean;
  },
  { value: true }
>;
type extracted = ExtractPropTypes<props>;
export const App2: VueComponent2<{ value?: boolean }> = defineComponent({
  props: {
    // value: {
    //   type: String,
    //   default: "",
    // },
  } as props,
});

type P2 = TypedPropsMap<{ value?: boolean }>;
type props2 = InstanceType<typeof App>['$props']
