import { extractProps, VueComponent2 } from "@yuyi919/antdv1-plus-helper";
import { useInherit } from "@yuyi919/vue-use";
import { IColProps, Modal as AntModal } from "ant-design-vue";
import { pick } from "lodash";
import { computed, defineComponent } from "vue-demi";
import { useGridWatcher } from "../GridWatcher";
import { useContentRender } from "../hooks";
import {
  INormalizeModalProps,
  NormalizeModalProps,
} from "../NormalizeModalProps";
import { useClasses, useStyles } from "./styles";

export function getGridProps(props: IColProps) {
  return pick(props, "md", "lg", "sm", "span", "xs", "xl", "xxl");
}

export const NormlizeModal: VueComponent2<
  INormalizeModalProps,
  { close: any; cancel: any; ok: any }
> = defineComponent({
  props: extractProps(NormalizeModalProps),
  emits: {
    cancel() {},
    ok() {},
    close() {},
  },
  setup(props, context) {
    const useAutoWidth = computed(() => props.width === "auto" || !props.width);
    const autoWidth = useGridWatcher({
      xl: 16,
      lg: 19,
      md: 20,
    });
    const modalWidth = computed(() => {
      return useAutoWidth.value ? autoWidth.value : props.width;
    });

    const [getInherit, inheritEvent] = useInherit(context, [
      "cancel",
      "close",
      "ok",
    ]);
    const classes = useClasses<"c-">(useStyles(props));
    // const footerRef = useQuerySelector(".ant-modal-footer");
    // const headerRef = useQuerySelector(".ant-modal-header");
    // const contentHeight = computed(() => {
    //   const titleHeight = headerRef.value?.offsetHeight || 0;
    //   const footerHeight = footerRef.value?.offsetHeight || 0;
    //   return (
    //     window.innerHeight -
    //     (props.placement === "center" ? 0 : 100 + 24) -
    //     footerHeight -
    //     titleHeight
    //   );
    // });
    const [renderScrollbar] = useContentRender(props, () => classes.content);
    return () => {
      const {
        children,
        on,
        props: {
          classNames,
          placement,
          transitionType,
          transitionDuration,
          ...other
        },
      } = getInherit<INormalizeModalProps>();
      return (
        <AntModal
          class={[classes.root, classNames?.root]}
          onCancel={inheritEvent.close}
          mergeJsxProps={[
            {
              props: {
                ...other,
                width: modalWidth.value,
                wrapClassName: classNames?.wrap,
                centered: placement === "center",
                transitionName: transitionType,
                visible: other.visible,
              },
              on,
            },
          ]}
        >
          {!placement || placement === "default" || !renderScrollbar ? (
            <div class={classes.content}>{children}</div>
          ) : (
            renderScrollbar(children)
          )}
        </AntModal>
      );
    };
  },
});
