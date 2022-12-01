import {
  extractProps,
  getPropsClass,
  VCProps,
  VueComponent2,
} from "@yuyi919/antdv1-plus-helper";
import {
  useComponentEl,
  useEffect,
  useInherit,
  useNamedRef,
  usePropLocal,
} from "@yuyi919/vue-use";
import { Col, IColProps } from "ant-design-vue";
import { debounce, reduce } from "lodash";
import Vue from "vue";
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onBeforeUnmount,
  ref,
} from "vue-demi";

const AutoColProps = getPropsClass(Col, {
  xl: 16,
  lg: 19,
  md: 20,
});

export function useGridWatcher(props: VCProps<Col, false>) {
  const widthRef = ref(0);
  const instance = getCurrentInstance()!.proxy;
  const div = document.createElement("div");
  const ins = new Vue({
    render() {
      return (
        <GridWatcher
          props={props}
          onChange={(arg) => {
            widthRef.value = arg;
          }}
        />
      );
    },
    parent: instance,
  });
  onBeforeMount(() => {
    document.body.appendChild(div);
    ins.$mount(div);
  });
  onBeforeUnmount(() => {
    ins.$destroy();
    div.remove();
  });
  return widthRef;
}

export const GridWatcher: VueComponent2<
  VCProps<Col, false>,
  { change: number }
> = defineComponent({
  model: {
    prop: "value",
    event: "change",
  },
  emits: { change() {} },
  props: {
    value: {
      type: Number,
    },
    ...extractProps(AutoColProps),
  },
  setup(props, context) {
    const [getInherit] = useInherit(context);
    const gridRef = useNamedRef<HTMLDivElement>("grid");
    const [, { update }] = usePropLocal<number, number>(
      () => props.value,
      (width) => {
        context.emit("change", width);
      },
      { immediate: true },
    );
    const gridClassName = computed(() =>
      reduce(
        props as IColProps,
        (str, size, type) =>
          size || props[type as keyof IColProps]
            ? `${str} ${[
                "ant-col",
                type,
                size || props[type as keyof IColProps],
              ].join("-")}`
            : str,
        "",
      ),
    );
    const elRef = useComponentEl();
    let _lastScreenWidth = 0,
      last_width = 0;
    const methods = {
      watch(times = 0) {
        const div = gridRef.value!,
          width = div?.offsetWidth;
        if (
          elRef.value &&
          (_lastScreenWidth !== window.innerWidth || width !== last_width)
        ) {
          // context.emit("change", width);
          console.error(
            "modal watch",
            width,
            _lastScreenWidth,
            window.innerWidth,
          );
          if (width === 0 && times < 3) {
            requestAnimationFrame(() => methods.watch(times + 1));
          } else {
            update(width, true);
          }
          _lastScreenWidth = window.innerWidth;
          last_width = width;
        }
      },
    };
    useEffect(() => {
      methods.watch();
      methods.watch = debounce(methods.watch, 100);
      const watch = () => methods.watch();
      window.addEventListener("resize", watch);
      return () => window.removeEventListener("resize", watch);
    });
    return () => {
      const { on } = getInherit();
      return (
        <div style={`position:fixed;top:0;width:100vw;`} {...{ on }}>
          <div ref={gridRef} class={gridClassName.value} />
        </div>
      );
    };
  },
});
