export function usePrefixCls(
  tag: string,
  props?: {
    prefixCls?: string;
  },
) {
  return (props?.prefixCls || "ant") + "-" + tag;
}

export { classnames as cls } from "@yuyi919/antdv1-plus-theme";
