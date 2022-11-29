import Types from "@yuyi919/shared-types";
import { PropType } from "vue";

export type TypedPropGroup<T extends Types.Recordable, D extends Partial<T> = Types.Recordable> = {
  [K in keyof T]-?: Types.Recordable extends Pick<T, K>
    ? {
        type: PropType<ExcludeUndefined<T, K>>;
        default: ExtractDefault<K, T, D>;
        required: false;
      }
    : IsDefaultKey<
        K,
        D,
        {
          type: PropType<ExcludeUndefined<T, K>>;
          default: ExtractDefault<K, T, D>;
          required: false;
        },
        {
          type: PropType<T[K]>;
          required: true;
          default?: undefined;
        }
      >;
};
type IsDefaultKey<K, D extends Required<any>, TRUE, FALSE> = K extends keyof D
  ? Types.Recordable extends Pick<D, K>
    ? FALSE
    : TRUE
  : FALSE;
type ExtractDefaultKey<K, D extends Required<any>> = K extends keyof D
  ? D[K]
  : undefined;
type ExtractDefault<K, T, D extends Partial<T>> = K extends keyof T
  ? Record<K, unknown> extends Pick<D, K>
    ? Required<T>[K] extends boolean
      ? false
      : ExtractDefaultKey<K, D>
    : ExtractDefaultKey<K, D>
  : undefined;
type ExcludeUndefined<T, K extends keyof T> = Exclude<T[K], undefined>;
// {
//   [K in keyof T]-?: {
//     type: PropType<T[K]>;
//     required: T extends { [key in K]-?: T[K] } ? true : false;
//     default?: D[K];
//     validator?: any;
//   };
// };
// type A = TypedPropGroup<{ a?: boolean; }>;
// type A1 = TypedPropGroup<{ a: boolean; }>;
// type A2 = TypedPropGroup<{ a: boolean; }, { a: true; }>;
// type A3 = TypedPropGroup<{ a: boolean; }, { a?: true; }>;
// type p = ExtractDefault<"a", { a?: boolean; }, Types.Recordable>;
// type b = import("vue").ExtractPropTypes<{
//   a: {
//     type: PropType<boolean>;
//   };
// }>;
