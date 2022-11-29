import { KeyOf, Types, ValueOf } from "@yuyi919/shared-types";

export type TsxOnEvents<On> = {
  [K in ToOnEventName<KeyOf<On>>]?: KeyOf<On> extends string
    ? On[Extract<
        ToOnEventNameMap<On>,
        { SourceKey: any; OnName: K }
      >["SourceKey"]]
    : never;
};
type ToOnEventName<K extends string> = `on${Types.String.CamelCase<
  K,
  "-" | ":",
  8
>}`;
type ToOnEventNameMap<T> = ValueOf<{
  [K in KeyOf<T>]: {
    SourceKey: K;
    OnName: ToOnEventName<K>;
  };
}>;
