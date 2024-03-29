/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-interface */
import "@yuyi919/antdv1-type-enhance"
import { VNodeData, VNode } from "vue-demi";
import { base, builtin } from "@yuyi919/antdv1-plus-helper";
import type { ExtendIntrinsicAttributes } from "@yuyi919/vue-jsx-factory";
import "vue/types/v3-component-options"
import "vue/types/jsx"
import "@yuyi919/antdv1-type-enhance"

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Partial<Omit<ComponentRenderProxy, keyof Vue>> {}
    interface ElementAttributesProperty {
      $props: any; // specify the property name to use
    }
    interface IntrinsicAttributes extends ExtendIntrinsicAttributes {}
    interface IntrinsicElements extends base.IntrinsicElements {
      // allow unknown elements
      [name: string]: any;

      // builtin components
      transition: base.CombinedTsxComponentAttrs<builtin.TransitionProps, {}, {}, {}, {}, true>;
      "transition-group": base.CombinedTsxComponentAttrs<
        builtin.TransitionGroupProps,
        {},
        {},
        {},
        {},
        true
      >;
      "keep-alive": base.CombinedTsxComponentAttrs<builtin.KeepAliveProps, {}, {}, {}, {}, true>;
    }
  }
}
