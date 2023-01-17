/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue, { Ref } from "vue";
import {
  ComponentOptions,
  h,
  isRef,
  isVue2,
  VNodeChildren,
  VNodeDirective,
  VueConstructor,
} from "vue-demi";
import frag from "vue-frag";

import Types, { isFn, isNil, isStr } from "@yuyi919/shared-types";
import type * as base from "../types/base.d";
import type * as builtin from "../types/builtin-components.d";
import type * as dom from "../types/dom.d";
import { VueRef } from "./lib/vue-ref";
import { mergeJsxProps, VNodeData } from "./mergeJsxProps";

Vue.use(VueRef);
if (isVue2) {
  Vue.directive("frag", frag);
}
// eslint-disable-next-line @typescript-eslint/naming-convention

export type VModel<T = any> = { value?: T; callback?: (newValue: T) => any };
export type NamedRef<T = any> = { value: T; name?: any };
export interface ExtendIntrinsicAttributes<T = any> {
  ["v-slot"]?: string;
  /**
   * 显示传入合并vue-jsx的props(包含attrs,props,on,nativeOn,etc.)
   */
  mergeJsxProps?: VNodeData[];
  class?: VNodeData["class"];
  staticClass?: VNodeData["staticClass"];
  key?: VNodeData["key"];
  ref?: VNodeData["ref"] | NamedRef;
  slot?: VNodeData["slot"];
  style?: VNodeData["style"] | string;
  domProps?: VNodeData["domProps"];
  attrs?: VNodeData["attrs"];
  hook?: VNodeData["hook"];
  on?: VNodeData["on"];
  nativeOn?: VNodeData["nativeOn"];
  directives?: VNodeDirective[];
  id?: string;
  refInFor?: boolean;
  domPropsInnerHTML?: string;
  props?: any;
  vModel?: VModel<T>;
  model?: VModel<T>;
  [key: string]: any;
}
const CLASS_NAME = "class";
const STYLE = "style";
const REF = "ref";
const PROPS = "props";
const MODEL = "model";
const V_MODEL = "vModel";
const ATTRS = "attrs";
const V_SLOT = "v-slot";
const SLOT = "slot";
const CHILDREN = "children";
const SLOTS = "slots";
const SCOPED_SLOTS = "scopedSlots";
const ON = "on";
const NATIVEON = "nativeOn";
const DOM_PROPS = "domProps";
const KEY = "key";
const Directives = "directives";
const DomPropsInnerHTML = "domPropsInnerHTML";
const MERGE_JSX_PROPS = "mergeJsxProps";
const cache_keys = [
  CLASS_NAME,
  STYLE,
  REF,
  PROPS,
  MODEL,
  V_MODEL,
  ATTRS,
  V_SLOT,
  SLOT,
  CHILDREN,
  SLOTS,
  SCOPED_SLOTS,
  ON,
  NATIVEON,
  DOM_PROPS,
  KEY,
  MERGE_JSX_PROPS,
  DomPropsInnerHTML,
  Directives,
] as const;
const _cache = Object.fromEntries(
  cache_keys.map((key) => [key, undefined]),
) as ExtendIntrinsicAttributes;

type Element = string | VueConstructor<Vue> | ComponentOptions<Vue>;
type Options = Record<string, any>;

export const getAttributes = (options: Options, propOptions = emptyObject) => {
  const cache = { ..._cache };
  const props = {} as Types.Recordable;
  const attrs = {} as Types.Recordable;
  const events = {} as Types.Recordable;
  let hasP = false,
    hasE = false,
    hasC = false;
  // const eventNames: string[] = [];
  for (const key in options) {
    if (cache_keys.includes(key as any)) {
      cache[key as keyof typeof _cache] = options[key];
      !hasC && (hasC = true);
    } else if (key.startsWith("on") && options[key] != null) {
      // eventNames.push(key);
      events[key.slice(2).toLowerCase()] = options[key];
      !hasE && (hasE = true);
    } else if (options[key] !== undefined) {
      props[key] = options[key];
      if (
        propOptions
          ? !(key in propOptions)
          : typeof options[key] !== "object" &&
            typeof options[key] !== "function"
      )
        attrs[key] = options[key];
      !hasP && (hasP = true);
    }
  }
  return {
    props,
    events,
    cache,
    attrs,
    hasE,
    hasC,
    hasP,
  };
};
// Object.fromEntries(Object.entries(options).filter(([option]) => !excluded.includes(option)));
export const boxSlots = (slots: any) => {
  const result = {} as Types.Recordable;
  if (slots) {
    // eslint-disable-next-line guard-for-in
    for (const key in slots) {
      result[key] = () => slots[key];
    }
  }
  return result;
};
const emptyObject = {} as any;
export const getJArgumentsWithOptions = (
  element: Element,
  options: Options,
  children: VNodeChildren | VNodeChildren[],
): {
  data: Options;
  children: VNodeChildren[] | VNodeChildren;
} => {
  const elementIsAComponent = typeof element !== "string";
  // 使用cache获取经过v8优化的结构
  // cache包含VNodeData的完整结构+可填充字字段
  const { attrs, props, events, cache, hasC, hasE, hasP } = getAttributes(
    options,
    (element as ComponentOptions<Vue>)?.props,
  );
  const propKey = elementIsAComponent ? PROPS : ATTRS;

  /**
   * 结果的VNodeData，先存储最基本的VNodeData
   */
  let data: VNodeData =
      hasE || hasP
        ? {
            on: events,
            [propKey]: props,
            [ATTRS]: attrs,
          }
        : emptyObject,
    _children;
  if (hasC) {
    _children = cache[CHILDREN];
    // 处理cache
    // 填充v-slot
    cache[SLOT] ??= cache[V_SLOT];
    // 填充v-model
    cache[MODEL] ??= cache[V_MODEL];
    // 填充scopedSlots
    cache[SCOPED_SLOTS] ??= boxSlots(cache[SLOTS]);
    // 处理ref
    cache.ref && processRef(cache as VNodeData);

    // 处理data
    cache[DomPropsInnerHTML] &&
      (cache[DOM_PROPS] = {
        ...cache[DOM_PROPS],
        innerHTML: cache[DomPropsInnerHTML],
      });

    // 处理显式定义的jsxData
    const jsxProps: VNodeData[] | undefined = cache[MERGE_JSX_PROPS];
    if (jsxProps?.length) {
      if (jsxProps.length > 1) {
        data = mergeJsxProps(cache as VNodeData, data, ...jsxProps);
      } else {
        const jsxProp = jsxProps[0];
        if (propKey in jsxProp || ON in jsxProp || DOM_PROPS in jsxProp) {
          data = mergeJsxProps(cache as VNodeData, data, jsxProp);
        } else {
          data = mergeJsxProps(
            cache as VNodeData,
            Object.assign(data, jsxProp),
          );
        }
      }
    } else {
      data =
        data === emptyObject
          ? (cache as VNodeData)
          : mergeJsxProps(cache as VNodeData, data);
    }
  }
  return {
    data,
    children: _children ? ({ 0: _children, 1: children } as any) : children,
  };
};

