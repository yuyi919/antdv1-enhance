import { extractProps } from "@yuyi919/antdv1-plus-helper";
import {
  createContext,
  unwrap,
  useEffect,
  useInherit,
  useNamedRef,
  WrapValue,
} from "@yuyi919/vue-use";
import { computed, defineComponent, reactive, watchEffect } from "vue-demi";
import { GridCore } from "./grid";
import { GridProps } from "./Props";

const FormGridContext = createContext<GridCore>("@FormGrid");
const props = extractProps(GridProps, {
  minWidth: 100,
  minColumns: 0,
  colWrap: true,
  breakpoints: [720, 1280, 1920] as [number, number, number],
  columnGap: 10,
  rowGap: 5,
});

export const SmartGrid = defineComponent({
  props,
  setup(props, context) {
    const elRef = useNamedRef<HTMLDivElement>("elRef");
    const store = reactive(new GridCore(props));
    FormGridContext.provide(store as GridCore);
    const [getInherit] = useInherit(context);
    useEffect(() => {
      elRef.value && store.mount(elRef.value);
      // console.debug("[Smart Grid]");
      return () => store.dispose();
    });
    watchEffect(() => {
      store.nextProps(props);
    });
    return () => {
      const { className, styles } = store;
      const { children, props, on } = getInherit();
      const dataProps = props; // pickDataProps(props);
      return (
        <div
          {...dataProps}
          class={className}
          style={{
            ...styles,
            display: "grid",
          }}
          ref={elRef}
        >
          {children}
        </div>
      );
    };
  },
});

export function useGridSpan(gridSpan: WrapValue<number>) {
  const store = FormGridContext.inject();
  return [
    computed(() => {
      const span = store?.getGridSpan(unwrap(gridSpan) || 1);
      // console.log(unwrap(gridSpan) || 1, span)
      return span;
    }),
  ] as const;
}
export function getGridSpanStyle(span: number) {
  return { gridColumnStart: `span ${span}` };
}

export const GridColumn = defineComponent({
  props: {
    gridSpan: Number,
  },
  setup(props, context) {
    const [getInherit] = useInherit(context);
    const [spanRef] = useGridSpan(() => props.gridSpan);
    return () => {
      const { children } = getInherit();
      const { value: span } = spanRef;
      return (
        <div style={getGridSpanStyle(span)} data-span={span || 1}>
          {children}
        </div>
      );
    };
  },
});

export * from "./grid";
export * from "./Props";
export type { IGridColumnProps } from "./types";
