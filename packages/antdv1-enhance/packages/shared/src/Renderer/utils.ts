import {
  isArr,
  isObj,
  isStr,
  KeyOf,
  Recordable,
  TKey,
} from "@yuyi919/shared-types";

export function mapToOptions<T extends Recordable, DataKey extends KeyOf<T>>(
  data: T[],
  keyK: DataKey,
): T[DataKey] extends TKey ? Option<T[DataKey], T[DataKey]>[] : never;
export function mapToOptions<
  T extends Recordable,
  DataKey extends KeyOf<T>,
  NameKey extends KeyOf<T>,
>(
  data: T[],
  keyK: DataKey,
  labelK: NameKey,
): T[DataKey] extends TKey ? Option<T[DataKey], T[NameKey]>[] : never;
export function mapToOptions(
  datas: any[],
  valueKey: any,
  nameKey: any = valueKey,
) {
  return datas.map((data) => {
    return {
      value: data[valueKey],
      key: data[valueKey],
      label: data[nameKey],
    };
  }) as any;
}
export function mapTupleToOptions<A extends TKey, B>(
  datas: [A, B][],
): Option<A, B>[] {
  return datas.map((data) => {
    return {
      value: data[0],
      key: data[0],
      label: data[1],
    };
  }) as any;
}

export function keysToOptions<T extends string>(data: T[]): Option<T, T>[] {
  return data.map((value) => ({ value, key: value, label: value }));
}

export function indexToOptions<T extends string>(
  data: T[],
  offset = 0,
): Option<string, T>[] {
  return data.map((label, value) => ({
    value: value + offset + "",
    key: value + offset + "",
    label,
  }));
}

export function recordToOptions(data: Record<string, string>): Option[] {
  return Object.entries(data).map(([value, label]) => ({
    value,
    key: value,
    label,
  }));
}

export type Option<Data extends TKey = TKey, Name = TKey> = {
  key: Data;
  label: Name;
  value: Data;
};

export type EnumData<Data extends TKey, Name = TKey> =
  | (string | Option<Data, Name>)[]
  | Map<Data, Name>
  | Record<Data, Name>;

export function withEnumArray<Data extends TKey, Name>(
  enumData: Option<Data, Name>[],
  value: Data,
): Data | NonNullable<Name> {
  return (
    getTargetOrSelf(
      enumData.find((data) => data.value == value),
      "label",
    ) ?? value
  );
}

export function withStringEnumArray<V extends TKey>(
  enumData: V[],
  value: V,
): number {
  return enumData.indexOf(value);
}

export function mapGet<K, V>(map: Map<K, V>, search: K): V | undefined {
  return map.get(search);
}

/**
 * 使用指定枚举数据进行翻译
 * @param value
 * @param enumData
 * @returns
 */
export function transformWith<Data extends TKey, Name = TKey>(
  value: Data,
  enumData: EnumData<Data, Name>,
): Data | Name | number | undefined {
  return isArr(enumData)
    ? isStr(enumData[0])
      ? withStringEnumArray(enumData as string[], value as string)
      : withEnumArray(enumData as Option<Data, Name>[], value)
    : enumData instanceof Map
    ? mapGet(enumData, value)
    : isObj(enumData)
    ? enumData[value]
    : value;
}

export function unsafe_transformWith<Data extends TKey, Name = TKey>(
  value: any,
  enumData: EnumData<Data, Name>,
): Data | Name | number {
  return transformWith(value, enumData);
}

export function getTargetOrSelf<T, K extends keyof T>(
  option: T | undefined,
  key: K,
): T[K] | undefined {
  return ((option as T)?.[key] ?? option) as any;
}

export function unsafe_getTargetOrSelf<T, K extends keyof T>(
  option: T | undefined,
  key: K,
): T[K] | T | undefined {
  return ((option as T)[key] ?? option) as any;
}
