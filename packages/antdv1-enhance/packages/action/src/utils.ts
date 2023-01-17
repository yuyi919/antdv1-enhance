import { isFn, isObj, Types } from "@yuyi919/shared-types";

export function extractRecord<T>(
  target: T,
): T extends undefined
  ? Extract<T, Record<string, any>> | undefined
  : T extends Record<string, any>
  ? Extract<T, Record<string, any>>
  : Extract<T, Record<string, any>> | undefined;
export function extractRecord(target: any) {
  return isObj(target) ? target : undefined;
}
export function extractFn<T>(
  target: T,
): T extends undefined
  ? Extract<T, Types.Fn> | undefined
  : T extends Types.Fn
  ? Extract<T, Types.Fn>
  : Extract<T, Types.Fn> | undefined;
export function extractFn(target: any) {
  return isFn(target) ? target : undefined;
}

export function extractElementInArray<T>(target: T | T[]): T | undefined;
export function extractElementInArray(target: any) {
  return target instanceof Array ? target[0] : target;
}
