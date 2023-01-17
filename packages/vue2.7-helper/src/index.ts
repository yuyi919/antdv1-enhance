export * from "./ExcludeVueTypes";
export * from "./ExtractPropTypes";
export * from "./helper";
export * from "./TsxOnEvents";
export * from "./TypedPropGroup";

export type ResolveSubModule<
  T extends new () => any,
  K extends keyof T,
> = T[K] extends new () => infer Cls ? Cls : never;