export const Fragment: Element = Symbol("Fragment") as any;
const fragFunction = { [Directives]: [{ name: "frag" }] };

function processRef(cache: VNodeData) {
  const ref = cache.ref;
  const useCallbackRef = ref instanceof Function;
  const useNativeRef =
    !useCallbackRef && ((ref && !isVue2) || typeof ref === "string");
  const useRefObj = !useNativeRef && !useCallbackRef && isRef(ref);
  const useNamedRef =
    ref && !useNativeRef && !useCallbackRef && !useRefObj && "name" in ref;
  cache.ref = useNativeRef ? ref : useNamedRef ? ref.name : void 0;

  if (isVue2 && (useCallbackRef || useRefObj)) {
    if (cache[Directives]?.length! > 1) {
      cache[Directives]![cache[Directives]!.length] = {
        name: "ref",
        value: useCallbackRef ? ref : (el: any) => (ref.value = el),
      };
    } else {
      cache[Directives] = [
        {
          name: "ref",
          value: useCallbackRef ? ref : (el: any) => (ref.value = el),
        },
      ];
    }
  }
}

/**
 *
 * @param element
 * @param options
 * @param children
 * @returns
 * @descprade
 */
export function jsxEsbuild(
  element: Element,
  options: Options | null,
  ...children: VNodeChildren[]
) {
  if (options) {
    const { data, children: renderChildren } = getJArgumentsWithOptions(
      element,
      options,
      children,
    );
    if (element === Fragment) {
      return h("div", fragFunction, [renderChildren]);
    }
    return h(element, data, renderChildren);
  }
  if (element === Fragment) {
    return children;
  }
  return h(element, children);
}

export function jsx(element: Element, props: Options | null, key?: string) {
  if (props) {
    const { children, ...options } = props;
    const { data, children: renderChildren } = getJArgumentsWithOptions(
      element,
      Object.assign(options, { key }),
      children || [],
    );
    if (element === Fragment) {
      return h("div", fragFunction, [renderChildren]);
    }
    return h(
      element,
      data,
      renderChildren instanceof Array ? renderChildren : [renderChildren],
    );
  }
  if (element === Fragment) {
    return h("div", fragFunction, []);
  }
  return h(element);
}

export const jsxs = jsx;

type vModel = {
  <T>(ref: Ref<T>, other?: null): VModel<T>;
  <T>(value: T, callback?: VModel<T>["callback"] | null): VModel<T>;
  <T extends Record<string, any>>(data: T, prop: keyof T): VModel<T>;
};

export const vModel: vModel = (a: any, b?: any) => {
  if (b && isStr(b)) return _vModel2(a, b);
  if (isNil(b) && isRef(a)) return _vModel3(a);
  return _vModel(a, isFn(b) ? b : undefined);
};

const _vModel = <T>(
  value: VModel<T>["value"],
  callback?: VModel<T>["callback"],
): VModel<T> => {
  return {
    value,
    callback,
  };
};

const _vModel2 = <T extends Record<string, any>>(
  data: T,
  prop: keyof T,
): VModel<T> => {
  return {
    value: data[prop],
    callback: (value) => (data[prop] = value as any),
  };
};

const _vModel3 = <T>(data: Ref<T>): VModel<T> => {
  return {
    value: data.value,
    callback: (value) => (data.value = value as any),
  };
};

export * from "./mergeJsxPropsToVNode";
export * from "./VNode";
export type { base, builtin, dom };

export default jsx;
