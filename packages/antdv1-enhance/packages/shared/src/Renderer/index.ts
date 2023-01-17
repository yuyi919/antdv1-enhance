import { is } from "@yuyi919/shared-types";
import { useLoader } from "@yuyi919/vue-use";
import { defineComponent, h, PropType, watch } from "vue";
import { transformWith } from "./utils";

export const Renderer = defineComponent({
  props: {
    renderer: {
      type: null as unknown as PropType<any>,
    },
  },
  functional: true,
  render(h, { props }) {
    return is.str(props.renderer) || is.num(props.renderer)
      ? h("b", [props.renderer + ""]).children![0]
      : (props.renderer as any);
  },
});

export const AsyncRenderer = defineComponent({
  props: {
    tag: {
      type: null,
      default: "span",
    },
    value: null,
    enum: null,
  },
  setup(props, ctx) {
    const { load, loading, data } = useLoader(async () => {
      const [value, enums] = await Promise.all([props.value, props.enum]);
      // console.log(value, enums)
      return transformWith(value, enums);
    });
    watch(
      () => {
        try {
          return [props.value, props.enum];
        } catch (e) {
          return [];
        }
      },
      () => load(),
      {
        immediate: true,
      },
    );

    function getChildren() {
      const children = ctx.slots.default?.();
      return (
        children &&
        (children.length === 1 ? children[0] : h("span", {}, children))
      );
    }
    return () => {
      return loading.value
        ? getChildren()
        : h(props.tag, {}, [
            (data.value === "" ? null : data.value) ?? getChildren(),
          ]);
    };
  },
});
