/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, VNode } from "vue-demi";

export function isVNode(vnode: any): vnode is VNode {
  const VNode = h("div").constructor;
  return vnode instanceof VNode;
}

export function getVNodeVShow(vnode: VNode): boolean {
  const dec = vnode.data?.directives?.find((o) => o.name === "show");
  return dec ? dec.value : true;
}
export function getChildren(
  vnode: VNode,
  defaultValue = [] as VNode["children"],
): VNode[] {
  return (
    vnode.componentOptions &&
    (vnode.componentOptions.children ||
      // @ts-ignore
      (vnode.componentOptions.propsData &&
        (vnode.componentOptions.propsData as any).children) ||
      defaultValue)
  );
}
export function setChildren(vnode: VNode, children: VNode | VNode[]) {
  vnode.componentOptions &&
    (vnode.componentOptions.children =
      children instanceof Array ? children : [children]);
  return vnode;
}

export function hackVnodeChildren(
  vnode: VNode,
  replacer: (child: VNode["children"]) => VNode | VNode[],
) {
  const children = getChildren(vnode);
  return setChildren(vnode, replacer(children));
}
export {
  getKey as getVNodeKey,
  getOptionProps as getVNodeProps,
} from "./_built/props-util";
export * from "./_built/vnode";
