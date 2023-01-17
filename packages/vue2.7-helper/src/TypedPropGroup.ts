import Types from "@yuyi919/shared-types";
import { PropType } from "vue-demi";

export type TypedPropGroup<T, D extends Partial<T> = {}> = {
  [K in keyof T]-?: {} extends Pick<T, K>
    ? Record<K, unknown> extends Pick<D, K>
      ? {
          type: PropType<ExcludeUndefined<T, K>>;
          required: false;
        }
      : {
          type: PropType<ExcludeUndefined<T, K>>;
          default: ExtractDefault<K, T, D>;
          required: false;
        }
    : IsDefaultKey<
        K,
        D,
        Record<K, unknown> extends Pick<D, K>
          ? {
              type: PropType<ExcludeUndefined<T, K>>;
              required: false;
            }
          : {
              type: PropType<ExcludeUndefined<T, K>>;
              default: ExtractDefault<K, T, D>;
              required: false;
            },
        {
          type: PropType<T[K]>;
          required: true;
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

// TODO
type ExcludeUndefined<T, K extends keyof T> = Exclude<T[K], undefined>;

// const comp = defineComponent({
//   props: {
//     test: {
//       type: Boolean,
//       default: true
//     }
//   },
//   setup(props) {
//     props.test
//   }
// })
// type Comp = InstanceType<typeof comp>['$props']
// {
//   [K in keyof T]-?: {
//     type: PropType<T[K]>;
//     required: T extends { [key in K]-?: T[K] } ? true : false;
//     default?: D[K];
//     validator?: any;
//   };
// };
// type A = TypedPropGroup<{ a?: boolean }>;
// type A1 = TypedPropGroup<{ a: boolean }>;
// type A2 = TypedPropGroup<{ a: boolean }, { a: true }>;
// type A3 = TypedPropGroup<{ a: boolean }, { a?: true }>;
// type p2 = ExtractDefaultPropTypes<A2>;
// type a2 = ExtractPropTypes<{
//   p: {
//     type: PropType<number>;
//     default: 1;
//   };
// }>;
type p = ExtractDefault<"a", { a?: boolean }, Types.Recordable>;
type b = import("vue").ExtractPropTypes<{
  a: {
    type: PropType<boolean>;
  };
}>;

export type TypedPropsMap<T extends Types.Recordable> = {
  [K in keyof T]-?: {} extends Pick<T, K>
    ? {
        type: PropType<Exclude<T[K], undefined>>;
        required: false;
        default: Exclude<T[K], undefined>;
      }
    : {
        type: PropType<Exclude<T[K], undefined>>;
        required: true;
      };
};
