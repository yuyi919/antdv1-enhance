import type { Types } from "@yuyi919/shared-types";

type Required<T, K extends keyof T> = {
  [Key in Exclude<keyof T, K extends false | undefined ? never : K>]+?: T[Key];
} & {
  [Key in keyof Pick<T, K extends false | undefined ? never : K>]-?: T[Key];
};

export type AutoRequired<
  T,
  K extends keyof T | false | undefined = undefined,
> = K extends undefined
  ? T
  : K extends keyof T
  ? Types.Type<Required<T, K>>
  : K extends false
  ? Partial<T>
  : T;

/**
 * Vue组件内部使用的固定的属性名称
 */
export type VueInstanceKeys = keyof Vue | "_tsx" | "style";
/**
 * 工具类型
 * 排除掉Vue组件内部使用的固定的属性名称，输出剩下的类型
 */
export type ExcludeVueTypes<T> = Omit<T, VueInstanceKeys>;
/**
 * 截取Prop用类型
 * 第二个Type传入需要为required的Key,不传为保留原类型,传递false时全部指定不为required
 */
export type VCProps<
  T,
  RequiredKey extends keyof ExcludeVueTypes<T> | false | undefined = undefined,
> = AutoRequired<ExcludeVueTypes<T>, RequiredKey>;
