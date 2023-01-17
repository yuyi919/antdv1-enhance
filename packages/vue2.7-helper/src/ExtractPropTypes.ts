import { IfAny } from "vue/types/common";
import { Prop } from "vue/types/v3-component-props";

export type ExtractPropTypes<O> = {
  [K in keyof Pick<O, RequiredKeys<O>>]: Exclude<
    InferPropType<O[K]>,
    undefined
  >;
} & {
  [K in keyof Pick<O, OptionalKeys<O>>]?: Exclude<
    InferPropType<O[K]>,
    undefined
  >;
};
type RequiredKeys<T> = {
  [K in keyof T]: T[K] extends { required: true } ? K : never;
}[keyof T];

type OptionalKeys<T> = Exclude<keyof T, RequiredKeys<T>>;

type InferPropType<T> = [T] extends [null]
  ? any // null & true would fail to infer
  : [T] extends [{ type: null | true }]
  ? any // As TS issue https://github.com/Microsoft/TypeScript/issues/14829 // somehow `ObjectConstructor` when inferred from { (): T } becomes `any` // `BooleanConstructor` when inferred from PropConstructor(with PropMethod) becomes `Boolean`
  : [T] extends [ObjectConstructor | { type: ObjectConstructor }]
  ? Record<string, any>
  : [T] extends [BooleanConstructor | { type: BooleanConstructor }]
  ? boolean
  : [T] extends [DateConstructor | { type: DateConstructor }]
  ? Date
  : [T] extends [(infer U)[] | { type: (infer U)[] }]
  ? U extends DateConstructor
    ? Date | InferPropType<U>
    : InferPropType<U>
  : [T] extends [Prop<infer V, infer D>]
  ? unknown extends V
    ? IfAny<V, V, D>
    : V
  : T;
