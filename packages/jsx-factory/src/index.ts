/* eslint-disable @typescript-eslint/no-explicit-any */
import Vue from "vue";
import {
  h,
  isRef,
  isVue2,
  VNodeChildren,
  VNodeDirective,
  VueConstructor,
} from "vue-demi";
import frag from "vue-frag";

import { VueRef } from "./lib/vue-ref";
import { mergeJsxProps, VNodeData } from "./mergeJsxProps";

Vue.use(VueRef);
if (isVue2) {
  Vue.directive("frag", frag);
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ExtendIntrinsicAttributes {
  ["v-slot"]?: string;
  /**
   * 显示传入合并vue-jsx的props(包含attrs,props,on,nativeOn,etc.)
   */
  mergeJsxProps?: VNodeData[];
  class?: VNodeData["class"];
  staticClass?: VNodeData["staticClass"];
  key?: VNodeData["key"];
  ref?: VNodeData["ref"] | { value: unknown };
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

type Element = string | VueConstructor<Vue>;
type Options = Record<string, any>;

export const getEventNames = (options: Options) =>
  Object.keys(options).filter((option) => option.startsWith("on"));

const mapEventNamesToHandlerPairs = (
  options: Options,
  eventNames: string[],
) => {
  const r = {} as Types.Recordable;
  for (const eventName of eventNames) {
    if (eventName && options[eventName]) {
      r[eventName.substring(2).toLowerCase()] = options[eventName];
    }
  }
  return r;
};

export const getAttributes = (options: Options, excluded: string[]) => {
  const result = {} as Types.Recordable;
  for (const key in options) {
    if (!excluded.includes(key)) {
      result[key] = options[key];
    }
  }
  return result;
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
export const getJArgumentsWithOptions = (
  element: Element,
  options: Options,
  children: VNodeChildren | VNodeChildren[],
): {
  data: Options;
  children: VNodeChildren[] | VNodeChildren;
} => {
  const eventNames = getEventNames(options);
  const elementIsAComponent = typeof element !== "string";
  const {
    [CLASS_NAME]: className,
    [REF]: ref,
    [STYLE]: style,
    [SCOPED_SLOTS]: scopedSlots,
    [SLOT]: slot,
    [CHILDREN]: _children,
    [SLOTS]: slots,
    [V_SLOT]: vSlot,
    [ON]: on,
    [MODEL]: model,
    [V_MODEL]: vModel = model,
    directives,
    key,
    mergeJsxProps: _mergeJsxPropsArgs,
    [NATIVEON]: nativeOn,
    [PROPS]: _props,
    [ATTRS]: attrs,
    domPropsInnerHTML: domPropsInnerHTML,
    ...OTHER
  } = options;
  const props = getAttributes(OTHER, eventNames);
  const useCallbackRef = ref instanceof Function;
  const useNativeRef =
    !useCallbackRef && ((ref && !isVue2) || typeof ref === "string");
  const useRefObj = !useNativeRef && !useCallbackRef && isRef(ref);
  const useNamedRef = ref && !useNativeRef && !useCallbackRef && !useRefObj;
  const data = mergeJsxProps(
    {
      [CLASS_NAME]: className,
      [STYLE]: style,
      [REF]: useNativeRef ? ref : useNamedRef ? ref.name : void 0,
      [SLOT]: vSlot || slot,
      [SCOPED_SLOTS]: scopedSlots,
      [ON]: mapEventNamesToHandlerPairs(options, eventNames),
      [MODEL]: vModel,
      domProps: domPropsInnerHTML && {
        innerHTML: domPropsInnerHTML,
      },
      key,
      directives: directives || [],
      [elementIsAComponent ? PROPS : ATTRS]: props,
    },
    { props: _props, attrs, nativeOn, on, scopedSlots: boxSlots(slots) },
    ...(_mergeJsxPropsArgs || []),
  );
  if (isVue2 && (useCallbackRef || useRefObj) && data.directives) {
    data.directives[data.directives.length] = {
      name: "ref",
      value: useCallbackRef ? ref : (el: any) => (ref.value = el),
    };
  }
  return {
    data,
    children: _children ? ({ 0: _children, 1: children } as any) : children,
  };
};

export const Fragment: Element = Symbol("Fragment") as any;
const fragFunction = { directives: [{ name: "frag" }] };
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

export * from "./mergeJsxPropsToVNode";
export * from "./VNode";
export type { base, builtin, dom };

import Types from "@yuyi919/shared-types";
import type * as base from "../types/base.d";
import type * as builtin from "../types/builtin-components.d";
import type * as dom from "../types/dom.d";
