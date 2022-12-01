import Vue from "vue";
import { IModalAction } from "./context";
import { createProtalModal, IPortalModalOptions } from "./portal";

export * from "./confirm";
export * from "./context";
export * from "./dialog";
export * from "./Manager";
export * from "./modal";
export * from "./portal";
export * from "./props";

export default function install(vue: typeof Vue) {
  vue.prototype.$customModal = function $customModal(
    this: Vue,
    config: IPortalModalOptions,
  ) {
    return createProtalModal(config, this);
  };
}

declare module "vue/types/vue" {
  interface Vue {
    $customModal?: (config: IPortalModalOptions) => IModalAction;
  }
}
