// import { Scrollbar } from "@project/components-shared";
import { Scrollbar } from "@yuyi919/antdv1-plus-shared";
import {
  unwrap,
  useQuerySelector,
  useWindowSize,
  WrapValue,
} from "@yuyi919/vue-use";
import { computed } from "vue-demi";
import { INormalizeModalProps } from "./NormalizeModalProps";

export function useContentRender(
  props: INormalizeModalProps,
  contentClassName: WrapValue<string>,
  headerRef = useQuerySelector(".ant-modal-header"),
  footerRef = useQuerySelector(".ant-modal-footer"),
) {
  const windowSize = useWindowSize();
  function getContentPadding() {
    if (props.placement === "center") {
      return 100 + 24;
    }
    return 0;
  }
  const contentHeight = computed(() => {
    const titleHeight = headerRef.value?.offsetHeight || 0;
    const footerHeight = footerRef.value?.offsetHeight ?? 0;
    console.log(contentHeight, footerHeight);
    return getContentPadding() + footerHeight + titleHeight;
  });
  const scrollBarProps = computed(() => {
    // 左右布局时控制整体的高度，其余都是控制最大高度
    // console.log("windowSize.height", windowSize.height);
    return {
      ...(props.placement === "left" || props.placement === "right"
        ? {
            height: `calc(100vh - ${contentHeight.value}px)`,
          }
        : {
            maxHeight: windowSize.height - contentHeight.value,
          }),
      viewClass: unwrap(contentClassName),
      native: true,
      hidden: contentHeight.value === getContentPadding(),
    };
  });
  return [
    (content: any) => {
      return (
        // <div
        //   class={contentClassName}
        //   style={{height: scrollBarProps.value.height + 'px', maxHeight: scrollBarProps.value.maxHeight + 'px'}}
        // >
        //   {content}
        // </div>
        <Scrollbar props={scrollBarProps.value}>{content}</Scrollbar>
      );
    },
    windowSize,
  ] as const;
}
